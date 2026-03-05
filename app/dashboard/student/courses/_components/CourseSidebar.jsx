"use client";
import React from 'react';
import { ChevronDown, Check, PlayCircle, Lock, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';

export default function CourseSidebar({ modules, activeLesson, expandedModules, toggleModule, onLessonSelect, completedLessonIds = [] }) {
    const user = useSelector((state) => state.auth?.user);
    const isAdmin = user?.role === 'admin';

    if (!modules || modules.length === 0) {
        return <div className="p-5 text-slate-500 text-sm">No modules available yet.</div>;
    }

    // Flatten all lessons across all modules to easily track strictly linear progress
    const flatLessons = [];
    modules.forEach(m => {
        if (m.lessons) {
            m.lessons.forEach(l => {
                flatLessons.push({ lessonId: l._id || l.id, moduleId: m._id || m.id });
            });
        }
    });

    // Helper to determine if a lesson is locked
    const checkIsLocked = (lessonId) => {
        const idx = flatLessons.findIndex(fl => fl.lessonId === lessonId);
        if (idx === 0) return false; // First lesson is always unlocked
        if (idx > 0) {
            const previousLessonId = flatLessons[idx - 1].lessonId;
            // It's locked if the PREVIOUS lesson is NOT in the completed array
            return !completedLessonIds.includes(previousLessonId);
        }
        return true;
    };

    return (
        <div className="flex flex-col pb-10">
            {modules.map((module, index) => {
                const moduleId = module._id || module.id;
                const isExpanded = expandedModules.includes(moduleId);

                return (
                    <div key={moduleId} className="border-b border-slate-100 last:border-none">
                        <button
                            onClick={() => toggleModule(moduleId)}
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
                                {module.lessons && module.lessons.length > 0 ? module.lessons.map((lesson) => {
                                    const lessonId = lesson._id || lesson.id;
                                    const isActive = activeLesson?._id === lessonId || activeLesson?.id === lessonId;
                                    const isCompleted = completedLessonIds.includes(lessonId);
                                    const isLocked = !isAdmin && !isCompleted && checkIsLocked(lessonId);
                                    const isVideo = !!lesson.videoId;

                                    return (
                                        <button
                                            key={lessonId}
                                            disabled={isLocked}
                                            onClick={() => onLessonSelect(lesson, moduleId)}
                                            className={cn(
                                                "flex items-start gap-3 px-5 py-3 hover:bg-slate-50 transition-colors text-left border-l-4 border-transparent w-full",
                                                isActive ? "bg-blue-50 border-l-sPrimary" : "",
                                                isLocked ? "opacity-50 cursor-not-allowed hover:bg-transparent" : "cursor-pointer"
                                            )}
                                        >
                                            <div className="mt-0.5 shrink-0">
                                                {isCompleted ? (
                                                    <div className="size-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                                        <Check size={12} strokeWidth={3} />
                                                    </div>
                                                ) : isActive ? (
                                                    <div className="size-5 rounded-full border-2 border-sPrimary text-sPrimary flex items-center justify-center">
                                                        <div className="size-2 rounded-full bg-current" />
                                                    </div>
                                                ) : isLocked ? (
                                                    <div className="size-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                                                        <Lock size={12} />
                                                    </div>
                                                ) : (
                                                    <div className="size-5 rounded-full border-2 border-slate-300 text-slate-400 flex items-center justify-center">
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={cn("text-sm font-medium truncate", isActive ? "text-sPrimary" : "text-slate-700")}>
                                                    {lesson.videoTitle || lesson.title || "Untitled Lesson"}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {isVideo ? <PlayCircle size={12} className="text-slate-400" /> : <FileText size={12} className="text-slate-400" />}
                                                    <span className="text-xs text-slate-500">
                                                        {isVideo ? 'Video' : 'Document'} {lesson.duration > 0 ? `• ${lesson.duration}m` : ''}
                                                    </span>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                }) : (
                                    <div className="px-5 py-3 text-sm text-slate-500 italic">No lessons in this module.</div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
