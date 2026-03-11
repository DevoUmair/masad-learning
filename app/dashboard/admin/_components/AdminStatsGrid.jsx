"use client";
import React from 'react';
import { BadgeDollarSign, BookOpen, Users, GraduationCap } from 'lucide-react';
import StatsCard from './StatsCard';

const iconMap = {
    "Total Revenue": BadgeDollarSign,
    "Active Courses": BookOpen,
    "Total Instructors": Users,
    "Total Students": GraduationCap,
};

const linkMap = {
    "Total Revenue": "/dashboard/admin/transactions",
    "Active Courses": "/dashboard/admin/courses",
    "Total Instructors": "/dashboard/admin/instructor",
    "Total Students": "/dashboard/admin/student",
};

export default function AdminStatsGrid({ stats = [] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <StatsCard
                    key={index}
                    {...stat}
                    icon={iconMap[stat.title] || BookOpen}
                    link={linkMap[stat.title]}
                />
            ))}
        </div>
    );
}
