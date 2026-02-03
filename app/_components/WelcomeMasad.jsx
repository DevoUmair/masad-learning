import React from 'react';
import Image from 'next/image';
import { BookOpen, GraduationCap, Zap } from 'lucide-react';
import SectionBadge from '../../components/custom/SectionBadge';

export default function WelcomeMasad() {
    return (
        <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto bg-sPrimary rounded-[40px] relative overflow-hidden flex flex-col md:flex-row items-center justify-between min-h-[400px]">

                {/* Background Decor: Plus Signs */}
                <div className="absolute top-10 left-1/3 text-sSecondary text-4xl font-bold opacity-30 hidden md:block">+</div>
                <div className="absolute top-20 left-[35%] text-sSecondary text-2xl font-bold opacity-30 hidden md:block">+</div>

                {/* Background Decor: Squares Right */}
                <div className="absolute top-1/4 right-[5%] w-16 h-16 border-2 border-sSecondary opacity-20 transform rotate-12 hidden md:block"></div>
                <div className="absolute top-[28%] right-[8%] w-12 h-12 bg-sSecondary opacity-10 transform -rotate-12 hidden md:block"></div>

                {/* Left Content */}
                <div className="relative z-10 p-8 md:p-12 md:pr-0 w-full md:w-1/2 text-white">
                    <SectionBadge
                        icon={<Zap size={14} fill="currentColor" className="text-sPrimary" />}
                        text="Welcome to Our Platform"
                        className="bg-white border-none mb-6"
                    />

                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        Change the course of your career at your pace
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-6 mb-8">
                        {/* Feature 1 */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                                <BookOpen size={24} className="text-sSecondary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg leading-tight mb-1">Up to 70% Scholarship on</h4>
                                <p className="text-white/80 text-sm">EdCare Course Admissions</p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                                <GraduationCap size={24} className="text-sSecondary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg leading-tight mb-1">Get Scholarship by taking</h4>
                                <p className="text-white/80 text-sm">the Test at Our Centre</p>
                            </div>
                        </div>
                    </div>

                    <button className="bg-sSecondary text-white px-8 py-3.5 rounded-full font-bold hover:bg-cyan-600 transition-colors shadow-lg flex items-center gap-2">
                        Register Now
                    </button>

                    {/* Bottom Left Curve Decor */}
                    <div className="absolute bottom-0 left-0 text-sSecondary opacity-10 pointer-events-none">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10 90 Q 50 10 90 90" />
                            <path d="M10 70 Q 50 -10 90 70" />
                        </svg>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative z-10 w-full md:w-1/2 flex items-end justify-center md:justify-end self-end mt-8 md:mt-0 px-4 md:px-0">
                    <div className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px]">
                        <Image
                            src="https://wp.rrdevs.net/edcare/wp-content/uploads/2025/04/hero-img-3.png"
                            alt="Student with scholarship"
                            width={500}
                            height={550}
                            className="w-full h-auto object-contain"
                            priority
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
