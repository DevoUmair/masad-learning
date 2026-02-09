"use client";
import React, { use, useState } from 'react';
import { ArrowLeft, BookOpen, Clock, FileText, PlayCircle, Users, Star, BarChart3, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Mock Data
const courseDetails = {
    id: 101,
    title: "Strategic Leadership & Management",
    instructor: "Dr. Sarah Al-Maktoum",
    students: 1205,
    rating: 4.8,
    price: "$49.99",
    totalRevenue: "$60,230",
    status: "Published",
    lastUpdated: "Oct 24, 2023",
    description: "This course covers the essential strategies for effective leadership in modern organizations. Students will learn about team dynamics, conflict resolution, and strategic decision making.",
    modules: [
        {
            title: "Module 1: Foundations of Leadership",
            duration: "45 mins",
            lessons: [
                { title: "Introduction to Leadership", type: "video", duration: "10:00" },
                { title: "Leadership Styles", type: "video", duration: "15:30" },
                { title: "Case Study: Great Leaders", type: "pdf", size: "2.5 MB" }
            ]
        },
        {
            title: "Module 2: Team Dynamics",
            duration: "1 hr 20 mins",
            lessons: [
                { title: "Building High-Performance Teams", type: "video", duration: "12:45" },
                { title: "Conflict Resolution Strategies", type: "video", duration: "20:00" },
                { title: "Team Culture Assessment", type: "pdf", size: "1.2 MB" },
                { title: "Remote Team Management", type: "video", duration: "18:00" }
            ]
        },
        {
            title: "Module 3: Strategic Decision Making",
            duration: "55 mins",
            lessons: [
                { title: "Data-Driven Decisions", type: "video", duration: "15:00" },
                { title: "Risk Management", type: "video", duration: "25:00" },
                { title: "Decision Frameworks", type: "pdf", size: "3.0 MB" }
            ]
        }
    ]
};

const ModuleItem = ({ module }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border border-slate-200 rounded-lg bg-white overflow-hidden mb-4">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-slate-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-md text-slate-700">
                        <BookOpen size={18} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm">{module.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{module.lessons.length} Lessons • {module.duration}</p>
                    </div>
                </div>
                {isOpen ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t border-slate-100 bg-slate-50/50">
                <div className="p-2 space-y-1">
                    {module.lessons.map((lesson, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-slate-600 p-3 rounded-md hover:bg-white hover:shadow-sm transition-all ml-4 border-l-2 border-transparent hover:border-sPrimary">
                            {lesson.type === 'video' ? <PlayCircle size={16} className="text-sPrimary" /> : <FileText size={16} className="text-orange-500" />}
                            <span className="flex-1 font-medium">{lesson.title}</span>
                            {lesson.duration && <span className="text-xs text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded">{lesson.duration}</span>}
                            {lesson.size && <span className="text-xs text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded">{lesson.size}</span>}
                        </div>
                    ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default function CourseDetailsPage({ params }) {
    const { id, courseId } = use(params);

    return (
        <div className="p-8 space-y-8 font-lexend max-w-5xl mx-auto">

            {/* Header */}
            <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                    <Link href={`/dashboard/admin/instructor/${id}`} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors mt-1">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs font-normal border-slate-200">Course ID: {courseId}</Badge>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">Published</Badge>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 leading-tight mb-2">
                            {courseDetails.title}
                        </h1>
                        <p className="text-slate-500 text-lg">Instructor: <span className="font-bold text-slate-700">{courseDetails.instructor}</span></p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4 flex flex-col gap-1 items-center text-center">
                            <Users size={20} className="text-sPrimary mb-1" />
                            <span className="text-slate-500 text-xs font-bold uppercase">Students</span>
                            <span className="text-xl font-bold text-slate-900">{courseDetails.students}</span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 flex flex-col gap-1 items-center text-center">
                            <Star size={20} className="text-yellow-500 mb-1" />
                            <span className="text-slate-500 text-xs font-bold uppercase">Rating</span>
                            <span className="text-xl font-bold text-slate-900">{courseDetails.rating}</span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 flex flex-col gap-1 items-center text-center">
                            <BarChart3 size={20} className="text-green-600 mb-1" />
                            <span className="text-slate-500 text-xs font-bold uppercase">Revenue</span>
                            <span className="text-xl font-bold text-slate-900">{courseDetails.totalRevenue}</span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 flex flex-col gap-1 items-center text-center">
                            <Clock size={20} className="text-blue-500 mb-1" />
                            <span className="text-slate-500 text-xs font-bold uppercase">Last Updated</span>
                            <span className="text-xl font-bold text-slate-900 text-sm mt-1">{courseDetails.lastUpdated}</span>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Curriculum */}
            <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <BookOpen size={20} /> Course Curriculum
                </h2>
                <div>
                    {courseDetails.modules.map((module, idx) => (
                        <ModuleItem key={idx} module={module} />
                    ))}
                </div>
            </div>

        </div>
    );
}
