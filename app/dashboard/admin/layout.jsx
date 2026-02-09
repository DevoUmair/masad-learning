"use client";
import { Sidebar } from "../_components/Sidebar";
import TopBar from "../_components/TopBar";
import { LayoutDashboard, Users, ShieldCheck, Banknote, BarChart3 } from "lucide-react";

export default function AdminLayout({ children }) {
    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/admin" },
        { icon: Users, label: "Instructor Management", href: "/dashboard/admin/instructor" },
        { icon: Users, label: "Student Management", href: "/dashboard/admin/student" },
        { icon: ShieldCheck, label: "Course Management", href: "/dashboard/admin/courses" },
        { icon: Banknote, label: "Payments & Billing", href: "/dashboard/admin/billing" },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-backgroundLight dark:bg-backgroundDark ">
            <Sidebar navItems={navItems} className="hidden md:flex" />
            <main className="flex-1 flex flex-col overflow-hidden">
                <TopBar />
                <div className="flex-1 overflow-y-auto p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
