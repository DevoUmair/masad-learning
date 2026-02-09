"use client";
import React, { useState, use } from 'react';
import { ArrowLeft, Save, Layout, List, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import TabItem from './_components/TabItem';
import BasicInfoForm from './_components/BasicInfoForm';
import CurriculumEditor from './_components/CurriculumEditor';
import SettingsForm from './_components/SettingsForm';

export default function CourseEditorPage({ params }) {
    const { id } = use(params);
    const [activeTab, setActiveTab] = useState('basic');

    return (
        <div className="space-y-6 font-lexend pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/instructor/courses" className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors cursor-pointer">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">
                            {id === 'new' ? 'Create New Course' : 'Edit Course'}
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            {id === 'new' ? 'Start building your new curriculum' : 'Update your course content and details'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-slate-200 cursor-pointer">Preview</Button>
                    <Button className="bg-sPrimary hover:bg-sPrimary/90 text-white font-bold cursor-pointer">
                        <Save size={18} className="mr-2" />
                        Save Changes
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
                <TabItem
                    active={activeTab === 'basic'}
                    onClick={() => setActiveTab('basic')}
                    icon={Layout}
                    label="Basic Information"
                />
                <TabItem
                    active={activeTab === 'curriculum'}
                    onClick={() => setActiveTab('curriculum')}
                    icon={List}
                    label="Curriculum"
                />
                <TabItem
                    active={activeTab === 'settings'}
                    onClick={() => setActiveTab('settings')}
                    icon={Settings}
                    label="Settings"
                />
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-8">
                    {activeTab === 'basic' && <BasicInfoForm />}
                    {activeTab === 'curriculum' && <CurriculumEditor />}
                    {activeTab === 'settings' && <SettingsForm />}
                </div>

                {/* Sidebar Guide */}
                <div className="lg:col-span-1">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 sticky top-8">
                        <h3 className="font-bold text-blue-900 mb-2">Course Tips</h3>
                        <ul className="space-y-3 text-sm text-blue-800">
                            <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                <span>Write a clear, compelling title that explains what students will learn.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                <span>High-quality thumbnails significantly increase click-through rates.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                <span>Break down your curriculum into bite-sized sections (5-10 mins).</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
