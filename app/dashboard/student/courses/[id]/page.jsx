"use client";
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseSidebar from '../_components/CourseSidebar';
import CoursePlayerHeader from '../_components/CoursePlayerHeader';
import VideoPlayer from '../_components/VideoPlayer';
import LessonInfo from '../_components/LessonInfo';
import { useGetCourseByIdQuery } from '@/redux/course/courseApi';
import { useGetCourseProgressQuery } from '@/redux/student/studentAPi';
import { Loader2 } from 'lucide-react';
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
                                {activeLesson && (
                                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                                        <h3 className="font-bold text-xl mb-3 text-slate-900">{activeLesson.videoTitle || activeLesson.title || "Lesson Overview"}</h3>
                                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                            {activeLesson.lessonDescription || "No description provided for this lesson."}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-bold text-lg mb-3">About this course</h3>
                                    <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                        {courseData.description || "No description provided."}
                                    </p>
                                </div>
                            </TabsContent>
                            <TabsContent value="resources" className="space-y-4">
                                {activeLesson?.resources?.length > 0 ? (
                                    <div className="space-y-3">
                                        {activeLesson.resources.map((res, i) => (
                                            <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-sPrimary transition-colors cursor-pointer">
                                                <span>📄</span>
                                                <span className="text-sm font-medium">{res.filename || `Resource ${i + 1}`}</span>
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-slate-500 italic">No additional resources for this lesson.</div>
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
