"use client";
import React, { useState, use, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayCircle, Clock, Download, Award, Infinity as InfinityIcon, CheckCircle2, BookOpen } from 'lucide-react';
import CourseSidebar from '../../../student/courses/_components/CourseSidebar';
import LessonInfo from '../../../student/courses/_components/LessonInfo';
import BunnyVideo from '@/app/_components/BunnyVideo';
import { useGetCoursesQuery } from '@/redux/course/courseApi';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ApproveCourseModal from '../_components/ApproveCourseModal';

export default function AdminCourseDetailsPage({ params }) {
    const { id } = use(params);
    const { data: coursesData, isLoading } = useGetCoursesQuery();
    const router = useRouter();

    const [activeLesson, setActiveLesson] = useState(null);
    const [activeModuleId, setActiveModuleId] = useState(null);
    const [expandedModules, setExpandedModules] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showApproveModal, setShowApproveModal] = useState(false);

    // Filter course and map data
    const apiCourse = coursesData?.courses?.find(c => c._id === id);

    const [mappedCourse, setMappedCourse] = useState(null);

    useEffect(() => {
        if (apiCourse) {
            const mappedModules = apiCourse.modules.map((m, index) => ({
                id: m._id,
                title: m.title,
                description: m.description || "",
                moduleDuration: m.moduleDuration || 0,
                lessons: m.lessons.map(l => ({
                    id: l._id,
                    title: l.lessonTitle || l.videoTitle,
                    videoTitle: l.videoTitle,
                    description: l.lessonDescription || "",
                    type: l.videoId ? 'video' : 'pdf',
                    duration: l.lessonDuration ? `${l.lessonDuration} min` : '00:00',
                    lessonDuration: l.lessonDuration || 0,
                    status: 'completed',
                    videoId: l.videoId,
                    libraryId: l.libraryId,
                    resources: l.resources
                }))
            }));

            setMappedCourse({
                title: apiCourse.title,
                instructor: apiCourse.instructor?.name || "Unknown",
                instructorEmail: apiCourse.instructor?.email || "",
                description: apiCourse.description,
                category: apiCourse.category?.name || "Uncategorized",
                level: apiCourse.level || "All Levels",
                courseIncludes: apiCourse.courseIncludes || { totalVideoHours: 0, downloadableResources: 0, fullLifetimeAccess: true, certificateOfCompletion: true },
                whatYouWillLearn: apiCourse.whatYouWillLearn || [],
                modules: mappedModules,
                thumbnailImage: apiCourse.thumbnailImage?.url,
                isApproved: apiCourse.isApproved,
                totalProgress: 100
            });

            if (mappedModules.length > 0 && mappedModules[0].lessons.length > 0) {
                setActiveLesson(mappedModules[0].lessons[0]);
                setActiveModuleId(mappedModules[0].id);
                setExpandedModules([mappedModules[0].id]);
            }
        }
    }, [apiCourse]);

    if (isLoading) return <div className="p-8 text-center text-slate-500 font-lexend mt-20">Loading admin course details...</div>;
    if (!apiCourse || !mappedCourse) return <div className="p-8 text-center text-red-500 font-lexend mt-20">Course not found.</div>;

    const handleLessonSelect = (lesson, moduleId) => {
        setActiveLesson(lesson);
        setActiveModuleId(moduleId);
        setMobileMenuOpen(false);
        setIsPlaying(false);
    };

    const toggleModule = (moduleId) => {
        setExpandedModules(prev =>
            prev.includes(moduleId) ? prev.filter(mid => mid !== moduleId) : [...prev, moduleId]
        );
    };

    return (
        <div className="flex flex-col h-screen bg-white font-lexend overflow-hidden">
            <header className="py-3 min-h-[4rem] border-b border-slate-200 bg-white flex items-center justify-between px-4 md:px-6 shrink-0 z-20 relative">
                {/* Left Side: Back Button (Top) & Heading (Bottom) */}
                <div className="flex flex-col items-start gap-1">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                        <span className="inline font-medium text-sm md:text-base">← Back to Courses</span>
                    </button>

                    <h1 className="text-sm md:text-lg font-bold text-slate-900 truncate max-w-[200px] md:max-w-md">
                        {mappedCourse.title}
                    </h1>
                </div>

                {/* Right Side: Approve Button */}
                {!mappedCourse.isApproved ? (
                    <div className="flex items-center">
                        <Button onClick={() => setShowApproveModal(true)}>
                            Approve Course
                        </Button>
                    </div>
                ) : null}
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Area: Content Player */}
                <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50">
                    <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">

                        {activeLesson?.type === 'video' && activeLesson.videoId && activeLesson.libraryId ? (
                            <div className="mb-6 rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black relative aspect-video">
                                {!isPlaying ? (
                                    <div
                                        className="absolute inset-0 cursor-pointer group flex items-center justify-center bg-slate-900"
                                        onClick={() => setIsPlaying(true)}
                                    >
                                        {mappedCourse.thumbnailImage ? (
                                            <img src={mappedCourse.thumbnailImage} alt="Course Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                        ) : null}
                                        <div className="z-10 bg-white/20 p-4 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform">
                                            <PlayCircle size={48} className="text-white fill-white/20" />
                                        </div>
                                    </div>
                                ) : (
                                    <BunnyVideo libraryId={activeLesson.libraryId} videoId={activeLesson.videoId} title={activeLesson.title} />
                                )}
                            </div>
                        ) : (
                            <div className="bg-slate-200 rounded-2xl aspect-video mb-6 flex items-center justify-center shadow-lg border border-slate-300">
                                <p className="text-slate-600 font-medium">No video available for this lesson.</p>
                            </div>
                        )}

                        <LessonInfo activeLesson={activeLesson} instructor={mappedCourse.instructor} />

                        {/* Tabs content */}
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-4 mb-8 border-b border-slate-200 pb-1">
                                <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-sPrimary data-[state=active]:text-sPrimary px-4 py-2 font-bold bg-transparent shadow-none transition-all cursor-pointer">Overview</TabsTrigger>
                                <TabsTrigger value="resources" className="rounded-none border-b-2 border-transparent data-[state=active]:border-sPrimary data-[state=active]:text-sPrimary px-4 py-2 font-bold bg-transparent shadow-none transition-all cursor-pointer">Resources</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-lg mb-3">About this course</h3>
                                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap mb-6">
                                        {mappedCourse.description || "No description provided."}
                                    </p>

                                    {/* Course Info Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Category</p>
                                            <p className="font-semibold text-slate-900">{mappedCourse.category || "Not specified"}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Level</p>
                                            <p className="font-semibold text-slate-900">{mappedCourse.level}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Instructor</p>
                                            <p className="font-semibold text-slate-900">{mappedCourse.instructor}</p>
                                            {mappedCourse.instructorEmail && <p className="text-xs text-slate-500 mt-0.5">{mappedCourse.instructorEmail}</p>}
                                        </div>
                                        {/* <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Status</p>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${mappedCourse.isApproved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {mappedCourse.isApproved ? 'Approved' : 'Pending Approval'}
                                            </span>
                                        </div> */}
                                    </div>

                                    {/* Course Includes */}
                                    <div className="pt-6 mt-6 border-t border-slate-200">
                                        <h3 className="font-bold text-lg mb-4">Course Includes</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-xl border border-blue-100">
                                                <Clock size={20} className="text-blue-600 shrink-0" />
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{mappedCourse.courseIncludes?.totalVideoHours || 0} Hours</p>
                                                    <p className="text-xs text-slate-500">Video Content</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 bg-green-50 p-3 rounded-xl border border-green-100">
                                                <Download size={20} className="text-green-600 shrink-0" />
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{mappedCourse.courseIncludes?.downloadableResources || 0} Files</p>
                                                    <p className="text-xs text-slate-500">Resources</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-xl border border-purple-100">
                                                <InfinityIcon size={20} className="text-purple-600 shrink-0" />
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{mappedCourse.courseIncludes?.fullLifetimeAccess ? 'Yes' : 'No'}</p>
                                                    <p className="text-xs text-slate-500">Lifetime Access</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-xl border border-amber-100">
                                                <Award size={20} className="text-amber-600 shrink-0" />
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{mappedCourse.courseIncludes?.certificateOfCompletion ? 'Yes' : 'No'}</p>
                                                    <p className="text-xs text-slate-500">Certificate</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* What You Will Learn */}
                                    {mappedCourse.whatYouWillLearn?.length > 0 && (
                                        <div className="pt-6 mt-6 border-t border-slate-200">
                                            <h3 className="font-bold text-lg mb-4">What You Will Learn</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {mappedCourse.whatYouWillLearn.map((item, index) => (
                                                    <div key={index} className="flex items-start gap-2.5 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                                                        <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                                                        <span className="text-sm text-slate-700">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Module Overview */}
                                    <div className="pt-6 mt-6 border-t border-slate-200">
                                        <h3 className="font-bold text-lg mb-4">Curriculum Overview</h3>
                                        <div className="space-y-3">
                                            {mappedCourse.modules.map((module, mIdx) => (
                                                <div key={module.id} className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                                                    <div className="p-4 flex items-center justify-between">
                                                        <div>
                                                            <p className="font-bold text-slate-900">Module {mIdx + 1}: {module.title}</p>
                                                            {module.description && <p className="text-xs text-slate-500 mt-1">{module.description}</p>}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                                            <BookOpen size={14} />
                                                            <span>{module.lessons.length} lessons</span>
                                                            {module.moduleDuration > 0 && (
                                                                <>
                                                                    <span>•</span>
                                                                    <Clock size={14} />
                                                                    <span>
                                                                        {Math.floor(module.moduleDuration / 60)}:
                                                                        {Math.floor(module.moduleDuration % 60).toString().padStart(2, "0")}
                                                                    </span>                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="border-t border-slate-100">
                                                        {module.lessons.map((lesson, lIdx) => (
                                                            <div key={lesson.id} className="px-4 py-2.5 flex items-center justify-between text-sm border-b border-slate-50 last:border-b-0 hover:bg-slate-100/50 transition-colors">
                                                                <div className="flex items-center gap-2">
                                                                    <PlayCircle size={14} className="text-blue-500 shrink-0" />
                                                                    <span className="text-slate-700">{lesson.title}</span>
                                                                </div>
                                                                <span className="text-slate-400 text-xs">
                                                                    {Math.floor(lesson.lessonDuration / 60)}:
                                                                    {Math.floor(lesson.lessonDuration % 60).toString().padStart(2, "0")}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="resources" className="space-y-4">
                                {activeLesson?.resources?.length > 0 ? (
                                    <div className="grid gap-3">
                                        {activeLesson.resources.map((res) => (
                                            <div
                                                key={res._id}
                                                className="flex items-center justify-between bg-slate-50 border rounded-xl p-4 hover:bg-slate-100 transition"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                                                        📄
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-medium text-slate-800">
                                                            {res.title || "Resource"}
                                                        </p>
                                                        <p className="text-xs text-slate-500">
                                                            Lesson Resource
                                                        </p>
                                                    </div>
                                                </div>

                                                <a
                                                    href={res.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm font-medium text-blue-600 hover:underline"
                                                >
                                                    View
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-slate-500 italic">
                                        No additional resources are attached to this lesson.
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>

                    </div>
                </div>

                {/* Right Area: Course Sidebar (Desktop) */}
                <aside className="w-96 border-l border-slate-200 bg-white hidden lg:flex flex-col h-full">
                    <div className="p-5 border-b border-slate-200 shrink-0">
                        <h3 className="font-bold text-lg text-slate-900">Course Content</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <CourseSidebar
                            modules={mappedCourse.modules}
                            activeLesson={activeLesson}
                            expandedModules={expandedModules}
                            toggleModule={toggleModule}
                            onLessonSelect={handleLessonSelect}
                        />
                    </div>
                </aside>
            </div>

            {/* Approve Course Modal */}
            <ApproveCourseModal
                isOpen={showApproveModal}
                onClose={() => setShowApproveModal(false)}
                courseId={id}
            />
        </div>
    );
}
