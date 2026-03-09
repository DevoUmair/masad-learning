"use client";
import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function StatCard({ label, value, trend, icon: Icon, iconColor, iconBg, trendColor }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between ">
            <div className="flex justify-between items-start">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
                <div className={`p-2 rounded-lg ${iconBg} ${iconColor}`}>
                    <Icon size={20} />
                </div>
            </div>
            <div>
                <h3 className="text-3xl font-black text-slate-900 mb-1">{value}</h3>
                {/* <div className="flex items-center gap-1.5">
                    <TrendingUp size={14} className={trendColor} />
                    <p className={`text-xs font-bold ${trendColor}`}>{trend}</p>
                </div> */}
            </div>
        </div>
    );
}
