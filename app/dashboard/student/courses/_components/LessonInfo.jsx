"use client";
import React, { useState } from 'react';
import { User, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUpdateProgressMutation } from '@/redux/student/studentAPi';
import { toast } from 'sonner';
import CourseRatingModal from './CourseRatingModal';
import { useSelector } from 'react-redux';

export default function LessonInfo({ courseId, activeLesson, instructor, completedLessonIds = [] }) {
    const [updateProgress, { isLoading }] = useUpdateProgressMutation();
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

    const user = useSelector((state) => state.auth?.user);
    const isAdmin = user?.role === 'admin';

    if (!activeLesson) return null;

    const lessonId = activeLesson._id || activeLesson.id;
    const isCompleted = completedLessonIds.includes(lessonId);

    const handleMarkComplete = async () => {
        try {
            const data = await updateProgress({ courseId, lessonId }).unwrap();
            console.log(data);
            if (data.progress?.isCompleted) {
                toast.success("Course Completed! You can claim your certificate");
                setIsRatingModalOpen(true);
            } else {
                toast.success("Lesson Completed!");
            }
        } catch (error) {
            toast.error(error.data?.message || "Failed to update progress");
        }
    };

    return (
        <>
            <CourseRatingModal
                isOpen={isRatingModalOpen}
                onClose={() => setIsRatingModalOpen(false)}
                courseId={courseId}
            />

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">
                        {activeLesson.videoTitle || activeLesson.title || "Untitled Lesson"}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><User size={16} /> {instructor?.name || instructor}</span>
                        {activeLesson.duration > 0 && <span>• {Math.floor((activeLesson.duration || 0) / 60)}:
                            {Math.floor((activeLesson.duration || 0) % 60).toString().padStart(2, "0")}</span>}
                        {activeLesson.resources?.length > 0 && <span>• {activeLesson.resources.length} Resource(s)</span>}
                    </div>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                    {!isAdmin && (
                        isCompleted ? (
                            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg font-bold">
                                <CheckCircle size={18} /> Lesson Completed
                            </div>
                        ) : (
                            <Button
                                onClick={handleMarkComplete}
                                disabled={isLoading}
                                className="bg-green-600 cursor-pointer hover:bg-green-700 text-white gap-2 font-bold"
                            >
                                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                                Complete Lesson
                            </Button>
                        )
                    )}
                </div>
            </div>
        </>
    );
}
