import React, { createContext, useContext, useState } from 'react'

// create the context
const shopContext = createContext()

// create a custom hok so that we do not have to exort the context we created
export const useShop = () => useContext(shopContext)

// create the context provider
export default function ShopProvider({ children }) {

    // state to control the cart display
    const [ showCart, setShowCart ] = useState(false) // Initial state is false

    // state to control the display of the wishlist
    const [  showWishList, setShowWishList ] = useState(false) // Initial state is false

    // state to control the display of the search bar
    const [ showSearch, setShowSearch ] = useState(false) // Initial state is false
    
    return (
        <shopContext.Provider value={{
            showCart, setShowCart,
            showWishList, setShowWishList,
            showSearch, setShowSearch
        }} >
            { children }
        </shopContext.Provider>
    )
}
