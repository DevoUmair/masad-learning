"use client";
import React from 'react';
import { MoreVertical, BookOpen, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function getInitials(name) {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0][0]?.toUpperCase() || "?";
}

function timeAgo(dateStr) {
    if (!dateStr) return "N/A";
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} mins ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
}

export default function StudentTable({ students, selectedStudent, onSelectStudent }) {

    if (!students || students.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 flex items-center justify-center p-12">
                <p className="text-slate-500 font-medium">No students found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
            <div className="overflow-x-auto flex-1">
                <Table>
                    <TableHeader className="bg-slate-50 sticky top-0 z-10">
                        <TableRow>
                            <TableHead className="w-[300px]">Student</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Enrolled</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow
                                key={student._id}
                                className={`transition-colors cursor-pointer ${selectedStudent?._id === student._id ? 'bg-blue-50' : 'hover:bg-slate-50/50'}`}
                                onClick={() => onSelectStudent(student)}
                            >
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border border-slate-200 bg-slate-100">
                                            <AvatarFallback className="text-sPrimary font-bold">{getInitials(student.name)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-bold text-slate-900 capitalize">{student.name}</p>
                                            <p className="text-xs text-slate-500">{student.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-600 text-sm">
                                    {student.phone || "—"}
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        <BookOpen size={16} className="text-slate-400" />
                                        {student.enrolledCourses?.length || 0} Courses
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-500 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} />
                                        {timeAgo(student.createdAt)}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <MoreVertical className="h-4 w-4 text-slate-400" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
