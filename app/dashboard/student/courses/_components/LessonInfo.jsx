"use client";
import React from 'react';
import { User, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LessonInfo({ activeLesson, instructor }) {
    if (!activeLesson) return null;

    return (
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">
                    {activeLesson.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><User size={16} /> {instructor}</span>
                    {activeLesson.duration && <span>• {activeLesson.duration}</span>}
                </div>
            </div>
            <Button variant="outline" className="gap-2 border-slate-200 cursor-pointer">
                {activeLesson.status === 'completed' ? 'Completed' : 'Mark as Complete'}
                {activeLesson.status === 'completed' && <CheckCircle size={16} className="text-green-500" />}
            </Button>
        </div>
    );
}
