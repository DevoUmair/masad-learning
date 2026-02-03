"use client";
import NavBar from "@/app/_components/NavBar";
import TopBar from "@/app/_components/TopBar";
import Footer from "@/app/_components/Footer";
import CourseSidebar from "./_components/CourseSidebar";
import Curriculum from "./_components/Curriculum";
import Link from "next/link";
import Image from "next/image";
import { Star, Clock, BookOpen, BarChart, Globe, CheckCircle, Play, ArrowLeft } from "lucide-react";

export default function CourseDetailsPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-lexend">
            <TopBar />
            <NavBar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors">
                    <ArrowLeft size={16} />
                    Back to Courses
                </Link>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Hero / Media Section */}
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src='https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                alt="AI Course Preview"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Title & Metadata */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold uppercase px-2 py-1 rounded">Bestseller</span>
                                <div className="flex items-center gap-1">
                                    <span className="font-bold text-yellow-500 text-sm">4.8</span>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                    </div>
                                    <span className="text-xs text-slate-400 ml-1">(2,450 ratings)</span>
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
                                Generative AI Masterclass: From Fundamentals to LLMs
                            </h1>

                            <p className="text-slate-600 leading-relaxed text-lg">
                                Master the future of technology with this comprehensive guide to Artificial Intelligence, Deep Learning, and Large Language Models. Build real-world AI applications using Python and PyTorch.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatBox icon={Clock} label="Duration" value="32 Hours" />
                            <StatBox icon={BookOpen} label="Lectures" value="85 Lessons" />
                            <StatBox icon={BarChart} label="Level" value="Advanced" />
                            <StatBox icon={Globe} label="Language" value="EN" />
                        </div>

                        {/* What you will learn */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">What you will learn</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                <LearnItem text="Master Python programming for AI & Machine Learning." />
                                <LearnItem text="Build and train Neural Networks from scratch with PyTorch." />
                                <LearnItem text="Understand and fine-tune Large Language Models (LLMs)." />
                                <LearnItem text="Deploy AI models to production using Docker and Cloud." />
                                <LearnItem text="Ethical AI safety precautions and regulatory compliance." />
                                <LearnItem text="Create generative art and text applications using Stable Diffusion & GPT." />
                            </div>
                        </div>

                        {/* Course Content */}
                        <div>
                            <div className="flex items-end justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900">Course Content</h2>
                                <p className="text-xs text-slate-500 font-medium">15 Sections • 85 Lectures • 32h 30m total length</p>
                            </div>
                            <Curriculum />
                        </div>

                        {/* Instructor */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Instructor</h2>
                            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row gap-6">
                                <div className="shrink-0">
                                    <div className="size-24 rounded-full overflow-hidden border-4 border-slate-100">
                                        <Image
                                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
                                            alt="Instructor"
                                            width={100}
                                            height={100}
                                            className="object-cover h-full w-full"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-sPrimary">Dr. Sarah Chen, PhD</h3>
                                        <p className="text-sm text-slate-500 font-medium">Lead AI Researcher at TechInstitute</p>
                                    </div>

                                    <div className="flex items-center gap-6 text-xs font-semibold text-slate-600">
                                        <div className="flex items-center gap-1.5"><Star size={14} className="text-yellow-500 fill-yellow-500" /> 4.9 Instructor Rating</div>
                                        <div className="flex items-center gap-1.5"><Globe size={14} /> 32,400 Students</div>
                                        <div className="flex items-center gap-1.5"><Play size={14} /> 12 Courses</div>
                                    </div>

                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Dr. Chen is a pioneer in the field of Generative Adversarial Networks (GANs) with over 12 years of experience. She has published numerous papers in NeurIPS and CVPR and loves teaching complex AI concepts in simple terms.
                                    </p>

                                    <button className="text-sPrimary text-sm font-bold hover:underline">View Profile</button>
                                </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Student Reviews</h2>
                            <div className="flex items-center gap-2 mb-8">
                                <span className="text-6xl font-black text-sPrimary">4.8</span>
                                <div className="space-y-1">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                                    </div>
                                    <p className="text-xs font-bold text-slate-900 md:pl-1">Course Rating</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ReviewCard
                                    name="James Wilson"
                                    date="1 week ago"
                                    initials="JW"
                                    rating={5}
                                    text="I've taken many AI courses, but this one actually explains the 'Why' behind the math. The LLM section is gold!"
                                />
                                <ReviewCard
                                    name="Aisha Al-Maktoum"
                                    date="3 weeks ago"
                                    initials="AM"
                                    rating={5}
                                    text="Perfect balance between theory and coding. I built my first RAG application after Module 5. Highly recommended."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <CourseSidebar />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

function StatBox({ icon: Icon, label, value }) {
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <Icon size={20} className="text-sPrimary" />
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{label}</p>
                <p className="text-sm font-bold text-slate-900">{value}</p>
            </div>
        </div>
    );
}

function LearnItem({ text }) {
    return (
        <div className="flex items-start gap-3">
            <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
            <p className="text-sm text-slate-700 font-medium leading-relaxed">{text}</p>
        </div>
    );
}

function ReviewCard({ name, date, initials, rating, text }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-full bg-blue-50 text-sPrimary font-bold flex items-center justify-center">
                    {initials}
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-900">{name}</p>
                    <p className="text-xs text-slate-400">{date}</p>
                </div>
            </div>
            <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < rating ? "currentColor" : "none"} className={i >= rating ? "text-slate-200" : ""} />)}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">"{text}"</p>
        </div>
    );
}
