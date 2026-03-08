'use client';
import { TrendingUp, Trophy, Clock, Award, CheckCircle, PlayCircle, Zap, Loader2 } from "lucide-react";
import { ActiveCourseCard } from "./_components/ActiveCourse";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useGetEnrolledCoursesQuery } from "@/redux/student/studentAPi";

export default function StudentDashboard() {
    const { user } = useSelector((state) => state.auth);
    const { data: enrolledData, isLoading } = useGetEnrolledCoursesQuery();
    const courses = enrolledData?.courses || [];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        Welcome back, {user?.name || 'Student'}! 👋
                    </h2>
                    <p className="text-sSecondary mt-1">
                        {courses.length > 0 ? `You have ${courses.length} course${courses.length !== 1 ? 's' : ''} enrolled.` : 'Start your learning journey today.'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="xl:col-span-2 space-y-8">
                    {/* Continue Learning */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold">Continue Learning</h3>
                            <Link href="/dashboard/student/courses" className="text-sm font-semibold text-sPrimary hover:underline">View All</Link>
                        </div>
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 size={28} className="animate-spin text-sPrimary" />
                            </div>
                        ) : courses.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                                <p className="text-slate-500">No courses yet. <Link href="/courses" className="text-sPrimary font-bold hover:underline">Browse courses</Link></p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {courses.slice(0, 2).map((course) => (
                                    <ActiveCourseCard key={course._id} course={course} />
                                ))}
                            </div>
                        )}
                    </section>

                </div>


            </div>
        </div>
    );
}
