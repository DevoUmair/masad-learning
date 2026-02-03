'use client'
import { PlayCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ActiveCourseCard({ title, instructor, progress, category, image, id }) {
    const router = useRouter();
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-slate-200 dark:border-gray-700 flex flex-col group hover:shadow-lg transition-all">
            <div
                className="relative h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                    {category}
                </div>
            </div>

            <div className="p-5 flex flex-col gap-4">
                <div>
                    <h4 className="font-bold text-base leading-snug line-clamp-2">{title}</h4>
                    <p className="text-xs text-sSecondary mt-1">Instructor: {instructor}</p>
                </div>

                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-end">
                        <span className="text-xs font-semibold text-sPrimary">{progress}% Completed</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-slate-100" />
                </div>

                <Button className="w-full bg-sPrimary hover:bg-sPrimary/90 gap-2 cursor-pointer font-bold" onClick={() => router.push(`/dashboard/student/courses/${id}`)}>
                    <PlayCircle size={18} /> Resume Lesson
                </Button>
            </div>
        </div>
    );
}