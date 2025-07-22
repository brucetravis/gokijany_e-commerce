import React from 'react'
import './Search.css'
import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'
import { useShop } from '../../../contexts/ShopContext'

export default function Search() {

    // Get the function to display the search bar from the shop Context
    const { setShowSearch } = useShop()

  return (
    <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: .5, ease: "easeInOut"}}
        className="search-bar"
    >
        <XCircle
            size={35}
            className='close-search'
            onClick={() => setShowSearch(prev => !prev)}
            
        />

        <motion.input 
            initial={{ width: 200, opacity: 0 }}
            animate={{ width: 500, opacity: 1 }}
            transition={{ duration: .5 }}
            placeholder='Search Eco-Products'
            className='search-bar-input'

        />

    </motion.div>
  )
}
