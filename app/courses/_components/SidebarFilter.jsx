"use client";
import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useGetCategoriesQuery } from "@/redux/categories/categoriesApi";

export default function SidebarFilter({ filters, onFilterChange }) {
    const { data: categories, isLoading } = useGetCategoriesQuery();
    const [openSections, setOpenSections] = useState({
        category: true,
        level: true,
        rating: true
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const toggleCategory = (categoryId) => {
        const current = filters.categories || [];
        const updated = current.includes(categoryId)
            ? current.filter(id => id !== categoryId)
            : [...current, categoryId];
        onFilterChange('categories', updated);
    };

    const setLevel = (level) => {
        onFilterChange('level', level);
    };

    const setRating = (rating) => {
        onFilterChange('rating', rating);
    };

    const handleReset = () => {
        onFilterChange('reset');
    };

    return (
        <div className="space-y-8">
            <div className="space-y-1">
                <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-4">Filters</h3>
            </div>

            {/* Category Filter */}
            <FilterSection
                title="Category"
                isOpen={openSections.category}
                onToggle={() => toggleSection('category')}
            >
                <div className="space-y-3">
                    {isLoading ? (
                        [...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 animate-pulse">
                                <div className="size-4 rounded bg-slate-200" />
                                <div className="h-3 rounded bg-slate-200" style={{ width: `${60 + Math.random() * 40}%` }} />
                            </div>
                        ))
                    ) : (
                        categories?.categories?.map((category) => (
                            <FilterCheckbox
                                key={category._id}
                                label={category.name}
                                checked={(filters.categories || []).includes(category._id)}
                                onChange={() => toggleCategory(category._id)}
                            />
                        ))
                    )}
                </div>
            </FilterSection>

            {/* Level Filter */}
            <FilterSection
                title="Level"
                isOpen={openSections.level}
                onToggle={() => toggleSection('level')}
            >
                <div className="space-y-3">
                    {["Beginner", "Intermediate", "Advanced", "All Levels"].map((lvl) => (
                        <FilterRadio
                            key={lvl}
                            label={lvl}
                            name="level"
                            checked={filters.level === lvl}
                            onChange={() => setLevel(lvl)}
                        />
                    ))}
                </div>
            </FilterSection>

            {/* Rating Filter */}
            <FilterSection
                title="Rating"
                isOpen={openSections.rating}
                onToggle={() => toggleSection('rating')}
            >
                <div className="space-y-3">
                    {[5, 4, 3].map((rating) => (
                        <div key={rating} className="flex items-center gap-2 cursor-pointer group" onClick={() => setRating(rating)}>
                            <input
                                type="radio"
                                name="rating"
                                checked={filters.rating === rating}
                                onChange={() => setRating(rating)}
                                className="accent-sPrimary cursor-pointer"
                            />
                            <label className="flex items-center gap-1 cursor-pointer text-sm text-slate-600 group-hover:text-slate-900">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill={i < rating ? "currentColor" : "none"} className={i >= rating ? "text-slate-200" : ""} />
                                    ))}
                                </div>
                                <span className="text-xs text-slate-400 font-medium">&amp; up</span>
                            </label>
                        </div>
                    ))}
                </div>
            </FilterSection>

            <Button onClick={handleReset} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border-none" size="lg">
                Reset All Filters
            </Button>
        </div>
    );
}

function FilterSection({ title, isOpen, onToggle, children }) {
    return (
        <div className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full mb-4 group cursor-pointer"
            >
                <span className="font-bold text-slate-900 group-hover:text-sPrimary transition-colors">{title}</span>
                <ChevronDown
                    size={16}
                    className={cn("text-slate-400 transition-transform duration-300", isOpen ? "rotate-180" : "")}
                />
            </button>
            <div className={cn("overflow-hidden transition-all duration-300", isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
                {children}
            </div>
        </div>
    );
}

function FilterCheckbox({ label, count, checked, onChange }) {
    return (
        <label className="flex items-center justify-between group cursor-pointer" onClick={onChange}>
            <div className="flex items-center gap-3">
                <div className={cn(
                    "size-4 rounded border flex items-center justify-center transition-colors shrink-0",
                    checked ? "bg-sPrimary border-sPrimary" : "border-slate-300 group-hover:border-sPrimary"
                )}>
                    {checked && <div className="size-2 bg-white rounded-sm" />}
                </div>
                <span className={cn("text-sm", checked ? "font-bold text-slate-900" : "text-slate-600 group-hover:text-slate-900")}>
                    {label}
                </span>
            </div>
            {count && <span className="text-xs text-slate-400">{count}</span>}
        </label>
    );
}

function FilterRadio({ label, name, checked, onChange }) {
    return (
        <label className="flex items-center gap-3 group cursor-pointer" onClick={onChange}>
            <div className={cn(
                "size-4 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                checked ? "border-sPrimary" : "border-slate-300 group-hover:border-sPrimary"
            )}>
                <div className={cn(
                    "size-2 rounded-full bg-sPrimary transition-transform",
                    checked ? "scale-100" : "scale-0"
                )} />
            </div>
            <span className={cn("text-sm", checked ? "font-bold text-slate-900" : "text-slate-600 group-hover:text-slate-900")}>
                {label}
            </span>
        </label>
    );
}