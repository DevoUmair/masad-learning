"use client";
import React from 'react';

export default function TabItem({ active, onClick, icon: Icon, label }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${active ? 'bg-white text-sPrimary shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
        >
            <Icon size={16} />
            {label}
        </button>
    )
}
