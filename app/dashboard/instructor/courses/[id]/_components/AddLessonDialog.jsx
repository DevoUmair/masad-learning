"use client";
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Video, FileText, Upload, X } from 'lucide-react';

export default function AddLessonDialog({ open, onOpenChange, onSave }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [resourceFiles, setResourceFiles] = useState([]); // [{ title: string, file: File }]

    const [videoDuration, setVideoDuration] = useState(0);

    const handleSubmit = () => {
        if (!title || !videoFile) return;

        onSave({
            title,
            description,
            video: videoFile,
            duration: videoDuration,
            resources: resourceFiles
        });

        // Reset form
        setTitle('');
        setDescription('');
        setVideoFile(null);
        setVideoDuration(0);
        setResourceFiles([]);
        onOpenChange(false);
    };

    const handleFileChange = (e, type) => {
        if (type === 'video') {
            const file = e.target.files[0];
            setVideoFile(file);

            // Extract exact video duration on the frontend
            if (file) {
                const videoElement = document.createElement('video');
                videoElement.preload = 'metadata';
                videoElement.onloadedmetadata = () => {
                    window.URL.revokeObjectURL(videoElement.src);
                    setVideoDuration(videoElement.duration);
                };
                videoElement.src = URL.createObjectURL(file);
            } else {
                setVideoDuration(0);
            }
        } else {
            const files = Array.from(e.target.files).map(file => ({
                title: file.name,
                file: file
            }));
            setResourceFiles(prev => [...prev, ...files]);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] overflow-y-scroll max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Add New Lesson</DialogTitle>
                    <DialogDescription>
                        Create a new lesson for this module. Video is required, PDF is optional.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Lesson Title (Required)</Label>
                        <Input
                            id="title"
                            placeholder="e.g. Introduction to React Hooks"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Lesson Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Provide a short breakdown of this lesson..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-[80px]"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Video Content (Required)</Label>
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors text-center cursor-pointer relative">
                            <input
                                type="file"
                                accept="video/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => handleFileChange(e, 'video')}
                            />
                            {videoFile ? (
                                <div className="flex items-center justify-center gap-2 text-sPrimary font-medium">
                                    <Video size={16} />
                                    {videoFile.name}
                                </div>
                            ) : (
                                <div className="text-slate-500">
                                    <Upload className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                                    <span className="text-sm font-medium">Click to upload video</span>
                                    <p className="text-xs text-slate-400 mt-1">MP4, WebM up to 500MB</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Lesson Resources (Optional)</Label>
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors text-center cursor-pointer relative min-h-[100px] flex flex-col items-center justify-center">
                            <input
                                type="file"
                                multiple
                                accept=".pdf,.doc,.docx,.zip,.rar"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                onChange={(e) => handleFileChange(e, 'resources')}
                            />
                            {resourceFiles.length > 0 ? (
                                <div className="space-y-3 mt-2 w-full relative z-30">
                                    {resourceFiles.map((rObj, idx) => (
                                        <div key={idx} className="flex flex-col gap-2 bg-green-50 p-3 rounded border border-green-100">
                                            <div className="flex items-center justify-between gap-2 text-green-700 font-medium">
                                                <div className="flex items-center gap-2 overflow-hidden pointer-events-none">
                                                    <FileText size={16} className="shrink-0" />
                                                    <span className="truncate text-sm">{rObj.file.name}</span>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setResourceFiles(prev => prev.filter((_, i) => i !== idx));
                                                    }}
                                                    className="p-1 hover:bg-red-100 text-red-500 rounded-full shrink-0 cursor-pointer z-40"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                            <Input
                                                type="text"
                                                value={rObj.title}
                                                onChange={(e) => {
                                                    const newArr = [...resourceFiles];
                                                    newArr[idx].title = e.target.value;
                                                    setResourceFiles(newArr);
                                                }}
                                                placeholder="Resource display name"
                                                className="h-8 text-sm bg-white"
                                            />
                                        </div>
                                    ))}
                                    <div className="text-slate-500 text-xs mt-2 pointer-events-none text-center">Click or drag more files to add</div>
                                </div>
                            ) : (
                                <div className="text-slate-500 pointer-events-none">
                                    <Upload className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                                    <span className="text-sm font-medium">Click to upload resources</span>
                                    <p className="text-xs text-slate-400 mt-1">PDF, DOC, ZIP up to 10MB each</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={!title || !videoFile} className="bg-sPrimary text-white hover:bg-sPrimary/90">
                        Add Lesson
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
