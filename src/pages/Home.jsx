import Hero from '../components/hero/Hero';
import HeritageStory from '../components/sections/HeritageStory';
import ProcessJourney from '../components/sections/ProcessJourney';
import ProductCarousel from '../components/products/ProductCarousel';
import Benefits from '../components/sections/Benefits';
import SugarComparison from '../components/sections/SugarComparison';
import ProductShowcase from '../components/products/ProductShowcase';
import ReviewsWall from '../components/sections/ReviewsWall';
import Gallery from '../components/sections/Gallery';
import QuickContact from '../components/sections/QuickContact';
import BackgroundParticles from '../components/ui/BackgroundParticles';

const Home = () => {
  return (
    <div className="page home-page">
      <BackgroundParticles />
      <Hero />
      <HeritageStory />
      <ProcessJourney />
      <ProductCarousel />
      <Benefits />
      <SugarComparison />
      <ProductShowcase />
      <ReviewsWall />
      <Gallery />
      <QuickContact />
    </div>
  );
};

export default Home;
