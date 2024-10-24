import { initializeApp } from 'firebase/app';
import {
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc

} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCg4Xy2IcZ4HnLT5VdwS6CMAdRyMqMrhnU",
    authDomain: "crwn-clothing-db-3b110.firebaseapp.com",
    projectId: "crwn-clothing-db-3b110",
    storageBucket: "crwn-clothing-db-3b110.appspot.com",
    messagingSenderId: "168997805813",
    appId: "1:168997805813:web:ee72a8de9c87613297afbc"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }catch (error){

        }
    }

    return userDocRef;
};