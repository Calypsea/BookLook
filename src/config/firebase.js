import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAXtSON89EeDW8oqw75ThaUdC9q6sw2WoU",
  authDomain: "booklook-389108.firebaseapp.com",
  projectId: "booklook-389108",
  storageBucket: "booklook-389108.appspot.com",
  messagingSenderId: "420042042323",
  appId: "1:420042042323:web:43aedce748a80f14a2dd26",
  measurementId: "G-PMN0MMFL79"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);