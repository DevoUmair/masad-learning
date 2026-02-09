"use client";
import React from 'react';
import { ChevronDown, Check, PlayCircle, Lock, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CourseSidebar({ modules, activeLesson, expandedModules, toggleModule, onLessonSelect }) {
    return (
        <div className="flex flex-col pb-10">
            {modules.map((module, index) => {
                const isExpanded = expandedModules.includes(module.id);
                return (
                    <div key={module.id} className="border-b border-slate-100 last:border-none">
                        <button
                            onClick={() => toggleModule(module.id)}
                            className="w-full px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-colors flex justify-between items-center group"
                        >
                            <div className="text-left">
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Module {index + 1}</p>
                                <p className="text-sm font-bold text-slate-800 group-hover:text-sPrimary transition-colors">{module.title}</p>
                            </div>
                            <ChevronDown
                                size={16}
                                className={cn("text-slate-400 transition-transform duration-300", isExpanded ? "rotate-180" : "")}
                            />
                        </button>

                        <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0")}>
                            <div className="flex flex-col">
                                {module.lessons.map((lesson) => {
                                    const isActive = activeLesson?.id === lesson.id;
                                    const isLocked = lesson.status === 'locked';

                                    return (
                                        <button
                                            key={lesson.id}
                                            disabled={isLocked}
                                            onClick={() => onLessonSelect(lesson, module.id)}
                                            className={cn(
                                                "flex items-start gap-3 px-5 py-3 hover:bg-slate-50 transition-colors text-left border-l-4 border-transparent w-full",
                                                isActive ? "bg-blue-50 border-l-sPrimary" : "",
                                                isLocked ? "opacity-60 cursor-not-allowed hover:bg-transparent" : "cursor-pointer"
                                            )}
                                        >
                                            <div className="mt-0.5 shrink-0">
                                                {lesson.status === 'completed' && <div className="size-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><Check size={12} strokeWidth={3} /></div>}
                                                {lesson.status === 'in-progress' && <div className={cn("size-5 rounded-full border-2 flex items-center justify-center", isActive ? "border-sPrimary text-sPrimary" : "border-slate-300 text-slate-400")}><div className="size-2 rounded-full bg-current" /></div>}
                                                {isLocked && <div className="size-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center"><Lock size={12} /></div>}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={cn("text-sm font-medium truncate", isActive ? "text-sPrimary" : "text-slate-700")}>
                                                    {lesson.title}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {lesson.type === 'video' ? <PlayCircle size={12} className="text-slate-400" /> : <FileText size={12} className="text-slate-400" />}
                                                    <span className="text-xs text-slate-500">
                                                        {lesson.type === 'video' ? lesson.duration : 'PDF'}
                                                    </span>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
