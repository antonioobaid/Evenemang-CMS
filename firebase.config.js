
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDT8WLethL6D17GwIyhLzKds-j4GLAC42w",
  authDomain: "event-bb7e9.firebaseapp.com" ,
 projectId: "event-bb7e9",
  storageBucket: "event-bb7e9.appspot.com" ,
  messagingSenderId: "864944223301",
  appId: "1:864944223301:web:4c358e3c28d07a137f9f2c"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app)

const storage = getStorage(app)

export {db,storage ,auth }