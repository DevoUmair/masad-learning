"use client";
import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Settings, Video as VideoIcon, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AddLessonDialog from './AddLessonDialog';

export default function CurriculumEditor() {
    const [modules, setModules] = useState([
        {
            id: 1,
            title: "Introduction",
            lessons: [
                { id: 1, title: "Welcome to the course", type: "video", duration: "2:30" },
                { id: 2, title: "Course Resources", type: "pdf", size: "5MB" }
            ]
        }
    ]);

    // State for Add Lesson Dialog
    const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
    const [activeModuleId, setActiveModuleId] = useState(null);

    const handleAddModule = () => {
        const newModuleId = modules.length + 1;
        setModules([...modules, {
            id: newModuleId,
            title: `Module ${newModuleId}`,
            lessons: []
        }]);
    };

    const handleDeleteModule = (moduleId) => {
        setModules(modules.filter(m => m.id !== moduleId));
    };

    const openAddLessonDialog = (moduleId) => {
        setActiveModuleId(moduleId);
        setIsAddLessonOpen(true);
    };

    const handleSaveLesson = (lessonData) => {
        if (!activeModuleId) return;

        setModules(modules.map(module => {
            if (module.id === activeModuleId) {
                return {
                    ...module,
                    lessons: [
                        ...module.lessons,
                        {
                            id: Date.now(), // Temporary ID
                            title: lessonData.title,
                            type: 'video', // Main type is video
                            duration: '0:00', // Placeholder
                            hasPdf: !!lessonData.pdf,
                            videoFile: lessonData.video,
                            pdfFile: lessonData.pdf
                        }
                    ]
                };
            }
            return module;
        }));
    };

    const handleDeleteLesson = (moduleId, lessonId) => {
        setModules(modules.map(module => {
            if (module.id === moduleId) {
                return {
                    ...module,
                    lessons: module.lessons.filter(l => l.id !== lessonId)
                };
            }
            return module;
        }));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-slate-900">Course Modules</h3>
                    <Button
                        size="sm"
                        variant="outline"
                        className="text-sPrimary border-sPrimary hover:bg-blue-50 cursor-pointer"
                        onClick={handleAddModule}
                    >
                        <Plus size={16} className="mr-2" />
                        Add Module
                    </Button>
                </div>

                <div className="space-y-4">
                    {modules.map((module, index) => (
                        <div key={module.id} className="border border-slate-200 rounded-xl overflow-hidden">
                            <div className="bg-slate-50 p-4 flex items-center justify-between cursor-move">
                                <div className="flex items-center gap-3">
                                    <GripVertical size={20} className="text-slate-400" />
                                    <span className="font-bold text-slate-800">Module {index + 1}: {module.title}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-1.5 hover:bg-slate-200 rounded text-slate-500 cursor-pointer"><Settings size={16} /></button>
                                    <button
                                        className="p-1.5 hover:bg-red-100 rounded text-slate-500 hover:text-red-500 cursor-pointer"
                                        onClick={() => handleDeleteModule(module.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 bg-white space-y-2">
                                {module.lessons.length === 0 && (
                                    <div className="text-center py-4 text-slate-400 text-sm italic">
                                        No lessons in this module yet.
                                    </div>
                                )}
                                {module.lessons.map((lesson) => (
                                    <div key={lesson.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 group transition-colors">
                                        <div className="flex items-center gap-3">
                                            <VideoIcon size={16} className="text-blue-500" />
                                            <span className="text-sm font-medium text-slate-700">{lesson.title}</span>
                                            {lesson.hasPdf && <FileText size={14} className="text-green-500 ml-2" />}
                                            {lesson.type === 'pdf' && <FileText size={16} className="text-green-500" />}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-slate-400 px-2 py-1 bg-slate-100 rounded group-hover:bg-white">
                                                {lesson.videoFile ? 'Pending Upload' : (lesson.duration || 'Video')}
                                            </span>
                                            <button
                                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 text-red-500 rounded transition-opacity"
                                                onClick={() => handleDeleteLesson(module.id, lesson.id)}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-sm font-bold text-slate-400 hover:border-sPrimary hover:text-sPrimary transition-colors flex items-center justify-center gap-2 mt-2 cursor-pointer"
                                    onClick={() => openAddLessonDialog(module.id)}
                                >
                                    <Plus size={16} /> Add Lesson
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AddLessonDialog
                open={isAddLessonOpen}
                onOpenChange={setIsAddLessonOpen}
                onSave={handleSaveLesson}
            />
        </div>
    )
}
