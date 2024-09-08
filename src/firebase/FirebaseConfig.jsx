
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmgNxaDSGpm6qd5MKBRtULwGRs7u5lpmg",
  authDomain: "e-commerce-bab27.firebaseapp.com",
  projectId: "e-commerce-bab27",
  storageBucket: "e-commerce-bab27.appspot.com",
  messagingSenderId: "867349450661",
  appId: "1:867349450661:web:7f6d9e50800e9a3866624c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app)
const auth = getAuth(app);

export {fireDB,auth}