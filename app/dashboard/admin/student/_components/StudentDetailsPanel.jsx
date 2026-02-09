"use client";
import React from 'react';
import { Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function StudentDetailsPanel({ student, onClose }) {
    if (!student) return null;

    return (
        <div className="w-full lg:w-96 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col h-full animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-start mb-6">
                <h2 className="font-bold text-lg text-slate-900">Student Details</h2>
                <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                    <span className="sr-only">Close</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18" /><path d="m6 6 18 12" /></svg>
                </Button>
            </div>

            <div className="flex flex-col items-center mb-6 text-center">
                <Avatar className="h-20 w-20 border-4 border-slate-50 mb-3 text-2xl">
                    <AvatarFallback className="bg-sPrimary text-white">{student.avatar}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-xl text-slate-900">{student.name}</h3>
                <p className="text-slate-500 text-sm">{student.email}</p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-500">Total Spent</span>
                    <span className="font-bold text-slate-900">{student.totalSpent}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Member Since</span>
                    <span className="font-bold text-slate-900">Oct 2023</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Recent Transactions</h4>
                <div className="space-y-3">
                    {student.purchases.map((purchase, index) => (
                        <div key={index} className="border border-slate-100 rounded-lg p-3 hover:bg-slate-50 transition-colors">
                            <p className="font-bold text-sm text-slate-800 line-clamp-1">{purchase.course}</p>
                            <div className="flex justify-between items-end mt-2">
                                <div>
                                    <p className="text-xs text-slate-500">Instructor: {purchase.instructor}</p>
                                    <p className="text-[10px] text-slate-400">{purchase.date}</p>
                                </div>
                                <span className="font-bold text-green-600 text-sm">{purchase.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Button className="w-full mt-6 bg-sPrimary text-white gap-2">
                <Mail size={16} /> Send Email
            </Button>
        </div>
    );
}
