"use client";
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseSidebar from '../_components/CourseSidebar';
import CoursePlayerHeader from '../_components/CoursePlayerHeader';
import VideoPlayer from '../_components/VideoPlayer';
import LessonInfo from '../_components/LessonInfo';
import { useGetCourseByIdQuery } from '@/redux/course/courseApi';
import { useGetCourseProgressQuery } from '@/redux/student/studentAPi';
import { Loader2, PlayCircle, Clock, Download, Award, Infinity as InfinityIcon, CheckCircle2, BookOpen, FileText } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function CoursePlayerPage() {
    const { id } = useParams();
    const { data: responseData, isLoading: isCourseLoading, error: courseError } = useGetCourseByIdQuery(id);
    const { data: progressData, isLoading: isProgressLoading } = useGetCourseProgressQuery(id);

    const courseData = responseData?.course || responseData;
    const progress = progressData?.progress;

    const completedLessonIds = progress?.completedLessons?.map(l => l.lessonId) || [];
    const totalProgress = progress?.completionPercentage || 0;

    const [activeLesson, setActiveLesson] = useState(null);
    const [activeModuleId, setActiveModuleId] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedModules, setExpandedModules] = useState([]);

    useEffect(() => {
        if (courseData?.modules?.length > 0 && !activeLesson) {
            // Flatten lessons to find the first locked/uncompleted lesson
            const allLessons = [];
            courseData.modules.forEach(m => {
                m.lessons?.forEach(l => {
                    allLessons.push({ lesson: l, moduleId: m._id || m.id });
                });
            });

            // Find first lesson NOT in completedLessonIds
            let target = allLessons.find(l => !completedLessonIds.includes(l.lesson._id || l.lesson.id));
            if (!target) target = allLessons[allLessons.length - 1]; // or the very last one if all completed

            if (target) {
                setActiveLesson(target.lesson);
                setActiveModuleId(target.moduleId);
                setExpandedModules([target.moduleId]);
            } else if (courseData.modules[0]?.lessons?.length > 0) {
                // Absolute fallback
                const first = courseData.modules[0];
                setActiveLesson(first.lessons[0]);
                setActiveModuleId(first._id || first.id);
                setExpandedModules([first._id || first.id]);
            }
        }
    }, [courseData, activeLesson, completedLessonIds.length]);

    if (isCourseLoading || isProgressLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-50">
                <Loader2 size={48} className="animate-spin text-sPrimary" />
            </div>
        );
    }

    if (courseError || !courseData) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-50 flex-col gap-4">
                <p className="text-red-500 font-bold text-xl">Error loading course</p>
                <p className="text-slate-500">{courseError?.data?.message || 'The course could not be found.'}</p>
            </div>
        );
    }

    const handleLessonSelect = (lesson, moduleId) => {
        setActiveLesson(lesson);
        setActiveModuleId(moduleId);
        setMobileMenuOpen(false); // Close mobile menu on selection
    };

    const toggleModule = (moduleId) => {
        setExpandedModules(prev =>
            prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
        );
    };

    return (
        <div className="flex flex-col h-screen bg-white font-lexend overflow-hidden">
            <CoursePlayerHeader
                courseTitle={courseData.title}
                progress={totalProgress}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                sidebarProps={{
                    modules: courseData.modules || [],
                    activeLesson,
                    expandedModules,
                    toggleModule,
                    onLessonSelect: handleLessonSelect,
                    completedLessonIds
                }}
            />

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Area: Content Player */}
                <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50">
                    <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">

                        <VideoPlayer
                            activeLesson={activeLesson}
                            thumbnailUrl={courseData.thumbnailImage?.url}
                        />

                        <LessonInfo
                            courseId={id}
                            activeLesson={activeLesson}
                            instructor={courseData.instructor}
                            completedLessonIds={completedLessonIds}
                        />

                        {/* Tabs content */}
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-4 mb-8 border-b border-slate-200 pb-1">
                                <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-sPrimary data-[state=active]:text-sPrimary px-4 py-2 font-bold bg-transparent shadow-none transition-all cursor-pointer">Overview</TabsTrigger>
                                <TabsTrigger value="resources" className="rounded-none border-b-2 border-transparent data-[state=active]:border-sPrimary data-[state=active]:text-sPrimary px-4 py-2 font-bold bg-transparent shadow-none transition-all cursor-pointer">Resources</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-6">
                                {/* {activeLesson && (
                                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                                        <h3 className="font-bold text-xl mb-3 text-slate-900">{activeLesson.videoTitle || activeLesson.title || "Lesson Overview"}</h3>
                                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                            {activeLesson.lessonDescription || "No description provided for this lesson."}
                                        </p>
                                    </div>
                                )} */}
                                {activeLesson && (
                                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">

                                        {/* Header */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 16V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h12l4 4z" />
                                                </svg>
                                            </div>

                                            <h3 className="font-semibold text-xl md:text-2xl text-slate-900">
                                                {activeLesson.videoTitle || activeLesson.title || "Lesson Overview"}
                                            </h3>
                                        </div>

                                        {/* Divider */}
                                        <div className="h-px bg-slate-200 mb-4"></div>

                                        {/* Description */}
                                        <p className="text-slate-600 leading-relaxed text-[15px] md:text-base whitespace-pre-line">
                                            {activeLesson.lessonDescription || "No description provided for this lesson."}
                                        </p>

                                    </div>
                                )}
                                <div>
                                    <h3 className="font-bold text-lg mb-3">About this course</h3>
                                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap mb-6">
                                        {courseData.description || "No description provided."}
                                    </p>

                                    {/* Course Info Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Category</p>
                                            <p className="font-semibold text-slate-900">{courseData.category?.name || "Not specified"}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Level</p>
                                            <p className="font-semibold text-slate-900">{courseData.level || "All Levels"}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Instructor</p>
                                            <p className="font-semibold text-slate-900">{courseData.instructor?.name || "Unknown"}</p>
                                            {courseData.instructor?.email && <p className="text-xs text-slate-500 mt-0.5">{courseData.instructor.email}</p>}
                                        </div>
                                    </div>

                                    {/* Course Includes */}
                                    <div className="pt-6 mt-6 border-t border-slate-200">
                                        <h3 className="font-bold text-lg mb-4">Course Includes</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-xl border border-blue-100">
                                                <Clock size={20} className="text-blue-600 shrink-0" />
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{courseData.courseIncludes?.totalVideoHours || 0} Hours</p>
                                                    <p className="text-xs text-slate-500">Video Content</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 bg-green-50 p-3 rounded-xl border border-green-100">
                                                <Download size={20} className="text-green-600 shrink-0" />
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{courseData.courseIncludes?.downloadableResources || 0} Files</p>
                                                    <p className="text-xs text-slate-500">Resources</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-xl border border-purple-100">
                                                <InfinityIcon size={20} className="text-purple-600 shrink-0" />
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{courseData.courseIncludes?.fullLifetimeAccess !== false ? 'Yes' : 'No'}</p>
                                                    <p className="text-xs text-slate-500">Lifetime Access</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-xl border border-amber-100">
                                                <Award size={20} className="text-amber-600 shrink-0" />
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{courseData.courseIncludes?.certificateOfCompletion !== false ? 'Yes' : 'No'}</p>
                                                    <p className="text-xs text-slate-500">Certificate</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* What You Will Learn */}
                                    {courseData.whatYouWillLearn?.length > 0 && (
                                        <div className="pt-6 mt-6 border-t border-slate-200">
                                            <h3 className="font-bold text-lg mb-4">What You Will Learn</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {courseData.whatYouWillLearn.map((item, index) => (
                                                    <div key={index} className="flex items-start gap-2.5 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                                                        <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                                                        <span className="text-sm text-slate-700">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Module Overview */}
                                    {courseData.modules?.length > 0 && (
                                        <div className="pt-6 mt-6 border-t border-slate-200">
                                            <h3 className="font-bold text-lg mb-4">Curriculum Overview</h3>
                                            <div className="space-y-3">
                                                {courseData.modules.map((module, mIdx) => (
                                                    <div key={module._id || module.id || mIdx} className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                                                        <div className="p-4 flex items-center justify-between">
                                                            <div>
                                                                <p className="font-bold text-slate-900">Module {mIdx + 1}: {module.title}</p>
                                                                {module.description && <p className="text-xs text-slate-500 mt-1">{module.description}</p>}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                                <BookOpen size={14} />
                                                                <span>{module.lessons?.length || 0} lessons</span>
                                                                {module.moduleDuration > 0 && (
                                                                    <>
                                                                        <span>•</span>
                                                                        <Clock size={14} />
                                                                        <span>
                                                                            {Math.floor(module.moduleDuration / 60)}:
                                                                            {Math.floor(module.moduleDuration % 60).toString().padStart(2, "0")}
                                                                        </span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="border-t border-slate-100">
                                                            {module.lessons?.map((lesson, lIdx) => (
                                                                <div key={lesson._id || lesson.id || lIdx} className="px-4 py-2.5 flex items-center justify-between text-sm border-b border-slate-50 last:border-b-0 hover:bg-slate-100/50 transition-colors">
                                                                    <div className="flex items-center gap-2">
                                                                        <PlayCircle size={14} className="text-blue-500 shrink-0" />
                                                                        <span className="text-slate-700">{lesson.lessonTitle || lesson.videoTitle || lesson.title}</span>
                                                                    </div>
                                                                    <span className="text-slate-400 text-xs">
                                                                        {Math.floor((lesson.lessonDuration || 0) / 60)}:
                                                                        {Math.floor((lesson.lessonDuration || 0) % 60).toString().padStart(2, "0")}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                            <TabsContent value="resources" className="space-y-4">
                                {activeLesson?.resources?.length > 0 ? (
                                    <div className="grid gap-3">
                                        {activeLesson.resources.map((res) => (
                                            <div
                                                key={res._id || res.id}
                                                className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-red-50 text-red-600 p-2.5 rounded-lg border border-red-100">
                                                        <FileText size={20} />
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900">
                                                            {res.title || "Resource File"}
                                                        </p>
                                                        <p className="text-xs text-slate-500">
                                                            Lesson Material
                                                        </p>
                                                    </div>
                                                </div>

                                                <a
                                                    href={res.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-sPrimary text-xs font-bold rounded-lg border border-slate-200 transition-colors"
                                                >
                                                    <Download size={14} />
                                                    View / Download
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-8 text-center">
                                        <p className="text-slate-500 italic text-sm">No additional resources are attached to this lesson.</p>
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
                            modules={courseData.modules || []}
                            activeLesson={activeLesson}
                            expandedModules={expandedModules}
                            toggleModule={toggleModule}
                            onLessonSelect={handleLessonSelect}
                            completedLessonIds={completedLessonIds}
                        />
                    </div>
                </aside>
            </div>
        </div>
    );
}
