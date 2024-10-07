// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFmF9l1QTpOs1AX3uupYav0cY16BTPJrI",
  authDomain: "jobber-9a010.firebaseapp.com",
  databaseURL: "https://jobber-9a010-default-rtdb.firebaseio.com",
  projectId: "jobber-9a010",
  storageBucket: "jobber-9a010.appspot.com",
  messagingSenderId: "414650068837",
  appId: "1:414650068837:web:05086259018f7719fe7b8c",
  measurementId: "G-6SDVP2KZ76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
