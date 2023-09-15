import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDd5a5UZX0EC3q-0b3ErX2CySVeVN4wkCU",
    authDomain: "scrapbook-b08ae.firebaseapp.com",
    projectId: "scrapbook-b08ae",
    storageBucket: "scrapbook-b08ae.appspot.com",
    messagingSenderId: "888543369377",
    appId: "1:888543369377:web:8a7f9e1e79a041c23c38e0",
    measurementId: "G-LBKM2MW25B",
  });
}

function getStorage() {
  return firebase.storage();
}

function getFirestore() {
  return firebase.firestore();
}

export function getAuth() {
  return firebase.auth();
}

export function getUser() {
  return getAuth().currentUser;
}

export async function SignOutUser() {
  try {
    await getAuth().signOut();
  } catch (error) {
    throw DescribeError(error.code);
  }
}

export async function CreateWithEmail(email, password) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      getAuth(),
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
    const user = await signInWithEmailAndPassword(getAuth(), email, password);
    addUser(user.user.uid);
  } catch (error) {
    throw DescribeError(error.code);
  }
}

export async function SignInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await getAuth().signInWithPopup(provider);
    addUser(result.user.uid);
  } catch (error) {
    throw DescribeError(error.code);
  }
}

export function getMemories(uid) {
  const ref = getFirestore()
    .collection("Users")
    .doc(uid)
    .collection("Memories");
  const query = ref;
  return query;
}

export function addUser(uid) {
  var ref = getFirestore().collection("Users");
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
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function addMemory(name) {
  // lowercase name to standardize
  const query = name.toLowerCase();
  const uid = getUser().uid;
  const memoryExists = `Memory with name "${name}" already exists`;

  var ref = getFirestore().collection("Users").doc(uid).collection("Memories");

  // make sure there is no other doc with the same name
  try {
    const doc = await ref.doc(query).get();
    if (doc.exists) {
      throw memoryExists;
    }
  } catch (error) {
    throw DescribeError(error);
  }

  try {
    ref.doc(name).set({ Name: name });
  } catch (error) {
    console.log(error);
  }
}

export async function getDescription(memory, page) {
  try {
    const ref = getPages(memory).doc(page);
    const doc = await ref.get();
    return doc.data().Description;
  } catch (error) {
    console.log(error);
  }
}

export function getNotecards(memory, page) {
  try {
    const ref = getPages(memory).doc(page).collection("Notes");
    return ref;
  } catch (error) {
    throw DescribeError(error);
  }
}

export async function addNotecard(memory, page, text) {
  const ref = getNotecards(memory, page);

  try {
    const id = await ref.add({ text: text });
    return id;
  } catch (error) {
    throw DescribeError(error);
  }
}

export async function getImages(memory, page) {
  const user = getUser();
  // go to user folder
  const userRef = getStorage().ref().child(user.uid);
  // image folder
  const imageFolder = userRef.child(`${memory}/${page}`);

  try {
    const imagesRes = await imageFolder.listAll();
    var images = [];
    const numberOfImages = imagesRes.items.length;
    for (let i = 0; i < numberOfImages; i++) {
      let url = await getUrlFromImageRef(imagesRes.items[i]);
      images.push(url);
    }
    return images;
  } catch (error) {
    throw DescribeError(error);
  }
}

export async function getUrlFromImageRef(ref) {
  try {
    const url = await ref.getDownloadURL();
    return url;
  } catch (error) {
    throw DescribeError(error);
  }
}

export async function uploadImageToCloud(memory, page, file, load) {
  const user = getUser();
  // go to user folder
  const userRef = getStorage().ref().child(user.uid);
  const fileName = file.name.split(" ").join("_");
  // image folder
  const image = userRef.child(`${memory}/${page}/${fileName}`);

  try {
    const uploadTask = image.put(file);
    // wait for file to upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        throw DescribeError(error);
      },
      () => {
        // reload the images upon successful upload
        load();
      }
    );

    uploadTask.then((task) => {
      return "Success";
    });
  } catch (error) {
    throw DescribeError(error);
  }
}

export function getPages(memory) {
  const user = getUser();
  try {
    return getMemories(user.uid).doc(memory).collection("Pages");
  } catch (error) {
    throw DescribeError(error);
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
