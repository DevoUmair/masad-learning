"use client";
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StudentToolbar({ searchTerm, onSearchChange }) {
    return (
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm gap-4">
            <div className="flex items-center gap-2 flex-1 max-w-md">
                <Search className="text-slate-400" size={20} />
                <Input
                    placeholder="Search students by name or email..."
                    className="border-none shadow-none focus-visible:ring-0"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
                <Button variant="ghost" size="sm" className="bg-slate-50 text-slate-600 gap-2">
                    <Filter size={16} /> Filter
                </Button>
            </div>
        </div>
    );
}
