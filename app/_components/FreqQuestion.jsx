"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Zap } from 'lucide-react';
import SectionBadge from '@/components/custom/SectionBadge';

export default function FreqQuestion() {
    const [openIndex, setOpenIndex] = useState(0);

    const accordionItems = [
        {
            question: "What courses do you offer?",
            answer: "We offer a wide range of courses in various subjects, including science, technology, engineering, mathematics, humanities, and social sciences. Our courses are designed for different education levels, from primary school to university."
        },
        {
            question: "How Can Teachers Effectively Manage a Diverse Classroom?",
            answer: "Effective management involves understanding individual student needs, using differentiated instruction, and fostering an inclusive environment that respects diverse backgrounds and learning styles."
        },
        {
            question: "How Is Special Education Delivered in Inclusive Classrooms?",
            answer: "Special education in inclusive classrooms is delivered through collaboration between general and special education teachers, providing accommodations, modifications, and individualized support within the general curriculum."
        }
    ];

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Column: Image Collage */}
                <div className="relative">
                    <div className="relative h-[500px] w-full">
                        <Image
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop"
                            alt="Student learning"
                            fill
                            className="object-cover rounded-[30px] shadow-lg"
                        />
                    </div>

                    {/* Floating Stats Badge */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-12 bg-white p-5 rounded-2xl shadow-xl animate-bounce-slow max-w-[220px] z-10 hidden md:block">
                        <h3 className="font-bold text-sPrimary mb-3 text-sm">Total Students</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-3">
                                <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop" width={36} height={36} className="rounded-full border-2 border-white object-cover" alt="Student 1" />
                                <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" width={36} height={36} className="rounded-full border-2 border-white object-cover" alt="Student 2" />
                                <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" width={36} height={36} className="rounded-full border-2 border-white object-cover" alt="Student 3" />
                                <div className="w-9 h-9 rounded-full bg-sSecondary border-2 border-white flex items-center justify-center text-white text-xs font-bold">25+</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Content */}
                <div>
                    {/* Badge */}
                    <SectionBadge
                        icon={<Zap size={12} fill="currentColor" />}
                        text="Most Asked Question"
                        variant="slate"
                    />

                    {/* Heading */}
                    <h2 className="text-4xl md:text-5xl font-bold text-sPrimary mb-10 leading-tight">
                        Powerful Dashboard And High Performance Framework
                    </h2>

                    {/* Accordion */}
                    <div className="space-y-4">
                        {accordionItems.map((item, index) => (
                            <div key={index} className={`border-b border-gray-100 pb-4 ${index === openIndex ? 'pb-6' : ''}`}>
                                <button
                                    onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                                    className="w-full flex justify-between items-start text-left group"
                                >
                                    <span className={`text-lg font-bold transition-colors ${index === openIndex ? 'text-sSecondary' : 'text-sPrimary group-hover:text-sSecondary'}`}>
                                        <span className="mr-4 opacity-50 text-base">0{index + 1}.</span>
                                        {item.question}
                                    </span>
                                    <span className={`p-1 rounded-full border transition-colors ${index === openIndex ? 'bg-sSecondary border-sSecondary text-white' : 'border-gray-200 text-gray-400 group-hover:border-sSecondary group-hover:text-sSecondary'}`}>
                                        {index === openIndex ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </span>
                                </button>

                                <div className={`grid transition-all duration-300 ease-in-out ${index === openIndex ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <p className="text-sTextGray leading-relaxed pl-10 pr-4">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
