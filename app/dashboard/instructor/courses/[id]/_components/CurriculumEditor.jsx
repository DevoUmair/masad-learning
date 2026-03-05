"use client";
import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Settings, Video as VideoIcon, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AddLessonDialog from './AddLessonDialog';

export default function CurriculumEditor({ modules, setModules }) {

    // State for Add Lesson Dialog
    const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
    const [activeModuleId, setActiveModuleId] = useState(null);

    const handleAddModule = () => {
        const newModuleId = modules.length + 1;
        setModules([...modules, {
            id: newModuleId,
            title: `Module ${newModuleId}`,
            description: "",
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
                            videoTitle: lessonData.title,
                            videoId: null, // Will be set after upload
                            type: 'video', // Visual flag
                            duration: lessonData.duration || 0, // Gets the exact duration parsed by the frontend
                            hasResources: lessonData.resources && lessonData.resources.length > 0,
                            resources: (lessonData.resources || []).map(rObj => ({
                                title: rObj.title,
                                url: null, // Will be set after upload
                                file: rObj.file // Grabs the precise File object to prevent double-nesting
                            })),
                            videoFile: lessonData.video, // For preview/upload
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
                            <div className="bg-slate-50 p-4 flex items-center justify-between cursor-move border-b border-slate-100">
                                <div className="flex items-start gap-3 w-full mr-4">
                                    <GripVertical size={20} className="text-slate-400 mt-2" />
                                    <div className="space-y-2 w-full">
                                        <input
                                            type="text"
                                            value={module.title}
                                            onChange={(e) => {
                                                const newModules = [...modules];
                                                newModules[index].title = e.target.value;
                                                setModules(newModules);
                                            }}
                                            placeholder={`Module ${index + 1} Title`}
                                            className="font-bold text-slate-800 bg-transparent border-none outline-none focus:ring-0 p-0 w-full placeholder:text-slate-400"
                                        />
                                        <input
                                            type="text"
                                            value={module.description || ""}
                                            onChange={(e) => {
                                                const newModules = [...modules];
                                                newModules[index].description = e.target.value;
                                                setModules(newModules);
                                            }}
                                            placeholder="Add module description (optional)..."
                                            className="text-sm text-slate-500 bg-transparent border-none outline-none focus:ring-0 p-0 w-full placeholder:text-slate-300"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
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
                                            <span className="text-sm font-medium text-slate-700">{lesson.videoTitle || lesson.title}</span>
                                            {lesson.hasResources && (
                                                <div className="flex items-center gap-1 ml-2 text-green-500">
                                                    <FileText size={14} />
                                                    <span className="text-xs">{lesson.resources.length}</span>
                                                </div>
                                            )}
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
