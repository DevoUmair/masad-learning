"use client";
import React from 'react';
import { PlayCircle, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VideoPlayer({ activeLesson }) {
    if (!activeLesson) return null;

    return (
        <div className="bg-black rounded-2xl shadow-lg overflow-hidden mb-6 aspect-video relative group">
            {activeLesson.type === 'video' ? (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                    {/* Placeholder for Video Player */}
                    <div className="text-center">
                        <div className="size-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-all hover:scale-110">
                            <PlayCircle size={32} className="text-white fill-white" />
                        </div>
                        <p className="text-white/80 font-medium">Playing: {activeLesson.title}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                        <div className="h-full w-1/3 bg-sPrimary" />
                    </div>
                </div>
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 text-slate-900">
                    <FileText size={64} className="text-slate-400 mb-4" />
                    <h3 className="text-xl font-bold">{activeLesson.title}</h3>
                    <p className="text-slate-500 mb-6">PDF Document • {activeLesson.size}</p>
                    <Button className="bg-sPrimary text-white gap-2">
                        <Download size={18} /> Download Resource
                    </Button>
                </div>
            )}
        </div>
    );
}
