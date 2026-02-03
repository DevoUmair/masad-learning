"use client";
import React, { useState } from 'react';
import { ArrowLeft, Bell, ChevronDown, CheckCircle, PlayCircle, Lock, Download, FileText, User, Languages, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock Data
const sections = [
    {
        id: 1,
        title: "Section 1: Foundations",
        progress: "100% Done",
        lessons: [
            { id: "1.1", title: "1.1 Introduction to Leadership", duration: "05:20", status: "completed" },
            { id: "1.2", title: "1.2 Ethics in the Workplace", duration: "08:45", status: "completed" }
        ]
    },
    {
        id: 2,
        title: "Section 2: Strategy",
        progress: "2 of 8 Completed",
        lessons: [
            { id: "2.1", title: "2.1 Mission vs Vision", duration: "10:15", status: "completed" },
            { id: "2.4", title: "2.4 Market Dynamics", duration: "12:20", status: "playing" },
            { id: "2.5", title: "2.5 Competitive Analysis", duration: "15:00", status: "locked" }, // Changed from 'upcoming' to 'locked' visually
            { id: "2.6", title: "2.6 Global Expansion", duration: "18:30", status: "locked" }
        ]
    },
    {
        id: 3,
        title: "Section 3: Execution",
        progress: "",
        isLocked: true,
        lessons: [
            { id: "3.1", title: "3.1 Resource Allocation", duration: "09:15", status: "locked" }
        ]
    }
];

export default function CoursePlayerPage({ params }) {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-backgroundDark overflow-hidden">
            {/* Header */}
            <header className="h-16 border-b border-slate-200 dark:border-gray-800 bg-white dark:bg-backgroundDark flex items-center justify-between px-6 shrink-0 z-10 relative">
                <div className="flex items-center gap-6">
                    <Link href="/dashboard/student/courses" className="flex items-center gap-2 text-sPrimary font-bold hover:underline">
                        <ArrowLeft size={20} /> Back
                    </Link>
                    <div className="h-8 w-px bg-slate-200 dark:bg-gray-700" />
                    <div>
                        <h1 className="text-xl font-bold text-sPrimary dark:text-white leading-tight">Strategic Leadership & Management</h1>
                        <p className="text-xs text-sSecondary">Module 2: Organizational Strategy</p>
                    </div>
                </div>

                {/* <div className="flex items-center gap-6"> */}
                <div className="hidden md:flex flex-col items-end min-w-[200px]">
                    <div className="flex justify-between w-full text-xs font-bold mb-1">
                        <span className="text-sSecondary uppercase tracking-wider">Course Progress</span>
                        <span className="text-sPrimary">25%</span>
                    </div>
                    <Progress value={25} className="h-2 w-full bg-slate-100" />
                </div>

                {/* </div> */}
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Area: Video & Tabs */}
                <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50 dark:bg-black/20">
                    <div className="p-6 md:p-8 max-w-5xl mx-auto w-full">

                        {/* Video Player Placeholder */}
                        <div className="aspect-video bg-black rounded-2xl shadow-lg relative overflow-hidden group mb-6">
                            {/* Mock Video UI */}
                            <div className="absolute inset-0 flex items-center justify-center bg-[url('/video-thumb.jpg')] bg-cover bg-center">
                                <div className="bg-black/30 absolute inset-0 group-hover:bg-black/40 transition-colors" />
                                <div className="h-16 w-16 bg-sPrimary rounded-full flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-transform cursor-pointer">
                                    <PlayCircle size={32} fill="white" />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                                <div className="h-full w-1/3 bg-sPrimary" />
                            </div>
                        </div>

                        {/* Title & Action */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                                    2.4 Understanding Market Dynamics
                                </h2>
                                <p className="text-sSecondary text-sm">Duration: 12 minutes • Posted on Oct 24, 2023</p>
                            </div>
                            {/* <Button className="bg-sPrimary hover:bg-sPrimary/90 text-white font-bold gap-2 px-6">
                                <CheckCircle size={18} /> Mark as Complete
                            </Button> */}
                        </div>

                        {/* Tabs content */}
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-4 mb-8">
                                {[
                                    { label: "Overview", value: "overview" },
                                    { label: "Resources", value: "resources", count: 4 },
                                    { label: "My Notes", value: "notes" },
                                    { label: "Reviews", value: "reviews" }
                                ].map((tab) => (
                                    <TabsTrigger
                                        key={tab.value}
                                        value={tab.value}
                                        className="rounded-full border cursor-pointer  border-slate-200 dark:border-gray-700 data-[state=active]:bg-sPrimary data-[state=active]:text-white data-[state=active]:border-sPrimary px-6 py-2.5 font-bold bg-transparent shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-gray-800"
                                    >
                                        {tab.label}
                                        {tab.count && <span className="ml-2 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 text-[10px] px-2 py-0.5 rounded-full group-data-[state=active]:bg-white/20 group-data-[state=active]:text-white">{tab.count}</span>}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <TabsContent value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div>
                                    <h3 className="font-bold text-lg mb-3">About this lesson</h3>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                                        In this session, we dive deep into the forces that shape industrial landscapes. We will explore Porter's Five Forces,
                                        SWOT analysis in a digital age, and how to identify blue ocean opportunities in a red ocean market. This lesson is
                                        fundamental for anyone looking to transition into a senior strategic role within the organization.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-slate-100 dark:border-gray-700 flex items-center gap-4">
                                        <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-sPrimary">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-sSecondary uppercase font-bold">Instructor</p>
                                            <p className="font-bold text-slate-900 dark:text-white">Dr. Sarah Al-Maktoum</p>
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-slate-100 dark:border-gray-700 flex items-center gap-4">
                                        <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-sPrimary">
                                            <Languages size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-sSecondary uppercase font-bold">Subtitles</p>
                                            <p className="font-bold text-slate-900 dark:text-white">English, Arabic, French</p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="resources" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h3 className="font-bold text-lg mb-2">Attached Resources</h3>
                                {[
                                    { title: "Market Dynamics Framework.pdf", size: "2.4 MB" },
                                    { title: "SWOT Analysis Template.xlsx", size: "1.1 MB" },
                                    { title: "Case Study: Tesla's Global Expansion.pdf", size: "3.8 MB" },
                                    { title: "Lecture Slides - Week 2.pptx", size: "5.2 MB" }
                                ].map((file, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-xl hover:shadow-sm transition-shadow">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">{file.title}</p>
                                                <p className="text-xs text-sSecondary">{file.size}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-sPrimary hover:text-sPrimary hover:bg-sPrimary/10">
                                            <Download size={18} />
                                        </Button>
                                    </div>
                                ))}
                            </TabsContent>

                            <TabsContent value="notes" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className="space-y-4">
                                    <h3 className="font-bold text-lg">My Notes</h3>
                                    <textarea
                                        className="w-full h-32 p-4 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 resize-none focus:ring-2 focus:ring-sPrimary/20 focus:border-sPrimary outline-none transition-all placeholder:text-slate-400"
                                        placeholder="Type your notes here... (e.g. timestamp 04:20 - Key definition of market share)"
                                    />
                                    <div className="flex justify-end">
                                        <Button className="bg-sPrimary text-white font-bold">Save Note</Button>
                                    </div>
                                </div>
                                <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-gray-800">
                                    <h4 className="font-bold text-sm text-sSecondary uppercase">Saved Notes</h4>
                                    <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-xl border border-yellow-100 dark:border-yellow-900/20">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-xs font-bold text-yellow-700 dark:text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 rounded">05:23</span>
                                            <span className="text-xs text-slate-400">Oct 25, 2023</span>
                                        </div>
                                        <p className="text-slate-700 dark:text-slate-300 text-sm">Remember that Porter's Five Forces model is static; it doesn't account for dynamic market changes over time.</p>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="reviews" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h3 className="font-bold text-lg mb-4">Student Reviews</h3>
                                {[
                                    { name: "Khalid Al-Mansoor", rating: 5, time: "2 days ago", text: "Excellent explanation of market dynamics. The case studies were very relevant to the local context." },
                                    { name: "Sarah Johnson", rating: 4, time: "1 week ago", text: "Great content, but I wish there were more interactive quizzes in this section." }
                                ].map((review, i) => (
                                    <div key={i} className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-slate-100 dark:border-gray-700">
                                        <Avatar className="h-10 w-10 border border-slate-200">
                                            <AvatarFallback>{review.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-bold text-sm text-slate-900 dark:text-white">{review.name}</p>
                                                <span className="text-xs text-slate-400">• {review.time}</span>
                                            </div>
                                            <div className="flex text-yellow-400 mb-2">
                                                {[...Array(5)].map((_, j) => (
                                                    <span key={j} className={j < review.rating ? "fill-current" : "text-slate-200 dark:text-gray-700"}>★</span>
                                                ))}
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">{review.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </TabsContent>
                        </Tabs>

                    </div>
                </div>

                {/* Right Area: Course Sidebar */}
                <aside className="w-96 border-l border-slate-200 dark:border-gray-800 bg-white dark:bg-backgroundDark flex flex-col hidden lg:flex">
                    <div className="p-5 border-b border-slate-200 dark:border-gray-800">
                        <h3 className="font-bold text-lg">Course Content</h3>
                        <p className="text-xs text-sSecondary mt-1">24 lessons • 6h 45m total</p>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <ContentSidebar sections={sections} />
                    </div>

                    <div className="p-4 border-t border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-900">
                        <Button variant="outline" className="w-full gap-2 font-bold bg-white">
                            <Download size={16} /> Download Course Guide
                        </Button>
                    </div>

                </aside>
            </div>
        </div>
    );
}

// Extracted Sidebar Component for cleaner state management
import { motion, AnimatePresence } from "framer-motion";

function ContentSidebar({ sections }) {
    const [openSections, setOpenSections] = useState([1]); // Default first section open

    const toggleSection = (id) => {
        setOpenSections(prev =>
            prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
        );
    };

    return (
        <div className="flex flex-col">
            {sections.map((section) => {
                const isOpen = openSections.includes(section.id);
                return (
                    <div key={section.id} className="border-b border-slate-100 dark:border-gray-800/50 last:border-none">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full px-5 py-4 bg-slate-50/50 dark:bg-gray-900/20 flex justify-between items-center hover:bg-slate-100 dark:hover:bg-gray-900/40 transition-colors"
                        >
                            <span className="text-xs font-bold uppercase tracking-wider text-sPrimary text-left">{section.title}</span>
                            <div className="flex items-center gap-3">
                                {section.id === 3 && <Lock size={14} className="text-slate-400" />}
                                {section.progress && <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-medium">{section.progress}</span>}
                                <ChevronDown
                                    size={16}
                                    className={cn("text-slate-400 transition-transform duration-300", isOpen ? "rotate-180" : "")}
                                />
                            </div>
                        </button>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="flex flex-col border-t border-slate-100 dark:border-gray-800/50">
                                        {section.lessons.map((lesson) => (
                                            <button
                                                key={lesson.id}
                                                className={cn(
                                                    "flex items-start gap-3 px-5 py-3 hover:bg-slate-50 transition-colors text-left group border-l-4 border-transparent",
                                                    lesson.status === 'playing' ? "bg-blue-50/50 hover:bg-blue-50 border-l-sPrimary" : ""
                                                )}
                                            >
                                                <div className="mt-0.5 shrink-0">
                                                    {lesson.status === 'completed' && <div className="size-5 rounded-full bg-green-100 flex items-center justify-center text-green-600"><Check size={12} strokeWidth={3} /></div>}
                                                    {lesson.status === 'playing' && <div className="size-5 rounded-full bg-blue-100 flex items-center justify-center text-sPrimary"><PlayCircle size={12} fill="currentColor" className="text-sPrimary" /></div>}
                                                    {(lesson.status === 'locked' || lesson.status === 'upcoming') && <div className="size-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><Lock size={12} /></div>}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={cn("text-sm font-medium truncate", lesson.status === 'playing' ? "text-sPrimary font-bold" : "text-slate-700 dark:text-slate-300")}>
                                                        {lesson.title}
                                                    </p>
                                                    <p className={cn("text-xs mt-0.5", lesson.status === 'playing' ? "text-sPrimary" : "text-sSecondary")}>
                                                        {lesson.status === 'playing' ? 'Playing' : lesson.duration}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
