"use client";
import React, { useState, use, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayCircle, Clock, Download, Award, Infinity as InfinityIcon, CheckCircle2, BookOpen, FileText } from 'lucide-react';
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
            <header className="py-3 min-h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 md:px-6 shrink-0 z-20 relative">
                {/* Left Side: Back Button & Heading */}
                <div className="flex flex-col items-start gap-1">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer group"
                    >
                        <span className="inline font-medium text-sm md:text-base group-hover:-translate-x-1 transition-transform">←</span>
                        <span className="inline font-medium text-sm md:text-base">Back to Courses</span>
                    </button>

                    <h1 className="text-sm md:text-lg font-bold text-slate-900 truncate max-w-[200px] md:max-w-md">
                        {mappedCourse.title}
                    </h1>
                </div>

                {/* Right Side: Approve Button */}
                {!mappedCourse.isApproved ? (
                    <div className="flex items-center">
                        <Button
                            onClick={() => setShowApproveModal(true)}
                            className="bg-sPrimary hover:bg-sPrimary/90 text-white font-bold px-6 rounded-xl shadow-lg shadow-sPrimary/20 transition-all active:scale-95"
                        >
                            Approve Course
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 font-bold text-sm">
                        <CheckCircle2 size={16} />
                        Approved
                    </div>
                )}
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Area: Content Player */}
                <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50">
                    <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">

                        {activeLesson?.type === 'video' && activeLesson.videoId && activeLesson.libraryId ? (
                            <div className="mb-8 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-black relative aspect-video">
                                {!isPlaying ? (
                                    <div
                                        className="absolute inset-0 cursor-pointer group flex items-center justify-center bg-slate-900"
                                        onClick={() => setIsPlaying(true)}
                                    >
                                        {mappedCourse.thumbnailImage ? (
                                            <img src={mappedCourse.thumbnailImage} alt="Course Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
                                        ) : null}
                                        <div className="z-10 bg-white/20 p-6 rounded-full backdrop-blur-md group-hover:scale-110 transition-all duration-300 border border-white/30 shadow-2xl">
                                            <PlayCircle size={64} className="text-white fill-white/20" />
                                        </div>
                                    </div>
                                ) : (
                                    <BunnyVideo libraryId={activeLesson.libraryId} videoId={activeLesson.videoId} title={activeLesson.title} />
                                )}
                            </div>
                        ) : (
                            <div className="bg-slate-200 rounded-3xl aspect-video mb-8 flex items-center justify-center shadow-inner border border-slate-300">
                                <div className="text-center">
                                    <PlayCircle size={48} className="text-slate-400 mx-auto mb-3 opacity-20" />
                                    <p className="text-slate-500 font-medium">No video available</p>
                                </div>
                            </div>
                        )}

                        <LessonInfo activeLesson={activeLesson} instructor={mappedCourse.instructor} />

                        {/* Tabs content */}
                        <Tabs defaultValue="overview" className="w-full mt-8">
                            <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-8 mb-8 border-b border-slate-200">
                                <TabsTrigger
                                    value="overview"
                                    className="relative rounded-none border-b-2 border-transparent data-[state=active]:bg-sPrimary data-[state=active]:text-white px-6 py-3 font-bold bg-transparent shadow-none transition-all cursor-pointer text-slate-500 hover:text-slate-700 rounded-t-xl"
                                >
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger
                                    value="resources"
                                    className="relative rounded-none border-b-2 border-transparent data-[state=active]:bg-sPrimary data-[state=active]:text-white px-6 py-3 font-bold bg-transparent shadow-none transition-all cursor-pointer text-slate-500 hover:text-slate-700 rounded-t-xl"
                                >
                                    Resources
                                    {activeLesson?.resources?.length > 0 && (
                                        <span className="ml-2 bg-sPrimary/10 text-sPrimary text-[10px] px-1.5 py-0.5 rounded-full group-data-[state=active]:bg-white/20 group-data-[state=active]:text-white">
                                            {activeLesson.resources.length}
                                        </span>
                                    )}
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500 outline-none">
                                {/* About Section */}
                                <section>
                                    <h3 className="font-bold text-xl mb-4 text-slate-900 flex items-center gap-2">
                                        <div className="w-1.5 h-6 bg-sPrimary rounded-full"></div>
                                        About this course
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed text-base whitespace-pre-wrap">
                                        {mappedCourse.description || "No description provided."}
                                    </p>

                                    {/* Info Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1 hover:border-sPrimary/30 transition-colors">
                                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Category</p>
                                            <p className="font-bold text-slate-900">{mappedCourse.category || "Not specified"}</p>
                                        </div>
                                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1 hover:border-sPrimary/30 transition-colors">
                                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Level</p>
                                            <p className="font-bold text-slate-900">{mappedCourse.level}</p>
                                        </div>
                                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1 hover:border-sPrimary/30 transition-colors">
                                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Instructor</p>
                                            <p className="font-bold text-slate-900 line-clamp-1">{mappedCourse.instructor}</p>
                                            {mappedCourse.instructorEmail && <p className="text-[10px] text-slate-400 font-medium truncate">{mappedCourse.instructorEmail}</p>}
                                        </div>
                                    </div>
                                </section>

                                {/* Course Includes */}
                                <section className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl shadow-slate-200">
                                    <h3 className="font-bold text-xl mb-8 flex items-center gap-2">
                                        What's included in Masad
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                        <div className="flex flex-col gap-2">
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5">
                                                <Clock size={24} className="text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold">{mappedCourse.courseIncludes?.totalVideoHours || 0} Hours</p>
                                                <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Video Content</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5">
                                                <Download size={24} className="text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold">{mappedCourse.courseIncludes?.downloadableResources || 0} Files</p>
                                                <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Resources</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5">
                                                <InfinityIcon size={24} className="text-purple-400" />
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold">{mappedCourse.courseIncludes?.fullLifetimeAccess ? 'Lifetime' : 'Limited'}</p>
                                                <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Access</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5">
                                                <Award size={24} className="text-amber-400" />
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold">{mappedCourse.courseIncludes?.certificateOfCompletion ? 'Verified' : 'None'}</p>
                                                <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Certificate</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Learning Outcomes */}
                                {mappedCourse.whatYouWillLearn?.length > 0 && (
                                    <section>
                                        <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-slate-900">
                                            <div className="w-1.5 h-6 bg-sPrimary rounded-full"></div>
                                            What You Will Learn
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {mappedCourse.whatYouWillLearn.map((item, index) => (
                                                <div key={index} className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-200 transition-all group">
                                                    <div className="bg-emerald-50 text-emerald-600 p-1 rounded-full shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                                        <CheckCircle2 size={16} />
                                                    </div>
                                                    <span className="text-[15px] text-slate-700 font-medium leading-tight">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Curriculum */}
                                <section>
                                    <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-slate-900">
                                        <div className="w-1.5 h-6 bg-sPrimary rounded-full"></div>
                                        Curriculum Details
                                    </h3>
                                    <div className="space-y-4">
                                        {mappedCourse.modules.map((module, mIdx) => (
                                            <div key={module.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:border-sPrimary transition-all duration-300">
                                                <div className="p-5 flex items-center justify-between bg-slate-50/50 group-hover:bg-sPrimary/5 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-sPrimary shadow-sm group-hover:bg-sPrimary group-hover:text-white transition-all">
                                                            {mIdx + 1}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900 text-lg leading-tight">{module.title}</p>
                                                            <div className="flex items-center gap-3 mt-1 text-[10px] uppercase font-bold tracking-widest text-slate-400">
                                                                <span className="flex items-center gap-1"><BookOpen size={12} /> {module.lessons.length} Lessons</span>
                                                                {module.moduleDuration > 0 && (
                                                                    <span className="flex items-center gap-1"><Clock size={12} /> {Math.floor(module.moduleDuration / 60)}h {Math.floor(module.moduleDuration % 60)}m</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="divide-y divide-slate-100">
                                                    {module.lessons.map((lesson, lIdx) => (
                                                        <div key={lesson.id} className="px-6 py-4 flex items-center justify-between text-sm hover:bg-slate-50 transition-all cursor-default group/lesson">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-2 h-2 rounded-full bg-slate-300 group-hover/lesson:bg-sPrimary transition-colors"></div>
                                                                <span className="text-slate-700 font-medium group-hover/lesson:text-slate-900 transition-colors">{lesson.title}</span>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <span className="text-slate-400 font-mono text-xs group-hover/lesson:text-slate-600">
                                                                    {Math.floor(lesson.lessonDuration / 60)}:
                                                                    {Math.floor(lesson.lessonDuration % 60).toString().padStart(2, "0")}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </TabsContent>

                            <TabsContent value="resources" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 outline-none">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">
                                        <Download size={22} className="text-sPrimary" />
                                        Lesson Resources
                                    </h3>
                                    {activeLesson?.resources?.length > 0 && (
                                        <span className="text-xs font-medium text-slate-500">
                                            {activeLesson.resources.length} items available
                                        </span>
                                    )}
                                </div>

                                {activeLesson?.resources?.length > 0 ? (
                                    <div className="grid gap-4">
                                        {activeLesson.resources.map((res) => (
                                            <div
                                                key={res._id || res.id}
                                                className="group flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-6 hover:border-sPrimary hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl border border-blue-100 group-hover:bg-sPrimary group-hover:text-white transition-all duration-300">
                                                        <FileText size={28} />
                                                    </div>

                                                    <div>
                                                        <p className="text-lg font-bold text-slate-900 group-hover:text-sPrimary transition-colors">
                                                            {res.title || "Resource File"}
                                                        </p>
                                                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                                                            <Clock size={14} />
                                                            Lesson Material
                                                            {res.title?.split('.').length > 1 && (
                                                                <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-black uppercase">
                                                                    {res.title.split('.').pop()}
                                                                </span>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                <a
                                                    href={res.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-6 py-3 bg-sPrimary text-white text-sm font-bold rounded-xl hover:bg-sPrimary/90 shadow-lg shadow-sPrimary/20 active:scale-95 transition-all"
                                                >
                                                    <Download size={18} />
                                                    Download
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center shadow-inner">
                                        <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <FileText size={48} className="text-slate-300" />
                                        </div>
                                        <h4 className="font-bold text-xl text-slate-900 mb-2">No resources found</h4>
                                        <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">There are no additional downloadable materials attached to this specific lesson for review.</p>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>

                    </div>
                </div>

                {/* Right Area: Course Sidebar (Desktop) */}
                <aside className="w-96 border-l border-slate-200 bg-white hidden lg:flex flex-col h-full shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)]">
                    <div className="p-6 border-b border-slate-200 shrink-0 bg-slate-50/50">
                        <h3 className="font-bold text-lg text-slate-900">Course Content</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Modules & Lessons</p>
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
