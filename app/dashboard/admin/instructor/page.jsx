"use client";
import React, { useState } from 'react';
import { InstructorToolbar } from './_components/InstructorToolbar';
import { InstructorTable } from './_components/InstructorTable';
import { PayoutModal } from './_components/PayoutModal';

// Mock Data (Moved from component to simulate data source)
const initialInstructors = [
    {
        id: 1,
        name: "Dr. Sarah Al-Maktoum",
        email: "sarah.m@example.com",
        avatar: "SM",
        coursesCount: 5,
        students: 450,
        totalRevenue: 12500,
        paidAmount: 10000,
        pendingAmount: 2500,
        status: "Active",
        joinDate: "Oct 15, 2023"
    },
    {
        id: 2,
        name: "Mohammed Al-Fayed",
        email: "mo.fayed@example.com",
        avatar: "MF",
        coursesCount: 3,
        students: 210,
        totalRevenue: 5400,
        paidAmount: 5400,
        pendingAmount: 0,
        status: "Active",
        joinDate: "Nov 02, 2023"
    },
    {
        id: 3,
        name: "Fatima Al-Zahra",
        email: "fatima.z@example.com",
        avatar: "FZ",
        coursesCount: 2,
        students: 150,
        totalRevenue: 3200,
        paidAmount: 2000,
        pendingAmount: 1200,
        status: "Pending Verification",
        joinDate: "Dec 10, 2023"
    },
    {
        id: 4,
        name: "Dr. Ali Hassan",
        email: "ali.hassan@example.com",
        avatar: "AH",
        coursesCount: 8,
        students: 1200,
        totalRevenue: 25000,
        paidAmount: 24000,
        pendingAmount: 1000,
        status: "Active",
        joinDate: "Sep 01, 2023"
    },
];

export default function InstructorManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [instructors, setInstructors] = useState(initialInstructors);
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);

    const handleOpenPayout = (instructor) => {
        setSelectedInstructor(instructor);
        setIsPayoutModalOpen(true);
    };

    const handleConfirmPayout = (instructorId, amount) => {
        setInstructors(prev => prev.map(inst => {
            if (inst.id === instructorId) {
                return {
                    ...inst,
                    paidAmount: inst.paidAmount + amount,
                    pendingAmount: inst.pendingAmount - amount
                };
            }
            return inst;
        }));
        // In a real app, you would also trigger a toast notification here
        console.log(`Processed payout of $${amount} for instructor ${instructorId}`);
    };

    const filteredInstructors = instructors.filter(i =>
        i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 space-y-8 font-lexend max-w-7xl mx-auto h-[calc(100vh-2rem)] flex flex-col">

            <InstructorToolbar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <InstructorTable
                instructors={filteredInstructors}
                onPayoutClick={handleOpenPayout}
            />

            <PayoutModal
                isOpen={isPayoutModalOpen}
                onClose={() => setIsPayoutModalOpen(false)}
                instructor={selectedInstructor}
                onConfirm={handleConfirmPayout}
            />
        </div>
    );
}
