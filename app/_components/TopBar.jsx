import { Phone, MapPin, Clock, User, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function TopBar() {
    return (
        <div className="bg-sPrimary text-sTextLight py-3 text-[13px] font-medium hidden md:block">
            <div className="max-w-7xl  mx-auto px-4 flex justify-between items-center">
                {/* Left Section: Contact Info */}
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 hover:text-sSecondary transition-colors cursor-pointer">
                        <Phone size={14} className="text-sSecondary" />
                        <span>256 214 203 215</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-sSecondary transition-colors cursor-pointer">
                        <MapPin size={14} className="text-sSecondary" />
                        <span>258 Helano Street, New York</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={14} className="text-sSecondary" />
                        <span>Mon - Sat: 8:00 - 15:00</span>
                    </div>
                </div>

                {/* Right Section: Login & Socials */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 pl-6 border-l border-gray-600">
                        <span className="mr-2">Follow us:</span>
                        <Link href="#" className="hover:text-sSecondary transition-colors"><Facebook size={14} /></Link>
                        <Link href="#" className="hover:text-sSecondary transition-colors"><Twitter size={14} /></Link>
                        <Link href="#" className="hover:text-sSecondary transition-colors"><Instagram size={14} /></Link>
                        <Link href="#" className="hover:text-sSecondary transition-colors"><Linkedin size={14} /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}