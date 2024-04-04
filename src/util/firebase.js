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

export function getFirestore() {
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
  return ref;
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
    console.log(text);
    const id = await ref.add({ text: text });
    return id;
  } catch (error) {
    throw DescribeError(error);
  }
}

export function getImageUrlCollection(memory, page) {
  try {
    const ref = getPages(memory).doc(page).collection("ImageUrls");
    return ref;
  } catch (error) {
    throw DescribeError(error);
  }
}

export async function addImageUrl(memory, page, url, fileName) {
  const ref = getImageUrlCollection(memory, page);

  try {
    const id = await ref.doc(fileName).set({
      url: url,
      x: null,
      y: null,
    });
    return id;
  } catch (error) {
    throw DescribeError(error);
  }
}

export function getImages(memory, page) {
  try {
    const images = getImageUrlCollection(memory, page);
    return images;
  } catch (error) {
    throw DescribeError(error);
  }
}

async function getImageRefs(memory, page) {
  const user = getUser();
  // go to user folder
  const userRef = getStorage().ref().child(user.uid);
  // image folder
  const imageFolder = userRef.child(`${memory}/${page}`);
  return imageFolder.listAll();
}

export async function getUrlFromImageRef(ref) {
  try {
    const url = await ref.getDownloadURL();
    return url;
  } catch (error) {
    throw DescribeError(error);
  }
}

export async function uploadImageToCloud(memory, page, file) {
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
      (snapshot) => {}, // next
      (error) => {
        // error
        throw DescribeError(error);
      },
      () => {}
    );

    uploadTask.then(async (task) => {
      // upload the url to the firestore database
      // for faster retrieval
      const url = await getUrlFromImageRef(image);
      addImageUrl(memory, page, url, fileName);
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

export function addPage(memory, name, desc) {
  const pages = getPages(memory);
  try {
    pages.doc(name).set({ name: name, Description: desc });
  } catch (error) {
    throw DescribeError(error);
  }
}

export function deleteContent(type, options) {
  switch (type) {
    case "memory":
      deleteMemory(options);
      break;
    case "page":
      deletePage(options);
      break;
    case "notecard":
      deleteNotecard(options);
      break;
    default:
      break;
  }
}

// to delete a memory we need to delete all it's pages
async function deleteMemory(options) {
  const pages = await getPages(options.memory).get();
  // go through each document and delete it
  pages.forEach(async (doc) => {
    await deletePage({ memory: options.memory, page: doc.id });
  });
  // delete the memory
  const memory = await getMemories(getUser().uid).doc(options.memory);
  await memory.delete();
}

// to delete a page we need to delete all it's notecards and images
async function deletePage(options) {
  // go through each notecard and delete it
  const notecards = await getNotecards(options.memory, options.page).get();
  notecards.forEach(async (doc) => {
    await deleteNotecard({
      memory: options.memory,
      page: options.page,
      notecard: doc.id,
    });
  });
  // go through each image and delete it
  const images = await getImageRefs(options.memory, options.page);
  images.items.forEach(async (image) => {
    await image.delete();
  });
  // delete the page
  const page = await getPages(options.memory).doc(options.page);
  await page.delete();
}

async function deleteNotecard(options) {
  console.log(options);
  const notecard = await getNotecards(options.memory, options.page).doc(
    options.notecard
  );
  notecard.delete();
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
