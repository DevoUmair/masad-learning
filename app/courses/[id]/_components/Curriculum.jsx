"use client";
import { useState } from "react";
import { ChevronDown, PlayCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const modules = [
    {
        id: 1,
        title: "Module 1: Introduction to AI & Python",
        lectures: 4,
        time: "1h 15m",
        items: [
            { title: "What is Generative AI?", type: "video", duration: "10:00", preview: true },
            { title: "Python Basics for Data Science", type: "video", duration: "25:00", preview: true },
            { title: "Setting up your Environment (Jupyter, PyTorch)", type: "file", duration: "15:00", preview: false },
            { title: "Linear Algebra Refresher", type: "video", duration: "25:00", preview: false },
        ]
    },
    {
        id: 2,
        title: "Module 2: Neural Networks Foundations",
        lectures: 6,
        time: "3h 45m",
        items: []
    },
    {
        id: 3,
        title: "Module 3: Transformers & Large Language Models",
        lectures: 8,
        time: "5h 10m",
        items: []
    },
    {
        id: 4,
        title: "Module 4: Building Applications with OpenAI API",
        lectures: 5,
        time: "4h 20m",
        items: []
    }
];

export default function Curriculum() {
    const [openModule, setOpenModule] = useState(1);

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            {modules.map((module) => (
                <div key={module.id} className="border-b border-slate-100 last:border-0">
                    <button
                        onClick={() => setOpenModule(openModule === module.id ? null : module.id)}
                        className={cn(
                            "w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors text-left cursor-pointer",
                            openModule === module.id ? "bg-slate-50" : ""
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <ChevronDown
                                size={20}
                                className={cn("text-slate-400 transition-transform duration-300", openModule === module.id ? "rotate-180" : "")}
                            />
                            <span className="font-bold text-slate-900">{module.title}</span>
                        </div>
                        <div className="text-xs font-medium text-slate-500 hidden sm:block">
                            {module.lectures} Lectures • {module.time}
                        </div>
                    </button>

                    <div className={cn(
                        "overflow-hidden transition-all duration-300 bg-white",
                        openModule === module.id ? "max-h-[500px]" : "max-h-0"
                    )}>
                        <div className="py-2">
                            {module.items.length > 0 ? (
                                module.items.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between px-12 py-3 hover:bg-slate-50 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            {item.type === 'video' ? (
                                                <PlayCircle size={16} className="text-slate-400 group-hover:text-sPrimary transition-colors" />
                                            ) : (
                                                <FileText size={16} className="text-slate-400 group-hover:text-sPrimary transition-colors" />
                                            )}
                                            <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{item.title}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {item.preview && (
                                                <span className="text-xs font-bold text-sPrimary">Preview</span>
                                            )}
                                            <span className="text-xs text-slate-400">{item.duration}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-12 py-4 text-sm text-slate-400 italic">
                                    Content locked for this preview.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
