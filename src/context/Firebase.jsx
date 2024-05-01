import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebase from "firebase/compat/app";

const FirebaseContext = createContext(null);


const firebaseConfig = {
  apiKey: "AIzaSyCVk9ncDxghbAj7LgPkU_-7smkpvlK-e4E",
  authDomain: "bookify-2c7e1.firebaseapp.com",
  projectId: "bookify-2c7e1",
  storageBucket: "bookify-2c7e1.appspot.com",
  messagingSenderId: "86771531740",
  appId: "1:86771531740:web:355b2799ce4c43473d5919"
};


export const useFirebase=()=>useContext(FirebaseContext)


const FirebaseApp = initializeApp(firebaseConfig);
const firebaseAuth=getAuth(FirebaseApp);
const googleProvider=new GoogleAuthProvider()
const firestore=getFirestore(FirebaseApp)
const storage=getStorage(FirebaseApp)

export const FirebaseProvider=(props)=>{

    const [user, setuser] = useState(null)
    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,user=>{
            if(user) setuser(user)
            else setuser(null)
        })
    },[])

    const signupUserWithEmailAndPassword=async(email,password)=>{
        try{
            await createUserWithEmailAndPassword(firebaseAuth,email,password);
        }
        catch(e){
            console.log("Error while creating user :: ",e);
        }
    }
    const signInUserWithEmailAndPassword=async(email,password)=>{
        try{
            await signInWithEmailAndPassword(firebaseAuth,email,password);
        }
        catch(e){
            console.log("Error while creating user :: ",e);
        }
    }
    const signInUserWithGoogle=async()=>{
        try{
            await signInWithPopup(firebaseAuth,googleProvider);
        }
        catch(e){
            console.log("Error while creating user :: ",e);
        }
    }

    const isloggedin=user?true:false;

    const handleCreateNewListing=async(name,isbn,price,cover)=>{
        try{
            const imageRef=ref(storage,`uploads/images/${Date.now()}-${cover.name}`)
            const uploadResult=await uploadBytes(imageRef,cover);
            return await addDoc(collection(firestore,"books"),{
                name,
                isbn,
                price,
                imageURL:uploadResult.ref.fullPath,
                userID:user.uid,
                userEmail:user.email,
                displayName:user.displayName,
                photoURL:user.photoURL
            })
        }
        catch(e){
            console.log("Error while creating new listings :: ",e);
        }
    }
    const getImageURL=(path)=>{
        return getDownloadURL(ref(storage,path))
    }
    const listAllBooks=async()=>{
        try {
            return await getDocs(collection(firestore,'books'))
        } catch (error) {
            console.log("Error while retrieving the books :: ",error);
        }
    }

    const getBookById=async(id)=>{
        try {
            const docRef=doc(firestore,"books",id);
            const result=await getDoc(docRef);
            return result
        } catch (error) {
            console.log(error)
        }
    }

    const placeOrder=async(bookID,quantity)=>{
        try {
            const collectionRef=collection(firestore,"books",bookID,'orders')
            const result=await addDoc(collectionRef,{
                userID:user.uid,
                userEmail:user.email,
                displayName:user.displayName,
                photoURL:user.photoURL,
                quantity:Number(quantity),
            })
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    const fetchMyBooks=async(userId)=>{
        try {
            const collectionRef=collection(firestore,"books");
            console.log(user);
            const q=query(collectionRef,where("userID","==",userId))
            const result=await getDocs(q);
            return result
            
        } catch (error) {
           console.log(error); 
        }
    }
    const getOrders=async(bookID)=>{
        const collectionRef=collection(firestore,"books",bookID,'orders')
        const result=await getDocs(collectionRef)
        return result
    }
    return (
        <FirebaseContext.Provider value={{
            signupUserWithEmailAndPassword,
            signInUserWithEmailAndPassword,
            signInUserWithGoogle,
            isloggedin,
            handleCreateNewListing,
            listAllBooks,
            getImageURL,
            getBookById,
            placeOrder,
            fetchMyBooks,
            user,
            getOrders
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}