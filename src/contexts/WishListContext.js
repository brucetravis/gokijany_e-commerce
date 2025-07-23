import { createContext, useContext, useState } from "react";



// Create the wishList Context
const WishListContext = createContext()

// Create a custom hook which will be used insted of importing the context manually
export const useWish = () => useContext(WishListContext)


export default function WishListProvider({ children }) {

    // state to control the display of the wishlist
    const [  showWishList, setShowWishList ] = useState(false) // Initial state is false
    
    return(
        <WishListContext.Provider value={{
            showWishList, setShowWishList
        }}>
            { children }
        </WishListContext.Provider>
    )
}


