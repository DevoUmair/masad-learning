"use client";
import React from 'react';
import AdminStatsGrid from './_components/AdminStatsGrid';
import AdminHeader from './_components/AdminHeader';
import AdminRevenueSection from './_components/AdminRevenueSection';
import AdminRecentActivity from './_components/AdminRecentActivity';
// import { useGetAdminStatsQuery } from '@/redux/admin/adminApi';
import { useGetAdminStatsQuery } from '@/redux/admin/adminApi';

export default function AdminDashboard() {
    const { data, isLoading, error } = useGetAdminStatsQuery();

    if (isLoading) return <div className="p-8 text-center text-slate-500 font-lexend">Loading dashboard...</div>;
    if (error) return <div className="p-8 text-center text-red-500 font-lexend">Error loading statistics</div>;

    const { stats, revenueOverview, recentActivities } = data || {};

    return (
        <div className="p-8 space-y-8 font-lexend max-w-7xl mx-auto">

            <AdminHeader />

            <AdminStatsGrid stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <AdminRevenueSection data={revenueOverview} />
                <AdminRecentActivity activities={recentActivities} />
            </div>

        </div>
    );
}
