import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config'

export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = ( displayName, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {displayName: displayName, photoURL: photoURL})
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
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('user in the current auth state changed', currentUser);
            setUser(currentUser);
            setLoading(false)
        })
        return () => { unSubscribe(); }
    }, [])

    const authInfo = {
        user, loading, createUser, logOut, singIn, signInWithGoogle,updateUser
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;