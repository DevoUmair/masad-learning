"use client";
import { Button } from "@/components/ui/button";
import { MonitorPlay, FileText, Infinity, Smartphone, Trophy, Share2, Heart, Flag } from "lucide-react";

export default function CourseSidebar() {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-6 sticky top-24">
            {/* Price Header */}
            <div className="mb-6">
                <div className="flex items-end gap-2 mb-1">
                    <span className="text-3xl font-black text-slate-900">1,499 AED</span>
                    <span className="text-sm text-slate-400 line-through mb-1.5">2,999 AED</span>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded mb-1.5">50% OFF</span>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mb-8">
                <Button className="w-full h-12 text-base font-bold bg-sPrimary hover:bg-blue-700 shadow-md shadow-blue-200">
                    Enroll Now
                </Button>
                <Button variant="outline" className="w-full h-12 text-base font-bold border-2 border-sPrimary text-sPrimary hover:bg-blue-50">
                    Add to Cart
                </Button>
            </div>

            {/* Inclusions */}
            <div className="space-y-4 mb-8">
                <p className="font-bold text-sm text-slate-900">This course includes:</p>
                <ul className="space-y-3">
                    <FeatureItem icon={MonitorPlay} text="24 hours on-demand video" />
                    <FeatureItem icon={FileText} text="12 downloadable resources" />
                    <FeatureItem icon={Infinity} text="Full lifetime access" />
                    <FeatureItem icon={Smartphone} text="Access on mobile and TV" />
                    <FeatureItem icon={Trophy} text="Certificate of completion" />
                </ul>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sPrimary transition-colors">
                    <Share2 size={18} /> Share
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-red-500 transition-colors">
                    <Heart size={18} /> Save
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors">
                    <Flag size={18} />
                </button>
            </div>
        </div>
    );
}

function FeatureItem({ icon: Icon, text }) {
    return (
        <li className="flex items-center gap-3 text-sm text-slate-600">
            <Icon size={16} className="text-sPrimary shrink-0" />
            <span>{text}</span>
        </li>
    );
}
