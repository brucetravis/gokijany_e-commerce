import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../../contexts/ShopContext'; // Assuming you have this
import './ProductList.css';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Use thw existing shop context to get products
  // const { products } = useShop(); // Uncomment when you have products in context
  
  // For now, using hardcoded data - replace with your context data
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
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="products-list">
      <div className="products-header">
        <button className="back-btn" onClick={handleBack}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="page-title">Energy Products</h1>
      </div>
      
      <div className="search-container">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search for an item"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="product-item"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="product-item-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-item-info">
              <h3 className="product-item-title">{product.name}</h3>
              <p className="product-item-description">
                {product.description.substring(0, 100)}...
              </p>
              <div className="product-item-price">{product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;