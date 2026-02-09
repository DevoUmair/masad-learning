"use client";
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import StudentToolbar from './_components/StudentToolbar';
import StudentTable from './_components/StudentTable';
import StudentDetailsPanel from './_components/StudentDetailsPanel';

// Mock Data
const initialStudents = [
    {
        id: 1,
        name: "Ahmed Khan",
        email: "ahmed.k@example.com",
        avatar: "AK",
        enrolledCourses: 4,
        completedCourses: 1,
        lastActive: "2 hours ago",
        totalSpent: "$299.99",
        purchases: [
            { course: "Advanced React Patterns", instructor: "Dr. Sarah Al-Maktoum", price: "$49.99", date: "Oct 15, 2023" },
            { course: "Python for Data Science", instructor: "Dr. Ali Hassan", price: "$89.99", date: "Sep 20, 2023" }
        ]
    },
    {
        id: 2,
        name: "Layla Mahmoud",
        email: "layla.m@example.com",
        avatar: "LM",
        enrolledCourses: 2,
        completedCourses: 0,
        lastActive: "1 day ago",
        totalSpent: "$149.50",
        purchases: [
            { course: "UI/UX Design Masterclass", instructor: "Fatima Al-Zahra", price: "$75.00", date: "Nov 05, 2023" }
        ]
    },
    {
        id: 3,
        name: "Omar Farooq",
        email: "omar.f@example.com",
        avatar: "OF",
        enrolledCourses: 6,
        completedCourses: 3,
        lastActive: "5 mins ago",
        totalSpent: "$450.00",
        purchases: [
            { course: "Cloud Infrastructure", instructor: "Mohammed Al-Fayed", price: "$120.00", date: "Aug 10, 2023" }
        ]
    },
];

export default function StudentManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);

    const filteredStudents = initialStudents.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
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

            <div className="flex flex-col lg:flex-row gap-8 flex-1 overflow-hidden">
                <StudentTable
                    students={filteredStudents}
                    selectedStudent={selectedStudent}
                    onSelectStudent={setSelectedStudent}
                />

                {selectedStudent && (
                    <StudentDetailsPanel
                        student={selectedStudent}
                        onClose={() => setSelectedStudent(null)}
                    />
                )}
            </div>
        </div>
    );
}
