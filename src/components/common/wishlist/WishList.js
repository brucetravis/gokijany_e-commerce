import React from 'react'
import './WishList.css'
import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'
import { useShop } from '../../../contexts/ShopContext'

export default function WishList() {

    // Get the function fro the ShopContext to control the display of the wishlist
    const { setShowWishList } = useShop()

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

    </motion.div>
  )
}
