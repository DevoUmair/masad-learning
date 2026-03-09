"use client";
import React, { useState, use, useEffect } from 'react';
import { ArrowLeft, Save, Layout, List, Settings, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import TabItem from './_components/TabItem';
import BasicInfoForm from './_components/BasicInfoForm';
import CurriculumEditor from './_components/CurriculumEditor';
import SettingsForm from './_components/SettingsForm';
import { useCreateCourseMutation, useGetCourseByIdQuery, useEditCourseMutation } from '@/redux/course/courseApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CourseEditorPage({ params }) {
    const { id } = use(params);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('basic');
    const isNew = id === 'new';

    // Redux mutations
    const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
    const [editCourse, { isLoading: isEditing }] = useEditCourseMutation();
    const { data: courseResponse, isLoading: isFetching } = useGetCourseByIdQuery(id, { skip: isNew });

    const isLoading = isCreating || isEditing;

    // Unified course state
    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        category: "",
        level: "All Levels",
        totalVideoHours: 0,
        downloadableResources: 0,
        fullLifetimeAccess: true,
        certificateOfCompletion: true,
        whatYouWillLearn: [""],
        thumbnailImage: null
    });

    const [modules, setModules] = useState([
        {
            id: 1,
            title: "Introduction",
            lessons: []
        }
    ]);

    const [dataLoaded, setDataLoaded] = useState(false);

    // Load existing course data when editing
    useEffect(() => {
        if (!isNew && courseResponse?.course && !dataLoaded) {
            const c = courseResponse.course;
            setCourseData({
                title: c.title || "",
                description: c.description || "",
                category: c.category?._id || c.category || "",
                level: c.level || "All Levels",
                totalVideoHours: c.courseIncludes?.totalVideoHours || 0,
                downloadableResources: c.courseIncludes?.downloadableResources || 0,
                fullLifetimeAccess: c.courseIncludes?.fullLifetimeAccess ?? true,
                certificateOfCompletion: c.courseIncludes?.certificateOfCompletion ?? true,
                whatYouWillLearn: c.whatYouWillLearn?.length > 0 ? c.whatYouWillLearn : [""],
                thumbnailImage: null, // Don't set file - it's already uploaded
                existingThumbnailUrl: c.thumbnailImage?.url || null
            });

            if (c.modules && c.modules.length > 0) {
                setModules(c.modules.map((m, mIdx) => ({
                    id: mIdx + 1,
                    title: m.title || `Module ${mIdx + 1}`,
                    description: m.description || "",
                    moduleDuration: m.moduleDuration || 0,
                    lessons: m.lessons.map(l => ({
                        id: l._id,
                        title: l.lessonTitle || l.videoTitle,
                        videoTitle: l.videoTitle,
                        description: l.lessonDescription || "",
                        videoId: l.videoId,
                        libraryId: l.libraryId,
                        lessonDuration: l.lessonDuration || 0,
                        resources: (l.resources || []).map(r => {
                            // Keep full resource objects (title, url, etc.)
                            return r;
                        }),
                        // No videoFile since it's already uploaded
                        videoFile: null,
                        isExisting: true
                    }))
                })));
            }
            setDataLoaded(true);
        }
    }, [courseResponse, isNew, dataLoaded]);

    const handleDataChange = (field, value) => {
        setCourseData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!courseData.title) {
            toast.error("Course title is required.");
            setActiveTab('basic');
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", courseData.title);
            formData.append("description", courseData.description);
            formData.append("category", courseData.category);
            formData.append("level", courseData.level);
            formData.append("courseIncludes[totalVideoHours]", courseData.totalVideoHours);
            formData.append("courseIncludes[downloadableResources]", courseData.downloadableResources);
            formData.append("courseIncludes[fullLifetimeAccess]", courseData.fullLifetimeAccess);
            formData.append("courseIncludes[certificateOfCompletion]", courseData.certificateOfCompletion);
            formData.append("whatYouWillLearn", JSON.stringify(courseData.whatYouWillLearn.filter(item => item.trim() !== "")));

            if (courseData.thumbnailImage) {
                formData.append("thumbnailImage", courseData.thumbnailImage);
            }

            // Deep clone modules to strip out raw file references from JSON payload
            const modulesPayload = modules.map((m, mIndex) => ({
                title: m.title,
                description: m.description,
                duration: m.duration || 0,
                lessons: m.lessons.map((l, lIndex) => {
                    const lessonMap = {
                        videoTitle: l.videoTitle || l.title,
                        lessonTitle: l.title || l.videoTitle,
                        lessonDescription: l.description || "",
                        duration: l.duration || 0,
                        lessonDuration: l.lessonDuration || 0,
                    };

                    // Keep existing video data for edit mode
                    if (l.videoId) lessonMap.videoId = l.videoId;
                    if (l.libraryId) lessonMap.libraryId = l.libraryId;
                    if (l.libraryVideo) lessonMap.libraryVideo = l.libraryVideo;
                    if (l.isExisting) lessonMap.isExisting = true;
                    if (l.id) lessonMap.id = l.id;

                    // Keep existing resource ObjectIds
                    if (l.resources && l.resources.length > 0) {
                        lessonMap.resources = l.resources
                            .map(r => (typeof r === 'string' ? r : (r._id || r)))
                            .filter(id => typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/));
                    }

                    // Only append new video files
                    if (l.videoFile) {
                        formData.append(`video_${mIndex}_${lIndex}`, l.videoFile);
                    }

                    // Only append new resource files
                    const combinedResources = [
                        ...(l.resources || []),
                        ...(l.newResources || [])
                    ];

                    if (combinedResources.length > 0) {
                        let newResIdx = 0;
                        combinedResources.forEach((rObj) => {
                            if (rObj.file) {
                                formData.append(`resource_${mIndex}_${lIndex}_${newResIdx}`, rObj.file);
                                formData.append(`resourceTitle_${mIndex}_${lIndex}_${newResIdx}`, rObj.title || rObj.file.name);
                                newResIdx++;
                            }
                        });
                    }

                    return lessonMap;
                })
            }));

            formData.append("modules", JSON.stringify(modulesPayload));

            let res;
            if (isNew) {
                res = await createCourse(formData).unwrap();
            } else {
                res = await editCourse({ id, formData }).unwrap();
            }

            if (res.success) {
                toast.success(isNew ? "Course created successfully!" : "Course updated successfully!");
                router.push('/dashboard/instructor/courses');
            }
        } catch (error) {
            console.error("Failed to save course:", error);
            toast.error(error?.data?.message || "Failed to save course. Please try again.");
        }
    };

    if (!isNew && isFetching) {
        return (
            <div className="flex items-center justify-center h-64 font-lexend">
                <Loader2 size={32} className="animate-spin text-sPrimary" />
                <span className="ml-3 text-slate-500">Loading course data...</span>
            </div>
        );
    }

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
                            {isNew ? 'Create New Course' : 'Edit Course'}
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            {isNew ? 'Start building your new curriculum' : 'Update your course content and details'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {/* <Button variant="outline" className="border-slate-200 cursor-pointer">Preview</Button> */}
                    <Button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="bg-sPrimary hover:bg-sPrimary/90 text-white font-bold cursor-pointer"
                    >
                        {isLoading ? <Loader2 size={18} className="mr-2 animate-spin" /> : <Save size={18} className="mr-2" />}
                        {isLoading ? 'Saving...' : 'Save Changes'}
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
                    {activeTab === 'basic' && <BasicInfoForm data={courseData} onChange={handleDataChange} />}
                    {activeTab === 'curriculum' && <CurriculumEditor modules={modules} setModules={setModules} />}
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
