"use client";
import React, { useState } from 'react';
import { Star, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAddOrUpdateRatingMutation } from '@/redux/rating/ratingApi';
import { toast } from 'sonner';

export default function CourseRatingModal({ isOpen, onClose, courseId }) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState("");

    const [submitRating, { isLoading }] = useAddOrUpdateRatingMutation();

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error("Please select a star rating.");
            return;
        }

        try {
            await submitRating({ courseId, rating, comment }).unwrap();
            toast.success("Thank you for your review!");
            onClose();
        } catch (error) {
            toast.error(error.data?.message || "Failed to submit rating");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">Rate this Course</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    <p className="text-center text-slate-600">
                        Congratulations on completing the course! How would you rate your experience?
                    </p>

                    {/* Star Selection */}
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                onClick={() => setRating(star)}
                                className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                            >
                                <Star
                                    size={40}
                                    className={`transition-colors duration-200 ${(hoveredRating || rating) >= star
                                            ? "fill-yellow-400 text-yellow-500"
                                            : "fill-slate-100 text-slate-300"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Comment Area */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Write a review (optional)</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Tell us what you liked or what could be improved..."
                            className="w-full min-h-[100px] p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-sPrimary focus:ring-1 focus:ring-sPrimary resize-none transition-all placeholder:text-slate-400 text-sm"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose} disabled={isLoading}>
                        Maybe Later
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading || rating === 0}
                        className="bg-sPrimary hover:bg-sPrimary/90 text-white min-w-[120px]"
                    >
                        {isLoading ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
                        {isLoading ? "Submitting..." : "Submit Review"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
