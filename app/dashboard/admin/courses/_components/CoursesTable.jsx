"use client";
import React from 'react';
import { Star, MoreVertical, Eye, BookOpen, List } from 'lucide-react';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CoursesTable({ courses }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[300px]">Course</TableHead>
                            <TableHead>Instructor</TableHead>
                            <TableHead>Performance</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Modules</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course.id} className="hover:bg-slate-50/50 transition-colors">
                                <TableCell>
                                    <div>
                                        <p className="font-bold text-slate-900">{course.title}</p>
                                        <p className="text-xs text-slate-500">{course.category} • Updated {course.lastUpdated}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-slate-700">{course.instructor}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                            <Star size={14} fill="currentColor" /> {course.rating}
                                        </div>
                                        <span className="text-slate-400">|</span>
                                        <div className="text-slate-600">{course.students} students</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                                        ${course.status === "Published" ? "border-transparent bg-green-100 text-green-700 hover:bg-green-200" :
                                            course.status === "In Review" ? "border-transparent bg-yellow-100 text-yellow-700 hover:bg-yellow-200" :
                                                "border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                                        {course.status}
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <List size={14} /> {course.modules}
                                    </div>
                                </TableCell>
                                <TableCell className="font-bold text-slate-900">{course.revenue}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/dashboard/admin/courses/${course.id}`} className="cursor-pointer">
                                                    <Eye className="mr-2 h-4 w-4" /> View Details
                                                </Link>
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">
                                                Suspend Course
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
