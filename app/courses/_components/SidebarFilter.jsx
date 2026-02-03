"use client";
import { useState } from "react";
import { ChevronDown, Star, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function SidebarFilter() {
    const [openSections, setOpenSections] = useState({
        category: true,
        level: true,
        duration: false,
        rating: true
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
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
                    <FilterCheckbox label="Business" count={120} checked />
                    <FilterCheckbox label="Technology" count={85} />
                    <FilterCheckbox label="Design" count={40} />
                    <FilterCheckbox label="Leadership" count={32} />
                    <FilterCheckbox label="Marketing" count={24} />
                    <FilterCheckbox label="Finance" count={18} />
                </div>
            </FilterSection>

            {/* Level Filter */}
            <FilterSection
                title="Level"
                isOpen={openSections.level}
                onToggle={() => toggleSection('level')}
            >
                <div className="space-y-3">
                    <FilterRadio label="Beginner" name="level" />
                    <FilterRadio label="Intermediate" name="level" />
                    <FilterRadio label="Advanced" name="level" />
                </div>
            </FilterSection>

            {/* Duration Filter */}
            <FilterSection
                title="Duration"
                isOpen={openSections.duration}
                onToggle={() => toggleSection('duration')}
            >
                <div className="space-y-3">
                    <FilterCheckbox label="0-2 Hours" />
                    <FilterCheckbox label="3-6 Hours" />
                    <FilterCheckbox label="7-16 Hours" />
                    <FilterCheckbox label="17+ Hours" />
                </div>
            </FilterSection>

            {/* Rating Filter */}
            <FilterSection
                title="Rating"
                isOpen={openSections.rating}
                onToggle={() => toggleSection('rating')}
            >
                <div className="space-y-2">
                    {[5, 4, 3].map((rating) => (
                        <div key={rating} className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="rating" id={`r-${rating}`} className="accent-sPrimary cursor-pointer" />
                            <label htmlFor={`r-${rating}`} className="flex items-center gap-1 cursor-pointer text-sm text-slate-600 group-hover:text-slate-900">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill={i < rating ? "currentColor" : "none"} className={i >= rating ? "text-slate-200" : ""} />
                                    ))}
                                </div>
                                <span className="text-xs text-slate-400 font-medium">& up</span>
                            </label>
                        </div>
                    ))}
                </div>
            </FilterSection>

            <Button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border-none" size="lg">
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

function FilterCheckbox({ label, count, checked }) {
    return (
        <label className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
                <div className={cn(
                    "size-4 rounded border flex items-center justify-center transition-colors",
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

function FilterRadio({ label, name }) {
    return (
        <label className="flex items-center gap-3 group cursor-pointer">
            <div className="size-4 rounded-full border border-slate-300 group-hover:border-sPrimary flex items-center justify-center">
                <div className="size-2 rounded-full bg-sPrimary scale-0 transition-transform group-active:scale-100" />
            </div>
            <span className="text-sm text-slate-600 group-hover:text-slate-900">
                {label}
            </span>
        </label>
    );
}
