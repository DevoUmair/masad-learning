'use client';
import { Button } from "@/components/ui/button";
import { Link2, Printer, Download, Share2, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CertificateDetail({ params }) {
    // In a real app, fetch cert details using params.id
    const certDetails = {
        title: "Advanced Strategic Leadership",
        issueDate: "14 May 2024",
        id: "UAE-LMS-2024-9842",
        recipient: "Ahmed Mansour Al-Rashid",
        fullTitle: "Advanced Strategic Leadership & Digital Governance"
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Breadcrumb / Back Navigation */}
            {/* <div className="flex items-center gap-2 text-sm text-sSecondary">
                <Link href="/dashboard/student" className="hover:underline">Home</Link>
                <span>/</span>
                <Link href="/dashboard/student/certificates" className="hover:underline">My Achievements</Link>
                <span>/</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{certDetails.title}</span>
            </div> */}

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-sPrimary dark:text-white tracking-tight">
                        Congratulations on your achievement!
                    </h1>
                    <p className="text-sSecondary mt-1">
                        You have successfully earned your professional certification from the UAE Leadership Institute.
                    </p>
                </div>
                {/* <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Link2 size={16} /> Copy Link
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Printer size={16} /> Print
                    </Button>
                </div> */}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                {/* Left: Certificate Preview */}
                <div className="lg:col-span-2 bg-slate-50 dark:bg-gray-900 rounded-2xl p-8 border border-slate-200 dark:border-gray-800 flex items-center justify-center min-h-[500px]">
                    {/* Visual representation of the certificate */}
                    <div className="bg-white text-slate-900 p-12 shadow-xl landscape relative w-full aspect-[1.414/1] flex flex-col items-center justify-center text-center border-8 border-double border-slate-100">
                        {/* Logo Placeholder */}
                        <Image src="/logo/logo2.png" alt="Logo" width={150} height={150} />

                        <p className="uppercase tracking-[0.3em] text-xs text-slate-500 font-bold mb-4">Masad Learning</p>
                        <h2 className="text-4xl font-serif font-bold text-sPrimary mb-8">Certificate of Completion</h2>

                        <p className="italic text-slate-600 mb-4">This is to certify that</p>
                        <h3 className="text-3xl font-bold mb-8">{certDetails.recipient}</h3>

                        <p className="text-slate-600 max-w-md mx-auto mb-4 text-sm leading-relaxed">
                            has successfully completed all requirements and passed the final assessment for the professional course:
                        </p>

                        <h4 className="text-xl font-bold text-sSecondary max-w-lg mx-auto leading-tight">
                            {certDetails.fullTitle}
                        </h4>

                        {/* Signature/Footer placeholder */}
                        <div className="mt-16 w-32 border-t border-slate-300"></div>
                    </div>
                </div>

                {/* Right: Details Panel */}
                <div className="flex flex-col gap-6">
                    {/* Details Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">Certificate Details</h3>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-sSecondary mb-1">Issuing Date</p>
                                <p className="font-bold text-slate-900 dark:text-white">{certDetails.issueDate}</p>
                            </div>

                            <div>
                                <p className="text-xs text-sSecondary mb-1">Certificate ID</p>
                                <div className="bg-slate-100 dark:bg-gray-900 px-3 py-2 rounded text-sm font-mono text-slate-700 dark:text-slate-300">
                                    {certDetails.id}
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-sSecondary mb-1">Validity</p>
                                <p className="font-bold text-green-600">Lifetime Professional Credit</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                        <Button className="w-full bg-sSecondary hover:bg-sSecondary/80 cursor-pointer text-white gap-2 font-bold h-12">
                            <Download size={18} /> Download PDF (HQ)
                        </Button>
                        <Button variant="outline" className="w-full gap-2 font-bold h-12">
                            <Share2 size={18} /> Share to LinkedIn
                        </Button>
                    </div>

                    {/* Verified Badge */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 flex gap-3 border border-blue-100 dark:border-blue-900/50">
                        <CheckCircle className="text-blue-600 shrink-0" size={20} />
                        <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white mb-1">Verified Badge</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                This certificate is blockchain-verified and can be added directly to your digital resume.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
