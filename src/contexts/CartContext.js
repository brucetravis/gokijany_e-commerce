// import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { ref, set, get, push } from "firebase/database";
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

    // Function to add a product to the cart
    const addCartProduct = async (productId) => {
    try {
        // Retrieve the existing cart from localStorage (or default to empty array)
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if the product is already in the cart
        const existingProducts = localCart.some((item) => item.id === productId);

        if (existingProducts) {
        // Notify the user that it's already there
        toast.info("Product already in Cart.");
        } else {
        // Fetch the product data from Firebase by ID
        const productRef = ref(db, `Product/${productId}`);
        const productSnap = await get(productRef);

        // If the product exists in Firebase
        if (productSnap.exists()) {
            const productData = productSnap.val();

            // Create the full product object (with quantity)
            const fullProduct = {
            id: productId,
            ...productData,
            quantity: 1,
            };

            // Update React state
            setCartProducts((prev) => [...prev, fullProduct]);

            // Save the full object to localStorage (not just the ID)
            const updatedCart = [...localCart, fullProduct];
            localStorage.setItem("cart", JSON.stringify(updatedCart));

            // Notify success
            toast.success("Product added to cart successfully.");
        }
        }
    } catch (err) {
        console.error(`Error adding product to cart: ${err.message}`);
    }
    };



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
                
                // // background fetch from firebase to ensure we have the latest product details
                // const detailedCart = await Promise.all( // promise.all fetches all products first
                //     savedCart.map(async (item) => {
                //         // fetch productdetails from teh products collection
                //         const productRef = doc(db, "Product", item.id)
                //         // get the product snapshot
                //         const productRefSnap = getDoc(productRef)
                        
                //         // Return the full product object
                //         return {
                //             id: productRefSnap.id, // Get teh product id that is stored separately
                //             ...productRefSnap.data()
                //         }
                //     })
                // )

                // // Update the state again with the updated product details 
                // setCartProducts(detailedCart)
                // // Update the local storage with the updated info from the database
                // localStorage.setItem('cart', JSON.stringify(detailedCart))
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
        const savedCart = JSON.parse(localStorage.getItem('cart')) || []
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
            const storedProducts = cartProducts.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                selectedQuantity: item.quantity  // to be modified later
            }))

            console.log(storedProducts) // for debugging


            // function to calculate the total price
            const totalPrice = storedProducts.reduce((acc, item) => {
                return acc + (item.selectedQuantity * item.price)
            }, 0)


            // Update the purchased products state
            setPurchasedProducts(storedProducts)

            // try {
            //     // create a reference to the user doc
            //     const purchasedProductsRef = collection(db, "users", user.uid, "purchasedProducts")
            //     for (const product of storedProducts) {
            //         await addDoc(purchasedProductsRef, product)
            //     }

            //     // total price as a separate document
            //     await addDoc(purchasedProductsRef, {
            //         totalPrice: totalPrice,
            //         purchasedAt: new Date()
            //     })

            // } catch (err) {
            //     console.error('ERROR: ', err.message)
            // }

            try {
                const userPurchasesRef = ref(db, `users/${user.uid}/purchasedProducts`);

                for (const product of storedProducts) {
                    const newProductRef = push(userPurchasesRef);
                    await set(newProductRef, product);
                }

                const summaryRef = push(userPurchasesRef);
                await set(summaryRef, {
                    totalPrice: totalPrice,
                    purchasedAt: new Date().toISOString(),
                });
            } catch (err) {
                console.error('ERROR:', err.message);
            }


            // ✅ Clear cart after successful checkout
            setCartProducts([]);
            localStorage.removeItem("cart");
            toast.success("Checkout complete. Cart cleared.");

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