import { createContext, useContext, useState } from "react";


// Create the context
const CartContext = createContext()

// Create a custom hook which will be used instead of importing the context manually
export const useCart = () => useContext(CartContext)


export default function CartProvider ({ children }) {

    // state to control the cart display
    const [ showCart, setShowCart ] = useState(false) // Initial state is false

    return (
        <CartContext.Provider value={{
            showCart, setShowCart
        }}>
            { children }
        </CartContext.Provider>
    )
}