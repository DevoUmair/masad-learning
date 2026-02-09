"use client";
import React from 'react';
import AdminHeader from './_components/AdminHeader';
import AdminStatsGrid from './_components/AdminStatsGrid';
import AdminRevenueSection from './_components/AdminRevenueSection';
import AdminRecentActivity from './_components/AdminRecentActivity';

export default function AdminDashboard() {
    return (
        <div className="p-8 space-y-8 font-lexend max-w-7xl mx-auto">

            <AdminHeader />

            <AdminStatsGrid />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <AdminRevenueSection />
                <AdminRecentActivity />
            </div>

        </div>
    );
}
