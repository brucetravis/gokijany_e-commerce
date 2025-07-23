import React, { createContext, useContext, useState } from 'react'

// create the context
const shopContext = createContext()

// create a custom hok so that we do not have to exort the context we created
export const useShop = () => useContext(shopContext)

// create the context provider
export default function ShopProvider({ children }) {

    
    return (
        <shopContext.Provider value={{
            
        }} >
            { children }
        </shopContext.Provider>
    )
}
