'use client';

import React, { useState, useRef } from 'react';
import { useGetLibraryVideosQuery, useGetTusSignatureMutation, useSaveLibraryVideoMutation } from '@/redux/library/libraryApi';
import * as tus from 'tus-js-client';
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Video, Search, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LibrarySelectorModal = ({ open, onOpenChange, onSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const { data: libraryData, isLoading: loading } = useGetLibraryVideosQuery(undefined, { skip: !open });
    const [getTusSignature] = useGetTusSignatureMutation();
    const [saveLibraryVideo] = useSaveLibraryVideoMutation();

    const videos = libraryData?.data || [];

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);

            // 1. Calculate duration locally
            const video = document.createElement('video');
            video.preload = 'metadata';
            const durationPromise = new Promise((resolve) => {
                video.onloadedmetadata = () => {
                    window.URL.revokeObjectURL(video.src);
                    resolve(Math.floor(video.duration));
                };
            });
            video.src = URL.createObjectURL(file);
            const duration = await durationPromise;

            // 2. Get TUS signature
            const { signature, expirationTime, libraryId, videoId, video: initialVideo } = await getTusSignature({
                title: file.name,
                duration: duration
            }).unwrap();

            // 3. Immediately select for the lesson
            onSelect(initialVideo);

            // 4. Start TUS upload
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
                    console.error("Background upload failed:", error);
                    toast.error("Upload failed: " + file.name);
                },
                onSuccess: async () => {
                    // Save metadata to library when done
                    try {
                        await saveLibraryVideo({
                            videoId: videoId,
                            duration: duration,
                        }).unwrap();
                        // toast.success("Upload finished: " + file.name);
                    } catch (err) {
                        console.error("Error saving library metadata:", err);
                    }
                },
            });

            tusUpload.start();
            toast.success("Uploaded");

        } catch (error) {
            console.error("Error starting upload:", error);
            toast.error("Failed to start upload");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const filteredVideos = videos.filter(v =>
        v.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Select Video from Library</DialogTitle>
                </DialogHeader>

                <div className="flex items-center gap-2 my-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search your library..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <Button
                        onClick={handleUploadClick}
                        disabled={isUploading}
                        variant="secondary"
                        className="gap-2 shrink-0"
                    >
                        <Video className="w-4 h-4" />
                        Upload New
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2">
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="aspect-video bg-muted animate-pulse rounded-lg" />
                            ))}
                        </div>
                    ) : filteredVideos.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {filteredVideos.map((video) => (
                                <Card
                                    key={video._id}
                                    className="cursor-pointer hover:border-primary transition-all group relative overflow-hidden"
                                    onClick={() => onSelect(video)}
                                >
                                    <div className="aspect-video bg-black flex items-center justify-center">
                                        <Video className="w-8 h-8 text-muted-foreground/20" />
                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <Check className="text-primary w-8 h-8" />
                                        </div>
                                    </div>
                                    <CardContent className="p-2">
                                        <p className="text-xs font-medium truncate">{video.title}</p>
                                        <p className="text-[10px] text-muted-foreground">{video.duration ? `${Math.floor(video.duration / 60)}m` : 'Processing'}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            No videos found in your library.
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LibrarySelectorModal;
