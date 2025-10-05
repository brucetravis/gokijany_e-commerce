import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import { BrowserRouter } from 'react-router-dom';
import ShopProvider from './contexts/ShopContext';
import CartProvider from './contexts/CartContext';
import WishListProvider from './contexts/WishListContext';
import SearchProvider from './contexts/SearchContext';
import AuthProvider from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ShopProvider>
          <CartProvider>
            <WishListProvider>
              <SearchProvider>
                <Header />
                  <App />
                <Footer />
              </SearchProvider>
            </WishListProvider>
          </CartProvider>
        </ShopProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


