import TopBar from "./_components/TopBar";
import NavBar from "./_components/NavBar";
import Banner from "./_components/Banner";
import AboutUs from "./_components/AboutUs";
import FreqQuestion from "./_components/FreqQuestion"; // Changed from WhoWe
import FeaturedCourse from "./_components/FeaturedCourse";
import OfferBanner from "./_components/OfferBanner";
import Footer from "./_components/Footer";
import WelcomeMasad from "./_components/WelcomeMasad";
import WhoWe from "./_components/WhoWe";
import HeroBanner from "./_components/Banner";

export default function Home() {
  return (
    <div>
      <TopBar />
      <NavBar />
      {/* <Banner /> */}
      <HeroBanner />
      <AboutUs />
      <WelcomeMasad />
      {/* <FeaturedCourse /> */}
      <WhoWe />
      {/* <WhyChooseUs /> */}
      <OfferBanner />
      <FreqQuestion />
      <Footer />
    </div>
  );
}
