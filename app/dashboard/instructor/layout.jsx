"use client";
import { Sidebar } from "../_components/Sidebar";
import TopBar from "../_components/TopBar";
import { LayoutDashboard, BookOpen, Award, Video } from "lucide-react";
import ProtectedRoute from "@/components/custom/ProtectedRoute";

export default function InstructorLayout({ children }) {
    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/instructor" },
        { icon: BookOpen, label: "My Courses", href: "/dashboard/instructor/courses" },
        { icon: Award, label: "Students", href: "/dashboard/instructor/students" },
        { icon: Video, label: "Video Library", href: "/dashboard/instructor/library" },
    ];
    return (
        <ProtectedRoute allowedRoles={['instructor']}>
            <div className="flex h-screen overflow-hidden bg-backgroundLight dark:bg-backgroundDark ">
                <Sidebar navItems={navItems} className="hidden md:flex" />
                <main className="flex-1 flex flex-col overflow-hidden">
                    <TopBar />
                    <div className="flex-1 overflow-y-auto p-6">
                        {children}
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
