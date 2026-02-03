import Link from "next/link";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockCertificates = [
    {
        id: "UAE-LMS-2024-9842",
        title: "Advanced Strategic Leadership & Digital Governance",
        issueDate: "14 May 2024",
        issuer: "UAE Leadership Institute",
        image: "/certificate-thumb.jpg" // Placeholder
    },
    {
        id: "UAE-LMS-2023-1120",
        title: "Project Management Professional (PMP) Prep",
        issueDate: "20 Nov 2023",
        issuer: "Project Management Institute",
        image: "/certificate-thumb.jpg"
    },
    {
        id: "UAE-LMS-2023-0541",
        title: "Data Science Fundamentals",
        issueDate: "05 Jun 2023",
        issuer: "Future Skills Academy",
        image: "/certificate-thumb.jpg"
    }
];

export default function CertificatesPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col">
                <h2 className="text-2xl font-black text-sPrimary dark:text-white tracking-tight">
                    My Certificates
                </h2>
                <p className="text-sSecondary">View and download your earned credentials.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCertificates.map((cert) => (
                    <div key={cert.id} className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all group">
                        <div className="h-48 bg-slate-100 dark:bg-gray-900 flex items-center justify-center relative">
                            <Award className="text-sPrimary/20 group-hover:text-sPrimary/40 transition-colors" size={64} />
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            <div>
                                <h3 className="font-bold text-lg leading-snug line-clamp-2 min-h-[3.5rem]">
                                    {cert.title}
                                </h3>
                                <p className="text-sm text-sSecondary mt-2">{cert.issuer}</p>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-400">
                                <Calendar size={14} />
                                <span>Issued: {cert.issueDate}</span>
                            </div>

                            <Link href={`/dashboard/student/certificates/${cert.id}`}>
                                <Button className="w-full mt-2 cursor-pointer gap-2" variant="outline">
                                    View Certificate <ExternalLink size={16} />
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
