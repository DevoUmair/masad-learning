import { Star, Clock, BarChart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CourseCard({ course }) {
    const router = useRouter();
    const title = course.title || "Untitled Course";
    const instructor = course.instructor?.name || course.instructor || "Unknown";
    const rating = course.averageRating || course.rating || 0;
    const reviews = course.totalRatings || course.totalRatings || 0;
    const level = course.level || "All Levels";
    const price = course.price ?? 0;
    const image = course.thumbnailImage?.url || course.image || null;
    const courseId = course._id || course.id;
    const totalHours = course.courseIncludes?.totalVideoHours || course.duration || 0;

    return (
        <div
            onClick={() => router.push(`/courses/${courseId}`)}
            className="group cursor-pointer bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden">

            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                        <BarChart size={40} />
                    </div>
                )}

                {/* Badge */}
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
                    {title}
                </h3>

                <p className="text-sm text-slate-500 mb-3">{instructor}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                    <span className="font-bold text-yellow-500 text-sm">{rating.toFixed(1)}</span>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={12}
                                className={cn(
                                    i < Math.floor(rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-slate-200 text-slate-200"
                                )}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-slate-400 ml-1">({reviews.toLocaleString()})</span>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{totalHours}h</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <BarChart size={14} />
                        <span>{level}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="text-xl font-black text-slate-900">
                        {price === 0 ? "Free" : `AED ${price}`}
                    </div>
                    <Link href={`/courses/${courseId}`}>
                        <Button size="sm" className="bg-blue-50 cursor-pointer text-sPrimary hover:bg-blue-100 font-bold border-none h-9 px-4">
                            Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
