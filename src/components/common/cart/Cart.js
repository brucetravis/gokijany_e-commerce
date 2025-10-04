import React from 'react'
import './Cart.css'
import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'
import { useCart } from '../../../contexts/CartContext'

export default function Cart() {
  
  // Function from the CartContext to control closing of the cart
  const { setShowCart, cartProducts, checkout } = useCart()

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: .5, ease: "easeInOut" }}
      className='cart-bar'
    >
      <XCircle
        size={30}
        className='close-cart'
        onClick={() => setShowCart(prev => !prev)}
        
      />
      
      <h3 className='text-white text-center'>CART</h3>

      <div className='cart-products'>
        {cartProducts.length > 0 ? (
          <div
            className='filled-cart'
          >

          </div>
        ) : (
          <div
            className='empty-cart'
          >
            <p>Your Cart is empty</p>
          </div>
        )
        
        }
      </div>
      
      
      <input 
        type='button' 
        value="checkout"
        className='checkout-btn'
        onClick={() => checkout()}
      />
    </motion.div>
  )
}
