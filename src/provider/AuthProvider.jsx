import PropTypes from 'prop-types'

import { createContext, useState } from "react";
import { auth } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const googleProvider = new GoogleAuthProvider();
    // function of creating user 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // function of signIn a user 
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // log out a user 
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // google login function 
    const GoogleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const authInfo = {
        createUser,
        signInUser,
        logOut,
        loading,
        GoogleLogin,
    }


    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;
AuthProvider.propTypes = {
    // Array of children.
    children: PropTypes.array,
}
