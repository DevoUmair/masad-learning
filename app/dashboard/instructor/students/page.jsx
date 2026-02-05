"use client";
import React from 'react';
import { Search, Filter, Mail, Calendar, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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
            <div>
                <h1 className="text-2xl font-black text-slate-900">Student Progress</h1>
                <p className="text-slate-500 text-sm mt-1">Track student engagement and course completion rates</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search students or courses..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sPrimary focus:ring-1 focus:ring-sPrimary transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Button variant="outline" className="flex items-center gap-2 border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
                            <Filter size={16} />
                            Filter Status
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Course</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-[25%]">Progress</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Active</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {students.map((student) => (
                                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={student.avatar}
                                                alt={student.name}
                                                className="size-10 rounded-full bg-slate-100"
                                            />
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{student.name}</p>
                                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                                    <Mail size={12} />
                                                    {student.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm font-medium text-slate-700">{student.course}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className={`font-bold ${student.progress === 100 ? 'text-green-600' : 'text-slate-700'}`}>
                                                    {student.progress}%
                                                </span>
                                                {student.progress === 100 && (
                                                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 rounded-full font-bold">COMPLETED</span>
                                                )}
                                            </div>
                                            <Progress value={student.progress} className="h-2 bg-slate-100" />
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <Calendar size={14} className="text-slate-400" />
                                            {student.joinedDate}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <div className={`size-2 rounded-full ${student.lastActive === 'Just now' ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
                                            {student.lastActive}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-slate-100 text-center text-sm text-slate-500">
                    <button className="hover:text-sPrimary font-medium cursor-pointer transition-colors">Load more students</button>
                </div>
            </div>
        </div>
    );
}
