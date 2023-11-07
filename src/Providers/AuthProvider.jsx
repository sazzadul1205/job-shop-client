import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config'
import axios from "axios";

export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (displayName, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, { displayName: displayName, photoURL: photoURL })
    }

    const singIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);

    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };
            setUser(currentUser);
            console.log('your Current user Is: ', currentUser);
            setLoading(false);
            // if the user exists then issue a token
            if (currentUser) {
                axios.post('https://job-shop-server.vercel.app/api/v1/auth/access-token', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log('token response', res.data);
                    })
            }
            else {
                axios.post('https://job-shop-server.vercel.app/api/v1/auth/logout', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log('token logout', res.data);
                    })
            }
        })
        return () => { return unsubscribe() }
    }, [])

    const authInfo = {
        user, 
        loading, 
        createUser, 
        logOut, 
        singIn, 
        signInWithGoogle, 
        updateUser
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;