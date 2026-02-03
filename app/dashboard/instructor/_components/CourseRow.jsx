"use client";
import React from 'react';
import { PenLine } from 'lucide-react';

export default function CourseRow({ title, updated, category, status, enrollees, revenue, icon: Icon, color }) {
    const isPublished = status === "Published";

    return (
        <tr className="hover:bg-slate-50/50 transition-colors group">
            <td className="py-4 px-6">
                <div className="flex items-start gap-4">
                    <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                        <Icon size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-sPrimary transition-colors cursor-pointer">{title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{updated}</p>
                    </div>
                </div>
            </td>
            <td className="py-4 px-6">
                <p className="text-sm font-medium text-slate-700">{category}</p>
            </td>
            <td className="py-4 px-6">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${isPublished ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {status}
                </span>
            </td>
            <td className="py-4 px-6">
                <p className="text-sm font-bold text-slate-700">{enrollees}</p>
            </td>
            <td className="py-4 px-6">
                <p className="text-sm font-bold text-slate-900">{revenue}</p>
            </td>
            {/* <td className="py-4 px-6 text-right">
                <button className="p-2 text-slate-400 hover:text-sPrimary hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                    <PenLine size={18} />
                </button>
            </td> */}
        </tr>
    )
}
