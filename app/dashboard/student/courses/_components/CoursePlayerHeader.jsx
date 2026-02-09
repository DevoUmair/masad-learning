"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CourseSidebar from './CourseSidebar';

export default function CoursePlayerHeader({
    courseTitle,
    progress,
    mobileMenuOpen,
    setMobileMenuOpen,
    sidebarProps
}) {
    return (
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 md:px-6 shrink-0 z-20 relative">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/student/courses" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                    <ArrowLeft size={20} />
                    <span className="hidden md:inline font-medium">Back to Courses</span>
                </Link>
                {/* <div className="h-6 w-px bg-slate-200 hidden md:block" />
                <div>
                    <h1 className="text-sm md:text-lg font-bold text-slate-900 truncate max-w-[200px] md:max-w-md">
                        {courseTitle}
                    </h1>
                </div> */}
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end min-w-[150px]">
                    <div className="flex justify-between w-full text-xs font-bold mb-1">
                        <span className="text-slate-500 uppercase tracking-wider">Progress</span>
                        <span className="text-sPrimary">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2 w-full bg-slate-100" />
                </div>

                {/* Mobile Menu Trigger */}
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu size={24} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="p-0 w-80">
                        <CourseSidebar {...sidebarProps} />
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
