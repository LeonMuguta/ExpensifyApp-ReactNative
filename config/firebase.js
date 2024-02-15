// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, collection } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADFYR2ceww6C5ZTP1bKKm-p_aIX6jbCxA",
  authDomain: "expensify-65a8a.firebaseapp.com",
  projectId: "expensify-65a8a",
  storageBucket: "expensify-65a8a.appspot.com",
  messagingSenderId: "270507514109",
  appId: "1:270507514109:web:aec90f7c131fd02dfa0694"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const auth = getAuth(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');

export default app