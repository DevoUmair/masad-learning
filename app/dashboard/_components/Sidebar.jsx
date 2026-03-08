"use client";
import { LayoutDashboard, BookOpen, Award, Heart, Calendar, Settings, HelpCircle, BookText, LogOut, Menu, X, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '@/redux/auth/AuthApi';
import { logOut } from '@/redux/auth/AuthSlice';

export function Sidebar({ className, navItems = [] }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

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

    // Reusable Sidebar Content
    const SidebarContent = () => (
        <div className="flex flex-col h-full justify-between py-6">
            <div className="flex flex-col gap-8 px-6">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
                    <Image src="/logo/logo2.png" alt="Logo" width={100} height={100} />
                    <div className="flex flex-col -ml-7">
                        <h1 className="text-sPrimary dark:text-white text-xl font-bold leading-tight">Masad</h1>
                        <p className="text-sSecondary text-sm -mt-1">Learning</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                        const cleanPath = pathname.split("?")[0].replace(/\/$/, "");

                        // break into segments
                        const segments = cleanPath.split("/").filter(Boolean);

                        // Example:
                        // /dashboard/instructor/courses/new
                        // ["dashboard", "instructor", "courses", "new"]

                        const activeSegment = segments[2]; // after instructor

                        const itemSegment = item.href
                            .split("/")
                            .filter(Boolean)[2];

                        const isActive = activeSegment === itemSegment;

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                                    isActive
                                        ? "bg-sPrimary text-white"
                                        : "text-sSecondary hover:bg-gray-100 dark:hover:bg-gray-800"
                                )}
                            >
                                <item.icon size={20} />
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>


            </div>

            <div className="px-6 flex flex-col gap-2">
                <button onClick={logoutUser} className="flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
                    <LogOut size={20} />
                    <span className="text-sm font-medium">Logout</span>
                </button>

            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className={cn(
                "hidden lg:flex w-64 flex-shrink-0 border-r border-slate-200 dark:border-gray-800 bg-white dark:bg-backgroundDark flex-col justify-between py-0",
                className
            )}>
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar (Responsive within itself) */}
            <div className="lg:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <button className="fixed top-3 left-4 z-50 p-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-md shadow-sm">
                            <Menu size={20} className="text-sPrimary" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-72 border-none">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}