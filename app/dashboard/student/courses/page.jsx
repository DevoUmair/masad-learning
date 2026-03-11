'use client'
import { Loader2 } from "lucide-react";
import { ActiveCourseCard } from "../_components/ActiveCourse";
import { useGetEnrolledCoursesQuery } from "@/redux/student/studentAPi";

export default function CoursesPage() {
    const { data: enrolledCourses, isLoading } = useGetEnrolledCoursesQuery();

    return (
        <div className="space-y-6">
            <div className="flex flex-col ">
                <h2 className="text-2xl font-black text-sPrimary dark:text-white tracking-tight">
                    My Courses
                </h2>
                <p className="text-sSecondary">Manage and continue your learning journey.</p>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 size={32} className="animate-spin text-sPrimary" />
                </div>
            ) : enrolledCourses?.courses?.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-slate-500 text-lg font-medium">You haven&apos;t enrolled in any courses yet.</p>
                    <a href="/courses" className="text-sm font-bold text-sPrimary hover:underline mt-2 inline-block">
                        Browse Courses
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses?.courses?.map((course) => (
                        <ActiveCourseCard
                            key={course._id}
                            course={course}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
