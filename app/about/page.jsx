import NavBar from "@/app/_components/NavBar";
import TopBar from "@/app/_components/TopBar";
import Footer from "@/app/_components/Footer";
import SubBanner from "@/app/_components/SubBanner";
import AboutUs from "../_components/AboutUs";
import WhoWe from "../_components/WhoWe";
import FreqQuestion from "../_components/FreqQuestion";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-lexend">
            <TopBar />
            <NavBar />

            {/* Hero / Header */}
            <SubBanner title="About Us" description="Learn more about our mission, vision, and the team behind Masad Learning." />
            <AboutUs />
            <WhoWe />
            <FreqQuestion />
            <Footer />
        </div>
    );
}