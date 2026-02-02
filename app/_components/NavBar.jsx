import { ChevronDown, Heart, ShoppingCart, Search } from 'lucide-react';
import Link from 'next/link';

export default function NavBar() {
    const navItems = [
        { name: 'Home', hasDropdown: true },
        { name: 'Pages', hasDropdown: true },
        { name: 'Shop', hasDropdown: true },
        { name: 'Course', hasDropdown: true },
        { name: 'Blog', hasDropdown: true },
        { name: 'Contact', hasDropdown: false },
    ];

    return (
        <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl  mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className='p-2 bg-teal-50 rounded-lg'>

                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-sSecondary"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <span className="text-2xl font-bold text-slate-800">Mazad Learning</span>
                </Link>

                {/* Navigation - Hidden on mobile */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href="#"
                            className="flex items-center gap-1 font-medium text-slate-600 hover:text-sSecondary transition-colors"
                        >
                            {item.name}
                            {item.hasDropdown && <ChevronDown size={14} />}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <button className="relative w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-slate-600 hover:bg-teal-50 hover:text-sSecondary transition-all">
                        <Heart size={20} />
                        <span className="absolute -top-1 -right-1 bg-sSecondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
                    </button>

                    <button className="relative w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-slate-600 hover:bg-teal-50 hover:text-sSecondary transition-all">
                        <ShoppingCart size={20} />
                        <span className="absolute -top-1 -right-1 bg-sSecondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
                    </button>

                    <Link
                        href="#"
                        className="hidden md:flex bg-sSecondary hover:bg-cyan-600 text-white px-6 py-2.5 rounded-full font-medium items-center gap-2 transition-colors"
                    >
                        Start Free Trail
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}