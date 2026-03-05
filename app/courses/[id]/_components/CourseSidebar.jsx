"use client";

import { useEffect } from "react"; // Added useEffect
import { Button } from "@/components/ui/button";
import { MonitorPlay, FileText, Infinity, Smartphone, Trophy, Share2, Heart } from "lucide-react";
import { useEnrollCourseMutation } from "@/redux/student/studentAPi";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function CourseSidebar({ course }) {
    const user = useSelector((state) => state.auth.user);

    const [enrollCourse, { isLoading, isSuccess, isError, error }] = useEnrollCourseMutation();

    const isEnrolled = isSuccess || course?.enrolledStudents?.some(
        (studentId) => studentId === user?._id || studentId?._id === user?._id
    );

    useEffect(() => {
        if (isSuccess) {
            toast.success("Successfully enrolled in the course!");
        }
        if (isError) {
            const errorMessage = error?.data?.message || "Failed to enroll. Please try again.";
            toast.error(errorMessage);
        }
    }, [isSuccess, isError, error]);

    const handleEnrollCourse = () => {
        if (!user) {
            return toast.error("Please login to enroll in this course");
        }
        enrollCourse(course._id);
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-6 sticky top-24">
            {/* Price Header */}
            <div className="mb-6 text-center">
                <span className="text-3xl font-black text-slate-900">{course.price} AED</span>
            </div>

            {/* Actions */}
            <div className="space-y-3 mb-8">
                <Button
                    onClick={handleEnrollCourse}
                    disabled={isLoading || isEnrolled}
                    className="w-full h-12 text-base font-bold bg-sPrimary hover:bg-blue-700 shadow-md shadow-blue-200"
                >
                    {isLoading ? "Processing..." : isEnrolled ? "✓ Enrolled" : "Enroll Now"}
                </Button>

                {!isEnrolled && (
                    <Button variant="outline" className="w-full h-12 text-base font-bold border-2 border-sPrimary text-sPrimary hover:bg-blue-50">
                        Add to Cart
                    </Button>
                )}
            </div>

            {/* Inclusions */}
            <div className="space-y-4 mb-8">
                <p className="font-bold text-sm text-slate-900">This course includes:</p>
                <ul className="space-y-3">
                    <FeatureItem icon={FileText} text={`${course.courseIncludes?.totalVideoHours || 0} hours on-demand video`} />
                    {course.courseIncludes?.fullLifetimeAccess && (
                        <FeatureItem icon={Infinity} text="Full lifetime access" />
                    )}
                    <FeatureItem icon={Smartphone} text="Access on mobile and TV" />
                    {course.courseIncludes?.certificateOfCompletion && (
                        <FeatureItem icon={Trophy} text="Certificate of completion" />
                    )}
                </ul>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                    onClick={() => toast.info("Link copied to clipboard!")}
                    className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sPrimary transition-colors"
                >
                    <Share2 size={18} /> Share
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-red-500 transition-colors">
                    <Heart size={18} /> Save
                </button>
            </div>
        </div>
    );
}

function FeatureItem({ icon: Icon, text }) {
    return (
        <li className="flex items-center gap-3 text-sm text-slate-600">
            <Icon size={16} className="text-sPrimary shrink-0" />
            <span>{text}</span>
        </li>
    );
}