'use client';
import { TrendingUp, Trophy, Clock, Award, CheckCircle, PlayCircle, Zap } from "lucide-react";
import { ActiveCourseCard } from "./_components/ActiveCourse";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function StudentDashboard() {
    const { user } = useSelector((state) => state.auth);
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        Welcome back, {user?.name || 'Student'}! 👋
                    </h2>
                    <p className="text-sSecondary mt-1">You have 2 courses in progress.</p>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ActiveCourseCard
                                id={1}
                                title="Advanced Project Management for UAE Enterprises"
                                instructor="Dr. Sarah Khan"
                                progress={65}
                                category="Business"
                                image="https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800"
                            />
                            <ActiveCourseCard
                                id={2}
                                title="Sustainable Energy Fundamentals"
                                instructor="Dr. James Wilson"
                                progress={10}
                                category="Engineering"
                                image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
                            />
                        </div>
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
