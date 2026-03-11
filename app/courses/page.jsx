"use client";
import React, { useState, useMemo } from 'react';
import NavBar from "@/app/_components/NavBar";
import TopBar from "@/app/_components/TopBar";
import Footer from "@/app/_components/Footer";
import SidebarFilter from "./_components/SidebarFilter";
import CourseCard from "./_components/CourseCard";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useGetCoursesQuery } from "@/redux/course/courseApi";
import { useGetCategoriesQuery } from "@/redux/categories/categoriesApi";

const defaultFilters = {
    categories: [],
    level: null,
    rating: null,
};

export default function CoursesPage() {
    const { data, isLoading } = useGetCoursesQuery({ isApproved: true });
    const { data: categoriesData } = useGetCategoriesQuery();
    const [filters, setFilters] = useState(defaultFilters);

    const handleFilterChange = (key, value) => {
        if (key === 'reset') {
            setFilters(defaultFilters);
            return;
        }
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const apiCourses = data?.courses || [];
    const categoriesList = categoriesData?.categories || [];

    // Build a category ID → name map for display
    const categoryMap = useMemo(() => {
        const map = {};
        categoriesList.forEach(c => { map[c._id] = c.name; });
        return map;
    }, [categoriesList]);

    // Filter courses client-side
    const filteredCourses = useMemo(() => {
        return apiCourses.filter(course => {
            // Category filter (multi-select)
            if (filters.categories.length > 0) {
                const courseCategory = course.category?._id || course.category;
                if (!filters.categories.includes(courseCategory)) return false;
            }

            // Level filter
            if (filters.level && filters.level !== "All Levels") {
                if (course.level !== filters.level) return false;
            }

            // Rating filter (& up)
            if (filters.rating) {
                if ((course.averageRating || 0) < filters.rating) return false;
            }

            return true;
        });
    }, [apiCourses, filters]);

    // Build active filter labels for pills
    const activeFilterLabels = useMemo(() => {
        const labels = [];
        filters.categories.forEach(catId => {
            if (categoryMap[catId]) {
                labels.push({ key: 'category', id: catId, label: categoryMap[catId] });
            }
        });
        if (filters.level && filters.level !== "All Levels") {
            labels.push({ key: 'level', id: 'level', label: filters.level });
        }
        if (filters.rating) {
            labels.push({ key: 'rating', id: 'rating', label: `${filters.rating}★ & up` });
        }
        return labels;
    }, [filters, categoryMap]);

    const removeFilter = (filter) => {
        if (filter.key === 'category') {
            handleFilterChange('categories', filters.categories.filter(id => id !== filter.id));
        } else if (filter.key === 'level') {
            handleFilterChange('level', null);
        } else if (filter.key === 'rating') {
            handleFilterChange('rating', null);
        }
    };

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
                                <SidebarFilter filters={filters} onFilterChange={handleFilterChange} />
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <SidebarFilter filters={filters} onFilterChange={handleFilterChange} />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 mb-2">Explore Courses</h1>
                                <p className="text-slate-500 text-sm">
                                    Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                                </p>
                            </div>

                        </div>

                        {/* Active Filters */}
                        {activeFilterLabels.length > 0 && (
                            <div className="flex flex-wrap items-center gap-3 mb-8">
                                <button className="px-4 py-1.5 bg-sPrimary text-white rounded-full text-sm font-bold shadow-sm shadow-blue-200">
                                    All Courses
                                </button>
                                {activeFilterLabels.map((filter) => (
                                    <button
                                        key={filter.id}
                                        onClick={() => removeFilter(filter)}
                                        className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-full text-sm font-medium text-slate-700 transition-colors group"
                                    >
                                        {filter.label}
                                        <X size={14} className="text-slate-400 group-hover:text-red-500" />
                                    </button>
                                ))}
                                <button onClick={() => handleFilterChange('reset')} className="text-xs font-bold text-sPrimary hover:underline ml-2">Clear All</button>
                            </div>
                        )}

                        {/* Course Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                            {isLoading ? (
                                [...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 animate-pulse">
                                        <div className="h-40 bg-slate-200 rounded-xl mb-4" />
                                        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                                        <div className="h-3 bg-slate-200 rounded w-1/2" />
                                    </div>
                                ))
                            ) : filteredCourses.length === 0 ? (
                                <div className="col-span-full text-center py-16">
                                    <p className="text-slate-500 text-lg font-medium">No courses match your filters.</p>
                                    <button onClick={() => handleFilterChange('reset')} className="mt-3 text-sm font-bold text-sPrimary hover:underline">
                                        Clear all filters
                                    </button>
                                </div>
                            ) : (
                                filteredCourses.map((course) => (
                                    <CourseCard key={course._id} course={course} />
                                ))
                            )}
                        </div>
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
}
