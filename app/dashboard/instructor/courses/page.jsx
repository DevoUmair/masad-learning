"use client";
import React from 'react';
import { Search, Plus, Filter, MoreVertical, Book, PenLine, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function MyCoursesPage() {
    return (
        <div className="space-y-6 font-lexend">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900">My Courses</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage your courses and course content</p>
                </div>
                <Link href="/dashboard/instructor/courses/new">
                    <Button className="bg-sPrimary hover:bg-sPrimary/90 text-white font-bold cursor-pointer">
                        <Plus size={18} className="mr-2" />
                        Create New Course
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search your courses..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sPrimary focus:ring-1 focus:ring-sPrimary transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Button variant="outline" className="flex items-center gap-2 border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
                            <Filter size={16} />
                            Filter
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-[40%]">Course Name</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Enrolled</th>
                                <th className="text-right py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[1, 2, 3, 4].map((item) => (
                                <tr key={item} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-sPrimary">
                                                <Book size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 cursor-pointer hover:text-sPrimary transition-colors">
                                                    Complete Python Bootcamp 2024
                                                </p>
                                                <p className="text-xs text-slate-500">Development</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm font-bold text-slate-900">AED 49.99</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-green-100 text-green-700">
                                            Published
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm font-medium text-slate-600">1,234</div>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/dashboard/instructor/courses/${item}`}>
                                                <button className="p-2 text-slate-400 hover:text-sPrimary hover:bg-blue-50 rounded-lg transition-colors cursor-pointer" title="Edit">
                                                    <PenLine size={18} />
                                                </button>
                                            </Link>
                                            <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Delete">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-slate-100 text-center text-sm text-slate-500">
                    <button className="hover:text-sPrimary font-medium cursor-pointer">Load more courses</button>
                </div>
            </div>
        </div>
    );
}
