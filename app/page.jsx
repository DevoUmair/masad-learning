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
      <BunnyVideo libraryId="611020" videoId="2f499b29-1665-4981-abc7-8035cf5cd9a5" apiKey="adf8c59c-06ad-4254-a50f0b3e84e4-bbb6-4a6f" />
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
