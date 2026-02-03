import React from 'react';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube, ArrowRight, MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';

export default function Footer() {
    return (
        <div className='relative mt-10 lg:mt-32'>
            {/* CTA Section - Stacked on Mobile/Tablet, Overlapping on Desktop */}
            <div className="relative lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 w-full max-w-7xl mx-auto px-4 z-30 pb-10 md:pb-0">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Student CTA */}
                    <div className="bg-white rounded-[30px] p-8 md:p-10 flex justify-between items-center shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <span className="text-sSecondary font-bold text-sm tracking-widest uppercase mb-2 block">Become Student</span>
                            <h3 className="text-3xl font-bold text-sPrimary mb-6 leading-tight">Get The Best Courses & <br /> Upgrade Your Skills</h3>
                            <button className="bg-sSecondary text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-cyan-600 transition-colors">
                                Become A Student <ArrowRight size={18} />
                            </button>
                        </div>
                        <div className="relative z-10">
                            <div className="relative z-10">
                                <Image
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop"
                                    alt="Student"
                                    width={160}
                                    height={160}
                                    className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-white shadow-lg"
                                />
                            </div>
                        </div>
                        {/* Decorative Circle */}
                        <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-sSecondary/10 rounded-full group-hover:bg-sSecondary/20 transition-colors z-0"></div>
                    </div>

                    {/* Teacher CTA */}
                    <div className="bg-white rounded-[30px] p-8 md:p-10 flex justify-between items-center shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <span className="text-sSecondary font-bold text-sm tracking-widest uppercase mb-2 block">Become Instructor</span>
                            <h3 className="text-3xl font-bold text-sPrimary mb-6 leading-tight">Get The Best Courses & <br /> Upgrade Your Skills</h3>
                            <button className="bg-sSecondary text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-cyan-600 transition-colors">
                                Become A Teacher <ArrowRight size={18} />
                            </button>
                        </div>
                        <div className="relative z-10">
                            <div className="relative z-10">
                                <Image
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
                                    alt="Teacher"
                                    width={160}
                                    height={160}
                                    className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-white shadow-lg"
                                />
                            </div>
                        </div>
                        {/* Decorative Circle */}
                        <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-sSecondary/10 rounded-full group-hover:bg-sSecondary/20 transition-colors z-0"></div>
                    </div>
                </div>
            </div>

            <footer className="bg-sPrimary text-gray-300 relative pt-12 lg:pt-48">
                {/* Main Footer Content */}
                <div className="pt-10  pb-16 max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Column 1: Brand */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-sSecondary/10 rounded-lg">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-sSecondary" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                                </div>
                                <span className="text-2xl font-bold text-white">EdCare</span>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Globally deploy synergistic opportunities after state of techno create information without iterate impactful internal.
                            </p>
                            <div className="flex gap-4">
                                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-sSecondary transition-all">
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Company Info */}
                        <div>
                            <h4 className="text-white font-bold text-lg mb-8 uppercase">Company Info</h4>
                            <ul className="space-y-4">
                                {['About Us', 'Resource Center', 'Careers', 'Instructor', 'Become A Teacher'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="flex items-center gap-2 hover:text-sSecondary transition-colors group">
                                            <ArrowRight size={16} className="text-sSecondary opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Useful Links */}
                        <div>
                            <h4 className="text-white font-bold text-lg mb-8 uppercase">Useful Links</h4>
                            <ul className="space-y-4">
                                {['All Courses', 'Digital Marketing', 'Design & Branding', 'Storytelling & Voice Over', 'News & Blogs'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="flex items-center gap-2 hover:text-sSecondary transition-colors group">
                                            <ArrowRight size={16} className="text-sSecondary opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Recent Post */}
                        <div>
                            <h4 className="text-white font-bold text-lg mb-8 uppercase">Recent Post</h4>
                            <div className="space-y-6">
                                <div className="flex gap-4 group cursor-pointer">
                                    <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=100&h=100&auto=format&fit=crop" alt="Post 1" width={80} height={80} className="w-20 h-20 object-cover rounded-lg" />
                                    <div>
                                        <h5 className="text-white font-bold leading-tight group-hover:text-sSecondary transition-colors">Importance of Arts Integrating</h5>
                                        <div className="flex items-center gap-2 text-xs text-sSecondary mt-2">
                                            <Clock size={12} /> <span>20 April, 2024</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 group cursor-pointer">
                                    <Image src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=100&h=100&auto=format&fit=crop" alt="Post 2" width={80} height={80} className="w-20 h-20 object-cover rounded-lg" />
                                    <div>
                                        <h5 className="text-white font-bold leading-tight group-hover:text-sSecondary transition-colors">Development Student Best Achievement</h5>
                                        <div className="flex items-center gap-2 text-xs text-sSecondary mt-2">
                                            <Clock size={12} /> <span>20 April, 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="bg-sSecondary text-white py-6">
                    <div className="max-w-7xl mx-auto px-4 flex justify-center items-center gap-4">
                        <p className="text-sm font-medium w-full text-center">Copyright © 2025 EdCare. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}