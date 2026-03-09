"use client";
import React from 'react';
import { Users, Banknote, Star, Search, PenLine, Book, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import StatCard from './_components/StatCard';
import CourseRow from './_components/CourseRow';
import { useGetInstructorStatsQuery } from '@/redux/instructor/instructorApi';

export default function InstructorDashboard() {
    const { data: statsData, isLoading, error } = useGetInstructorStatsQuery();

    if (isLoading) return <div className="p-8 text-center text-slate-500 font-lexend">Loading dashboard stats...</div>;
    if (error) return <div className="p-8 text-center text-red-500 font-lexend">Error loading dashboard stats</div>;

    const { stats } = statsData || {};

    const formatTrend = (label) => {
        // Mock trend for now as it's not in backend yet
        return "+0% from last month";
    };

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
                    value={stats?.totalStudents?.toLocaleString() || "0"}
                    // trend={formatTrend("students")}
                    icon={Users}
                    iconColor="text-blue-600"
                    iconBg="bg-blue-50"
                    trendColor="text-green-600"
                />

                <StatCard
                    label="AVERAGE RATING"
                    value={stats?.averageRating?.toFixed(1) || "0.0"}
                    // trend={formatTrend("rating")}
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
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {stats?.courses?.slice(0, 5).map((course) => (
                                <CourseRow
                                    key={course.id}
                                    title={course.title}
                                    updated={`Updated ${new Date(course.updatedAt).toLocaleDateString()}`}
                                    category={course.category}
                                    status={course.status}
                                    enrollees={course.enrollees.toString()}
                                    revenue={course.revenue.toLocaleString()}
                                    icon={Book}
                                    color="bg-blue-100 text-blue-600"
                                />
                            ))}
                            {stats?.courses?.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="py-8 text-center text-slate-500">No courses found yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
