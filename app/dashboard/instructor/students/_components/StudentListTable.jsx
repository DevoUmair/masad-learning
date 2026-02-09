import React from 'react';
import Link from 'next/link';
import { Mail, Calendar } from 'lucide-react';
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function StudentListTable({ students }) {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-100">
                        <TableHead className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</TableHead>
                        <TableHead className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Course</TableHead>
                        <TableHead className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-[25%]">Progress</TableHead>
                        <TableHead className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</TableHead>
                        <TableHead className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Active</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-slate-100">
                    {students.map((student) => (
                        <TableRow key={student.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer relative">
                            <TableCell className="py-4 px-6 relative">
                                <Link href={`/dashboard/instructor/students/${student.id}`} className="absolute inset-0 z-10" />
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-10 bg-slate-100">
                                        <AvatarImage src={student.avatar} alt={student.name} />
                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 group-hover:text-sPrimary transition-colors relative z-20">{student.name}</p>
                                        <div className="flex items-center gap-1 text-xs text-slate-500">
                                            <Mail size={12} />
                                            {student.email}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                                <div className="text-sm font-medium text-slate-700">{student.course}</div>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className={`font-bold ${student.progress === 100 ? 'text-green-600' : 'text-slate-700'}`}>
                                            {student.progress}%
                                        </span>
                                        {student.progress === 100 && (
                                            <Badge variant="secondary" className="text-[10px] bg-green-100 text-green-700 px-1.5 rounded-full font-bold hover:bg-green-100 border-none shadow-none">
                                                COMPLETED
                                            </Badge>
                                        )}
                                    </div>
                                    <Progress value={student.progress} className="h-2 bg-slate-100" />
                                </div>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Calendar size={14} className="text-slate-400" />
                                    {student.joinedDate}
                                </div>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <div className={`size-2 rounded-full ${student.lastActive === 'Just now' ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
                                    {student.lastActive}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
