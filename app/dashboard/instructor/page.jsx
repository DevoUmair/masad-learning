"use client";
import React from 'react';
import { Users, Banknote, Star, Search, PenLine, Book, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import StatCard from './_components/StatCard';
import CourseRow from './_components/CourseRow';

export default function InstructorDashboard() {
    return (
        <div className="space-y-8 font-lexend">
            <div>
                <h1 className="text-3xl font-black text-slate-900">Instructor Dashboard</h1>
                <p className="text-slate-500 mt-1">Manage your educational content and track student success.</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="TOTAL STUDENTS"
                    value="1,240"
                    trend="+12% from last month"
                    icon={Users}
                    iconColor="text-blue-600"
                    iconBg="bg-blue-50"
                    trendColor="text-green-600"
                />
                <StatCard
                    label="TOTAL REVENUE (AED)"
                    value="45,200"
                    trend="+8.4% growth"
                    icon={Banknote}
                    iconColor="text-green-600"
                    iconBg="bg-green-50"
                    trendColor="text-green-600"
                />
                <StatCard
                    label="AVERAGE RATING"
                    value="4.8"
                    trend="+0.2 from 4.6 avg"
                    icon={Star}
                    iconColor="text-yellow-500"
                    iconBg="bg-yellow-50"
                    trendColor="text-green-600"
                />
            </div>

            {/* Courses Section */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                {/* Header & Controls */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">Recent Courses</h2>
                    <Link href="/dashboard/instructor/courses" className="text-sm font-bold text-sPrimary hover:text-blue-700 transition-colors">
                        View All Courses
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Course Name</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Enrollees</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue (AED)</th>
                                {/* <th className="text-right py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <CourseRow
                                title="Professional Management 101"
                                updated="Updated 2 days ago"
                                category="Business"
                                status="Published"
                                enrollees="842"
                                revenue="22,400"
                                icon={Book}
                                color="bg-blue-100 text-blue-600"
                            />
                            <CourseRow
                                title="Introduction to AI Ethics"
                                updated="Created 1 week ago"
                                category="Technology"
                                status="Draft"
                                enrollees="0"
                                revenue="0"
                                icon={Book} // Using generic book icon, ideally use distinct ones
                                color="bg-indigo-100 text-indigo-600"
                            />
                            <CourseRow
                                title="UI Design Fundamentals"
                                updated="Updated 5 hours ago"
                                category="Design"
                                status="Published"
                                enrollees="398"
                                revenue="12,800"
                                icon={Book}
                                color="bg-red-100 text-red-600"
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}