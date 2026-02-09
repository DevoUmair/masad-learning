"use client";
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TransactionsToolbar from './_components/TransactionsToolbar';
import TransactionsStats from './_components/TransactionsStats';
import TransactionsTable from './_components/TransactionsTable';

// Mock Data
const initialTransactions = [
    {
        id: "TRX-1001",
        student: { name: "Ahmed Khan", email: "ahmed.k@example.com" },
        course: "Strategic Leadership",
        instructor: "Dr. Sarah Al-Maktoum",
        amount: 49.99,
        date: "2023-10-24",
        status: "Completed"
    },
    {
        id: "TRX-1002",
        student: { name: "Layla Hassan", email: "layla.h@example.com" },
        course: "Executive Communication",
        instructor: "Dr. Sarah Al-Maktoum",
        amount: 59.99,
        date: "2023-10-23",
        status: "Completed"
    },
    {
        id: "TRX-1003",
        student: { name: "Omar Farooq", email: "omar.f@example.com" },
        course: "Python for Beginners",
        instructor: "Mohammed Al-Fayed",
        amount: 39.99,
        date: "2023-10-22",
        status: "Refunded"
    },
    {
        id: "TRX-1004",
        student: { name: "Zainab Ali", email: "zainab.a@example.com" },
        course: "Digital Marketing 101",
        instructor: "Fatima Al-Zahra",
        amount: 29.99,
        date: "2023-10-21",
        status: "Completed"
    },
    {
        id: "TRX-1005",
        student: { name: "Khalid Bin Walid", email: "khalid.w@example.com" },
        course: "Strategic Leadership",
        instructor: "Dr. Sarah Al-Maktoum",
        amount: 49.99,
        date: "2023-10-20",
        status: "Pending"
    },
];

export default function TransactionsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredTransactions = initialTransactions.filter(trx => {
        const matchesSearch =
            trx.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trx.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trx.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || trx.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalRevenue = filteredTransactions
        .filter(t => t.status === "Completed")
        .reduce((sum, t) => sum + t.amount, 0);

    const pendingAmount = filteredTransactions
        .filter(t => t.status === "Pending")
        .reduce((sum, t) => sum + t.amount, 0);

    const handleExportPDF = () => {
        window.print();
    };

    return (
        <div className="p-8 space-y-8 font-lexend max-w-7xl mx-auto h-[calc(100vh-2rem)] flex flex-col">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 dont-print">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Payment Transactions</h1>
                    <p className="text-slate-500">Monitor and manage all platform transactions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={handleExportPDF} variant="outline" className="gap-2">
                        <Download size={16} /> Export PDF Report
                    </Button>
                </div>
            </div>

            <TransactionsStats
                totalRevenue={totalRevenue}
                count={filteredTransactions.length}
                pendingAmount={pendingAmount}
            />

            <TransactionsToolbar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
            />

            {/* Print Header (Visible only on print) */}
            <div className="hidden print:block mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Transaction Report</h1>
                <p className="text-sm text-slate-500">Generated on {new Date().toLocaleDateString()}</p>
            </div>

            <TransactionsTable transactions={filteredTransactions} />

            <style jsx global>{`
                @media print {
                    .dont-print {
                        display: none !important;
                    }
                    body {
                        background: white;
                    }
                    .print\\:block {
                        display: block !important;
                    }
                    .print\\:border-none {
                        border: none !important;
                    }
                    .print\\:shadow-none {
                        box-shadow: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
