"use client";
import React from 'react';
import { Card } from "@/components/ui/card";
import StudentHeader from './_components/StudentHeader';
import StudentToolbar from './_components/StudentToolbar';
import StudentListTable from './_components/StudentListTable';
import { useGetAllEnrolledStudentsQuery } from '@/redux/instructor/instructorApi';

export default function StudentProgressPage() {
    const { data: progressRecords, isLoading, error } = useGetAllEnrolledStudentsQuery();

    if (isLoading) return <div className="p-8 text-center">Loading students...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error loading students</div>;

    const students = progressRecords?.map(record => ({
        id: record._id,
        studentId: record.student?._id,
        name: record.student?.name || "Unknown Student",
        email: record.student?.email || "No Email",
        course: record.course?.title || "Unknown Course",
        coursesEnrolled: record.coursesEnrolled || 1,
        progress: record.completionPercentage || 0,
        joinedDate: record.createdAt ? new Date(record.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }) : "N/A",
        lastActive: record.updatedAt ? new Date(record.updatedAt).toLocaleDateString() : "N/A",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4g_2Qj3LsNR-iqUAFm6ut2EQVcaou4u2YXw&s"
    })) || [];

    return (
        <div className="space-y-6 font-lexend">
            <StudentHeader />

            <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <StudentToolbar />
                <StudentListTable students={students} />


            </Card>
        </div>
    );
}
