'use client';

import React, { useState, useRef, useEffect } from 'react';
import * as tus from 'tus-js-client';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Pause, Play, CheckCircle, AlertCircle, X } from "lucide-react";
import { toast } from "sonner";
import { useGetTusSignatureMutation, useSaveLibraryVideoMutation } from '@/redux/library/libraryApi';

const VideoUpload = ({ onUploadComplete, onCancel }) => {
    const [file, setFile] = useState(null);
    const [upload, setUpload] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [paused, setPaused] = useState(false);
    const [uploadSpeed, setUploadSpeed] = useState(0);
    const [remainingTime, setRemainingTime] = useState(null);
    const [duration, setDuration] = useState(0);

    const [getTusSignature] = useGetTusSignatureMutation();
    const [saveLibraryVideo] = useSaveLibraryVideoMutation();

    const lastBytesUploaded = useRef(0);
    const lastTimestamp = useRef(0);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);

            // Calculate duration
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = () => {
                window.URL.revokeObjectURL(video.src);
                setDuration(Math.floor(video.duration));
            };
            video.src = URL.createObjectURL(selectedFile);
        }
    };

    const startUpload = async () => {
        if (!file) return;

        try {
            setUploading(true);
            setPaused(false);

            // 1. Get TUS signature and VideoID from Redux mutation
            const { signature, expirationTime, libraryId, videoId, video: initialVideo } = await getTusSignature({
                title: file.name,
                duration: duration
            }).unwrap();

            // 2. Initialize TUS upload
            const tusUpload = new tus.Upload(file, {
                endpoint: 'https://video.bunnycdn.com/tusupload',
                retryDelays: [0, 3000, 5000, 10000, 20000],
                headers: {
                    AuthorizationSignature: signature,
                    AuthorizationExpire: expirationTime.toString(),
                    VideoId: videoId,
                    LibraryId: libraryId.toString(),
                },
                metadata: {
                    filename: file.name,
                    filetype: file.type,
                },
                onError: (error) => {
                    console.error("Upload failed:", error);
                    toast.error("Upload failed: " + error.message);
                    setUploading(false);
                },
                onProgress: (bytesUploaded, bytesTotal) => {
                    const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
                    setProgress(Number(percentage));

                    // Calculate speed and remaining time
                    const now = Date.now();
                    const timeDiff = (now - lastTimestamp.current) / 1000; // seconds
                    if (timeDiff >= 1) {
                        const bytesDiff = bytesUploaded - lastBytesUploaded.current;
                        const speed = bytesDiff / timeDiff; // bytes per second
                        setUploadSpeed(speed);

                        const remainingBytes = bytesTotal - bytesUploaded;
                        setRemainingTime(speed > 0 ? remainingBytes / speed : null);

                        lastBytesUploaded.current = bytesUploaded;
                        lastTimestamp.current = now;
                    }
                },
                onSuccess: async () => {
                    toast.success("Upload successful!");
                    setUploading(false);

                    // Notify backend to save metadata via Redux mutation
                    try {
                        const response = await saveLibraryVideo({
                            videoId: videoId,
                            duration: duration,
                        }).unwrap();

                        if (onUploadComplete) onUploadComplete(response.data);
                    } catch (err) {
                        console.error("Error saving metadata:", err);
                    }
                },
            });

            setUpload(tusUpload);
            lastTimestamp.current = Date.now();
            lastBytesUploaded.current = 0;
            tusUpload.start();

        } catch (error) {
            console.error("Error initializing upload:", error);
            toast.error("Failed to initialize upload");
            setUploading(false);
        }
    };

    const togglePause = () => {
        if (!upload) return;
        if (paused) {
            upload.start();
            setPaused(false);
        } else {
            upload.abort();
            setPaused(true);
        }
    };

    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatTime = (seconds) => {
        if (seconds === null) return '--:--';
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return [h, m, s].map(v => v.toString().padStart(2, '0')).filter((v, i) => v !== '00' || i > 0).join(':');
    };

    return (
        <Card className="w-full max-w-2xl mx-auto border-2 border-dashed border-primary/20 bg-background/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-primary" />
                    Upload to Library
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {!uploading && !progress && (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                        <input
                            type="file"
                            id="video-upload"
                            className="hidden"
                            accept="video/*"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="video-upload"
                            className="cursor-pointer flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <Upload className="w-8 h-8 text-primary" />
                            </div>
                            <span>{file ? file.name : "Click to select a video (up to 10GB)"}</span>
                        </label>
                        {file && (
                            <Button onClick={startUpload} className="w-full max-w-xs">
                                Start Upload
                            </Button>
                        )}
                    </div>
                )}

                {(uploading || progress > 0) && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-medium truncate max-w-[200px]">{file?.name}</span>
                            <span className="text-muted-foreground">{progress}%</span>
                        </div>

                        <Progress value={progress} className="h-2" />

                        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                            <div className="flex flex-col">
                                <span>Speed</span>
                                <span className="font-mono text-foreground">{formatBytes(uploadSpeed)}/s</span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span>Remaining Time</span>
                                <span className="font-mono text-foreground">{formatTime(remainingTime)}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={togglePause}
                            >
                                {paused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
                                {paused ? "Resume" : "Pause"}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={onCancel}
                            >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                {progress === 100 && !uploading && (
                    <div className="flex flex-col items-center py-4 text-center space-y-2">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                        <h3 className="font-semibold text-lg">Upload Complete!</h3>
                        <p className="text-sm text-muted-foreground">The video is now being processed by Bunny.net</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default VideoUpload;
