"use client";
import React from 'react';
import { Search, Filter, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function InstructorToolbar({ searchTerm, onSearchChange }) {
    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Instructor Management</h1>
                    <p className="text-slate-500">Manage instructors, view earnings, and process payouts.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                        <ExternalLink size={16} /> Export Data
                    </Button>
                </div>
            </div>

            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm gap-4">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                    <Search className="text-slate-400" size={20} />
                    <Input
                        placeholder="Search instructors by name or email..."
                        className="border-none shadow-none focus-visible:ring-0"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
                    <Button variant="ghost" size="sm" className="bg-slate-50 text-slate-600 gap-2">
                        <Filter size={16} /> Filter
                    </Button>
                    <select className="bg-white border border-slate-200 text-sm rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-sPrimary/20">
                        <option>All Statuses</option>
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Suspended</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
