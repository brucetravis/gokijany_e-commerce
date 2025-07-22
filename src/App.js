import { Route, Routes } from 'react-router-dom';
import './App.css';
import Registration from './pages/registration/Registration';
import Shop from './pages/shop/Shop';
import { AnimatePresence } from 'framer-motion';
import { useShop } from './contexts/ShopContext'
import Cart from './components/common/cart/Cart';
import WishList from './components/common/wishlist/WishList';
import Search from './components/common/search/Search';

function App() {
  
  //Get the cart state to display the cart
  const { showCart, showWishList, showSearch } = useShop()
  
  return (
    <div className="App">
      <Routes>
        <Route path='/registration' element={<Registration />} />
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
