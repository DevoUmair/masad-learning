'use client'
import { PlayCircle, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function ActiveCourseCard({ course }) {
    const router = useRouter();

    const title = course.title || "Untitled Course";
    const instructor = course.instructor?.name || course.instructor || "Instructor";
    const category = course.category?.name || course.category || "General";
    const image = course.thumbnailImage?.url || null;
    const courseId = course._id || course.id;
    const level = course.level || "All Levels";
    const totalLessons = course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;

    // Progress (placeholder — you can calculate real progress later from lesson completions)
    const progress = course.progress || 0;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-slate-200 dark:border-gray-700 flex flex-col group hover:shadow-lg transition-all">
            <div className="relative h-40 bg-slate-100 overflow-hidden">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-300">
                        <BookOpen size={40} />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                    {category}
                </div>

            </div>

            <div className="p-5 flex flex-col gap-4 flex-1">
                <div>
                    <h4 className="font-bold text-base leading-snug line-clamp-2">{title}</h4>
                    <p className="text-xs text-sSecondary mt-1">{instructor}</p>
                    <p className="text-xs text-slate-400 mt-1">{totalLessons} Lessons • {course.courseIncludes?.totalVideoHours || 0}h</p>
                </div>

                <div className="flex flex-col gap-1.5 mt-auto">
                    <div className="flex justify-between items-end">
                        <span className="text-xs font-semibold text-sPrimary">{progress}% Completed</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-slate-100" />
                </div>

                <Button className="w-full bg-sPrimary hover:bg-sPrimary/90 gap-2 cursor-pointer font-bold" onClick={() => router.push(`/dashboard/student/courses/${courseId}`)}>
                    <PlayCircle size={18} /> {progress > 0 ? "Resume Lesson" : "Start Course"}
                </Button>
            </div>
        </div>
    );
}