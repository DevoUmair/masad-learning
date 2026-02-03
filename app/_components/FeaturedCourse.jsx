import React from 'react';
import { Monitor, Settings, Megaphone, User, Code, PenTool, Database, Camera, Briefcase, Heart, Gamepad2, Layers, Zap, Cpu, Lightbulb, AppWindow } from 'lucide-react';
import SectionBadge from '../../components/custom/SectionBadge';

export default function FeaturedCourse() {
    const categories = [
        { name: "Business Management", icon: <Briefcase size={22} /> },
        { name: "Arts & Design", icon: <PenTool size={22} /> },
        { name: "Personal Development", icon: <User size={22} /> },
        { name: "Health & Fitness", icon: <Heart size={22} /> },
        { name: "Marketing", icon: <Megaphone size={22} /> },
        { name: "Business & Finance", icon: <Database size={22} /> },
        { name: "Computer Science", icon: <Monitor size={22} /> },
        { name: "Video & Photography", icon: <Camera size={22} /> },
        { name: "Data Science", icon: <Layers size={22} /> },
        { name: "IT Startup Agency", icon: <Lightbulb size={22} /> },
        { name: "Software Company", icon: <AppWindow size={22} /> },
        { name: "High-Tech Company", icon: <Cpu size={22} /> },
        { name: "3D Gaming Studio", icon: <Gamepad2 size={22} /> },
    ];

    return (
        <section className="py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex justify-center">
                        <SectionBadge
                            icon={<Zap size={14} fill="currentColor" />}
                            text="Our Course Categories"
                            className="bg-white shadow-sm"
                        />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-sPrimary mt-2">
                        Select The Industry Where You Want To Learn
                    </h2>
                </div>

                {/* Categories Grid/Flex */}
                <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-full pl-3 pr-8 py-3 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-sSecondary/20"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#E6F8FA] flex items-center justify-center text-sSecondary">
                                {category.icon}
                            </div>
                            <span className="text-sPrimary font-bold text-sm md:text-base whitespace-nowrap">
                                {category.name}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}