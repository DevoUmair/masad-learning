"use client";
import Link from "next/link";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetCertificatesQuery } from "@/redux/certificate/certificateApi";



export default function CertificatesPage() {
    const { data, isLoading, error } = useGetCertificatesQuery();

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sPrimary"></div>
        </div>
    );

    if (error) return (
        <div className="text-center p-12 bg-red-50 rounded-xl border border-red-100">
            <Award size={48} className="mx-auto text-red-500 mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-red-700">Failed to load certificates</h3>
            <p className="text-red-600/70">Please try again later or contact support if the issue persists.</p>
        </div>
    );

    const certificates = data?.certificates || [];

    return (
        <div className="space-y-8">
            <div className="flex flex-col">
                <h2 className="text-2xl font-black text-sPrimary dark:text-white tracking-tight">
                    My Certificates
                </h2>
                <p className="text-sSecondary">View and download your earned credentials.</p>
            </div>

            {certificates.length === 0 ? (
                <div className="text-center p-12 bg-slate-50 dark:bg-gray-900 rounded-xl border border-dashed border-slate-300 dark:border-gray-700">
                    <Award size={64} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">No certificates yet</h3>
                    <p className="text-slate-500 mt-2">Complete your first course to earn a recognized certificate.</p>
                    <Link href="/dashboard/student/library">
                        <Button className="mt-6 bg-sPrimary text-white hover:bg-sPrimary/90">
                            Continue Learning
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert) => (
                        <div key={cert._id} className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all group flex flex-col">
                            <div className="h-48 bg-slate-100 dark:bg-gray-900 flex items-center justify-center relative overflow-hidden">
                                {cert.course?.thumbnailImage?.url ? (
                                    <img
                                        src={cert.course.thumbnailImage.url}
                                        alt={cert.course.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-linear-to-br from-sPrimary/10 to-transparent" />
                                )}
                                <Award className="text-sPrimary transition-all relative z-10 drop-shadow-lg" size={64} />
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="mb-4">
                                    <h3 className="font-bold text-lg leading-snug line-clamp-2 min-h-14 group-hover:text-sPrimary transition-colors">
                                        {cert.course?.title}
                                    </h3>
                                    <p className="text-sm text-sSecondary mt-2 font-medium flex items-center gap-1.5">
                                        <Award size={14} className="text-sPrimary" />
                                        {cert.course?.instructor?.name}
                                    </p>
                                </div>

                                <div className="mt-auto space-y-4">
                                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-400 bg-slate-50 dark:bg-gray-900/50 p-2 rounded-lg">
                                        <Calendar size={14} />
                                        <span>Issued: {new Date(cert.issueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                    </div>

                                    <Link href={`/dashboard/student/certificates/${cert._id}`}>
                                        <Button className="w-full cursor-pointer gap-2 bg-sPrimary text-white hover:bg-sPrimary/90 border-none shadow-sm" size="sm">
                                            View Details <ExternalLink size={14} />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
