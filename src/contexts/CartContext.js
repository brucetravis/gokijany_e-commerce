import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";


// Create the context
const CartContext = createContext()

// Create a custom hook which will be used instead of importing the context manually
export const useCart = () => useContext(CartContext)


export default function CartProvider ({ children }) {

    // state to control the cart display
    const [ showCart, setShowCart ] = useState(false) // Initial state is false

    // state to display the cart products
    const [ cartProducts, setCartProducts ] = useState([]) // initial state is an empty array\

    // state to store the purchased products
    const [ purchasedProducts, setPurchasedProducts ] = useState([]) // initial state is an empty array

    // funtion to add a product to cart
    const addCartProduct = (productId) => {
        try {
            // Pull the cart from local Storage
            const localCart = JSON.parse(localStorage.getItem('cart')) || []

            //  Check if the product being added is already in the cart
            const existingProducts = localCart.some(item => item.id === productId)

            // if the product exists
            if (existingProducts) {
                // Notify the user that the product is already in the cart
                toast.info('Product already in Cart.')
                // Exit the function
            
                // Otherwise
            } else {

                // An array to updated the cart
                const updatedCart = [...localCart, { id: productId }]

                // Save the Item to local storage
                localStorage.setItem('cart', JSON.stringify(updatedCart))
                
                // Get the products latest data

                // create a reference to the product
                const cartProductRef = doc(db, 'Product', productId)
                // Get the product snap shot
                const cartProductRefSnapShot = getDoc(cartProductRef)

                // Update the cart state with all the specific product details
                setCartProducts((prev) => [
                    ...prev, {
                        id: cartProductRefSnapShot.id, // Get the product data which is stored separately
                        ...cartProductRefSnapShot.data(), // spread the products updated data
                        quantity: 1
                    }
                ])

                // Update the user that the product has been added to cart
                toast.success('Product added to cart successfully.')

            }
        
        } catch(err) {
            console.error(`Error adding product to cart: ${err.message}`)
        }
    }

    // useEffect to get the userProducts when a user is logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            // if the user is not logged in
            if (!user) {
                // clear the cart
                setCartProducts([]) // clear the cart/Update the state with an empty array
                // Exit the function
                return

                // Otherwise
            } else {
                // Get/Read cart from localstorage
                const savedCart = JSON.parse(localStorage.getItem('cart')) || []
                // Update the state with the cart details
                setCartProducts(savedCart)
                
                // background fetch from firebase to ensure we have the latest product details
                const detailedCart = await Promise.all( // promise.all fetches all products first
                    savedCart.map(async (item) => {
                        // fetch productdetails from teh products collection
                        const productRef = doc(db, "Product", item.id)
                        // get the product snapshot
                        const productRefSnap = getDoc(productRef)
                        
                        // Return the full product object
                        return {
                            id: productRefSnap.id, // Get teh product id that is stored separately
                            ...productRefSnap.data()
                        }
                    })
                )

                // Update the state again with the updated product details 
                setCartProducts(detailedCart)
                // Update the local storage with the updated info from the database
                localStorage.setItem('cart', JSON.stringify(detailedCart))
            }
        }, [])
        
        // on page unsubscribe, stop listening
        return () => unsubscribe()

    }, [])


    // function to remove a product from cart
    const removeCartItem = (productId) => {
        setCartProducts((prev) => {
            const remProducts = prev.filter(item => item.id !== productId)

            // return all the remaining products
            return remProducts
        })

        // Notify the user that the Item has been removed from cart
        toast.success('Product removed successfully.')

        // Get the stored cart to filter
        const savedCart = JSON.parse(localStorage.get('cart')) || []
        // Filter the cart localstorage to remove the product
        const remLocalProd = savedCart.filter(item => item.id !== productId)
        // Update the cart with the remianing products
        localStorage.setItem('cart', JSON.stringify(remLocalProd))
    }


    // function to handle the checkout logic
    const checkout = async () => {
        
        const user = auth.currentUser

        if (!user) {
            toast.info('You MUST be logged in to checkout products.')
            // exit the function immediately
            return
        }

        // load the cart from localstorage
        const storedCart = JSON.parse(localStorage.getItem("cart"))

        // if the stored cart has nor products
        if (!storedCart || storedCart.length === 0) {
            // Notify the user that the cart is empty
            toast.info('Your cart is empty.')
            // Exit the function
            return

            // Otherwise
        } else {
            // Map through all the products
            const storedProducts = storedCart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                selectedQuantity: item.quantity  // to be modified later
            }))

            console.log(storedProducts) // for debugging


            // function to calculate the total price
            const totalPrice = storedProducts.reduce((acc, item) => {
                return acc + (item.quantity * item.price)
            }, 0)


            // Update the purchased products state
            setPurchasedProducts(storedProducts)

            try {
                // create a reference to the user doc
                const purchasedProductsRef = collection(db, "users", user.uid, "purchasedProducts")
                for (const product of storedProducts) {
                    await addDoc(purchasedProductsRef, product)
                }

                // total price as a separate document
                await addDoc(purchasedProductsRef, {
                    totalPrice: totalPrice,
                    purchasedAt: new Date()
                })

            } catch (err) {
                console.error('ERROR: ', err.message)
            }

            return storedProducts
        }

    }


    return (
        <CartContext.Provider value={{
            showCart, setShowCart,
            addCartProduct, cartProducts,
            removeCartItem, checkout, 
            purchasedProducts
        }}>
            { children }
        </CartContext.Provider>
    )
}