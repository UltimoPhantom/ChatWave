
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCLFevlU_3AAROnRo1xS5JVpd3SImeq1Iw",
  authDomain: "trial-7b2a3.firebaseapp.com",
  projectId: "trial-7b2a3",
  storageBucket: "trial-7b2a3.appspot.com",
  messagingSenderId: "458391746266",
  appId: "1:458391746266:web:ec55f6a5007bb5997f97e3",
  measurementId: "G-FKKSCJMDHE"
}; 

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
export default db;


