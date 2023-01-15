import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../base'
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
//The above line brings in firebase functions we need to use in our logic below (in the comoponent portion of code)

//Below we create a context (storage object) for all of our auth info
const AuthContext = React.createContext() 

//Below we create a function that will allow us to use the context in components. We will import this 
//function any time we want currentUser, login, or logout fucntionality.
export function useAuth() {
    return useContext(AuthContext)
}

//The below component will provide the AuthContext info to the children conponents nested inside of it. See App.js
//where we will call to an instance of this component and nest all other components inside of it.
export default function AuthProvider({children}) {
    //Create hooks for currentUser and another custom hook to determine if the context has info to share
    //with child components before rendering the child cpmponents to the screen.
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    //Login fuctionality
    //Instansiate a GithubAuthProvider
    const githubAuthProvider = new GithubAuthProvider()

    async function login() {
        return (signInWithPopup(auth, githubAuthProvider).then(authData => {
            console.log(authData)
            setCurrentUser(authData.user)
            //This is where we could add some functionality to save the user to a db.
            //We aslo could decide a user role for them here. 
            
        }))
    } 

    //Logout functionality
    async function logout() {
        signOut(auth).then(setCurrentUser(null))
    }


    //The object below will hold currentUser info and login/logout functions so we can use them in child components.
    //We will pass this as a prop in te return below
    const value = {currentUser, login, logout}

    useEffect(() => {
        
        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return authChange;

    }, [])

    return (
        <AuthContext.Provider value={value}>
            {/*Below we are wau=iting for the AuthContext info to populate before loading the child components in the UI */}
            {!loading && children}
        </AuthContext.Provider>
    )

}

