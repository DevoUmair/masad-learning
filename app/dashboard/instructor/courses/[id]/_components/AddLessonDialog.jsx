"use client";
import React, { useState, useEffect } from 'react';
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
import { Video, FileText, Upload, X, Library as LibraryIcon } from 'lucide-react';
import LibrarySelectorModal from './LibrarySelectorModal';

export default function AddLessonDialog({ open, onOpenChange, onSave, lesson = null }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [libraryVideo, setLibraryVideo] = useState(null);
    const [existingResources, setExistingResources] = useState([]); // [{ _id, title, url }]
    const [resourceFiles, setResourceFiles] = useState([]); // [{ title: string, file: File }]
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);

    const [videoDuration, setVideoDuration] = useState(0);

    // Populate state for editing
    useEffect(() => {
        if (open) {
            if (lesson) {
                setTitle(lesson.title || lesson.videoTitle || '');
                setDescription(lesson.description || lesson.lessonDescription || '');
                setLibraryVideo(lesson.libraryVideo || (lesson.videoId ? {
                    title: lesson.videoTitle || lesson.title,
                    bunnyVideoId: lesson.videoId,
                    bunnyLibraryId: lesson.libraryId,
                    duration: lesson.lessonDuration || lesson.duration,
                    status: 'ready'
                } : null));
                setVideoDuration(lesson.lessonDuration || lesson.duration || 0);
                setExistingResources(lesson.resources || []);
                setResourceFiles([]);
            } else {
                setTitle('');
                setDescription('');
                setLibraryVideo(null);
                setVideoDuration(0);
                setExistingResources([]);
                setResourceFiles([]);
            }
        }
    }, [open, lesson]);

    const handleSubmit = () => {
        // Validation: required fields
        if (!title || !libraryVideo) return;

        onSave({
            ...lesson, // Keep existing ID and other properties
            title,
            description,
            libraryVideo: libraryVideo,
            duration: videoDuration,
            resources: existingResources, // Pass back potentially modified list of existing resources
            newResources: resourceFiles // Special key for new uploads
        });

        onOpenChange(false);
    };

    const handleFileChange = (e, type) => {
        if (type === 'video') {
            const file = e.target.files[0];
            setVideoFile(file);
            setLibraryVideo(null); // Clear library selection if a file is picked

            // Extract exact video duration on the frontend
            if (file) {
                // This branch is now only for resources as per refactor
            }
        } else {
            const files = Array.from(e.target.files).map(file => ({
                title: file.name,
                file: file
            }));
            setResourceFiles(prev => [...prev, ...files]);
        }
    };

    const handleLibrarySelect = (video) => {
        setLibraryVideo(video);
        setVideoFile(null); // Clear file selection if library video is picked
        setVideoDuration(video.duration || 0);
        setIsLibraryOpen(false);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[500px] overflow-y-scroll max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>{lesson ? 'Edit Lesson' : 'Add New Lesson'}</DialogTitle>
                        <DialogDescription>
                            {lesson ? 'Update lesson details.' : 'Create a new lesson for this module.'} Video is required.
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
                            <div
                                onClick={() => setIsLibraryOpen(true)}
                                className="border-2 border-dashed border-slate-200 rounded-lg p-6 hover:bg-slate-50 transition-colors text-center cursor-pointer relative min-h-[120px] flex flex-col items-center justify-center gap-3"
                            >
                                {libraryVideo ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex items-center justify-center gap-2 text-sPrimary font-medium">
                                            <Video className="text-sPrimary" size={24} />
                                            <div className="text-left">
                                                <div className="text-sm">{libraryVideo.title}</div>
                                                <div className="text-[10px] text-muted-foreground uppercase tracking-tight">
                                                    {libraryVideo.status === 'uploading' ? 'Uploaded' : 'Selected from Library'}
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 mt-2"
                                        >
                                            Change Video
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-full bg-sPrimary/10 flex items-center justify-center">
                                            <LibraryIcon className="text-sPrimary w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold text-sPrimary">Select from Video Library</span>
                                            <p className="text-xs text-slate-400 mt-1">Upload new or choose existing video</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label>Lesson Resources (Optional)</Label>

                            {/* Existing Resources List */}
                            {existingResources.length > 0 && (
                                <div className="space-y-2 mb-2">
                                    <Label className="text-[10px] text-muted-foreground uppercase">Existing Materials</Label>
                                    {existingResources.map((res, idx) => (
                                        <div key={res._id || idx} className="flex items-center justify-between p-2 bg-slate-50 border border-slate-100 rounded text-sm">
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <FileText size={14} className="text-blue-500 shrink-0" />
                                                <a
                                                    href={res.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="truncate text-blue-600 hover:underline font-medium"
                                                >
                                                    {res.title}
                                                </a>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setExistingResources(prev => prev.filter((_, i) => i !== idx))}
                                                className="p-1 hover:bg-red-100 text-red-500 rounded transition-colors"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

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
                                        <Label className="text-[10px] text-muted-foreground uppercase text-center block">New Materials to Upload</Label>
                                        {resourceFiles.map((rObj, idx) => (
                                            <div key={idx} className="flex flex-col gap-2 bg-green-50 p-3 rounded border border-green-100 text-left">
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
                                        <span className="text-sm font-medium">Click to upload new resources</span>
                                        <p className="text-xs text-slate-400 mt-1">PDF, DOC, ZIP up to 10MB each</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button onClick={handleSubmit} disabled={!title || !libraryVideo} className="bg-sPrimary text-white hover:bg-sPrimary/90">
                            {lesson ? 'Save Changes' : 'Add Lesson'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <LibrarySelectorModal
                open={isLibraryOpen}
                onOpenChange={setIsLibraryOpen}
                onSelect={handleLibrarySelect}
            />
        </>
    );
}
