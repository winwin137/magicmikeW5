// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQjRds4j3xtJfO5iwaAr4j9l3zrQTKprA",
  authDomain: "magicmikew5.firebaseapp.com",
  projectId: "magicmikew5",
  storageBucket: "magicmikew5.firebasestorage.app",
  messagingSenderId: "93120022181",
  appId: "1:93120022181:web:fa21bf03a9f8e231efef4c",
  measurementId: "G-H13P6Z5EDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
