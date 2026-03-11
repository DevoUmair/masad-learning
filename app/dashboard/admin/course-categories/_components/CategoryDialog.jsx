"use client";
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '@/redux/categories/categoriesApi';
import { Loader2 } from 'lucide-react';

export default function CategoryDialog({ open, onOpenChange, category }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

    const isEditing = !!category;
    const isLoading = isCreating || isUpdating;

    useEffect(() => {
        if (open) {
            if (category) {
                setName(category.name);
                setDescription(category.description || '');
            } else {
                setName('');
                setDescription('');
            }
        }
    }, [open, category]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) return;

        try {
            if (isEditing) {
                await updateCategory({ id: category._id, name, description }).unwrap();
            } else {
                await createCategory({ name, description }).unwrap();
            }
            onOpenChange(false);
        } catch (error) {
            alert(error?.data?.message || "Something went wrong.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] font-lexend">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{isEditing ? 'Edit Category' : 'Create Category'}</DialogTitle>
                        <DialogDescription>
                            {isEditing ? 'Make changes to the category details.' : 'Add a new category for courses to be grouped under.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Data Science"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Brief description of the category..."
                                className="min-h-[100px]"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading || !name.trim()} className="bg-sPrimary text-white hover:bg-sPrimary/90">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isEditing ? 'Save Changes' : 'Create Category'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
