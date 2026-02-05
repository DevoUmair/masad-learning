'use client'
import React from 'react';
import { Building2, ShieldCheck, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AuthSplitLayout({ children, title, description, bgImage, userType = "student" }) {
    const router = useRouter();
    return (
        <div className="flex w-full bg-white">
            {/* Left Side - Branding Area with Image */}
            <div className="hidden lg:flex flex-col justify-between w-[45%] bg-sPrimary relative overflow-hidden p-12 text-white">

                {/* Background Image */}
                {bgImage && (
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={bgImage}
                            alt="Background"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-sPrimary/85 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-linear-to-b from-transparent to-sPrimary/90" />
                    </div>
                )}

                {/* Logo / Icon */}
                <div className="relative z-10 cursor-pointer -ml-6" onClick={() => router.push("/")}>
                    <Image src="/logo/logo2.png" alt="Logo" width={150} height={150} />
                </div>

                {/* Main Text content */}
                <div className="relative z-10 my-auto max-w-md">

                    <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight drop-shadow-md">
                        {title || "Empowering UAE's Future Leaders"}
                    </h1>
                    <p className="text-blue-50 text-lg leading-relaxed drop-shadow-sm">
                        {description || "Access our unified Enterprise Learning Management System designed for excellence in professional development."}
                    </p>
                </div>

                {/* Footer Badges */}
                <div className="relative z-10 flex gap-4 mt-auto">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-md text-sm font-medium border border-white/10 shadow-sm">
                        <ShieldCheck size={18} />
                        Secure Portal
                    </div>
                </div>
            </div>

            {/* Right Side - Form Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-24 bg-gray-50/50">
                <div className="w-full max-w-md">
                    {children}

                    <div className="mt-8 text-center text-xs text-gray-500 flex flex-col gap-2">
                        <div className="flex items-center justify-center gap-4 text-xs font-medium text-gray-400">
                            <span>© 2024 Enterprise Secure LMS</span>
                            <Link href="#" className="hover:text-gray-600">Privacy Policy</Link>
                            <Link href="#" className="hover:text-gray-600">Terms of Use</Link>
                        </div>
                        <div className="flex items-center justify-center gap-1 text-gray-400/80 mt-2">
                            <ShieldCheck size={12} />
                            PROTECTED BY ENTERPRISE SECURITY STANDARDS
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
