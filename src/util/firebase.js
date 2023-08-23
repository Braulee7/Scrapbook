import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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

export async function CreateWithEmail(email, password) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log("going home" + user);
  } catch (error) {
    throw DescribeError(error.code);
  }
}

export async function SignInWithEmail(email, password) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log("successfully signed in " + user);
  } catch (error) {
    throw DescribeError(error.code);
  }
}

export function SignInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

function DescribeError(code) {
  switch (code) {
    case "auth/wrong-password":
      return "Email and Password Credentials don't match";

    case "auth/email-already-in-use":
      return "Email already exists, please sign in or create with different Email";

    case "auth/user-not-found":
      return "Email not recognised, please create account or try different Email";
    default:
      return `Something went wrong: (${code})`;
  }
}
