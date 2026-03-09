"use client";
import React from 'react';
import { Mail, BookOpen, Calendar, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from 'next/link';

function getInitials(name) {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0][0]?.toUpperCase() || "?";
}

export default function StudentDetailsPanel({ student, onClose }) {
    if (!student) return null;

    const joinDate = student.createdAt
        ? new Date(student.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        : "N/A";

    return (
        <Dialog open={!!student} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md p-6 max-h-[90vh] overflow-y-auto flex flex-col">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-xl font-bold">Student Details</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center mb-6 text-center">
                    <Avatar className="h-20 w-20 border-4 border-slate-50 mb-3 text-2xl">
                        <AvatarFallback className="bg-sPrimary text-white">{getInitials(student.name)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-xl text-slate-900 capitalize">{student.name}</h3>
                    <p className="text-slate-500 text-sm">{student.email}</p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 mb-6 space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Phone</span>
                        <span className="font-bold text-slate-900">{student.phone || "—"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Member Since</span>
                        <span className="font-bold text-slate-900">{joinDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Enrolled Courses</span>
                        <span className="font-bold text-slate-900">{student.enrolledCourses?.length || 0}</span>
                    </div>
                </div>

                {student.enrolledCourses && student.enrolledCourses.length > 0 && (
                    <div className="flex-1 overflow-y-auto">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Enrolled Courses</h4>
                        <div className="space-y-3">
                            {student.enrolledCourses.map((course, index) => (
                                <div key={course._id || index} className="border border-slate-100 rounded-lg p-3 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <BookOpen size={14} className="text-slate-400" />
                                        <p className="font-bold text-sm text-slate-800">{typeof course === 'object' && course.title ? course.title : `Course ${index + 1}`}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {(!student.enrolledCourses || student.enrolledCourses.length === 0) && (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-sm text-slate-400">No courses enrolled yet.</p>
                    </div>
                )}

                <Link href={`mailto:${student.email}`}>
                    <Button className="w-full mt-6 bg-sPrimary text-white gap-2 shrink-0">
                        <Mail size={16} />
                        Send Email
                    </Button>
                </Link>
            </DialogContent>
        </Dialog>
    );
}
