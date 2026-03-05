"use client";
import NavBar from "@/app/_components/NavBar";
import TopBar from "@/app/_components/TopBar";
import Footer from "@/app/_components/Footer";
import CourseSidebar from "./_components/CourseSidebar";
import Curriculum from "./_components/Curriculum";
import Link from "next/link";
import Image from "next/image";
import { Star, Clock, BookOpen, BarChart, Globe, CheckCircle, Play, ArrowLeft, Loader2 } from "lucide-react";
import { useGetCourseByIdQuery } from "@/redux/course/courseApi";
import { useParams } from "next/navigation";
import CourseDetailsSkeleton from "./_components/Skelton";
export default function CourseDetailsPage() {
    const { id } = useParams();
    // Added isLoading and isError for better UX
    const { data, isLoading, isError } = useGetCourseByIdQuery(id);

    // 1. Handle Loading State
    if (isLoading) {
        return (
            <CourseDetailsSkeleton />
        );
    }

    // 2. Handle Error or Missing Data
    if (isError || !data || !data.course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-lg text-slate-600">Course not found or an error occurred.</p>
            </div>
        );
    }

    const course = data.course;

    // 3. Calculate dynamic stats from the data
    const totalSections = course.modules?.length || 0;
    const totalLessons = course.modules?.reduce((acc, module) => acc + (module.lessons?.length || 0), 0) || 0;
    const totalHours = course.courseIncludes?.totalVideoHours || 0;

    return (
        <div className="min-h-screen bg-slate-50 font-lexend">
            <TopBar />
            <NavBar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors">
                    <ArrowLeft size={16} />
                    Back to Courses
                </Link>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Hero / Media Section */}
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-slate-200">
                            {course.thumbnailImage?.url ? (
                                <Image
                                    src={course.thumbnailImage.url}
                                    alt={course.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-slate-400">
                                    No Image Available
                                </div>
                            )}
                        </div>

                        {/* Title & Metadata */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                {course.averageRating >= 4.5 && (
                                    <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold uppercase px-2 py-1 rounded">Bestseller</span>
                                )}
                                <div className="flex items-center gap-1">
                                    <span className="font-bold text-yellow-500 text-sm">
                                        {course.averageRating || "New"}
                                    </span>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} fill={i < Math.floor(course.averageRating || 0) ? "currentColor" : "none"} />
                                        ))}
                                    </div>
                                    <span className="text-xs text-slate-400 ml-1">({course.totalRatings || 0} ratings)</span>
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
                                {course.title}
                            </h1>

                            <p className="text-slate-600 leading-relaxed text-lg">
                                {course.description}
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatBox icon={Clock} label="Duration" value={`${totalHours} Hours`} />
                            <StatBox icon={BookOpen} label="Lectures" value={`${totalLessons} Lessons`} />
                            <StatBox icon={BarChart} label="Level" value={course.level || "All Levels"} />
                            <StatBox icon={Globe} label="Category" value={course.category?.name || "General"} />
                        </div>

                        {/* What you will learn */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">What you will learn</h2>
                            {course.whatYouWillLearn?.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    {course.whatYouWillLearn.map((item, index) => (
                                        <LearnItem key={index} text={item} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500">The instructor hasn't specified learning objectives yet.</p>
                            )}
                        </div>

                        {/* Course Content */}
                        <div>
                            <div className="flex items-end justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900">Course Content</h2>
                                <p className="text-xs text-slate-500 font-medium">
                                    {totalSections} Sections • {totalLessons} Lectures • {totalHours}h total length
                                </p>
                            </div>
                            {/* Pass the modules to your Curriculum component so it can render the sections dynamically */}
                            <Curriculum modules={course.modules} />
                        </div>

                        {/* Instructor */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Instructor</h2>
                            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row gap-6">
                                <div className="shrink-0">
                                    <div className="size-24 rounded-full bg-slate-200 overflow-hidden border-4 border-slate-100 flex items-center justify-center text-2xl font-bold text-slate-500">
                                        {/* Fallback to initials if no profile pic exists in JSON */}
                                        {course.instructor?.name?.charAt(0).toUpperCase() || "I"}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-sPrimary capitalize">
                                            {course.instructor?.name || "Instructor Name"}
                                        </h3>
                                        <p className="text-sm text-slate-500 font-medium">
                                            {course.instructor?.instructorProfile?.areaOfExpertise || "Expert Instructor"}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-6 text-xs font-semibold text-slate-600">
                                        <div className="flex items-center gap-1.5">
                                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                            {course.instructor?.instructorProfile?.averageRating || 0} Instructor Rating
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Globe size={14} />
                                            {course.instructor?.instructorProfile?.totalStudents || 0} Students
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Play size={14} />
                                            {course.instructor?.instructorProfile?.totalReviews || 0} Reviews
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        {/* Note: Kept static for now as reviews are not present in the provided JSON data */}

                    </div>

                    {/* Right Column - Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <CourseSidebar course={course} />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

function StatBox({ icon: Icon, label, value }) {
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <Icon size={20} className="text-blue-600" />
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{label}</p>
                <p className="text-sm font-bold text-slate-900">{value}</p>
            </div>
        </div>
    );
}

function LearnItem({ text }) {
    return (
        <div className="flex items-start gap-3">
            <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
            <p className="text-sm text-slate-700 font-medium leading-relaxed">{text}</p>
        </div>
    );
}

function ReviewCard({ name, date, initials, rating, text }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center">
                    {initials}
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-900">{name}</p>
                    <p className="text-xs text-slate-400">{date}</p>
                </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < rating ? "currentColor" : "none"} className={i >= rating ? "text-slate-200" : ""} />
                ))}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">"{text}"</p>
        </div>
    );
}