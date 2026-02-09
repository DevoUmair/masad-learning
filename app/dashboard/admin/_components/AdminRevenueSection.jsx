"use client";
import React from 'react';
import { TrendingUp } from 'lucide-react';
import RevenueChart from './RevenueChart';

const revenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
    { name: 'Jul', revenue: 3490 },
    { name: 'Aug', revenue: 4200 },
    { name: 'Sep', revenue: 5100 },
    { name: 'Oct', revenue: 6400 },
    { name: 'Nov', revenue: 7200 },
    { name: 'Dec', revenue: 8500 },
];

export default function AdminRevenueSection() {
    return (
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp size={20} className="text-sPrimary" />
                    Revenue Overview
                </h2>
                <select className="bg-slate-50 border border-slate-200 rounded-lg text-sm px-3 py-1 outline-none focus:ring-2 focus:ring-sPrimary/20">
                    <option>This Year</option>
                    <option>Last Year</option>
                </select>
            </div>
            <RevenueChart data={revenueData} />
        </div>
    );
}
