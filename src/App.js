import { Route, Routes } from 'react-router-dom';
import './App.css';
import Shop from './pages/shop/Shop';
import { AnimatePresence } from 'framer-motion';
import Cart from './components/common/cart/Cart';
import WishList from './components/common/wishlist/WishList';
import Search from './components/common/search/Search';
import { useCart } from './contexts/CartContext';
import { useSearch } from './contexts/SearchContext';
import { useWish } from './contexts/WishListContext';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import ProductList from './components/ProductList/ProductList';

function App() {

  // Get the cart state to display the cart bar
  const { showCart } = useCart()

  // Get the search state to display the search bar
  const { showSearch } = useSearch()

  // Get the search state to display the wishlist bar
  const { showWishList } = useWish()

  return (
    <div className="App">
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path='/' element={<Shop />} />
      </Routes>

      <AnimatePresence>
        { showCart && (
          <Cart key="cart" />
        )}

        { showWishList && (
          <WishList key="wishlist" />
        )}

        { showSearch && (
          <Search key="search" />
        )}

      </AnimatePresence>
    </div>
  );
}

export default App;
