"use client";
import { useState } from "react";
import { ChevronDown, PlayCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Curriculum({ modules = [] }) {
    // Automatically open the first module if it exists
    const [openModule, setOpenModule] = useState(modules[0]?._id || null);

    if (!modules || modules.length === 0) {
        return (
            <div className="p-6 text-center text-slate-500 bg-white border border-slate-200 rounded-xl">
                No curriculum available for this course yet.
            </div>
        );
    }

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            {modules.map((module) => (
                <div key={module._id} className="border-b border-slate-100 last:border-0">
                    <button
                        onClick={() => setOpenModule(openModule === module._id ? null : module._id)}
                        className={cn(
                            "w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors text-left cursor-pointer",
                            openModule === module._id ? "bg-slate-50" : ""
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <ChevronDown
                                size={20}
                                className={cn("text-slate-400 transition-transform duration-300", openModule === module._id ? "rotate-180" : "")}
                            />
                            <span className="font-bold text-slate-900">{module.title}</span>
                        </div>
                        <div className="text-xs font-medium text-slate-500 hidden sm:block">
                            {module.lessons?.length || 0} Lectures • {module.duration || 0} min
                        </div>
                    </button>

                    {/* Increased max-h from 500px to 1500px to ensure long dynamic lists don't get cut off */}
                    <div className={cn(
                        "overflow-hidden transition-all duration-300 bg-white",
                        openModule === module._id ? "max-h-[1500px]" : "max-h-0"
                    )}>
                        <div className="py-2">
                            {module.lessons && module.lessons.length > 0 ? (
                                module.lessons.map((lesson) => (
                                    <div key={lesson._id} className="flex items-center justify-between px-12 py-3 hover:bg-slate-50 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            {/* Checks if there is a videoId to determine the icon */}
                                            {lesson.videoId ? (
                                                <PlayCircle size={16} className="text-slate-400 group-hover:text-sPrimary transition-colors" />
                                            ) : (
                                                <FileText size={16} className="text-slate-400 group-hover:text-sPrimary transition-colors" />
                                            )}
                                            <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                                                {lesson.videoTitle}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs text-slate-400">
                                                {lesson.duration > 0 ? `${lesson.duration} min` : "Video"}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-12 py-4 text-sm text-slate-400 italic">
                                    No lessons have been added to this module yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}