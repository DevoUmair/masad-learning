"use client";
import React from 'react';

export default function AdminHeader() {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500">Overview of platform performance and statistics.</p>
        </div>
    );
}
