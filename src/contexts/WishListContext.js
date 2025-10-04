import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";



// Create the wishList Context
const WishListContext = createContext()

// Create a custom hook which will be used insted of importing the context manually
export const useWish = () => useContext(WishListContext)


export default function WishListProvider({ children }) {

    // state to control the display of the wishlist
    const [  showWishList, setShowWishList ] = useState(false) // Initial state is false
    
    // state to store the wishList products
    const [wishProducts, setWishProducts ] = useState([]) // initial state is an empty array


    // function to add a product to wishList
    const addWishListProduct = async (productId) => {

        try {
            // pull the wishList from localStorage
            const storedWishList = JSON.parse(localStorage.getItem('WishList')) || [] // fall back to an array if tehre is no wishList

            // Check if the product is already in thw wishList
            const alreadyInWishList = storedWishList.some(item => item.id === productId)

            // if the product is already in the wishList
            if (alreadyInWishList) {
                // notify the user and exit the function
                toast.info('Product alredy in wishList.')
                // Exit the function
                return
                
                // Otherwise
            } else {

                // An array of the updated wishList
                const updatedWishList = [
                    ...storedWishList, // spread all the previous Items in the wishList  
                    {
                        id: productId // save the latest product in the wishList
                    }
                ]

                // Add the product to the localStorage wishList
                localStorage.setItem('WishList', JSON.stringify(updatedWishList)) // Save the wishList in localStorage

                // create a reference to the product in the database in order to get the correct products details
                const wishProductRef = doc(db, "Products", productId)
                // Get the product document
                const wishProductSnapShot = await getDoc(wishProductRef)

                // Update the state with the latest product details
                setWishProducts((prev) => [
                    ...prev, // spread all the previous products in the state to account for them
                    {
                        id: wishProductSnapShot.id,
                        ...wishProductSnapShot.data() // spread all the products data
                    }
                ])

                // inform the user that he product has been added to wishList successfully
                toast.success('Product product added to wishList successfully')
            }

        } catch (err) {
            console.error(`ERROR ADDING PRODUCT TO WISHLIST: ${err.message}`)
        }
    }


    // useEffect to display the product wish the latest details on mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            
            // If a user is not logged in, do not display teh wishList products (clear the wishList)
            if (!user) {
                setShowWishList([]) // clear the wishList
                // Exit the function
                return
            
                // Otherwise
            } else {
                // Fetch the wishList products from localStorage
                const localWishList = JSON.parse(localStorage.getItem('WishList')) || []
                // Update the state wish the localWishList
                setWishProducts(localWishList)

                // background fetch to fetch all the updated product details 
                const detailedWishList = await Promise.all( //promise.all fetches all product details once. It resolves all promises at once
                    localWishList.map(async (item) => {

                        // create a reference to the product
                        const productRef = doc(db, "Products", item.id)
                        // Get the document snap shot
                        const productRefSnapShot = getDoc(productRef)

                        // return the full product details
                        return {
                            id: productRefSnapShot.id,
                            ...(await productRefSnapShot).data()

                        }
                    })
                )

                // update the wishList state to ccontain the latest product details
                setWishProducts(detailedWishList)
                // Update the local Storage with the latest details from localStorage
                localStorage.setItem('WishList', JSON.stringify(detailedWishList))
            }

        }, [])


        // stop listening on unmount
        return () => unsubscribe()

    }, []) // empty dependency array


    // function to remove a wishList Item
    const removeWishListProduct = (productId) => {

        // Remive the product fro state
        setWishProducts((prev) => {
            const remWishProd = prev.filter((item) => item.id !== productId)
            // return the remaining products
            return remWishProd
        })

        // Get the localWishList
        const localWishList = JSON.parse(localStorage.getItem('WishList'))

        // filter the localWishList
        const remWishProducts = localWishList.filter(item => item.id !== productId)

        // Update the localStorage wish the remaining Items
        localStorage.setItem('WishList', JSON.stringify(remWishProducts))
    }


    // function to clear the wishList products
    const clearWishListProducts = () => {
        // clear the state
        setWishProducts([])

        // Get the localWishList
        const localWishList = JSON.parse(localStorage.getItem('WishList'))

        // remove the wishList from localStorage
        localStorage.removeItem(localWishList)
    }

    
    return(
        <WishListContext.Provider value={{
            showWishList, setShowWishList,
            wishProducts, addWishListProduct,
            removeWishListProduct, clearWishListProducts
        }}>
            { children }
        </WishListContext.Provider>
    )
}


