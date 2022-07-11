import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHq9mj58qzfDV9uObziO_UoakUZM8drBw",
  authDomain: "orderin-dfb74.firebaseapp.com",
  projectId: "orderin-dfb74",
  storageBucket: "orderin-dfb74.appspot.com",
  messagingSenderId: "958330503017",
  appId: "1:958330503017:web:00672be4b16f12fc1dc7f8"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)