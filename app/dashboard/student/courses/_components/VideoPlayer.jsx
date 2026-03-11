"use client";
import React from 'react';
import { PlayCircle, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BunnyVideo from '@/app/_components/BunnyVideo';
import Image from 'next/image';

export default function VideoPlayer({ activeLesson, thumbnailUrl }) {
    if (!activeLesson) return (
        <div className="bg-slate-100 rounded-2xl shadow-inner min-h-[400px] flex items-center justify-center mb-6">
            <p className="text-slate-400 font-medium">Select a lesson to begin</p>
        </div>
    );

    // If the lesson has a videoId, it's a video lesson
    if (activeLesson.videoId) {
        return <VideoThumbnailPlayer activeLesson={activeLesson} thumbnailUrl={thumbnailUrl} />;
    }

    function VideoThumbnailPlayer({ activeLesson, thumbnailUrl }) {
        const [isPlaying, setIsPlaying] = React.useState(false);

        // Reset when lesson changes
        React.useEffect(() => {
            setIsPlaying(false);
        }, [activeLesson?.id, activeLesson?._id]);

        if (isPlaying) {
            return (
                <div className="bg-black rounded-2xl shadow-lg overflow-hidden mb-6 aspect-video relative group w-full">
                    <BunnyVideo
                        libraryId={activeLesson.libraryId || "611020"} // Fallback to provided libraryId if missing
                        videoId={activeLesson.videoId}
                        title={activeLesson.videoTitle || activeLesson.title || "Lesson Video"}
                    />
                </div>
            );
        }

        return (
            <div
                className="bg-slate-900 rounded-2xl shadow-lg overflow-hidden mb-6 aspect-video relative group w-full cursor-pointer flex items-center justify-center"
                onClick={() => setIsPlaying(true)}
            >
                {/* Background Thumbnail Image */}
                {thumbnailUrl && (
                    <Image
                        src={thumbnailUrl}
                        alt="Lesson Thumbnail"
                        fill
                        className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                    />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent z-10" />

                <div className="relative z-20 text-center transform transition-transform group-hover:scale-110 duration-300">
                    <div className="size-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        <PlayCircle size={40} className="text-white fill-white/90" />
                    </div>
                    <h3 className="text-white font-bold text-xl px-6 opacity-90">{activeLesson.videoTitle || activeLesson.title || "Watch Lesson"}</h3>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-20 overflow-hidden">
                    <div className="h-full w-0 bg-sPrimary group-hover:w-full transition-all duration-1000 ease-out" />
                </div>
            </div>
        );
    }

    // Otherwise, it might be a document/resource only lesson
    return (
        <div className="bg-slate-100 rounded-2xl shadow-inner mb-6 aspect-video relative flex flex-col items-center justify-center text-slate-900 overflow-hidden">
            <FileText size={64} className="text-slate-400 mb-4" />
            <h3 className="text-xl font-bold">{activeLesson.title || "Document Lesson"}</h3>
            <p className="text-slate-500 mb-6">Review the resources below to complete this lesson.</p>
        </div>
    );
}
