"use client";
import React from 'react';
import { Card } from "@/components/ui/card";
import StudentHeader from './_components/StudentHeader';
import StudentToolbar from './_components/StudentToolbar';
import StudentListTable from './_components/StudentListTable';

export default function StudentProgressPage() {
    // Mock Data for Students
    const students = [
        {
            id: 1,
            name: "Ahmed Hassan",
            email: "ahmed.hassan@example.com",
            course: "Complete Python Bootcamp 2024",
            progress: 75,
            joinedDate: "12 Jan, 2024",
            lastActive: "2 hours ago",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed"
        },
        {
            id: 2,
            name: "Sarah Jenkins",
            email: "sarah.j@example.com",
            course: "UI Design Fundamentals",
            progress: 32,
            joinedDate: "15 Jan, 2024",
            lastActive: "1 day ago",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
        },
        {
            id: 3,
            name: "Mohammed Ali",
            email: "m.ali@example.com",
            course: "Introduction to AI Ethics",
            progress: 100,
            joinedDate: "20 Dec, 2023",
            lastActive: "5 days ago",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed"
        },
        {
            id: 4,
            name: "Emily Chen",
            email: "emily.c@example.com",
            course: "Professional Management 101",
            progress: 58,
            joinedDate: "02 Feb, 2024",
            lastActive: "Just now",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
        },
        {
            id: 5,
            name: "John Doe",
            email: "john.doe@example.com",
            course: "Do Django With Me",
            progress: 12,
            joinedDate: "10 Feb, 2024",
            lastActive: "3 days ago",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
        }
    ];

    return (
        <div className="space-y-6 font-lexend">
            <StudentHeader />

            <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <StudentToolbar />
                <StudentListTable students={students} />

                <div className="p-4 border-t border-slate-100 text-center text-sm text-slate-500">
                    <button className="hover:text-sPrimary font-medium cursor-pointer transition-colors">Load more students</button>
                </div>
            </Card>
        </div>
    );
}
