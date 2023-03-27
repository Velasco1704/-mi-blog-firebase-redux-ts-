import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY_FIREBASE,
  authDomain: "mi-blog-firebase.firebaseapp.com",
  projectId: "mi-blog-firebase",
  storageBucket: "mi-blog-firebase.appspot.com",
  messagingSenderId: "78948778717",
  appId: "1:78948778717:web:5934070649bdf9c6f41134"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();