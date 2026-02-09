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
    const [videoFile, setVideoFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

    const handleSubmit = () => {
        if (!title || !videoFile) return;

        onSave({
            title,
            video: videoFile,
            pdf: pdfFile
        });

        // Reset form
        setTitle('');
        setVideoFile(null);
        setPdfFile(null);
        onOpenChange(false);
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (type === 'video') setVideoFile(file);
            else setPdfFile(file);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New Lesson</DialogTitle>
                    <DialogDescription>
                        Create a new lesson for this module. Video is required, PDF is optional.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Lesson Title</Label>
                        <Input
                            id="title"
                            placeholder="e.g. Introduction to React Hooks"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                        <Label>Lesson Resources (PDF - Optional)</Label>
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors text-center cursor-pointer relative">
                            <input
                                type="file"
                                accept="application/pdf"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => handleFileChange(e, 'pdf')}
                            />
                            {pdfFile ? (
                                <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
                                    <FileText size={16} />
                                    {pdfFile.name}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setPdfFile(null);
                                        }}
                                        className="p-1 hover:bg-red-100 text-red-500 rounded-full ml-2 z-10 relative"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ) : (
                                <div className="text-slate-500">
                                    <Upload className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                                    <span className="text-sm font-medium">Click to upload PDF</span>
                                    <p className="text-xs text-slate-400 mt-1">PDF up to 10MB</p>
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
