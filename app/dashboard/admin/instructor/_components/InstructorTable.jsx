"use client";
import React from 'react';
import { MoreVertical, CheckCircle, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from 'next/navigation';

export function InstructorTable({ instructors, onPayoutClick }) {
    const router = useRouter();

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
            <div className="overflow-x-auto flex-1">
                <Table>
                    <TableHeader className="bg-slate-50 sticky top-0 z-10">
                        <TableRow>
                            <TableHead className="w-[300px]">Instructor</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Courses</TableHead>
                            <TableHead>Students</TableHead>
                            <TableHead>Total Revenue</TableHead>
                            <TableHead>Pending Payout</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {instructors.map((instructor) => (
                            <TableRow
                                key={instructor.id}
                                className="cursor-pointer hover:bg-slate-50/50 transition-colors"
                                onClick={() => router.push(`/dashboard/admin/instructor/${instructor.id}`)}
                            >
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border border-slate-200 bg-slate-100">
                                            <AvatarFallback className="text-sPrimary font-bold">{instructor.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-bold text-slate-900">{instructor.name}</p>
                                            <p className="text-xs text-slate-500">{instructor.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={instructor.status === "Active" ? "default" : "secondary"}
                                        className={instructor.status === "Active" ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200"}>
                                        {instructor.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-medium">{instructor.coursesCount}</TableCell>
                                <TableCell className="font-medium text-slate-600">{instructor.students}</TableCell>
                                <TableCell className="font-bold text-slate-900">${instructor.totalRevenue.toLocaleString()}</TableCell>
                                <TableCell>
                                    {instructor.pendingAmount > 0 ? (
                                        <span className="font-bold text-red-600">${instructor.pendingAmount.toLocaleString()}</span>
                                    ) : (
                                        <span className="text-green-600 font-medium flex items-center gap-1"><CheckCircle size={14} /> Paid</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(instructor.email); }}>
                                                Copy Email
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/admin/instructor/${instructor.id}`); }}>
                                                View Details
                                            </DropdownMenuItem>
                                            {instructor.pendingAmount > 0 && (
                                                <>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onPayoutClick(instructor); }} className="text-green-600 font-bold">
                                                        <DollarSign size={14} className="mr-2" /> Mark Payout Paid
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
