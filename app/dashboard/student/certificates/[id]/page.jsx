'use client';
import { Button } from "@/components/ui/button";
import { Share2, Download, CheckCircle, Award, Calendar, User, ShieldCheck, Hash, Loader2 } from "lucide-react";
import Image from "next/image";
import { useGetCertificateByIdQuery } from "@/redux/certificate/certificateApi";
import { useParams } from "next/navigation";
import { useState } from "react";

// --- React-PDF Imports ---
import { Document, Page, Text, View, StyleSheet, Image as PdfImage, pdf } from "@react-pdf/renderer";

// --- PDF Styles ---
const pdfStyles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        padding: 40,
        flexDirection: "column",
    },
    borderWrap: {
        border: "8pt double #f1f5f9",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: 40,
    },
    bgTopRight: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 120,
        height: 120,
        backgroundColor: "rgba(37, 99, 235, 0.05)",
        borderBottomLeftRadius: 120,
    },
    bgBottomLeft: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 120,
        height: 120,
        backgroundColor: "rgba(15, 23, 42, 0.05)",
        borderTopRightRadius: 120,
    },
    logo: {
        width: 120,
        height: 120,
        objectFit: "contain",
        marginBottom: 10,
    },
    academyText: {
        fontSize: 12,
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: 4,
        marginBottom: 15,
        fontFamily: "Helvetica-Bold",
    },
    title: {
        fontSize: 38,
        color: "#0f172a",
        fontWeight: "bold",
        fontFamily: "Times-Roman",
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: "#475569",
        fontFamily: "Times-Roman",
        marginBottom: 15,
    },
    recipient: {
        fontSize: 34,
        color: "#1e293b",
        textTransform: "uppercase",
        fontFamily: "Helvetica-Bold",
        borderBottom: "2pt solid #cbd5e1",
        paddingBottom: 8,
        marginBottom: 20,
    },
    description: {
        fontSize: 14,
        color: "#475569",
        marginBottom: 15,
    },
    courseTitle: {
        fontSize: 24,
        color: "#0f172a",
        fontFamily: "Times-Roman",
        fontWeight: "bold",
        textAlign: "center",
        paddingHorizontal: 40,
    },
    footerContainer: {
        position: "absolute",
        bottom: 40,
        left: 40,
        alignItems: "flex-start",
    },
    footerLabel: {
        fontSize: 10,
        color: "#94a3b8",
        textTransform: "uppercase",
        fontFamily: "Helvetica-Bold",
        marginBottom: 4,
    },
    footerValue: {
        fontSize: 12,
        color: "#334155",
        fontFamily: "Helvetica-Bold",
    }
});

// --- React-PDF Document Component ---
const CertificatePDF = ({ certDetails, origin }) => (
    <Document>
        <Page size="A4" orientation="landscape" style={pdfStyles.page}>
            <View style={pdfStyles.borderWrap}>
                <View style={pdfStyles.bgTopRight} />
                <View style={pdfStyles.bgBottomLeft} />

                <PdfImage src={`${origin}/logo/logo2.png`} style={pdfStyles.logo} />

                <Text style={pdfStyles.academyText}>Masad Learning</Text>
                <Text style={pdfStyles.title}>Certificate of Completion</Text>

                <Text style={pdfStyles.subtitle}>This is to certify that</Text>
                <Text style={pdfStyles.recipient}>{certDetails.recipient}</Text>

                <Text style={pdfStyles.description}>has successfully completed all requirements for the professional course:</Text>
                <Text style={pdfStyles.courseTitle}>{certDetails.fullTitle}</Text>

                <View style={pdfStyles.footerContainer}>
                    <Text style={pdfStyles.footerLabel}>Issue Date</Text>
                    <Text style={pdfStyles.footerValue}>{certDetails.issueDate}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default function CertificateDetail() {
    const { id } = useParams();
    const [isDownloading, setIsDownloading] = useState(false);

    const { data, isLoading, error } = useGetCertificateByIdQuery(id);

    if (isLoading) return (
        <div className="flex flex-col gap-6 w-full animate-pulse p-4 md:p-8">
            <div className="h-12 w-3/4 md:w-1/3 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
            <div className="h-6 w-1/2 md:w-1/4 bg-slate-200 dark:bg-slate-800 rounded-lg mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 h-[400px] md:h-[500px] bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                <div className="h-[400px] bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
            </div>
        </div>
    );

    if (error) return (
        <div className="p-12 text-center flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30">
            <ShieldCheck className="text-red-500 mb-4 size-12 opacity-50" />
            <h3 className="text-xl font-bold text-red-700 dark:text-red-400">Error loading certificate</h3>
            <p className="text-red-500 dark:text-red-300 mt-2">We couldn't find the requested certificate details.</p>
        </div>
    );

    const certDetails = {
        title: data?.certificate?.course?.title,
        issueDate: data?.certificate?.createdAt ? new Date(data?.certificate?.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
        id: data?.certificate?._id,
        recipient: data?.certificate?.student?.name,
        fullTitle: data?.certificate?.course?.title
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const origin = typeof window !== "undefined" ? window.location.origin : "";
            const blob = await pdf(<CertificatePDF certDetails={certDetails} origin={origin} />).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `Certificate-${certDetails.title?.replace(/\s+/g, '-') || 'Download'}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download failed:", err);
            alert("Failed to download certificate. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    const handleShare = () => {
        window.open(`https://www.linkedin.com`, '_blank');
    }

    return (
        <div className="flex flex-col gap-8 py-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full hidden md:flex">
                    <Award className="text-amber-600 dark:text-amber-400 size-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                        <span className="md:hidden bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                            <Award className="text-amber-600 dark:text-amber-400 size-6" />
                        </span>
                        Congratulations on your achievement!
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                        You have successfully earned your professional certification from Masad Learning.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Certificate Preview */}
                <div className="lg:col-span-2 bg-slate-50 dark:bg-gray-900 rounded-3xl p-4 md:p-8 border border-slate-200 dark:border-gray-800 flex items-center justify-center min-h-[400px] md:min-h-[500px] shadow-sm relative overflow-hidden group">
                    {/* Background visual flair */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none rounded-3xl"></div>

                    <div
                        className="bg-white text-slate-900 p-8 md:p-12 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 ring-1 ring-slate-900/5 relative w-full aspect-[1.414/1] flex flex-col items-center justify-center text-center border-8 border-double border-slate-100 transition-transform duration-500 hover:scale-[1.01]"
                        style={{ maxWidth: '800px' }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sPrimary/5 rounded-bl-full z-0"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sSecondary/5 rounded-tr-full z-0"></div>

                        <div className="relative z-10 mb-8">
                            <Image src="/logo/logo2.png" alt="Logo" width={140} height={140} className="object-contain" />
                        </div>

                        <div className="relative z-10 w-full">
                            <p className="uppercase tracking-[0.4em] text-[10px] md:text-sm text-slate-500 font-bold mb-6">Masad Learning Academy</p>
                            <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 mb-8 md:mb-10 tracking-tight">Certificate of Completion</h2>

                            <p className="text-slate-500 mb-3 md:mb-5 font-serif text-lg">This is to certify that</p>
                            <h3 className="text-3xl md:text-5xl font-black text-slate-800 mb-8 md:mb-10 border-b-2 border-slate-200 pb-3 inline-block px-14 uppercase tracking-wide">{certDetails.recipient}</h3>

                            <p className="text-slate-600 max-w-lg mx-auto mb-5 text-sm md:text-base leading-relaxed font-medium">
                                has successfully completed all requirements for the professional course:
                            </p>

                            <h4 className="text-xl md:text-3xl font-serif font-bold text-slate-900 max-w-2xl mx-auto leading-tight px-4 border-y border-slate-100 py-4">
                                {certDetails.fullTitle}
                            </h4>

                            <div className="mt-10 md:mt-10 flex items-center justify-center w-full px-8 md:px-16">
                                {/* <div className="hidden md:block text-left absolute bottom-8 left-12">
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Issue Date</p>
                                    <p className="text-xs md:text-sm font-bold text-slate-700">{certDetails.issueDate}</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Details Panel */}
                <div className="flex flex-col gap-6">
                    {/* Details Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-6 flex items-center gap-2">
                            <User className="size-4 text-slate-400" /> Certificate Info
                        </h3>

                        <div className="space-y-5">
                            <div className="flex flex-col gap-1">
                                <p className="text-xs text-slate-500 font-medium flex items-center gap-1">Recipient</p>
                                <p className="font-bold text-slate-900 dark:text-white text-lg">{certDetails.recipient}</p>
                            </div>

                            <div className="flex flex-col gap-1">
                                <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                    <Calendar className="size-3" /> Issue Date
                                </p>
                                <p className="font-semibold text-slate-800 dark:text-slate-200">{certDetails.issueDate}</p>
                            </div>



                            <div className="pt-2">
                                <p className="text-xs text-slate-500 mb-2 font-medium">Credential Type</p>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 text-sm font-bold border border-emerald-200 dark:border-emerald-800/50">
                                    <CheckCircle size={14} /> Verified Professional Credit
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                        <Button
                            disabled={isDownloading}
                            onClick={handleDownload}
                            className="w-full bg-sSecondary hover:bg-sSecondary/90 text-white gap-2 font-bold h-12 rounded-xl shadow-sm hover:shadow transition-all disabled:opacity-70"
                        >
                            {isDownloading ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <Download size={18} />
                            )}
                            {isDownloading ? "Generating PDF..." : "Download PDF (High Quality)"}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleShare}
                            className="w-full gap-2 font-bold h-12 rounded-xl border-slate-200 hover:bg-slate-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
                        >
                            <Share2 size={18} className="text-[#0a66c2]" /> Add to LinkedIn
                        </Button>
                    </div>

                    {/* Verified Badge */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-5 flex gap-4 border border-blue-100/50 dark:border-blue-900/30">
                        <ShieldCheck className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={24} />
                        <div>
                            <p className="font-bold text-sm text-blue-900 dark:text-blue-300 mb-1.5">Authenticity Guaranteed</p>
                            <p className="text-xs text-blue-700/80 dark:text-blue-400/80 leading-relaxed">
                                This certificate is securely registered in our database. It can be instantly verified by employers using the unique ID provided above.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}