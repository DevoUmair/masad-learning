"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, LayoutDashboard, PlayCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const courseId = searchParams.get("course_id");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden text-center transform transition-all hover:scale-[1.02] duration-300">
            {/* Header Graphic */}
            <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-8 flex justify-center items-center">
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-md animate-pulse">
                    <CheckCircle2 size={64} className="text-white drop-shadow-md" />
                </div>
            </div>

            {/* Content */}
            <div className="p-8 pb-10">
                <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                    Payment Successful!
                </h1>
                <p className="text-slate-500 mb-8 font-medium">
                    Thank you for your purchase. You are now officially enrolled in the course and ready to start learning.
                </p>

                {/* Actions */}
                <div className="space-y-4">
                    {courseId ? (
                        <Link href={`/dashboard/student/courses/${courseId}`} className="block">
                            <Button className="w-full h-14 text-lg font-bold bg-sPrimary hover:bg-blue-700 shadow-lg shadow-blue-200 group flex items-center justify-center gap-2 transition-all">
                                <PlayCircle size={22} className="group-hover:scale-110 transition-transform" />
                                Go to Course Now
                            </Button>
                        </Link>
                    ) : (
                        <Link href={`/dashboard/student`} className="block">
                            <Button className="w-full h-14 text-lg font-bold bg-sPrimary hover:bg-blue-700 shadow-lg shadow-blue-200 group flex items-center justify-center gap-2 transition-all">
                                <LayoutDashboard size={22} className="group-hover:scale-110 transition-transform" />
                                Go to Dashboard
                            </Button>
                        </Link>
                    )}

                    {courseId && (
                        <Link href="/dashboard/student" className="block mt-4">
                            <Button variant="outline" className="w-full h-14 text-lg font-bold border-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 flex items-center justify-center gap-2 transition-all">
                                <LayoutDashboard size={20} />
                                Dashboard
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Suspense fallback={<Loader2 className="animate-spin text-sPrimary" size={48} />}>
                <SuccessContent />
            </Suspense>
        </div>
    );
}
