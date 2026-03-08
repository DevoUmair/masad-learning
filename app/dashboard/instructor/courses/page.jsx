"use client";
import React from 'react';
import { Search, Plus, Filter, Book, PenLine, Trash2, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useGetInstructorCoursesQuery, useDeleteCourseMutation } from '@/redux/course/courseApi';
import { toast } from 'sonner';
import { useState } from 'react';
import DeleteConfirmationModal from '@/app/dashboard/_components/DeleteConfirmationModal';

export default function MyCoursesPage() {
    const user = useSelector((state) => state.auth.user);
    console.log(user);
    const { data: coursesData, isLoading } = useGetInstructorCoursesQuery(user?._id, {
        skip: !user?._id,
    });

    const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    const handleDeleteClick = (courseId) => {
        setSelectedCourseId(courseId);
        setIsModalOpen(true);
    };


    const handleConfirmDelete = async () => {
        try {
            await deleteCourse(selectedCourseId).unwrap();
            setIsModalOpen(false);
            // Show a toast or subtle alert here
            toast.success("Course deleted successfully");

        } catch (err) {
            console.error("Deletion failed:", err);
            toast.error("Failed to delete course: " + (err.data?.message || err.message));
        }
    };
    const courses = coursesData?.courses || [];

    return (
        <div className="space-y-6 font-lexend">
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                isLoading={isDeleting}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900">My Courses</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage your courses and course content</p>
                </div>
                <Link href="/dashboard/instructor/courses/new">
                    <Button className="bg-sPrimary hover:bg-sPrimary/90 text-white font-bold cursor-pointer">
                        <Plus size={18} className="mr-2" />
                        Create New Course
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search your courses..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sPrimary focus:ring-1 focus:ring-sPrimary transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Button variant="outline" className="flex items-center gap-2 border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
                            <Filter size={16} />
                            Filter
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-[40%]">Course Name</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Level</th>
                                <th className="text-right py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center">
                                        <Loader2 size={24} className="animate-spin text-sPrimary mx-auto" />
                                        <p className="text-sm text-slate-500 mt-2">Loading your courses...</p>
                                    </td>
                                </tr>
                            ) : courses.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center">
                                        <Book size={32} className="text-slate-300 mx-auto mb-2" />
                                        <p className="text-sm text-slate-500">You haven't created any courses yet.</p>
                                        <Link href="/dashboard/instructor/courses/new">
                                            <Button className="mt-4 bg-sPrimary hover:bg-sPrimary/90 text-white font-bold cursor-pointer" size="sm">
                                                <Plus size={16} className="mr-1" /> Create Your First Course
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ) : (
                                courses.map((course) => (
                                    <tr key={course._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-4">
                                                {course.thumbnailImage?.url ? (
                                                    <img
                                                        src={course.thumbnailImage.url}
                                                        alt={course.title}
                                                        className="size-12 rounded-lg object-cover border border-slate-200 shrink-0"
                                                    />
                                                ) : (
                                                    <div className="size-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-sPrimary">
                                                        <Book size={20} />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 cursor-pointer hover:text-sPrimary transition-colors">
                                                        {course.title}
                                                    </p>
                                                    <p className="text-xs text-slate-500">{course.category?.name || "Uncategorized"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-sm font-bold text-slate-900">
                                                {course.price > 0 ? `AED ${course.price}` : 'Not approved'}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${course.isApproved
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                {course.isApproved ? 'Approved' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-sm font-medium text-slate-600">{course.level || "All Levels"}</div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/dashboard/instructor/courses/${course._id}`}>
                                                    <button className="p-2 text-slate-400 hover:text-sPrimary hover:bg-blue-50 rounded-lg transition-colors cursor-pointer" title="Edit">
                                                        <PenLine size={18} />
                                                    </button>
                                                </Link>
                                                <button onClick={() => handleDeleteClick(course._id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Delete">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
