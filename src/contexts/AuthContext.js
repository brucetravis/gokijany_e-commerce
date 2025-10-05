import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { auth } from "../config/firebase";

// create the authentication context
const authContext = createContext()


// create a custom hook to instead of using the context manually
export const useAuth = () => useContext(authContext)



// create the context provider
export default function AuthProvider({ children }) {

    // state to control the registration pop up display
    const [showRegistrationPopup, setShowRegistrationPopup ] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    
    const googleProvider = new GoogleAuthProvider()


    // function to Log In
    const signUpWithGoogle = async () => {

        try {
            const result = await signInWithPopup(auth, googleProvider)
            setCurrentUser(result.user)
        } catch (err) {
            console.error(`Error: ${err.message}`)
        }
    }

    // Track the auth  state of the user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user)
            console.log(`Logged in User: `, user)
        })
        
        return () => unsubscribe()
    }, [])


    // function to log out
    const logOut = async () => {
        try {
            await auth.signOut()
            setCurrentUser(null)

        } catch (err) {
            console.error(`Error: ${err.message}`)
        }
        
    }


    return (
        <authContext.Provider
            value={{
                showRegistrationPopup, 
                setShowRegistrationPopup,
                signUpWithGoogle, logOut,
                currentUser
            }}
        >
            {children}
        </authContext.Provider>
    )
}


