"use client";
import { ChevronDown, Menu, X, GraduationCap, User, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '@/redux/auth/AuthApi';
import { logOut } from '@/redux/auth/AuthSlice';
import { useRouter } from 'next/navigation';

export default function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const user = useSelector((state) => state.auth.user);
    const [logoutMutation] = useLogoutMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    const logoutUser = async () => {
        try {
            await logoutMutation().unwrap();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            dispatch(logOut());
            router.push('/login');
        }
    };

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Courses', href: '/courses' },
        { name: 'About Us', href: '/about' },
        // { name: 'Who We Are', href: '/who-we-are' },
        { name: 'Contact Us', href: '/contact' },
    ];

    const socialLinks = [
        { icon: Facebook, href: '#' },
        { icon: Twitter, href: '#' },
        { icon: Instagram, href: '#' },
        { icon: Linkedin, href: '#' },
        { icon: Youtube, href: '#' },
    ];

    return (
        <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center relative z-50" onClick={() => setIsMobileMenuOpen(false)}>
                    <Image
                        src='/logo/logo2.png'
                        alt='logo'
                        width={120}
                        height={120}
                    />
                    <div className='flex flex-col justify-center'>
                        <p className="text-xl font-bold text-slate-800 -ml-6 leading-none">Masad</p>
                        <p className='text-xs text-sSecondary -ml-5 leading-tight'>Learning</p>
                    </div>

                </Link>

                {/* Navigation - Hidden on mobile */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-1 font-medium transition-colors ${pathname === item.href ? 'text-sSecondary' : 'text-slate-600 hover:text-sSecondary'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="hidden md:flex items-center gap-4">


                            <Link
                                href={`/dashboard/${user.role || 'student'}`}
                                className="bg-sSecondary hover:bg-sSecondary/90 text-white px-5 py-2 rounded-full font-medium transition-colors"
                            >
                                Dashboard
                            </Link>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="hidden md:flex bg-sSecondary hover:bg-sSecondary/90 text-white px-6 py-2.5 rounded-full font-medium items-center gap-2 transition-colors"
                        >
                            Login
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-slate-600 hover:text-sSecondary transition-colors cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-sPrimary/60 z-60 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-[320px] bg-white z-70 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-full flex flex-col">
                    {/* Sidebar Header with decorative element */}
                    <div className="relative bg-sPrimary p-6 pb-8">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>

                        <div className="relative flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Image src='/logo/logo2.png' alt='logo' width={120} height={120} />
                                <div className='flex flex-col justify-center'>
                                    <p className="text-xl font-bold text-white -ml-6 leading-none">Masad</p>
                                    <p className='text-xs text-sSecondary -ml-5 leading-tight'>Learning</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Sidebar Links - Scrollable section */}
                    <nav className="flex-1 px-6 py-6 space-y-2 overflow-y-auto">
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 text-base font-medium px-4 py-3 rounded-xl transition-all group ${isActive
                                        ? 'text-sPrimary bg-sSecondary/10'
                                        : 'text-slate-700 hover:text-sPrimary hover:bg-sSecondary/10'
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full bg-sSecondary transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                        }`}></div>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Login/User Sections - Fixed at bottom */}
                    <div className="px-6 py-6 border-t border-gray-100 bg-white space-y-3">
                        {user ? (
                            <>
                                <div className="mb-4 text-center">
                                    <p className="text-sm text-slate-500 font-medium">Logged in as</p>
                                    <p className="text-lg font-bold text-slate-800">{user.firstName || user.name?.split(' ')[0] || 'User'}</p>
                                </div>
                                <Link
                                    href={`/dashboard/${user.role || 'student'}`}
                                    className="flex w-full bg-sSecondary hover:bg-sSecondary/90 text-white px-5 py-3.5 rounded-xl font-bold items-center justify-center transition-all shadow-md group"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>

                            </>
                        ) : (
                            <>
                                {/* Teacher Login */}
                                <Link
                                    href="/register/instructor"
                                    className="flex w-full bg-white border-2 border-sPrimary text-sPrimary hover:bg-sPrimary hover:text-white px-5 py-3.5 rounded-xl font-bold items-center justify-between transition-all shadow-sm group"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="flex items-center gap-3">
                                        <GraduationCap size={20} />
                                        Instructor Register
                                    </span>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="group-hover:translate-x-1 transition-transform"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>

                                {/* Student Login */}
                                <Link
                                    href="/register/student"
                                    className="flex w-full bg-sSecondary hover:bg-sSecondary/90 text-white px-5 py-3.5 rounded-xl font-bold items-center justify-between transition-all shadow-md group"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="flex items-center gap-3">
                                        <User size={20} />
                                        Student Register
                                    </span>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="group-hover:translate-x-1 transition-transform"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                <Link
                                    href="/login"
                                    className="flex mt-2 w-full text-center text-sSecondary hover:underline justify-center font-bold px-5 py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Already have an account? Login
                                </Link>
                            </>
                        )}

                        {/* Social Media Icons */}
                        <div className="pt-4 border-t border-gray-100">
                            <p className="text-xs text-slate-400 mb-3 text-center font-medium uppercase tracking-wider">Connect With Us</p>
                            <div className="flex justify-center gap-3">
                                {socialLinks.map((social, index) => (
                                    <Link
                                        key={index}
                                        href={social.href}
                                        className="p-2.5 bg-slate-50 hover:bg-sSecondary/10 text-slate-400 hover:text-sSecondary rounded-lg transition-all"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <social.icon size={18} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}