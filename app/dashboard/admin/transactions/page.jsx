"use client";
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TransactionsToolbar from './_components/TransactionsToolbar';
import TransactionsStats from './_components/TransactionsStats';
import TransactionsTable from './_components/TransactionsTable';

import { useGetTransactionsQuery } from '@/redux/transaction/transactionapi';

export default function TransactionsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const { data: transactions, isLoading, error } = useGetTransactionsQuery();

    const filteredTransactions = (transactions || []).filter(trx => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            (trx.student?.name || "").toLowerCase().includes(searchLower) ||
            (trx.student?.email || "").toLowerCase().includes(searchLower) ||
            (trx.course?.title || trx.course || "").toString().toLowerCase().includes(searchLower) ||
            (trx.instructor?.name || trx.instructor || "").toString().toLowerCase().includes(searchLower);

        let mappedStatus = "Pending";
        if (trx.status === "paid" || trx.status === "Completed") mappedStatus = "Completed";
        if (trx.status === "refunded" || trx.status === "Refunded") mappedStatus = "Refunded";

        const matchesStatus = statusFilter === "All" || mappedStatus === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalRevenue = filteredTransactions
        .filter(t => t.status === "paid" || t.status === "Completed")
        .reduce((sum, t) => sum + (t.amount || 0), 0);

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
                {/* <div className="flex items-center gap-3">
                    <Button onClick={handleExportPDF} variant="outline" className="gap-2">
                        <Download size={16} /> Export PDF Report
                    </Button>
                </div> */}
            </div>

            <TransactionsStats
                totalRevenue={totalRevenue}
                count={(filteredTransactions || []).length}
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
