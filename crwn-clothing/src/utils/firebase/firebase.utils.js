import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
 } from 'firebase/auth';

import {
 getFirestore,
 doc,
 getDoc,
 setDoc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD93YSOXhr52gZbOrmKTKc75CNkRGSk3FE",
  authDomain: "crwn-clothing-db-bc096.firebaseapp.com",
  projectId: "crwn-clothing-db-bc096",
  storageBucket: "crwn-clothing-db-bc096.appspot.com",
  messagingSenderId: "93812914770",
  appId: "1:93812914770:web:97b2c1951ee1fb04e8bd8b"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
})


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
         displayName, 
         email, 
         createdAt,
         ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user',error.message);
    }

  }

  return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);


export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback);
