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
import BunnyVideo from "./_components/BunnyVideo";

export default function Home() {
  return (
    <div>
      <TopBar />
      <NavBar />
      {/* <Banner /> */}
      <HeroBanner />
      <AboutUs />
      <BunnyVideo libraryId="595229" videoId="0762da13-51e8-44db-b10c-ef04aac592b2" apiKey="f00daa6d-a120-486b-92b1c62e06c5-3091-4cd5" />
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
