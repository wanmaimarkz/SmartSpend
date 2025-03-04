import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCiOYRZr2iD98cXM_P03SmOcvVKIKJtII8",
    authDomain: "smartspend-44816.firebaseapp.com",
    projectId: "smartspend-44816",
    storageBucket: "smartspend-44816.firebasestorage.app",
    messagingSenderId: "462508185581",
    appId: "1:462508185581:web:888aca7c7f83963257b9e4"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
