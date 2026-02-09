"use client";
import React from 'react';
import { BadgeDollarSign, BookOpen, Users, GraduationCap } from 'lucide-react';
import StatsCard from './StatsCard';

// Mock Data
const stats = [
    { title: "Total Revenue", value: "$45,231", icon: BadgeDollarSign, trend: "up", trendValue: "12%", link: "/dashboard/admin/billing" },
    { title: "Active Courses", value: "32", icon: BookOpen, trend: "up", trendValue: "4", link: "/dashboard/admin/courses" },
    { title: "Total Instructors", value: "14", icon: Users, trend: "up", trendValue: "2", link: "/dashboard/admin/instructor" },
    { title: "Total Students", value: "1,205", icon: GraduationCap, trend: "up", trendValue: "85", link: "/dashboard/admin/student" },
];

export default function AdminStatsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
            ))}
        </div>
    );
}
