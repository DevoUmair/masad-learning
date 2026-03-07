import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import BunnyVideo from '@/app/_components/BunnyVideo'
const VideoModal = ({ open, onOpenChange, video }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>{video?.title}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    {video && (
                        <BunnyVideo
                            videoId={video.bunnyVideoId}
                            libraryId={video.bunnyLibraryId}
                            title={video.title}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default VideoModal