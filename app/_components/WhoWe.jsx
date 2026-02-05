"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Zap } from 'lucide-react';
import SectionBadge from '@/components/custom/SectionBadge';

export default function WhoWe() {
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
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Column: Image Collage */}
                <div className="relative">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Image 1: Tall Left */}
                        <div className="row-span-2 relative min-h-[400px]">
                            <Image
                                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop"
                                alt="Diverse group of students"
                                fill
                                className="object-cover rounded-tl-[60px] rounded-br-[60px] shadow-lg"
                            />
                        </div>

                        {/* Image 2: Top Right */}
                        <div className="relative h-[220px]">
                            <Image
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop"
                                alt="Students laughing"
                                fill
                                className="object-cover rounded-tr-[60px] rounded-bl-[60px] shadow-lg"
                            />
                        </div>

                        {/* Image 3: Bottom Right */}
                        <div className="relative h-[220px]">
                            <Image
                                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000&auto=format&fit=crop"
                                alt="Students reading"
                                fill
                                className="object-cover rounded-tl-[60px] rounded-br-[60px] shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Floating Instructor Badge */}
                    <div className="absolute bottom-10 left-10 bg-white p-5 rounded-2xl shadow-xl animate-bounce-slow max-w-[220px] z-10">
                        <h3 className="font-bold text-sPrimary mb-3">Instructor</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-3">
                                <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop" width={36} height={36} className="rounded-full border-2 border-white object-cover" alt="Instructor 1" />
                                <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" width={36} height={36} className="rounded-full border-2 border-white object-cover" alt="Instructor 2" />
                                <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" width={36} height={36} className="rounded-full border-2 border-white object-cover" alt="Instructor 3" />
                                <div className="w-9 h-9 rounded-full bg-sSecondary border-2 border-white flex items-center justify-center text-white text-xs font-bold">25+</div>
                            </div>
                            <div className="text-sm font-bold text-sSecondary leading-tight">200+ <br /><span className="text-sTextGray font-normal text-xs">Instuctor</span></div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Content */}
                <div>
                    {/* Badge */}
                    <SectionBadge icon={<Zap size={12} fill="currentColor" />} text="Our Course Categories" />

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