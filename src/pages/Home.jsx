import Hero from '../components/hero/Hero';
import BrandStory from '../components/sections/BrandStory';
import ProcessJourney from '../components/sections/ProcessJourney';
import ProductCarousel from '../components/products/ProductCarousel';
import Benefits from '../components/sections/Benefits';
import SugarComparison from '../components/sections/SugarComparison';
import ProductGrid from '../components/products/ProductGrid';
import ReviewsWall from '../components/sections/ReviewsWall';
import Gallery from '../components/sections/Gallery';
import QuickContact from '../components/sections/QuickContact';

const Home = () => {
  return (
    <div className="page home-page">
      <Hero />
      <BrandStory />
      <ProcessJourney />
      <ProductCarousel />
      <Benefits />
      <SugarComparison />
      <ProductGrid />
      <ReviewsWall />
      <Gallery />
      <QuickContact />
    </div>
  );
};

export default Home;
