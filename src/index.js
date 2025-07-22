import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import ShopProvider from './contexts/ShopContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopProvider>
        <Header />
          <App />
        <Footer />
      </ShopProvider>
    </BrowserRouter>
  </React.StrictMode>
);

