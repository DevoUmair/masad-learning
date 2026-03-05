"use client";
import React, { useState } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import StudentToolbar from './_components/StudentToolbar';
import StudentTable from './_components/StudentTable';
import StudentDetailsPanel from './_components/StudentDetailsPanel';
import { useGetAllUsersQuery } from '@/redux/auth/AuthApi';

export default function StudentManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const { data, isLoading } = useGetAllUsersQuery("student");

    const students = data || [];

    const filteredStudents = students.filter(s =>
        s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 space-y-8 font-lexend max-w-7xl mx-auto h-[calc(100vh-2rem)] flex flex-col">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Student Management</h1>
                    <p className="text-slate-500">View student details, enrollments, and transaction history.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                        <ExternalLink size={16} /> Export Data
                    </Button>
                </div>
            </div>

            <StudentToolbar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <div className="relative flex-1 overflow-hidden">
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center h-full">
                        <Loader2 size={32} className="animate-spin text-sPrimary" />
                    </div>
                ) : (
                    <StudentTable
                        students={filteredStudents}
                        selectedStudent={selectedStudent}
                        onSelectStudent={setSelectedStudent}
                    />
                )}

                {selectedStudent && (
                    <div className="absolute top-0 right-0 h-full z-30">
                        <StudentDetailsPanel
                            student={selectedStudent}
                            onClose={() => setSelectedStudent(null)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
