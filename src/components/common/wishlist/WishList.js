import React from 'react'
import './WishList.css'
import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'
import { useWish } from '../../../contexts/WishListContext'


export default function WishList() {

    // Get the function from the WishListContext to control the display of the wishlist
    const { setShowWishList, wishProducts, clearWishListProducts } = useWish()

  return (
    <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: .5, ease: "easeInOut" }}
        className='wishlist-bar'
    >
        <XCircle
            size={30}
            className='close-wishlist'
            onClick={() => setShowWishList(prev => !prev)}
        />

        <h3 className='text-white text-center'>WishList</h3>

        {wishProducts.length > 0 ? (
          <div
            className='filled-wishList'
          >
            
          </div>
        ) : (
          <div
            className='empty-wishList'
          >
            <p>Your WishList is Empty</p>
          </div>
        ) }

        <input
          type='button'
          value='Clear WishList'
          className='wishlist-btn'
          onClick={() => clearWishListProducts()}
        />

    </motion.div>
  )
}
