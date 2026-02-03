"use client";
import React from 'react';
import { Upload } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function BasicInfoForm() {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900">Course Title</label>
                <Input placeholder="e.g., Complete Python Bootcamp 2024" className="bg-slate-50 border-slate-200" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900">Short Description</label>
                <Textarea placeholder="Brief summary of your course..." className="bg-slate-50 border-slate-200 min-h-[100px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">Category</label>
                    <select className="w-full h-10 px-3 rounded-md border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sPrimary/20 cursor-pointer">
                        <option>Development</option>
                        <option>Business</option>
                        <option>Design</option>
                        <option>Marketing</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">Level</label>
                    <select className="w-full h-10 px-3 rounded-md border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sPrimary/20 cursor-pointer">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Expert</option>
                        <option>All Levels</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900">Course Thumbnail</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                        <Upload size={24} className="text-sPrimary" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-slate-900">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
