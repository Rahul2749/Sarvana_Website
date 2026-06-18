import SectionTitle from '../components/ui/SectionTitle';
import ProductGrid from '../components/products/ProductGrid';
import './Products.css';

const Products = () => {
  return (
    <div className="page products-page">
      <div className="page-header">
        <div className="container">
          <SectionTitle 
            subtitle="Our Shop" 
            title="Taste the Tradition" 
            description="Explore our complete collection of premium teas, coffees, and traditional snacks, all sweetened naturally with Thati Bellam."
            light={true}
          />
        </div>
      </div>
      
      <div className="products-content">
        <ProductGrid />
      </div>
    </div>
  );
};

export default Products;
