"use client";
import React, { useState } from 'react';
import { Layers, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CategoriesTable from './_components/CategoriesTable';
import CategoryDialog from './_components/CategoryDialog';
import { useGetCategoriesQuery } from '@/redux/categories/categoriesApi';
import { Input } from '@/components/ui/input';

export default function CourseCategoriesPage() {
    const { data, isLoading } = useGetCategoriesQuery();
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const categories = data?.categories || [];

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleEdit = (category) => {
        setEditingCategory(category);
        setIsDialogOpen(true);
    };

    const handleAdd = () => {
        setEditingCategory(null);
        setIsDialogOpen(true);
    };

    return (
        <div className="p-8 space-y-8 font-lexend max-w-5xl mx-auto flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                        <Layers className="text-sPrimary" /> Course Categories
                    </h1>
                    <p className="text-slate-500 mt-1">Manage platform categories for courses and content.</p>
                </div>
                <Button
                    className="bg-sPrimary hover:bg-sPrimary/90 text-white font-bold"
                    onClick={handleAdd}
                >
                    <Plus size={18} className="mr-2" />
                    Add Category
                </Button>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <Input
                    placeholder="Search categories by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md bg-slate-50"
                />
            </div>

            {isLoading ? (
                <div className="text-center py-12 text-slate-500 font-medium">Loading categories...</div>
            ) : (
                <CategoriesTable
                    categories={filteredCategories}
                    onEdit={handleEdit}
                />
            )}

            <CategoryDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                category={editingCategory}
            />
        </div>
    );
}