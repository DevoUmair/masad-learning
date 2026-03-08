"use client";
import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CoursesToolbar from './_components/CoursesToolbar';
import CoursesTable from './_components/CoursesTable';
import { useGetCoursesQuery } from '@/redux/course/courseApi';


export default function CourseManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: courses, isLoading, error } = useGetCoursesQuery();
    const [categoryFilter, setCategoryFilter] = useState("All");

    const apiCourses = courses?.courses || [];

    const mappedCourses = apiCourses.map(c => ({
        id: c._id,
        title: c.title,
        thumbnail: c.thumbnailImage?.url || null,
        instructor: c.instructor?.name || "Unknown",
        category: c.category?.name || "Uncategorized",
        rating: c.averageRating || 0,
        // students: c.instructor?.instructorProfile?.totalStudents || 0,
        students: c?.enrolledStudents?.length || 0,
        price: c.price === 0 ? "Free" : `$${c.price}`,
        status: c.isApproved ? "Published" : "In Review",
        lastUpdated: new Date(c.updatedAt).toLocaleDateString(),
        modules: c.modules?.length || 0
    }));

    const filteredCourses = mappedCourses.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === "All" || c.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="p-8 space-y-8 font-lexend max-w-7xl mx-auto h-[calc(100vh-2rem)] flex flex-col">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Course Management</h1>
                    <p className="text-slate-500">Moderate courses, review content, and track performance.</p>
                </div>
            </div>

            <CoursesToolbar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                categoryFilter={categoryFilter}
                onCategoryChange={setCategoryFilter}
            />

            <CoursesTable courses={filteredCourses} />

        </div>
    );
}
