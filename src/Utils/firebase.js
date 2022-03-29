// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut  } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAmYRiN1yp1-1TRD_acc749HZsFyIRbYc",
  authDomain: "react-login-signup-607ad.firebaseapp.com",
  projectId: "react-login-signup-607ad",
  storageBucket: "react-login-signup-607ad.appspot.com",
  messagingSenderId: "212299670268",
  appId: "1:212299670268:web:9f340f1a69f4816d86ad79",
  measurementId: "G-BV1ZX35DS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore();
const userRef = collection(db, 'user')
const storage = getStorage();
export {
  auth,
  signOut,
  createUserWithEmailAndPassword,
  db,
  userRef,
  doc,
  addDoc,
  setDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL
}