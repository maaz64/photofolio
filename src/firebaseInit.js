
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyyUNOnyf0YJnU0zjybSugOcLspA-Z8fo",
  authDomain: "photo-folio-5dbb9.firebaseapp.com",
  projectId: "photo-folio-5dbb9",
  storageBucket: "photo-folio-5dbb9.appspot.com",
  messagingSenderId: "187159925256",
  appId: "1:187159925256:web:5ce57751b2b8f3923fb7bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {db} 