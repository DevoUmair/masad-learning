"use client";
import React from 'react';
import { Plus, Trash2, GripVertical, Settings, Video as VideoIcon, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function CurriculumEditor() {
    return (
        <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-slate-900">Course Modules</h3>
                    <Button size="sm" variant="outline" className="text-sPrimary border-sPrimary hover:bg-blue-50 cursor-pointer">
                        <Plus size={16} className="mr-2" />
                        Add Module
                    </Button>
                </div>

                <div className="space-y-4">
                    {[1, 2].map((module) => (
                        <div key={module} className="border border-slate-200 rounded-xl overflow-hidden">
                            <div className="bg-slate-50 p-4 flex items-center justify-between cursor-move">
                                <div className="flex items-center gap-3">
                                    <GripVertical size={20} className="text-slate-400" />
                                    <span className="font-bold text-slate-800">Module {module}: Introduction</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-1.5 hover:bg-slate-200 rounded text-slate-500 cursor-pointer"><Settings size={16} /></button>
                                    <button className="p-1.5 hover:bg-red-100 rounded text-slate-500 hover:text-red-500 cursor-pointer"><Trash2 size={16} /></button>
                                </div>
                            </div>
                            <div className="p-4 bg-white space-y-2">
                                <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 group transition-colors">
                                    <div className="flex items-center gap-3">
                                        <VideoIcon size={16} className="text-blue-500" />
                                        <span className="text-sm font-medium text-slate-700">1. Welcome to the course</span>
                                    </div>
                                    <span className="text-xs text-slate-400 px-2 py-1 bg-slate-100 rounded group-hover:bg-white">Video • 2:30</span>
                                </div>
                                <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 group transition-colors">
                                    <div className="flex items-center gap-3">
                                        <FileText size={16} className="text-green-500" />
                                        <span className="text-sm font-medium text-slate-700">2. Course Resources</span>
                                    </div>
                                    <span className="text-xs text-slate-400 px-2 py-1 bg-slate-100 rounded group-hover:bg-white">PDF • 5MB</span>
                                </div>
                                <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-sm font-bold text-slate-400 hover:border-sPrimary hover:text-sPrimary transition-colors flex items-center justify-center gap-2 mt-2 cursor-pointer">
                                    <Plus size={16} /> Add Lesson
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
