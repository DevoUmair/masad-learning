"use client";
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function TransactionsTable({ transactions }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col print:border-none print:shadow-none">
            <div className="overflow-x-auto flex-1">
                <Table>
                    <TableHeader className="bg-slate-50 sticky top-0 z-10 print:bg-white">
                        <TableRow>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Student</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Instructor</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {(transactions || []).length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                                    No transactions found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            transactions.map((trx) => {
                                let mappedStatus = "Pending";
                                if (trx.status === "paid" || trx.status === "Completed") mappedStatus = "Completed";
                                if (trx.status === "refunded" || trx.status === "Refunded") mappedStatus = "Refunded";

                                return (
                                    <TableRow key={trx._id || trx.id} className="hover:bg-slate-50/50 transition-colors">
                                        <TableCell className="font-mono text-xs text-slate-500">{trx?.paymentId}</TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm">{trx.student?.name || "Unknown Student"}</p>
                                                <p className="text-xs text-slate-500">{trx.student?.email || "N/A"}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium text-sm">{trx.course?.title || trx.course || "Unknown Course"}</TableCell>
                                        <TableCell className="text-sm text-slate-600">{trx.instructor?.name || trx.instructor || "Unknown Instructor"}</TableCell>
                                        <TableCell className="text-sm text-slate-600">
                                            {new Date(trx.createdAt || trx.date).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="font-bold text-slate-900">
                                            {trx.amount} {trx.currency ? trx.currency.toUpperCase() : "USD"}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    mappedStatus === "Completed" ? "bg-green-50 text-green-700 border-green-200" :
                                                        mappedStatus === "Pending" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                                            "bg-red-50 text-red-700 border-red-200"
                                                }
                                            >
                                                {mappedStatus}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
