import { Route, Routes } from 'react-router-dom';
import './App.css';
import Shop from './pages/shop/Shop';
import { AnimatePresence } from 'framer-motion';
import Cart from './components/common/cart/Cart';
import { useCart } from './contexts/CartContext';
import { useSearch } from './contexts/SearchContext';
import { useWish } from './contexts/WishListContext';
import Search from './components/common/search/Search';
import WishList from './components/common/wishlist/WishList';
import SideBar from './components/sidebar/Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {

  // Get the cart state to display the cart bar
  const { showCart } = useCart()

  // Get the search state to display the search bar
  const { showSearch } = useSearch()

  // Get the search state to display the wishlist bar
  const { showWishList } = useWish()
  
  return (
    <div className="App">
      <SideBar />
      <Routes>
        {/* <Route path="/" element={<ProductList products = {products} />} /> */}
        {/* <Route path="/products/:id" element={<ProductDetails products = {products}/>} /> */}
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

      {/* Toast container */}
      <ToastContainer 
        position='bottom-left'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnHover
        draggable
        theme='coloured'
      
      />
    </div>
  );
}

export default App;
