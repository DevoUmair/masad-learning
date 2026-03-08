'use client';

import VideoUpload from '@/app/dashboard/instructor/library/_components/VideoUpload';
import { useGetLibraryVideosQuery, useDeleteLibraryVideoMutation } from '@/redux/library/libraryApi';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Video, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import VideoModal from './_components/VideoModal';
import DeleteConfirmationModal from '@/app/dashboard/_components/DeleteConfirmationModal';

const VideoLibraryPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: libraryData, isLoading: loading } = useGetLibraryVideosQuery();
    const [deleteLibraryVideo, { isLoading: isDeleting }] = useDeleteLibraryVideoMutation();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [videoToDeleteId, setVideoToDeleteId] = useState(null);

    const videos = libraryData?.data || [];

    const handleDelete = (id) => {
        setVideoToDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteLibraryVideo(videoToDeleteId).unwrap();
            setIsDeleteModalOpen(false);
            toast.success("Video deleted");
        } catch (error) {
            console.error("Error deleting video:", error);
            toast.error("Failed to delete video");
        }
    };

    const handleUploadComplete = () => {
        setIsUploadOpen(false);
    };

    const filteredVideos = videos.filter(v =>
        v.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Video Library</h1>
                    <p className="text-muted-foreground">Manage your reusable course videos (up to 10GB+ uploads supported).</p>
                </div>

                <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="w-4 h-4" />
                            Upload Video
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Upload to Library</DialogTitle>
                        </DialogHeader>
                        <VideoUpload
                            onUploadComplete={handleUploadComplete}
                            onCancel={() => setIsUploadOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search videos..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                </Button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <Card key={i} className="animate-pulse">
                            <div className="aspect-video bg-muted rounded-t-lg" />
                            <CardContent className="p-4 space-y-2">
                                <div className="h-4 bg-muted rounded w-3/4" />
                                <div className="h-3 bg-muted rounded w-1/4" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : filteredVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVideos.map((video) => (
                        <Card key={video._id} onClick={() => {
                            setSelectedVideo(video);
                            setIsModalOpen(true);
                        }} className="group overflow-hidden border-2 hover:border-primary/50 transition-all">
                            <div className="aspect-video bg-black relative flex items-center justify-center">
                                {/* Thumbnail fallback or actual Bunny.net thumbnail if available */}
                                <Video className="w-12 h-12 text-muted-foreground/20" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(video._id);
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>

                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-semibold truncate">{video.title}</h3>
                                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                                    <span>Added {new Date(video.createdAt).toLocaleDateString()}</span>
                                    <span>{video.duration ? `${Math.floor(video.duration / 60).toString().padStart(2, "0")}m` : 'Processing...'}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                        <Video className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">No videos found</h3>
                        <p className="text-muted-foreground">Upload your first video to start building your library.</p>
                    </div>
                    <Button onClick={() => setIsUploadOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Upload Now
                    </Button>
                </div>
            )}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                isLoading={isDeleting}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Video"
            />
            <VideoModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                video={selectedVideo}
            />
        </div>
    );
};

export default VideoLibraryPage;
