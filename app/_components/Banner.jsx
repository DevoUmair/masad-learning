import React from 'react';
import { Search, MoveRight, Zap } from 'lucide-react';
import Link from 'next/link';
import SectionBadge from '@/components/custom/SectionBadge';

const HeroBanner = () => {
    return (
        <section className="relative w-full min-h-[500px] lg:min-h-[650px] bg-[#f0f9f9] flex items-center justify-center overflow-hidden px-4 py-20 lg:py-0">

            {/* Gradient Overlays */}
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-cyan-100/40 via-transparent to-transparent z-0 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-emerald-100/40 via-transparent to-transparent z-0 pointer-events-none"></div>

            {/* --- Left Side: Student & Grid --- */}
            <div className="hidden lg:block absolute left-0 bottom-0 w-[32%] h-full pointer-events-none">
                {/* Decorative Grid */}
                <div className="absolute left-12 top-24 w-28 h-28 opacity-20">
                    <div className="grid grid-cols-6 gap-3">
                        {[...Array(36)].map((_, i) => (
                            <div key={i} className="w-1 h-1 bg-sSecondary rounded-full"></div>
                        ))}
                    </div>
                </div>

                {/* Student Image - Man with Backpack (Unsplash) */}
                <img
                    src="/hero/man3.png"
                    alt="Male student with backpack"
                    className="absolute bottom-10 left-[-5%] h-[85%] object-contain object-bottom select-none"
                />
            </div>

            {/* --- Center Content --- */}
            <div className="relative z-20 max-w-3xl text-center flex flex-col items-center">

                <SectionBadge
                    icon={<Zap size={14} fill="currentColor" />}
                    text="Welcome to masad learning"
                    className="bg-white shadow-sm mb-6"
                />
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#1a2e35] leading-[1.15] px-2 break-words max-w-full">
                    Start learning from <br />
                    the world's <span className="text-sSecondary">best institutions</span>
                </h1>

                <p className="mt-6 text-slate-500 text-sm md:text-base max-w-lg leading-relaxed px-4">
                    Unlock your potential with our expert-led courses. Dive into a world of knowledge tailored to your needs.
                </p>

                {/* Search Bar */}
                <div className="mt-10 w-full max-w-2xl bg-white rounded-2xl md:rounded-full shadow-2xl shadow-sSecondary/10 p-3 md:p-1.5 flex flex-col md:flex-row items-center border border-slate-100 gap-3 md:gap-0">
                    <div className="flex items-center w-full md:w-auto grow">
                        <div className="pl-2 md:pl-4 pr-2 text-slate-400">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="What do you want to learn today?"
                            className="grow bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400 text-sm md:text-base outline-none min-w-0 w-full"
                        />
                    </div>
                    <Link
                        href="/courses"
                        className="bg-sSecondary hover:brightness-110 active:scale-95 transition-all text-white px-5 md:px-8 py-3 rounded-xl md:rounded-full flex items-center justify-center gap-2 font-semibold text-sm md:text-base whitespace-nowrap shrink-0 w-full md:w-auto"
                    >
                        Search Now <MoveRight size={18} />
                    </Link>
                </div>

                <div className="mt-8 flex items-center gap-2 text-[#1a2e35] font-semibold tracking-tight">
                    <span>Explore</span>
                    <span className="text-sSecondary text-lg">1350+</span>
                    <span>Courses within Subject</span>
                </div>
            </div>

            {/* --- Right Side: Student & Pattern --- */}
            <div className="hidden lg:block absolute right-0 bottom-0 w-[32%] h-full pointer-events-none">
                {/* Decorative Circle with Diagonal Lines */}
                <div className="absolute right-[-40px] top-12 w-80 h-80 bg-sSecondary rounded-full flex items-center justify-center overflow-hidden opacity-90">
                    <div
                        className="w-full h-full opacity-25"
                        style={{
                            backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%, transparent)`,
                            backgroundSize: '24px 24px'
                        }}
                    ></div>
                </div>

                {/* UPDATED: Student Image - Using your local path */}
                <img
                    src="/hero/women.png"
                    alt="Female student smiling"
                    className="absolute bottom-10 right-0 h-[79%] object-contain object-bottom z-10 select-none"
                />
            </div>

            {/* Mobile-only background accent */}
            <div className="lg:hidden absolute -top-24 -right-24 w-64 h-64 bg-sSecondary/10 rounded-full blur-3xl -z-10"></div>
        </section>
    );
};

export default HeroBanner;