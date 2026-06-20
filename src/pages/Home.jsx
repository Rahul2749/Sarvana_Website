import Hero from '../components/hero/Hero';
import HeritageStory from '../components/sections/HeritageStory';
import Franchise from '../components/sections/Franchise';
import ProductCarousel from '../components/products/ProductCarousel';
import Benefits from '../components/sections/Benefits';
import SugarComparison from '../components/sections/SugarComparison';
import ProductShowcase from '../components/products/ProductShowcase';
import LuxuryTestimonials from '../components/sections/LuxuryTestimonials';
import FAQ from '../components/sections/FAQ';
import Gallery from '../components/sections/Gallery';
import QuickContact from '../components/sections/QuickContact';
import BackgroundParticles from '../components/ui/BackgroundParticles';

const Home = () => {
  return (
    <div className="page home-page">
      <BackgroundParticles />
      <Hero />
      <HeritageStory />
      <Franchise />
      <ProductCarousel />
      <Benefits />
      <SugarComparison />
      <ProductShowcase />
      <LuxuryTestimonials />
      <FAQ />
      <Gallery />
      <QuickContact />
    </div>
  );
};

export default Home;
