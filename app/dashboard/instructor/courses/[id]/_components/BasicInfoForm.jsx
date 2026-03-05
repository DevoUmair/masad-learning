"use client";
import React from 'react';
import { Upload, Plus, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { useGetCategoriesQuery } from '@/redux/category/categoryApi';
import { useGetCategoriesQuery } from '@/redux/categories/categoriesApi';

export default function BasicInfoForm({ data, onChange }) {
    const { data: categories } = useGetCategoriesQuery();
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900">Course Title</label>
                <Input
                    value={data.title}
                    onChange={e => onChange('title', e.target.value)}
                    placeholder="e.g., Complete Python Bootcamp 2024"
                    className="bg-slate-50 border-slate-200"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900">Short Description</label>
                <Textarea
                    value={data.description}
                    onChange={e => onChange('description', e.target.value)}
                    placeholder="Brief summary of your course..."
                    className="bg-slate-50 border-slate-200 min-h-[100px]"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">Category</label>
                    <select
                        value={data.category}
                        onChange={e => onChange('category', e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sPrimary/20 cursor-pointer">
                        {categories?.categories?.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">Level</label>
                    <select
                        value={data.level}
                        onChange={e => onChange('level', e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sPrimary/20 cursor-pointer">
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">Total Video Hours</label>
                    <Input
                        type="number"
                        value={data.totalVideoHours}
                        onChange={e => onChange('totalVideoHours', Number(e.target.value))}
                        placeholder="e.g., 10"
                        className="bg-slate-50 border-slate-200"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">Number of Downloadable Resources</label>
                    <Input
                        type="number"
                        value={data.downloadableResources}
                        onChange={e => onChange('downloadableResources', Number(e.target.value))}
                        placeholder="e.g., 5"
                        className="bg-slate-50 border-slate-200"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-900">Course Includes (Features)</label>
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={data.fullLifetimeAccess}
                            onChange={(e) => onChange('fullLifetimeAccess', e.target.checked)}
                            className="size-4 rounded mt-2 border-slate-300 text-sPrimary focus:ring-sPrimary cursor-pointer"
                        />
                        <span className="text-sm text-slate-700 font-medium">Full Lifetime Access</span>
                    </label>
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={data.certificateOfCompletion}
                            onChange={(e) => onChange('certificateOfCompletion', e.target.checked)}
                            className="size-4 rounded border-slate-300 text-sPrimary focus:ring-sPrimary cursor-pointer"
                        />
                        <span className="text-sm text-slate-700 font-medium">Certificate of Completion</span>
                    </label>
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-sm font-bold mb-2 text-slate-900">What You Will Learn</label>
                <div className="space-y-3">
                    {data.whatYouWillLearn?.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Input
                                value={item}
                                onChange={(e) => {
                                    const newArray = [...data.whatYouWillLearn];
                                    newArray[index] = e.target.value;
                                    onChange('whatYouWillLearn', newArray);
                                }}
                                placeholder="e.g., Build 16 web development projects for your portfolio"
                                className="bg-slate-50 border-slate-200"
                            />
                            <button
                                onClick={() => {
                                    const newArray = data.whatYouWillLearn.filter((_, i) => i !== index);
                                    onChange('whatYouWillLearn', newArray.length > 0 ? newArray : [""]);
                                }}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                type="button"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => onChange('whatYouWillLearn', [...(data.whatYouWillLearn || []), ""])}
                        className="text-sm font-bold text-sPrimary hover:text-sPrimary/80 flex items-center gap-1 cursor-pointer"
                    >
                        <Plus size={16} /> Add Objective
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900">Course Thumbnail</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative overflow-hidden">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                onChange('thumbnailImage', e.target.files[0]);
                            }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    {data.thumbnailImage ? (
                        <div className="flex flex-col items-center z-0">
                            <img
                                src={URL.createObjectURL(data.thumbnailImage)}
                                alt="Thumbnail Preview"
                                className="h-32 object-contain rounded-md mb-2 shadow-sm border border-slate-200"
                            />
                            <p className="text-sm font-bold text-green-600 truncate max-w-[200px]">{data.thumbnailImage.name}</p>
                            <p className="text-xs text-slate-500 mt-1">Click to replace</p>
                        </div>
                    ) : data.existingThumbnailUrl ? (
                        <div className="flex flex-col items-center z-0">
                            <img
                                src={data.existingThumbnailUrl}
                                alt="Current Thumbnail"
                                className="h-32 object-contain rounded-md mb-2 shadow-sm border border-slate-200"
                            />
                            <p className="text-sm font-bold text-green-600">Current thumbnail</p>
                            <p className="text-xs text-slate-500 mt-1">Click to replace</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center z-0">
                            <div className="p-3 bg-white rounded-full shadow-sm mb-2">
                                <Upload size={24} className="text-sPrimary" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold text-slate-900">Click to upload or drag and drop</p>
                                <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
