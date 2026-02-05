import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function OfferBanner() {
    return (
        <section className="bg-sPrimary relative overflow-hidden min-h-[500px] flex items-center py-12 md:py-0">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/cta-bg-img.png"
                    alt="Smiling student"
                    className="w-full h-full object-cover object-[75%] md:object-top-right grayscale"
                />
                <div className="absolute inset-0 bg-linear-to-r from-sPrimary from-30% md:from-40% via-sPrimary/90 md:via-sPrimary/80 to-sPrimary/40 md:to-transparent"></div>
            </div>

            {/* Decorative Grid Pattern */}
            <div className="absolute top-0 left-0 w-full md:w-1/3 h-full z-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10 w-full flex items-center">
                <div className="max-w-2xl w-full">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                        50% Offer For Very First 50 Student’s & Mentors
                    </h2>
                    <p className="text-gray-200 md:text-gray-300 text-base md:text-lg mb-8 md:mb-10 leading-relaxed max-w-xl">
                        The ability to learn at my own pace was a game-changer for me. The flexible schedule allowed me to balance my studies with work and personal life, making it possible to complete the course without feeling overwhelmed.
                    </p>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
                        <button className="bg-sSecondary hover:bg-cyan-600 text-white px-8 py-3 md:py-3.5 rounded-full font-bold transition-all shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer">
                            Become A Student <ArrowRight size={18} />
                        </button>
                        <button className="border border-white text-white hover:bg-white hover:text-sPrimary px-8 py-3 md:py-3.5 rounded-full font-bold transition-all flex items-center justify-center gap-2 cursor-pointer">
                            Become A Teacher <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative Teal Circle */}
            <div className="absolute bottom-[-100px] right-[-50px] w-96 h-96 border-[40px] border-sSecondary rounded-full opacity-80 z-10 hidden lg:block"></div>
            <div className="absolute bottom-[-140px] right-[50px] w-96 h-96 border-[2px] border-sSecondary/30 rounded-full z-0 hidden lg:block"></div>
        </section>
    );
}
