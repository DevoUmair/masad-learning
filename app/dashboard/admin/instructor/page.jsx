"use client";
import React, { useState } from 'react';
import { InstructorToolbar } from './_components/InstructorToolbar';
import { InstructorTable } from './_components/InstructorTable';
import { PayoutModal } from './_components/PayoutModal';
import { useGetAllUsersQuery } from '@/redux/auth/AuthApi';
import { Loader2 } from 'lucide-react';

export default function InstructorManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
    const { data, isLoading } = useGetAllUsersQuery("instructor");

    const instructors = data || [];

    const handleOpenPayout = (instructor) => {
        setSelectedInstructor(instructor);
        setIsPayoutModalOpen(true);
    };

    const handleConfirmPayout = (instructorId, amount) => {
        console.log(`Processed payout of $${amount} for instructor ${instructorId}`);
    };

    const filteredInstructors = instructors.filter(i =>
        i.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 space-y-8 font-lexend max-w-7xl mx-auto h-[calc(100vh-2rem)] flex flex-col">

            <InstructorToolbar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            {isLoading ? (
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 size={32} className="animate-spin text-sPrimary" />
                </div>
            ) : (
                <InstructorTable
                    instructors={filteredInstructors}
                    onPayoutClick={handleOpenPayout}
                />
            )}

            <PayoutModal
                isOpen={isPayoutModalOpen}
                onClose={() => setIsPayoutModalOpen(false)}
                instructor={selectedInstructor}
                onConfirm={handleConfirmPayout}
            />
        </div>
    );
}
