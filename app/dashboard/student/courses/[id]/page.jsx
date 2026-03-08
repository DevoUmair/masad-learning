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
                            <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-8 mb-8 border-b border-slate-200">
                                <TabsTrigger
                                    value="overview"
                                    className="relative rounded-none border-b-2 border-transparent data-[state=active]:bg-sPrimary data-[state=active]:text-white px-1 py-4 font-bold bg-transparent shadow-none transition-all cursor-pointer text-slate-500 hover:text-slate-700"
                                >
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger
                                    value="resources"
                                    className="relative rounded-none border-b-2 border-transparent data-[state=active]:bg-sPrimary data-[state=active]:text-white px-1 py-4 font-bold bg-transparent shadow-none transition-all cursor-pointer text-slate-500 hover:text-slate-700"
                                >
                                    Resources
                                    {activeLesson?.resources?.length > 0 && (
                                        <span className="ml-2 bg-sPrimary/10 text-sPrimary text-[10px] px-1.5 py-0.5 rounded-full">
                                            {activeLesson.resources.length}
                                        </span>
                                    )}
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-8 animate-in fade-in duration-500">
                                {activeLesson && (
                                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="bg-sPrimary/10 text-sPrimary p-2.5 rounded-xl">
                                                <BookOpen size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-sPrimary uppercase tracking-wider mb-0.5">Current Lesson</p>
                                                <h3 className="font-bold text-xl md:text-2xl text-slate-900 leading-tight">
                                                    {activeLesson.videoTitle || activeLesson.title || "Lesson Overview"}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="prose prose-slate max-w-none">
                                            <p className="text-slate-600 leading-relaxed text-[15px] md:text-base whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                                                {activeLesson.lessonDescription || "No description provided for this lesson."}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <div className="space-y-8">
                                    <section>
                                        <h3 className="font-bold text-xl mb-4 text-slate-900 flex items-center gap-2">
                                            <div className="w-1.5 h-6 bg-sPrimary rounded-full"></div>
                                            About this course
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed text-base whitespace-pre-wrap">
                                            {courseData.description || "No description provided."}
                                        </p>

                                        {/* Course Info Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                                                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Category</p>
                                                <p className="font-bold text-slate-900">{courseData.category?.name || "Not specified"}</p>
                                            </div>
                                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                                                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Level</p>
                                                <p className="font-bold text-slate-900">{courseData.level || "All Levels"}</p>
                                            </div>
                                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                                                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Instructor</p>
                                                <p className="font-bold text-slate-900 line-clamp-1">{courseData.instructor?.name || "Unknown"}</p>
                                                {courseData.instructor?.email && <p className="text-[10px] text-slate-400 font-medium truncate">{courseData.instructor.email}</p>}
                                            </div>
                                        </div>
                                    </section>

                                    {/* Course Includes */}
                                    <section className="bg-slate-900 p-8 rounded-3xl text-white">
                                        <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                                            What's included in Masad
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                                    <Clock size={20} className="text-blue-400" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-bold">{courseData.courseIncludes?.totalVideoHours || 0} Hours</p>
                                                    <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">On-demand Video</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                                    <Download size={20} className="text-emerald-400" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-bold">{courseData.courseIncludes?.downloadableResources || 0} Files</p>
                                                    <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Resources</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                                    <InfinityIcon size={20} className="text-purple-400" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-bold">{courseData.courseIncludes?.fullLifetimeAccess !== false ? 'Lifetime' : 'Limited'}</p>
                                                    <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Access</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                                    <Award size={20} className="text-amber-400" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-bold">{courseData.courseIncludes?.certificateOfCompletion !== false ? 'Verified' : 'None'}</p>
                                                    <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Certificate</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

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
                                        <section>
                                            <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-slate-900">
                                                <div className="w-1.5 h-6 bg-sPrimary rounded-full"></div>
                                                Curriculum Details
                                            </h3>
                                            <div className="space-y-4">
                                                {courseData.modules.map((module, mIdx) => (
                                                    <div key={module._id || module.id || mIdx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:border-sPrimary transition-colors">
                                                        <div className="p-5 flex items-center justify-between bg-slate-50/50 group-hover:bg-sPrimary/5 transition-colors">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-sPrimary shadow-sm">
                                                                    {mIdx + 1}
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-slate-900 text-lg leading-tight">{module.title}</p>
                                                                    <div className="flex items-center gap-3 mt-1 text-[10px] uppercase font-bold tracking-widest text-slate-400">
                                                                        <span className="flex items-center gap-1"><BookOpen size={12} /> {module.lessons?.length || 0} Lessons</span>
                                                                        {module.moduleDuration > 0 && (
                                                                            <span className="flex items-center gap-1"><Clock size={12} /> {Math.floor(module.moduleDuration / 60)}h {Math.floor(module.moduleDuration % 60)}m</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="divide-y divide-slate-100">
                                                            {module.lessons?.map((lesson, lIdx) => (
                                                                <div key={lesson._id || lesson.id || lIdx} className="px-6 py-4 flex items-center justify-between text-sm hover:bg-slate-50 transition-colors">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                                                        <span className="text-slate-700 font-medium">{lesson.lessonTitle || lesson.videoTitle || lesson.title}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-4">
                                                                        <span className="text-slate-400 font-mono text-xs">
                                                                            {Math.floor((lesson.lessonDuration || 0) / 60)}:
                                                                            {Math.floor((lesson.lessonDuration || 0) % 60).toString().padStart(2, "0")}
                                                                        </span>
                                                                        {completedLessonIds.includes(lesson._id || lesson.id) && (
                                                                            <CheckCircle2 size={16} className="text-emerald-500" />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    )}
                                </div>
                            </TabsContent>
                            <TabsContent value="resources" className="space-y-6 animate-in fade-in duration-500">
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
                                                className="group flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-5 hover:border-sPrimary hover:shadow-md transition-all duration-300"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="bg-blue-50 text-blue-600 p-3 rounded-xl border border-blue-100 group-hover:bg-sPrimary group-hover:text-white transition-colors">
                                                        <FileText size={24} />
                                                    </div>

                                                    <div>
                                                        <p className="text-base font-bold text-slate-900 group-hover:text-sPrimary transition-colors">
                                                            {res.title || "Resource File"}
                                                        </p>
                                                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                                            <Clock size={12} />
                                                            Added for this lesson
                                                            {/* Add file extension badge if available in title */}
                                                            {res.title?.split('.').length > 1 && (
                                                                <span className="ml-2 px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">
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
                                                    className="flex items-center gap-2 px-5 py-2.5 bg-sPrimary text-white text-sm font-bold rounded-xl hover:bg-sPrimary/90 shadow-sm hover:shadow-md transition-all"
                                                >
                                                    <Download size={16} />
                                                    Download
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
                                        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FileText size={32} className="text-slate-300" />
                                        </div>
                                        <h4 className="font-bold text-slate-900 mb-1">No resources found</h4>
                                        <p className="text-slate-500 text-sm max-w-xs mx-auto">There are no additional downloadable materials attached to this specific lesson.</p>
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
