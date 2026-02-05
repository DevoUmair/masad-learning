import React from 'react';
import Image from 'next/image';
import { Award, Users, BookOpen, Clock, CheckCircle } from 'lucide-react';
import SectionBadge from '@/components/custom/SectionBadge';

export default function AboutUs() {
    const features = [
        {
            icon: <Users size={24} />,
            title: "Expert Mentors",
            description: "Learn from industry experts with real-world experience."
        },
        {
            icon: <BookOpen size={24} />,
            title: "Lifetime Access",
            description: "Get unlimited access to your course materials anytime."
        },
        {
            icon: <Clock size={24} />,
            title: "Flexible Schedule",
            description: "Study at your own pace with our flexible learning options."
        },
        {
            icon: <Award size={24} />,
            title: "Recognized Certs",
            description: "Earn certificates valued by top employers worldwide."
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Column: Content */}
                <div>
                    {/* Badge */}
                    <SectionBadge icon={<Users size={12} fill="currentColor" />} text="About Us" />

                    <h2 className="text-4xl md:text-5xl font-bold text-sPrimary mb-6 leading-tight">
                        We Are Building The Future Of Education Together
                    </h2>

                    <p className="text-sTextGray text-lg mb-10 leading-relaxed">
                        We are dedicated to providing high-quality online education that empowers individuals to achieve their career goals. Our platform connects learners with expert mentors and industry-standard resources.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-sSecondary/10 flex items-center justify-center text-sSecondary shrink-0">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sPrimary mb-2">{feature.title}</h4>
                                    <p className="text-sTextGray text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="mt-10 bg-sPrimary text-white px-8 py-3.5 rounded-full font-bold hover:bg-slate-800 transition-colors flex items-center gap-2">
                        Learn More About Us <CheckCircle size={18} />
                    </button>
                </div>

                {/* Right Column: Image */}
                <div className="relative">
                    {/* Main Image */}
                    <div className="relative z-10 w-full h-[400px] lg:h-[600px]">
                        <Image
                            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop"
                            alt="About Us"
                            fill
                            className="object-cover rounded-tl-[100px] rounded-br-[100px] rounded-tr-3xl rounded-bl-3xl shadow-2xl"
                        />
                    </div>

                    {/* Floating Experience Badge */}
                    <div className="absolute top-10 -left-10 z-20 bg-white p-6 rounded-2xl shadow-xl border-l-4 border-sSecondary animate-bounce-slow hidden md:block">
                        <div className="text-4xl font-bold text-sPrimary mb-1">10+</div>
                        <div className="text-sTextGray font-medium text-sm">Years of <br /> Success</div>
                    </div>

                    {/* Decoration Dots */}
                    <div className="absolute -bottom-10 -right-10 z-0">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="2" cy="2" r="2" className="text-sSecondary/30" fill="currentColor" />
                            </pattern>
                            <rect width="100" height="100" fill="url(#dots)" />
                        </svg>
                    </div>
                </div>

            </div>
        </section>
    );
}
