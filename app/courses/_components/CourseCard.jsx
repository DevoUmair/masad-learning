import { Star, Clock, BarChart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CourseCard({ course }) {
    return (
        <div className="group bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden">
            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                {course.badge && (
                    <div className={cn(
                        "absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide",
                        course.badge === 'Bestseller' ? "bg-yellow-400 text-yellow-900" :
                            course.badge === 'New' ? "bg-blue-600 text-white" : "bg-slate-800 text-white"
                    )}>
                        {course.badge}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-slate-900 text-lg leading-tight line-clamp-2 mb-2 group-hover:text-sPrimary transition-colors">
                    {course.title}
                </h3>

                <p className="text-sm text-slate-500 mb-3">{course.instructor}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                    <span className="font-bold text-yellow-500 text-sm">{course.rating}</span>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={12}
                                className={cn(
                                    i < Math.floor(course.rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-slate-200 text-slate-200"
                                )}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-slate-400 ml-1">({course.reviews.toLocaleString()})</span>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <BarChart size={14} />
                        <span>{course.level}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="text-xl font-black text-slate-900">
                        {course.price === 0 ? "Free" : `AED ${course.price}`}
                    </div>
                    <Link href={`/courses/${course.id}`}>
                        <Button size="sm" className="bg-blue-50 cursor-pointer text-sPrimary hover:bg-blue-100 font-bold border-none h-9 px-4">
                            Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
