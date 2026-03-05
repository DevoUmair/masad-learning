"use client";
import React from 'react';
import { MoreVertical } from 'lucide-react';
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from 'next/navigation';

function getInitials(name) {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0][0]?.toUpperCase() || "?";
}

export function InstructorTable({ instructors, onPayoutClick }) {
    const router = useRouter();

    if (!instructors || instructors.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 flex items-center justify-center p-12">
                <p className="text-slate-500 font-medium">No instructors found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
            <div className="overflow-x-auto flex-1">
                <Table>
                    <TableHeader className="bg-slate-50 sticky top-0 z-10">
                        <TableRow>
                            <TableHead className="w-[300px]">Instructor</TableHead>
                            <TableHead>Expertise</TableHead>
                            <TableHead>Students</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Earnings</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {instructors.map((instructor) => (
                            <TableRow
                                key={instructor._id}
                                className="cursor-pointer hover:bg-slate-50/50 transition-colors"
                            >
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border border-slate-200 bg-slate-100">
                                            <AvatarFallback className="text-sPrimary font-bold">{getInitials(instructor.name)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-bold text-slate-900 capitalize">{instructor.name}</p>
                                            <p className="text-xs text-slate-500">{instructor.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm text-slate-600">
                                    {instructor.instructorProfile?.areaOfExpertise || "—"}
                                </TableCell>
                                <TableCell className="font-medium text-slate-600">
                                    {instructor.instructorProfile?.totalStudents || 0}
                                </TableCell>
                                <TableCell className="font-medium text-slate-600">
                                    {instructor.instructorProfile?.averageRating || 0}
                                </TableCell>
                                <TableCell className="font-bold text-slate-900">
                                    AED {(instructor.instructorProfile?.totalEarnings || 0).toLocaleString()}
                                </TableCell>
                                <TableCell className="text-slate-500 text-sm">
                                    {instructor.createdAt
                                        ? new Date(instructor.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                        : "—"}
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
                                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/admin/instructor/${instructor._id}`); }}>
                                                View Details
                                            </DropdownMenuItem>
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
