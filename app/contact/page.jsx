
import NavBar from "@/app/_components/NavBar";
import TopBar from "@/app/_components/TopBar";
import Footer from "@/app/_components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import SubBanner from "@/app/_components/SubBanner";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-lexend">
            <TopBar />
            <NavBar />

            {/* Hero / Header */}
            <SubBanner title="Contact Us" description="Have questions? We're here to help. Reach out to us regarding courses, partnerships, or any other inquiries." />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Contact Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Get In Touch</h2>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Our support team is available 24/7. Feel free to visit our office or send us an email.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <ContactItem
                                icon={MapPin}
                                title="Office Address"
                                content="Office 404, Business Bay, Dubai, UAE"
                            />
                            <ContactItem
                                icon={Phone}
                                title="Phone Number"
                                content="+971 4 123 4567"
                            />
                            <ContactItem
                                icon={Mail}
                                title="Email Address"
                                content="info@masadlearning.ae"
                            />
                            <ContactItem
                                icon={Clock}
                                title="Working Hours"
                                content="Mon - Fri: 9:00 AM - 6:00 PM"
                            />
                        </div>

                        {/* Map or Image Placeholder */}
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-64 bg-slate-200 mt-8 relative">
                            {/* Placeholder for map */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14441.838612741914!2d55.2707828!3d25.1860642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682829c85c07%3A0xa5eda9fb3c93b69d!2sBusiness%20Bay%20-%20Dubai!5e0!3m2!1sen!2sae!4v1709123456789!5m2!1sen!2sae"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">Send Us a Message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                        <Input placeholder="John Doe" className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                        <Input placeholder="john@example.com" type="email" className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                                        <Input placeholder="+971 50 123 4567" className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                                        <Input placeholder="Course Inquiry" className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                                    <Textarea placeholder="How can we help you?" className="min-h-[150px] bg-slate-50 border-slate-200 focus:bg-white transition-colors resize-none" />
                                </div>

                                <Button className="w-full md:w-auto h-12 px-8 bg-sSecondary hover:bg-cyan-600 text-white font-bold text-base shadow-lg shadow-cyan-100 mt-4">
                                    Send Message <Send size={18} className="ml-2" />
                                </Button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
}

function ContactItem({ icon: Icon, title, content }) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="size-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-sPrimary" />
            </div>
            <div>
                <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
                <p className="text-slate-600 text-sm">{content}</p>
            </div>
        </div>
    );
}
