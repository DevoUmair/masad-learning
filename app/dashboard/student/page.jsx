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

                {/* Sidebar Area */}
                <div className="space-y-6">
                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-slate-200 dark:border-gray-700">
                        <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                        <div className="space-y-6">
                            {[
                                { title: "Completed Lesson 2.4", course: "Strategic Leadership", time: "2 hours ago", icon: CheckCircle, color: "text-green-500 bg-green-50" },
                                { title: "Earned Certificate", course: "Financial Analysis", time: "1 day ago", icon: Award, color: "text-purple-500 bg-purple-50" },
                                { title: "Started New Course", course: "AI Fundamentals", time: "2 days ago", icon: PlayCircle, color: "text-blue-500 bg-blue-50" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className={cn("size-10 rounded-full flex items-center justify-center shrink-0", item.color)}>
                                        <item.icon size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{item.title}</p>
                                        <p className="text-xs text-sSecondary mt-0.5">{item.course}</p>
                                        <p className="text-[10px] text-slate-400 mt-1">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
