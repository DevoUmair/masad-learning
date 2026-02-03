"use client";
import { Sidebar } from "../_components/Sidebar";
import TopBar from "../_components/TopBar";
import { LayoutDashboard, BookOpen, Award } from "lucide-react";

export default function StudentLayout({ children }) {
    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/student" },
        { icon: BookOpen, label: "My Courses", href: "/dashboard/student/courses" },
        { icon: Award, label: "Certificates", href: "/dashboard/student/certificates" },
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
