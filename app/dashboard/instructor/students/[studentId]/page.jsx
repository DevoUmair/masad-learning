"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import StudentInfoCard from '../_components/StudentInfoCard';
import StudentCoursesTable from '../_components/StudentCoursesTable';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function StudentDetailPage() {
    const params = useParams();
    const studentId = params?.studentId;

    // Mock Data for Student Detail (In a real app, fetch based on studentId)
    const student = {
        id: studentId,
        name: "Ahmed Hassan",
        email: "ahmed.hassan@example.com",
        joinedDate: "12 Jan, 2024",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
        coursesEnrolled: 3
    };

    const courses = [
        {
            id: 101,
            title: "Complete Python Bootcamp 2024",
            progress: 75,
            purchaseDate: "15 Jan, 2024",
            lastAccessed: "2 hours ago",
            totalChapters: 20,
            chaptersCompleted: 15
        },
        {
            id: 102,
            title: "Advanced React Patterns",
            progress: 10,
            purchaseDate: "10 Feb, 2024",
            lastAccessed: "1 day ago",
            totalChapters: 12,
            chaptersCompleted: 1
        },
        {
            id: 103,
            title: "UI/UX Design Masterclass",
            progress: 100,
            purchaseDate: "01 Jan, 2024",
            lastAccessed: "1 week ago",
            totalChapters: 8,
            chaptersCompleted: 8
        }
    ];

    return (
        <div className="space-y-6 font-lexend">
            <div>
                <Link href="/dashboard/instructor/students" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-4">
                    <ArrowLeft size={16} />
                    Back to Students
                </Link>
                <StudentInfoCard student={student} />
            </div>

            <StudentCoursesTable courses={courses} />
        </div>
    );
}
