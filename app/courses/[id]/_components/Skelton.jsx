"use client";

export default function CourseDetailsSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse font-lexend">
            {/* Breadcrumb Skeleton */}
            <div className="h-4 w-32 bg-slate-200 rounded mb-6"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column - Main Content Skeleton */}
                <div className="lg:col-span-2 space-y-10">

                    {/* Hero Video/Image Skeleton */}
                    <div className="aspect-video bg-slate-200 rounded-2xl w-full"></div>

                    {/* Title & Metadata Skeleton */}
                    <div>
                        <div className="flex gap-3 mb-4">
                            <div className="h-6 w-20 bg-slate-200 rounded"></div>
                            <div className="h-6 w-32 bg-slate-200 rounded"></div>
                        </div>
                        <div className="h-10 w-3/4 bg-slate-200 rounded mb-4"></div>
                        <div className="h-4 w-full bg-slate-200 rounded mb-2"></div>
                        <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
                    </div>

                    {/* Stats Grid Skeleton */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-24 bg-slate-200 rounded-xl border border-slate-100"></div>
                        ))}
                    </div>

                    {/* What you will learn Skeleton */}
                    <div className="border border-slate-200 rounded-2xl p-8">
                        <div className="h-6 w-48 bg-slate-200 rounded mb-6"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="size-5 bg-slate-200 rounded-full shrink-0"></div>
                                    <div className="h-4 w-full bg-slate-200 rounded mt-0.5"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Curriculum Skeleton */}
                    <div>
                        <div className="flex justify-between mb-6">
                            <div className="h-6 w-40 bg-slate-200 rounded"></div>
                            <div className="h-4 w-48 bg-slate-200 rounded"></div>
                        </div>
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-16 bg-slate-200 rounded-xl border border-slate-100"></div>
                            ))}
                        </div>
                    </div>

                    {/* Instructor Skeleton */}
                    <div>
                        <div className="h-6 w-32 bg-slate-200 rounded mb-6"></div>
                        <div className="border border-slate-200 rounded-2xl p-8 flex flex-col md:flex-row gap-6">
                            <div className="size-24 rounded-full bg-slate-200 shrink-0"></div>
                            <div className="space-y-4 w-full">
                                <div className="h-6 w-48 bg-slate-200 rounded"></div>
                                <div className="h-4 w-32 bg-slate-200 rounded"></div>
                                <div className="flex gap-4">
                                    <div className="h-4 w-24 bg-slate-200 rounded"></div>
                                    <div className="h-4 w-24 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Sidebar Skeleton */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 border border-slate-200 rounded-2xl p-6">
                        <div className="h-10 w-32 bg-slate-200 rounded mb-6"></div>
                        <div className="space-y-3 mb-8">
                            <div className="h-12 w-full bg-slate-200 rounded-xl"></div>
                            <div className="h-12 w-full bg-slate-200 rounded-xl"></div>
                            <div className="h-3 w-48 bg-slate-200 rounded mx-auto mt-4"></div>
                        </div>
                        <div className="h-5 w-40 bg-slate-200 rounded mb-4"></div>
                        <div className="space-y-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="size-5 bg-slate-200 rounded shrink-0"></div>
                                    <div className="h-4 w-full bg-slate-200 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}