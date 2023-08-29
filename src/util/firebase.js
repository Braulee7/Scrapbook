import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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
const firestore = firebase.firestore();

export function getAuth() {
  return auth;
}

export function getUser() {
  return auth.currentUser;
}

export async function SignOutUser() {
  try {
    await firebase.auth().signOut();
    console.log("Signed out successfully");
  } catch (error) {
    throw DescribeError(error.code);
  }
}

export async function CreateWithEmail(email, password) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    addUser(userCredentials.user.uid);
  } catch (error) {
    throw DescribeError(error.code);
  }
}

export async function SignInWithEmail(email, password) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    addUser(user.user.uid);
  } catch (error) {
    throw DescribeError(error.code);
  }
}

export async function SignInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await auth.signInWithPopup(provider);
    addUser(result.user.uid);
  } catch (error) {
    console.log("got an error");
    throw DescribeError(error.code);
  }
}

function DescribeError(code) {
  switch (code) {
    case "auth/wrong-password":
      return "Email and Password Credentials don't match";

    case "auth/email-already-in-use":
      return "Email already exists, please sign in or create with different Email";

    case "auth/user-not-found":
      return "Email not recognised, please create account or try different Email";
    case "auth/popup-closed-by-user":
      return "Accidentally closed the pop up message, please sign in using the pop up!";
    case "auth/cancelled-popup-request":
      return "Error processing popup request due to too many calls. Please try again later.";
    default:
      return `Something went wrong: (${code})`;
  }
}

export function getMemories(uid) {
  const ref = firestore.collection("Users").doc(uid).collection("Memories");
  const query = ref;
  return query;
}

export function addUser(uid) {
  var ref = firestore.collection("Users");
  console.log("creating user for : " + uid);
  // check if the user is already in db
  ref
    .doc(uid)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        // add user to db
        ref.doc(uid).set({
          uid: uid,
        });
      } else {
        console.log("User already exists");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
