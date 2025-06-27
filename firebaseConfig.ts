// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd6ka02n1C4bg716YFjCGJ6N-cszEzsFI",
  authDomain: "lumigram-391ea.firebaseapp.com",
  projectId: "lumigram-391ea",
  storageBucket: "lumigram-391ea.firebasestorage.app",
  messagingSenderId: "528726575573",
  appId: "1:528726575573:web:dfce2240148974c4f6155c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initialize auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
