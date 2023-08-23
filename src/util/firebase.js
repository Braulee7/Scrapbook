import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyDd5a5UZX0EC3q-0b3ErX2CySVeVN4wkCU",
  authDomain: "scrapbook-b08ae.firebaseapp.com",
  projectId: "scrapbook-b08ae",
  storageBucket: "scrapbook-b08ae.appspot.com",
  messagingSenderId: "888543369377",
  appId: "1:888543369377:web:8a7f9e1e79a041c23c38e0",
  measurementId: "G-LBKM2MW25B",
});

const auth = firebase.auth();

export default async function CreateWithEmail(email, password) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log("going home" + user);
  } catch (error) {
    throw error;
  }
}
