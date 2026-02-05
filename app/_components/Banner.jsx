import { Search, MonitorPlay, User, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import SectionBadge from '../../components/custom/SectionBadge';
import Link from 'next/link';
export default function Banner() {
    return (
        <div className="bg-[#f0f9ff] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-linear-to-r from-cyan-50 to-transparent -skew-x-12 transform -translate-x-20 opacity-50 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 py-12 md:pt-16 md:pb-24 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Content */}
                <div>
                    {/* Badge */}
                    <SectionBadge
                        icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>}
                        text="Welcome to Masad Learning"
                        variant="white"
                    />

                    {/* Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-sPrimary leading-[1.1] mb-6 md:mb-8 mt-4">
                        Start learning from the <br className="hidden md:block" /> world’s best sites
                    </h1>

                    {/* Description */}
                    <p className="text-sTextGray text-base md:text-lg mb-8 md:mb-10 max-w-lg leading-relaxed">
                        Unlock your potential with our expert-led courses. Dive into a world of knowledge tailored to your needs.
                    </p>

                    {/* Search Bar */}
                    <div className="bg-white p-3 rounded-full shadow-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between max-w-lg mb-10 md:mb-12  border border-gray-100">
                        <div className="flex items-center gap-3 px-4 py-2 sm:py-0 flex-1 border-b sm:border-b-0 border-gray-100 sm:border-r border-r-0">
                            <Search className="text-slate-400 shrink-0" size={20} />
                            <input
                                type="text"
                                placeholder="What do you learn?"
                                className="w-full outline-none text-slate-600 placeholder:text-slate-400 bg-transparent text-sm md:text-base"
                            />
                        </div>
                        <Link href="/courses" className="w-full sm:w-auto">
                            <button className="bg-sSecondary cursor-pointer hover:bg-cyan-600 text-white px-6 md:px-8 py-3 rounded-full font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
                                Search <span className="hidden sm:inline">Now</span> <ChevronRight size={16} />
                            </button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-row flex-wrap gap-8 sm:gap-12">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-50 flex items-center justify-center text-sSecondary shrink-0">
                                <MonitorPlay size={20} className="md:w-6 md:h-6" />
                            </div>
                            <div>
                                <div className="text-xl md:text-2xl font-bold text-sPrimary">9.5K+</div>
                                <div className="text-[10px] md:text-xs text-slate-500">Total active students taking<br />gifted courses</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-50 flex items-center justify-center text-sSecondary shrink-0">
                                <User size={20} className="md:w-6 md:h-6" />
                            </div>
                            <div>
                                <div className="text-xl md:text-2xl font-bold text-sPrimary">15.5K+</div>
                                <div className="text-[10px] md:text-xs text-slate-500">Total active students taking<br />gifted courses</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Image Area */}
                <div className="relative mt-8 lg:mt-0">
                    {/* Main Image Placeholder */}
                    <div className="relative z-10 w-full h-[300px] sm:h-[400px] md:h-[500px]">
                        <Image
                            src="https://www.shutterstock.com/image-photo/multiethnic-group-muslim-girls-wearing-600nw-2453408567.jpg"
                            alt="Arabic student learning"
                            fill
                            className="rounded-3xl shadow-2xl object-cover"
                        />

                        {/* Floating Badge 1 - Top Left */}
                        <div className="absolute top-4 left-4 md:top-10 md:-left-10 bg-white p-3 md:p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce-slow max-w-[180px] md:max-w-none">
                            <div className="bg-sSecondary text-white p-2 rounded-lg shrink-0">
                                <User size={16} className="md:w-5 md:h-5" />
                            </div>
                            <div>
                                <div className="font-bold text-sPrimary text-sm md:text-base">256+</div>
                                <div className="text-[10px] md:text-xs text-slate-500">Crashed Courses</div>
                            </div>
                        </div>

                        {/* Floating Badge 2 - Bottom Left */}
                        <div className="absolute bottom-4 left-4 md:bottom-10 md:-left-16 bg-white p-3 md:p-4 rounded-xl shadow-lg animate-pulse-slow max-w-[200px] md:max-w-none">
                            <div className='mb-1 md:mb-2 font-bold text-sPrimary text-sm md:text-base'>Instructor</div>
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="flex -space-x-2 md:-space-x-3">
                                    <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop" width={28} height={28} className="rounded-full border-2 border-white object-cover w-7 h-7 md:w-8 md:h-8" alt="Instructor 1" />
                                    <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" width={28} height={28} className="rounded-full border-2 border-white object-cover w-7 h-7 md:w-8 md:h-8" alt="Instructor 2" />
                                    <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" width={28} height={28} className="rounded-full border-2 border-white object-cover w-7 h-7 md:w-8 md:h-8" alt="Instructor 3" />
                                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-sSecondary border-2 border-white flex items-center justify-center text-white text-[10px] show">+</div>
                                </div>
                                <div className='text-[10px] md:text-xs font-bold text-slate-600 leading-tight'>200+ <br /><span className='font-normal text-slate-400'>Instructor</span></div>
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
