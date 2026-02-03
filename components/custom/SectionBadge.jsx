import React from 'react';

export default function SectionBadge({ icon, text, className = "", variant = "default" }) {
    const baseStyles = "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6";
    const variantStyles = variant === "white"
        ? "bg-white shadow-sm border border-gray-100"
        : "bg-slate-50 border border-slate-100";

    return (
        <div className={`${baseStyles} ${variantStyles} ${className}`}>
            <span className="bg-teal-100 text-sSecondary p-1 rounded-full">
                {icon}
            </span>
            <span className="text-sPrimary font-medium text-sm tracking-wide">
                {text}
            </span>
        </div>
    );
}
