"use client";
import React, { useState, use, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayCircle } from 'lucide-react';
import CourseSidebar from '../../../student/courses/_components/CourseSidebar';
import LessonInfo from '../../../student/courses/_components/LessonInfo';
import BunnyVideo from '@/app/_components/BunnyVideo';
import { useGetCoursesQuery } from '@/redux/course/courseApi';
import { useRouter } from 'next/navigation';

export default function AdminCourseDetailsPage({ params }) {
    const { id } = use(params);
    const { data: coursesData, isLoading } = useGetCoursesQuery();
    const router = useRouter();

    const [activeLesson, setActiveLesson] = useState(null);
    const [activeModuleId, setActiveModuleId] = useState(null);
    const [expandedModules, setExpandedModules] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // Filter course and map data
    const apiCourse = coursesData?.courses?.find(c => c._id === id);

    const [mappedCourse, setMappedCourse] = useState(null);

    useEffect(() => {
        if (apiCourse) {
            const mappedModules = apiCourse.modules.map((m, index) => ({
                id: m._id,
                title: m.title,
                lessons: m.lessons.map(l => ({
                    id: l._id,
                    title: l.videoTitle,
                    type: l.videoId ? 'video' : 'pdf', // simplistic assumption
                    duration: l.duration ? `${l.duration} min` : '00:00',
                    status: 'completed', // allow admin to view all
                    videoId: l.videoId,
                    libraryId: l.libraryId,
                    resources: l.resources
                }))
            }));

            setMappedCourse({
                title: apiCourse.title,
                instructor: apiCourse.instructor?.name || "Unknown",
                description: apiCourse.description,
                category: apiCourse.category?.name || "Uncategorized", // Accessing populated category
                courseIncludes: apiCourse.courseIncludes || { totalVideoHours: 0, downloadableResources: 0 },
                modules: mappedModules,
                thumbnailImage: apiCourse.thumbnailImage?.url,
                totalProgress: 100 // Admin has full access
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
            <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 md:px-6 shrink-0 z-20 relative">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">
                        <span className="inline font-medium text-sm md:text-base">← Back to Courses</span>
                    </button>
                    <div className="h-6 w-px bg-slate-200 hidden md:block" />
                    <div>
                        <h1 className="text-sm md:text-lg font-bold text-slate-900 truncate max-w-[200px] md:max-w-md">
                            {mappedCourse.title}
                        </h1>
                    </div>
                </div>
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

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Category</p>
                                            <p className="font-semibold text-slate-900">{mappedCourse.category || "Not specified"}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Total Video Content</p>
                                            <p className="font-semibold text-slate-900">{mappedCourse.courseIncludes?.totalVideoHours || 0} Hours</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Downloadable Resources</p>
                                            <p className="font-semibold text-slate-900">{mappedCourse.courseIncludes?.downloadableResources || 0} Files</p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="resources" className="space-y-4">
                                {activeLesson?.resources?.length > 0 ? (
                                    <ul className="list-disc pl-5">
                                        {activeLesson.resources.map(res => (
                                            <li key={res._id || Math.random()} className="text-slate-700 py-1">{res.title || "Resource"}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-slate-500 italic">No additional resources are attached to this lesson.</div>
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
        </div>
    );
}
