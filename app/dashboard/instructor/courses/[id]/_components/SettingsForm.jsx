"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsForm() {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-8">
            <div className="space-y-2">
                <h3 className="font-bold text-lg text-slate-900">Pricing</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900">Regular Price (AED)</label>
                        <Input type="number" placeholder="49.99" className="bg-slate-50 border-slate-200" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900">Discounted Price (AED)</label>
                        <Input type="number" placeholder="29.99" className="bg-slate-50 border-slate-200" />
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-4">
                <h3 className="font-bold text-lg text-slate-900">Visibility</h3>
                <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-sPrimary transition-colors">
                    <div className="size-4 rounded-full border border-sPrimary bg-sPrimary" />
                    <div>
                        <p className="font-bold text-slate-900 text-sm">Public</p>
                        <p className="text-xs text-slate-500">Visible to everyone. Available for purchase.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition-colors">
                    <div className="size-4 rounded-full border border-slate-300" />
                    <div>
                        <p className="font-bold text-slate-900 text-sm">Draft</p>
                        <p className="text-xs text-slate-500">Only visible to you. Not available for purchase.</p>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
                <h3 className="font-bold text-lg text-red-600 mb-2">Danger Zone</h3>
                <p className="text-sm text-slate-500 mb-4">Once you delete a course, there is no going back. Please be certain.</p>
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer">
                    Delete Course
                </Button>
            </div>
        </div>
    )
}
