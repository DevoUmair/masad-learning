import React from 'react'
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopBar = () => {
    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(today);

    return (
        <header className="h-16 border-b border-slate-200 bg-white dark:bg-backgroundDark flex items-center justify-between px-4 sm:px-8 shrink-0">
            <div className="flex items-center gap-4 pl-12 lg:pl-0">
                <div>
                    <p className="text-sm font-semibold text-sPrimary">{formattedDate}</p>
                </div>
            </div>

            {/* Right Section: Profile */}
            <div className="flex items-center gap-2 sm:gap-6">
                <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold leading-none">Ahmed Al-Maktoum</p>
                        <p className="text-sm text-sSecondary font-medium">Student ID: 29481</p>
                    </div>
                    <Avatar className="border-2 border-sPrimary/20">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>AA</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    )
}

export default TopBar