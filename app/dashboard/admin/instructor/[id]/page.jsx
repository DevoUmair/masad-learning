"use client";
import React, { use, useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, BadgeDollarSign, BookOpen, Star, Users, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PayoutModal } from '../_components/PayoutModal';
// import { useGetInstructorProfileQuery } from '@/redux/admin/adminApi';
import { useGetInstructorProfileQuery } from '@/redux/instructor/instructorApi';

export default function InstructorDetailsPage({ params }) {
    const { id } = use(params);
    const { data, isLoading, error } = useGetInstructorProfileQuery(id);
    const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);

    if (isLoading) return <div className="p-8 text-center text-slate-500 font-lexend">Loading instructor details...</div>;
    if (error) return <div className="p-8 text-center text-red-500 font-lexend">Error loading instructor details</div>;

    const instructorData = data?.instructorData;

    if (!instructorData) return <div className="p-8 text-center text-slate-500 font-lexend">Instructor not found</div>;

    const handlePayoutConfirm = (instructorId, amount) => {
        console.log(`Processing payout of $${amount} for instructor ${instructorId}`);
        // In a real app, update state or refetch data here
        alert(`Payout of $${amount} processed successfully!`);
    };

    return (
        <div className="p-8 space-y-8 font-lexend max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/admin/instructor" className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-slate-100">
                            <AvatarFallback className="bg-sPrimary text-white text-xl">{instructorData.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                                {instructorData.name}
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">Active</Badge>
                            </h1>
                            <p className="text-slate-500">{instructorData.email} • Joined {instructorData.joinDate}</p>
                        </div>
                    </div>
                </div>
                {/* <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                        <Mail size={16} /> Contact
                    </Button>
                    <Button
                        className="bg-sPrimary text-white gap-2"
                        onClick={() => setIsPayoutModalOpen(true)}
                    >
                        <BadgeDollarSign size={16} /> Process Payout
                    </Button>
                </div> */}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* <Card>
                    <CardContent className="p-6 flex flex-col gap-1">
                        <span className="text-slate-500 text-sm font-medium">Total Revenue</span>
                        <span className="text-2xl font-black text-slate-900">${instructorData.stats.totalRevenue.toLocaleString()}</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex flex-col gap-1">
                        <span className="text-slate-500 text-sm font-medium">Pending Payout</span>
                        <span className="text-2xl font-black text-red-600">${instructorData.stats.pendingPayout.toLocaleString()}</span>
                    </CardContent>
                </Card> */}
                <Card>
                    <CardContent className="p-6 flex flex-col gap-1">
                        <span className="text-slate-500 text-sm font-medium">Total Students</span>
                        <span className="text-2xl font-black text-slate-900">{instructorData.stats.students}</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex flex-col gap-1">
                        <span className="text-slate-500 text-sm font-medium">Avg. Rating</span>
                        <span className="text-2xl font-black text-yellow-500 flex items-center gap-1">
                            {instructorData.stats.rating} <Star size={20} fill="currentColor" />
                        </span>
                    </CardContent>
                </Card>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4">Launched Courses</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {instructorData.courses.map((course) => (
                        <Link key={course.id} href={`/dashboard/admin/courses/${course.id}`} className="group">
                            <div className="bg-white rounded-xl border border-slate-200 hover:border-sPrimary hover:shadow-md transition-all overflow-hidden h-full flex flex-col">
                                <div className="h-40 bg-slate-100 flex items-center justify-center relative">
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                    <Badge className="absolute top-3 right-3 bg-white/90 text-slate-900 hover:bg-white">{course.status}</Badge>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        {/* <Badge variant="outline" className="text-xs font-normal border-slate-200">{course.modules} Modules</Badge> */}
                                        <span className="flex items-center gap-1 text-xs font-bold text-yellow-500">
                                            <Star size={12} fill="currentColor" /> {course.rating}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-sPrimary transition-colors">{course.title}</h3>

                                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-sm text-slate-500">
                                            <Users size={14} /> {course.students}
                                        </div>
                                        <span className="font-black text-slate-900">{course.price}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <PayoutModal
                isOpen={isPayoutModalOpen}
                onClose={() => setIsPayoutModalOpen(false)}
                instructor={instructorData}
                onConfirm={handlePayoutConfirm}
            />

        </div>
    );
}
