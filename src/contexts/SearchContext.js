import { createContext, useContext, useState } from "react";
import { useShop } from "./ShopContext";


// Create the shop context
const SearchContext = createContext()

// Create a custom hook that will be used instead of manually importing the context
export const useSearch = () => useContext(SearchContext)

export default function SearchProvider({ children }) {

    // state to control the display of the search bar
    const [ showSearch, setShowSearch ] = useState(false) // Initial state is false
    
    // products categories
    const { products } = useShop()

    // map through the categoris to obtain the values so that we acn filter
    // products.map((category))

    return(
        <SearchContext.Provider value={{
            showSearch, setShowSearch
        }}>
            { children }
        </SearchContext.Provider>
    )
}