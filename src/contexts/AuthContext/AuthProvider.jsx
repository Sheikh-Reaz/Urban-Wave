import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {auth} from '../../firebase/firebase.init'
import {createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import Loading from '../../components/Loading';

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider()

const registerUser = async (email, password) => {
    setLoading(true);
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        setLoading(false); // ✅ stop loading on success
        return result;
    } catch (err) {
        setLoading(false); // ✅ stop loading on error
        throw err; // rethrow so Register page can handle toast
    }
};
const signInUser = async (email, password) => {
    setLoading(true);
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setLoading(false); // ✅ stop loading on success
        return result;
    } catch (err) {
        setLoading(false); // ✅ stop loading on error
        throw err; // rethrow so Login component can handle toast
    }
};
    
const signInGoogle = async () => {
    setLoading(true);
    try {
        const result = await signInWithPopup(auth, googleProvider);
        setLoading(false);
        return result;
    } catch (err) {
        setLoading(false);
        throw err;
    }
};
   

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }
    const updateUserProfile = (profile) =>{
        return updateProfile(auth.currentUser, profile )
    }
    //observer
useEffect(()=>{
 const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser)
    setLoading(false)
 })
 return() =>{
    unSubscribe()
 }
},[])


if(loading){
    return <Loading></Loading>
}
    const authInfo ={
        registerUser,
        signInUser,
        signInGoogle,
        user,
        loading,
        logOut,
        updateUserProfile
    }
    return (
            <AuthContext value={authInfo} >
                    {children}
            </AuthContext>
    );
};

export default AuthProvider;