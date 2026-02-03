"use client";
import NavBar from "@/app/_components/NavBar";
import TopBar from "@/app/_components/TopBar";
import Footer from "@/app/_components/Footer";
import SidebarFilter from "./_components/SidebarFilter";
import CourseCard from "./_components/CourseCard";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const courses = [
    {
        id: 1,
        title: "Advanced Project Management Professional (PMP)",
        instructor: "Dr. Sarah Ahmed",
        rating: 4.8,
        reviews: 1240,
        duration: "24h",
        level: "Intermediate",
        price: 850,
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
        badge: "Bestseller"
    },
    {
        id: 2,
        title: "Digital Marketing Essentials for UAE Market",
        instructor: "John Smith",
        rating: 4.5,
        reviews: 850,
        duration: "12h",
        level: "Beginner",
        price: 450,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        badge: "New"
    },
    {
        id: 3,
        title: "Enterprise Cybersecurity Fundamentals",
        instructor: "Michael Chen",
        rating: 4.9,
        reviews: 2100,
        duration: "40h",
        level: "Advanced",
        price: 1200,
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        badge: "Recommended"
    },
    {
        id: 4,
        title: "Leadership in the Digital Age",
        instructor: "Dr. Omar Al-Hashimi",
        rating: 4.7,
        reviews: 600,
        duration: "8h",
        level: "Advanced",
        price: 550,
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
        badge: null
    },
    {
        id: 5,
        title: "Financial Analysis for Managers",
        instructor: "Linda Roberts",
        rating: 4.6,
        reviews: 450,
        duration: "15h",
        level: "Intermediate",
        price: 700,
        image: "https://images.unsplash.com/photo-1554224155-98406894d009?auto=format&fit=crop&q=80&w=800",
        badge: null
    },
    {
        id: 6,
        title: "Cloud Architecture with AWS",
        instructor: "Kevin Wright",
        rating: 4.8,
        reviews: 980,
        duration: "30h",
        level: "Advanced",
        price: 950,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        badge: null
    },
];

const activeFilters = ["Data Science", "UI/UX Design", "Management"];

export default function CoursesPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-lexend">
            <TopBar />
            <NavBar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Mobile Filter Trigger */}
                    <div className="lg:hidden mb-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                    <span className="flex items-center gap-2"><SlidersHorizontal size={16} /> Filters</span>
                                    <ChevronDown size={16} />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-full sm:w-80 overflow-y-auto p-10">
                                <SidebarFilter />
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <SidebarFilter />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 mb-2">Explore Courses</h1>
                                <p className="text-slate-500 text-sm">Showing 1,240 courses for your development</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-500">Sort by:</span>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:border-sPrimary transition-colors">
                                    Most Popular
                                    <ChevronDown size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Active Filters */}
                        <div className="flex flex-wrap items-center gap-3 mb-8">
                            <button className="px-4 py-1.5 bg-sPrimary text-white rounded-full text-sm font-bold shadow-sm shadow-blue-200">
                                All Courses
                            </button>
                            {activeFilters.map((filter) => (
                                <button key={filter} className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-full text-sm font-medium text-slate-700 transition-colors group">
                                    {filter}
                                    <X size={14} className="text-slate-400 group-hover:text-red-500" />
                                </button>
                            ))}
                            <button className="text-xs font-bold text-sPrimary hover:underline ml-2">Clear All</button>
                        </div>

                        {/* Course Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                            {courses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-2">
                            <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-colors">
                                <ChevronDown size={20} className="rotate-90" />
                            </button>
                            <button className="size-10 flex items-center justify-center rounded-lg bg-sPrimary text-white font-bold shadow-sm shadow-blue-200">
                                1
                            </button>
                            <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors">
                                2
                            </button>
                            <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors">
                                3
                            </button>
                            <span className="text-slate-400 px-2">...</span>
                            <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors">
                                12
                            </button>
                            <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-colors">
                                <ChevronDown size={20} className="-rotate-90" />
                            </button>
                        </div>
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
}
