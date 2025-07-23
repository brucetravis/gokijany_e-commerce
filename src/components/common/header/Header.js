import React from 'react'
import './Header.css'
import logo from '../../../images/gokijany-logo-nobg.png'
import { Heart, Menu, Search, ShoppingCartIcon, User2Icon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../contexts/CartContext'
import { useWish } from '../../../contexts/WishListContext'
import { useSearch } from '../../../contexts/SearchContext'

export default function Header() {
  
  // states to toggle the visibility of the mobile icons on a small screen
  // const [ showMobileIcons, setShowMobileIcons ] = useState(false) // Initial state is false meaning ther are not seen

  // useNavigate to naviaget to other pages
  const navigate = useNavigate()

  // function to control the cart, wishlist and search bar display from their contexts
  const { setShowCart } = useCart()

  const { setShowWishList } = useWish()

  const { setShowSearch } = useSearch()

  return (
    <header className='shop-header position-fixed top-0 start-0 end-0 '>
      <div className='header-logo'>
        <img 
          src={logo}
          alt='shop pic'
          className='img-fluid'
          onClick={() => navigate('/')}
        />
      </div>
      <div className='header-icons'>
        <Search 
          size={35} 
          onClick={() => setShowSearch(prev => !prev)}
        />
        
        <User2Icon 
          size={35} 
          onClick={() => navigate('/registration')}

        />

        <ShoppingCartIcon 
          size={35} 
          onClick={() => setShowCart(prev => !prev)}
        />
        
        <Heart 
          size={35} 
          onClick={() => setShowWishList(prev => !prev)}
        />
      </div>

      {/* {showMobileIcons && (
        <div className='header-mobile-icons'>
          <Search size={35} />
          <User2Icon size={35} />
          <ShoppingCartIcon size={35} />
          <Heart size={35} />
        </div>
      )}

      <Menu 
        size={35}
        className='header-menu'
        onClick={() => setShowMobileIcons(prev => !prev)}
      /> */}
    </header>
  )
}
