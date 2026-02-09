"use client";
import React from 'react';
import { DollarSign, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TransactionsStats({ totalRevenue, count, pendingAmount }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 dont-print">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500">Total Revenue (Filtered)</CardTitle>
                    <DollarSign size={16} className="text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500">Transactions Count</CardTitle>
                    <CheckCircle size={16} className="text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{count}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500">Pending Amount</CardTitle>
                    <Clock size={16} className="text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        ${pendingAmount.toFixed(2)}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
