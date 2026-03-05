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
import { useApproveCourseMutation } from '@/redux/course/courseApi';
import { Loader2, CheckCircle2 } from 'lucide-react';

const ApproveCourseModal = ({ isOpen, onClose, courseId }) => {
    const [price, setPrice] = useState('');
    const [approveCourse, { isLoading }] = useApproveCourseMutation();

    const handleApprove = async () => {
        if (!price || isNaN(price) || Number(price) < 0) {
            alert("Please enter a valid price.");
            return;
        }

        try {
            const res = await approveCourse({ id: courseId, price: Number(price) }).unwrap();
            if (res.success) {
                alert("Course approved successfully!");
                setPrice('');
                onClose();
                window.location.reload();
            }
        } catch (error) {
            console.error("Failed to approve course:", error);
            alert(error?.data?.message || "Failed to approve course.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[420px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <CheckCircle2 size={20} className="text-green-600" />
                        Approve Course
                    </DialogTitle>
                    <DialogDescription>
                        Set the price for this course and approve it for publishing.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="price">Course Price (AED)</Label>
                        <Input
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="e.g. 49.99"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleApprove}
                        disabled={isLoading || !price}
                        // className="bg-green-600 hover:bg-green-700 text-white"
                        className="bg-sPrimary hover:bg-sPrimary/90 text-white font-bold cursor-pointer"
                    >
                        {isLoading ? <Loader2 size={16} className="mr-2 animate-spin" /> : null}
                        {isLoading ? 'Approving...' : 'Approve & Set Price'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ApproveCourseModal;