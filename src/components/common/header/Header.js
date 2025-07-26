import React, { useState } from 'react'
import './Header.css'
import { Heart, Search, ShoppingCart, User2, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../contexts/CartContext'
import { useWish } from '../../../contexts/WishListContext'
import { useSearch } from '../../../contexts/SearchContext'

// Mock logo component for demo
const MockLogo = () => (
  <div style={{
    width: '100px',
    height: '100px',
    backgroundColor: 'rgba(17, 224, 117, 0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#11e075',
    fontWeight: 'bold',
    fontSize: '14px',
    textAlign: 'center'
  }}>
    GOKIJANY<br/>LOGO
  </div>
)

export default function Header() {
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false)

  const { setShowCart } = useCart()
  const { setShowSearch } = useSearch()
  const { setShowWishList } = useWish()
  
  // Mock navigation function for demo
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`)
  }

  // Mock context functions for demo
  // const setShowCart = (fn) => console.log('Toggle cart')
  // const setShowWishList = (fn) => console.log('Toggle wishlist')
  // const setShowSearch = (fn) => console.log('Toggle search')

  const handleGoogleSignUp = () => {
    console.log('Google sign up clicked')
    // Add your Google OAuth logic here
    setShowRegistrationPopup(false)
  }

  return (
    <>
      <header className='shop-header position-fixed top-0 start-0 end-0'>
        <div className='header-logo'>
          <MockLogo />
        </div>
        <div className='header-icons'>
          <Search 
            size={35} 
            onClick={() => setShowSearch(prev => !prev)}
          />
          
          <User2 
            size={35} 
            onClick={() => setShowRegistrationPopup(true)}
          />

          <ShoppingCart 
            size={35} 
            onClick={() => setShowCart(prev => !prev)}
          />
          
          <Heart 
            size={35} 
            onClick={() => setShowWishList(prev => !prev)}
          />
        </div>
      </header>

      {/* Registration Popup */}
      {showRegistrationPopup && (
        <div className="registration-overlay">
          <div className="registration-popup">
            <button 
              className="close-button"
              onClick={() => setShowRegistrationPopup(false)}
            >
              <X size={24} />
            </button>
            
            <div className="popup-content">
              <div className="popup-header">
                <h2>Welcome to Gokijany</h2>
                <p>Join our community and start shopping!</p>
              </div>
              
              <button className="google-signup-btn" onClick={handleGoogleSignUp}>
                <svg width="20" height="20" viewBox="0 0 24 24" className="google-icon">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              
            </div>
          </div>
        </div>
      )}
    </>
  )
}