"use client";
import React, { useState, use } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseSidebar from '../_components/CourseSidebar';
import CoursePlayerHeader from '../_components/CoursePlayerHeader';
import VideoPlayer from '../_components/VideoPlayer';
import LessonInfo from '../_components/LessonInfo';

// Mock Data matching Module/Lesson structure
const courseData = {
    title: "Strategic Leadership & Management",
    instructor: "Dr. Sarah Al-Maktoum",
    totalProgress: 25,
    modules: [
        {
            id: 1,
            title: "Foundations of Leadership",
            lessons: [
                { id: 101, title: "Introduction to Leadership", type: "video", duration: "05:20", status: "completed", videoUrl: "/placeholder-video.mp4" },
                { id: 102, title: "Ethics in the Workplace", type: "video", duration: "08:45", status: "completed", videoUrl: "/placeholder-video.mp4" },
                { id: 103, title: "Leadership Styles Guide", type: "pdf", size: "2.4 MB", status: "completed", fileUrl: "/files/guide.pdf" }
            ]
        },
        {
            id: 2,
            title: "Organizational Strategy",
            lessons: [
                { id: 201, title: "Mission vs Vision", type: "video", duration: "10:15", status: "completed", videoUrl: "/placeholder-video.mp4" },
                { id: 202, title: "Understanding Market Dynamics", type: "video", duration: "12:20", status: "in-progress", videoUrl: "/placeholder-video.mp4" },
                { id: 203, title: "SWOT Analysis Template", type: "pdf", size: "1.1 MB", status: "locked", fileUrl: "/files/template.xlsx" },
                { id: 204, title: "Global Expansion Strategies", type: "video", duration: "15:00", status: "locked", videoUrl: "/placeholder-video.mp4" }
            ]
        },
        {
            id: 3,
            title: "Execution & Delivery",
            lessons: [
                { id: 301, title: "Resource Allocation", type: "video", duration: "09:15", status: "locked", videoUrl: "/placeholder-video.mp4" }
            ]
        }
    ]
};

export default function CoursePlayerPage({ params }) {
    const { id } = use(params);
    // Find the first in-progress or first lesson to start
    const [activeLesson, setActiveLesson] = useState(courseData.modules[1].lessons[1]);
    const [activeModuleId, setActiveModuleId] = useState(courseData.modules[1].id);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Auto-expand module of active lesson
    const [expandedModules, setExpandedModules] = useState([1, 2]);

    const handleLessonSelect = (lesson, moduleId) => {
        if (lesson.status === 'locked') return;
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
                progress={courseData.totalProgress}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                sidebarProps={{
                    modules: courseData.modules,
                    activeLesson,
                    expandedModules,
                    toggleModule,
                    onLessonSelect: handleLessonSelect
                }}
            />

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Area: Content Player */}
                <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50">
                    <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">

                        <VideoPlayer activeLesson={activeLesson} />

                        <LessonInfo activeLesson={activeLesson} instructor={courseData.instructor} />

                        {/* Tabs content */}
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-4 mb-8 border-b border-slate-200 pb-1">
                                <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-sPrimary data-[state=active]:text-sPrimary px-4 py-2 font-bold bg-transparent shadow-none transition-all cursor-pointer">Overview</TabsTrigger>
                                <TabsTrigger value="resources" className="rounded-none border-b-2 border-transparent data-[state=active]:border-sPrimary data-[state=active]:text-sPrimary px-4 py-2 font-bold bg-transparent shadow-none transition-all cursor-pointer">Resources</TabsTrigger>
                                <TabsTrigger value="qa" className="rounded-none border-b-2 border-transparent data-[state=active]:border-sPrimary data-[state=active]:text-sPrimary px-4 py-2 font-bold bg-transparent shadow-none transition-all cursor-pointer">Q&A</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-lg mb-3">About this course</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        This course covers the fundamental concepts required for understanding the core topic. We will explore various examples and case studies to solidify your learning.
                                    </p>
                                </div>
                            </TabsContent>
                            <TabsContent value="resources" className="space-y-4">
                                <div className="text-slate-500 italic">No additional resources for this lesson.</div>
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
                            modules={courseData.modules}
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
