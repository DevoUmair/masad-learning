import React from 'react';
import { BookOpen, Clock, Award } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function StudentCoursesTable({ courses }) {
    return (
        <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-slate-100 p-6 bg-white">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <BookOpen size={20} className="text-sPrimary" />
                        Enrolled Courses
                    </CardTitle>
                    <Badge variant="outline" className="border-slate-200 text-slate-600">
                        {courses.length} Courses
                    </Badge>
                </div>
            </CardHeader>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-100">
                            <TableHead className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Course Name</TableHead>
                            <TableHead className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-[30%]">Progress</TableHead>
                            <TableHead className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Purchase Date</TableHead>
                            <TableHead className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Accessed</TableHead>
                            <TableHead className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-slate-100 bg-white">
                        {courses.map((course) => (
                            <TableRow key={course.id} className="hover:bg-slate-50/50 transition-colors">
                                <TableCell className="py-4 px-6">
                                    <div className="font-medium text-slate-900">{course.title}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">{course.chaptersCompleted}/{course.totalChapters} Chapters</div>
                                </TableCell>
                                <TableCell className="py-4 px-6">
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="font-bold text-slate-700">{course.progress}%</span>
                                        </div>
                                        <Progress value={course.progress} className="h-2 bg-slate-100" />
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-6">
                                    <div className="text-sm text-slate-600">{course.purchaseDate}</div>
                                </TableCell>
                                <TableCell className="py-4 px-6">
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Clock size={14} className="text-slate-400" />
                                        {course.lastAccessed}
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-6">
                                    {course.progress === 100 ? (
                                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                                            Completed
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-none">
                                            In Progress
                                        </Badge>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}
