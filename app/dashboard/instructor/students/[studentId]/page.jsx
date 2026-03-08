"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import StudentInfoCard from '../_components/StudentInfoCard';
import StudentCoursesTable from '../_components/StudentCoursesTable';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { useGetStudentProfileQuery } from '@/redux/instructor/instructorApi';

export default function StudentDetailPage() {
    const params = useParams();
    const studentId = params?.studentId;

    const { data, isLoading, error } = useGetStudentProfileQuery(studentId);

    if (isLoading) return <div className="p-8 text-center">Loading student profile...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error loading student profile</div>;

    const { student, courses } = data || {};

    return (
        <div className="space-y-6 font-lexend">
            <div>
                <Link href="/dashboard/instructor/students" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-4">
                    <ArrowLeft size={16} />
                    Back to Students
                </Link>
                {student && <StudentInfoCard student={student} />}
            </div>

            {courses && <StudentCoursesTable courses={courses} />}
        </div>
    );
}
