import React from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Use the existing cart context
  
  // Hardcoded data - replace with the data fetching logic
  const products = [
    {
      id: 1,
      name: '10L Ad blue',
      description: 'AdBlue is the best Nox-gases reduction agent used with the selective catalytic reductive system of your diesel engine. AdBlue consists of a demine-ralized water and automotive urea (32.5%) and classified as a non-hazardous product. A cleaner Healthier World!',
      price: 'KES 2750',
      image: '/api/placeholder/300/300',
      offset: '25-35 kg NOx reduction',
      owner: 'Ke-blue',
      category: 'Energy Products'
    },
    {
      id: 2,
      name: '20L Ad blue',
      description: 'AdBlue is the best Nox-gases reduction agent used with the selective catalytic reductive system of your diesel engine. AdBlue consists of a demine-ralized water and automotive urea (32.5%) and classified as a non-hazardous product. A cleaner Healthier World!',
      price: 'KES 4750',
      image: '/api/placeholder/300/300',
      offset: '50-70 kg NOx reduction',
      owner: 'Ke-blue',
      category: 'Energy Products'
    },
    {
      id: 3,
      name: '20L Ad blue',
      description: 'AdBlue is the best Nox-gases reduction agent used with the selective catalytic reductive system of your diesel engine. AdBlue consists of a demine-ralized water and automotive urea (32.5%) and classified as a non-hazardous product. A cleaner Healthier World!',
      price: 'KES 4750',
      image: '/api/placeholder/300/300',
      offset: '50-70 kg NOx reduction',
      owner: 'Ke-blue',
      category: 'Energy Products'
    }
  ];
  
  const product = products.find(p => p.id === parseInt(id));
  
  if (!product) {
    return <div>Product not found</div>;
  }

  const handleBack = () => {
    navigate("/products");
  };

  const handleAddToCart = () => {
    addToCart(product);
    //show a success message or navigate somewhere
  };

  return (
    <div className="product-card">
      <div className="product-header">
        <button className="back-btn" onClick={handleBack}>
          <ArrowLeft size={24} />
        </button>
        <button className="cart-btn">
          <ShoppingCart size={24} />
        </button>
      </div>
      
      <div className="product-content">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
        
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          
          <div className="product-details">
            <div className="detail-item">
              <span className="detail-label">Offset:</span>
              <span className="detail-value">{product.offset}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Owner:</span>
              <span className="detail-value">{product.owner}</span>
            </div>
          </div>
          
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <ShoppingCart size={20} />
            Add To Cart
            <span className="price">{product.price}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;