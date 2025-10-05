import { ref, get } from "firebase/database"
import React, { createContext, useContext, useEffect, useState } from 'react'
import { db } from "../config/firebase"

// create the context
const shopContext = createContext()

// create a custom hook so that we do not have to export the context we created
export const useShop = () => useContext(shopContext)

// create the context provider
export default function ShopProvider({ children }) {

    // state to hold the cart items
    const [products, setProducts] = useState([]); // initial state is an empty array


    const fetchProducts = async () => {
        try {
            const productsRef = ref(db, 'shop');
            const snapshot = await get(productsRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                const productsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setProducts(productsArray);
                console.log(productsArray);
            } else {
                setProducts([]);
            }
        } catch (err) {
            console.error(`Error fetching products: ${err.message}`);
        }
    };

    // Inside your ShopProvider, after defining fetchProducts:
    useEffect(() => {
        fetchProducts(); // fetch products once when provider mounts
    }, []);
            
        
    return (
        <shopContext.Provider value={{
            products, fetchProducts
        }} >
            { children }
        </shopContext.Provider>
    )
}
