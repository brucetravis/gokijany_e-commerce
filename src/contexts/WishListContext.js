import { ref, get, onValue } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Create the WishList context
const WishListContext = createContext();

// Custom hook for easier access
export const useWish = () => useContext(WishListContext);

export default function WishListProvider({ children }) {
  // State to control visibility
  const [showWishList, setShowWishList] = useState(false);

  // State to store wishlist products
  const [wishProducts, setWishProducts] = useState([]);

  /**
   * Add a product to the wishlist
   */
  const addWishListProduct = async (productId) => {
    try {
      const storedWishList = JSON.parse(localStorage.getItem("WishList")) || [];

      // Prevent duplicates
      if (storedWishList.some((item) => item.id === productId)) {
        toast.info("Product already in wishList.");
        return;
      }

      // Fetch product details from Realtime DB
      const productRef = ref(db, `Product/${productId}`);
      const productSnap = await get(productRef);

      if (!productSnap.exists()) {
        console.warn(`Product with ID ${productId} not found.`);
        return;
      }

      const productData = productSnap.val();
      const fullProduct = { id: productId, ...productData };

      // Update state and localStorage
      setWishProducts((prev) => [...prev, fullProduct]);
      localStorage.setItem("WishList", JSON.stringify([...storedWishList, fullProduct]));

      toast.success("Product added to wishList successfully");
    } catch (err) {
      console.error(`Error adding product to wishlist: ${err.message}`);
    }
  };

  /**
   * Remove a product from the wishlist
   */
  const removeWishListProduct = (productId) => {
    setWishProducts((prev) => prev.filter((item) => item.id !== productId));

    const storedWishList = JSON.parse(localStorage.getItem("WishList")) || [];
    const updatedWishList = storedWishList.filter((item) => item.id !== productId);
    localStorage.setItem("WishList", JSON.stringify(updatedWishList));
  };

  /**
   * Clear all products from the wishlist
   */
  const clearWishListProducts = () => {
    setWishProducts([]);
    localStorage.removeItem("WishList");
  };

  /**
   * Fetch the wishlist from localStorage and ensure data is up-to-date
   */
  const syncWishList = async () => {
    const localWishList = JSON.parse(localStorage.getItem("WishList")) || [];

    // Early exit if empty
    if (!localWishList.length) return;

    // Efficiently fetch all products in parallel
    const updatedWishList = await Promise.all(
      localWishList.map(async (item) => {
        const productRef = ref(db, `Product/${item.id}`);
        const productSnap = await get(productRef);
        return productSnap.exists() ? { id: item.id, ...productSnap.val() } : null;
      })
    );

    const filteredWishList = updatedWishList.filter((item) => item !== null);

    setWishProducts(filteredWishList);
    localStorage.setItem("WishList", JSON.stringify(filteredWishList));
  };

  // Sync wishlist when auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // if the user is not logged in, clear the wishlist
        if (!user) {
            // clear teh wishList
        setWishProducts([]);
        return;
      }
      await syncWishList();
    });

    return () => unsubscribe();
  }, []);

  return (
    <WishListContext.Provider
      value={{
        showWishList,
        setShowWishList,
        wishProducts,
        addWishListProduct,
        removeWishListProduct,
        clearWishListProducts,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
