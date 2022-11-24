// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv6H7x7vSlhoqVN93uMPhMxxK1DmKrWgQ",
  authDomain: "vc2020.firebaseapp.com",
  databaseURL: "https://vc2020.firebaseio.com",
  projectId: "vc2020",
  storageBucket: "vc2020.appspot.com",
  messagingSenderId: "771722116557",
  appId: "1:771722116557:web:2de9c1a5cf40c1e5e2d884"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore (app) ;