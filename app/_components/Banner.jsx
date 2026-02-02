import { Search, MonitorPlay, User, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function Banner() {
    return (
        <div className="bg-[#f0f9ff] relative overflow-hidden">
            {/* Background decorative elements could go here */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-cyan-50 to-transparent -skew-x-12 transform -translate-x-20 opacity-50 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Content */}
                <div>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
                        <span className="bg-teal-100 text-sSecondary p-1 rounded-full"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg></span>
                        <span className="text-sPrimary font-semibold text-sm tracking-wide">Welcome to Masad Learning</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-7xl font-bold text-sPrimary leading-[1.1] mb-8">
                        Start learning from the <br /> world’s best sites
                    </h1>

                    {/* Description */}
                    <p className="text-sTextGray text-lg mb-10 max-w-lg leading-relaxed">
                        Unlock your potential with our expert-led courses. Dive into a world of knowledge tailored to your needs.
                    </p>

                    {/* Search Bar */}
                    <div className="bg-white p-2 rounded-full shadow-lg flex items-center justify-between max-w-lg mb-12 border border-gray-100">
                        <div className="flex items-center gap-3 px-4 flex-1">
                            <Search className="text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="What do you want to learn today?"
                                className="w-full outline-none text-slate-600 placeholder:text-slate-400 bg-transparent"
                            />
                        </div>
                        <button className="bg-sSecondary hover:bg-cyan-600 text-white px-8 py-3 rounded-full font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                            Search Now <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-sSecondary">
                                <MonitorPlay size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-sPrimary">9.5K+</div>
                                <div className="text-xs text-slate-500">Total active students taking<br />gifted courses</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-sSecondary">
                                <User size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-sPrimary">15.5K+</div>
                                <div className="text-xs text-slate-500">Total active students taking<br />gifted courses</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Image Area */}
                <div className="relative">
                    {/* Main Image Placeholder */}
                    {/* In a real app, use next/image with a real path. Using a placeholder div for now or a generic placeholder URL if acceptable, but instructions say generate_image or use existing. I will use a colored placeholder for structure as I don't have the image file yet. */}
                    <div className="relative z-10">
                        <img
                            src="https://images.unsplash.com/photo-1665686376173-ada7a0031a85?q=80&w=2670&auto=format&fit=crop"
                            alt="Arabic student learning"
                            className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
                        />

                        {/* Floating Badge 1 - Top Left */}
                        <div className="absolute top-10 -left-10 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce-slow">
                            <div className="bg-sSecondary text-white p-2 rounded-lg">
                                <User size={20} />
                            </div>
                            <div>
                                <div className="font-bold text-sPrimary">256+</div>
                                <div className="text-xs text-slate-500">Crashed Courses</div>
                            </div>
                        </div>

                        {/* Floating Badge 2 - Bottom Left */}
                        <div className="absolute bottom-10 -left-16 bg-white p-4 rounded-xl shadow-lg animate-pulse-slow">
                            <div className='mb-2 font-bold text-sPrimary'>Instructor</div>
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="Instructor 1" />
                                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="Instructor 2" />
                                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="Instructor 3" />
                                    <div className="w-8 h-8 rounded-full bg-sSecondary border-2 border-white flex items-center justify-center text-white text-[10px] show">+</div>
                                </div>
                                <div className='text-xs font-bold text-slate-600'>200+ <br /><span className='font-normal text-slate-400'>Instructor</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Background Shape */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white rounded-full -z-10 blur-3xl opacity-50"></div>
                </div>
            </div>
        </div>
    );
}
