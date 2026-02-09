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

export default function StudentTable({ students, selectedStudent, onSelectStudent }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
            <div className="overflow-x-auto flex-1">
                <Table>
                    <TableHeader className="bg-slate-50 sticky top-0 z-10">
                        <TableRow>
                            <TableHead className="w-[300px]">Student</TableHead>
                            <TableHead>Enrolled</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead>Last Active</TableHead>
                            <TableHead>Total Spent</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow
                                key={student.id}
                                className={`transition-colors cursor-pointer ${selectedStudent?.id === student.id ? 'bg-blue-50' : 'hover:bg-slate-50/50'}`}
                                onClick={() => onSelectStudent(student)}
                            >
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border border-slate-200 bg-slate-100">
                                            <AvatarFallback className="text-sPrimary font-bold">{student.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-bold text-slate-900">{student.name}</p>
                                            <p className="text-xs text-slate-500">{student.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        <BookOpen size={16} className="text-slate-400" />
                                        {student.enrolledCourses} Courses
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-600">
                                    {student.completedCourses} Completed
                                </TableCell>
                                <TableCell className="text-slate-500 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} />
                                        {student.lastActive}
                                    </div>
                                </TableCell>
                                <TableCell className="font-bold text-green-600">{student.totalSpent}</TableCell>
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
