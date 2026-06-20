import SectionTitle from '../components/ui/SectionTitle';
import ProductGrid from '../components/products/ProductGrid';
import './Products.css';

const Products = () => {
  return (
    <div className="page products-page">
      <div className="page-header-minimal">
        <div className="container">
          <h1 className="minimal-title">Our Shop</h1>
        </div>
      </div>
      
      <div className="products-content">
        <ProductGrid />
      </div>
    </div>
  );
};

export default Products;
