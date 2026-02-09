import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function StudentToolbar() {
    return (
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search students or courses..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sPrimary focus:ring-1 focus:ring-sPrimary transition-all"
                />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
                <Button variant="outline" className="flex items-center gap-2 border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
                    <Filter size={16} />
                    Filter Status
                </Button>
            </div>
        </div>
    );
}
