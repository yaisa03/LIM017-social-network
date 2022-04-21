/* eslint-disable import/no-unresolved */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* import {
  getStorage, ref, uploadBytes, getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-storage.js'; */
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,
  GoogleAuthProvider, signInWithPopup, sendEmailVerification, signOut, updateProfile,
  getFirestore, collection, addDoc, query, where, orderBy,
  deleteDoc, doc, setDoc, onSnapshot, getDoc, getStorage,
  ref, uploadBytes, getDownloadURL, deleteUser, getDocs,
} from './FirebaseImport.js';
import { app } from './FirebaseInit.js';
import { ShowPosts } from '../components/ShowPosts.js';
import {
  /* emailMessageVerificacionOK,  cleanMessageError, validateEmailVerification,
  removeMessageError, addMessage,
resetPasswordMessageOK, removeMessage, addMessageError, messageErrorCases,
  getFileChoosenProfile, getReferenceImg, getFileChoosenPost, */showUserPostsById,
  showPostsHome, putLikesPosts, // getFileChoosenPostEdit, emailVerificacionMessage,
} from './index.js';

const db = getFirestore(app);
export const auth = getAuth();

// Funcion que envia un mensaje de verificacion al usuario que se ha registrado
export const emailVerification = () => sendEmailVerification(auth.currentUser);
// Funcion que registra un nuevo usuario en Firebase
export function createUser(email, password, displayname) {
  return createUserWithEmailAndPassword(auth, email, password).then(() => {
    updateProfile(auth.currentUser, {
      displayName: displayname,
    }).then(() => {
      // Profile updated!
    }).catch((error) => error);
  });
}
/* ********************************** */
// Funcion que permite a un usuario loggearse con su email y password
export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password).then((userCredential) => userCredential)
    .catch((error) => error);
}
// Funcion que permite a un usuario loggearse con su cuenta de Gmail
export function signInGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => result);
}
// Funcion que permite reestablecer contraseña enviando un correo al usuario
export function passwordReset(email) {
  return sendPasswordResetEmail(auth, email)
    .then()
    .catch((error) => error);
}

// eslint-disable-next-line consistent-return
export function setUser(displayName, photoURL) {
  const user = auth.currentUser;
  if (user !== null) {
    user.displayName = displayName;
    user.photoURL = photoURL;
    const uid = user.uid;
    return uid;
  }
}
// eslint-disable-next-line consistent-return
export function setUserPhoto(photoUserURL) {
  return updateProfile(auth.currentUser, {
    photoURL: photoUserURL,
  }).then(() => {
    updatePhotoPosts(photoUserURL, auth.currentUser);
  })
    .catch((error) => error);
}
// funcion cambiar nombre de usuario en los post
export async function updatePhotoPosts(photoUserURL, user) {
  const q = query(collection(db, 'posts'), where('UserId', '==', user.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((post) => {
    setDoc(doc(db, 'posts', post.id), { userImage: photoUserURL }, { merge: true });
  });
  return findPostById();
}
// funcion que permite editar el nombre de usurio
export function setUserInfo(newname) {
  updateProfile(auth.currentUser, {
    displayName: newname,
  }).then(() => {
    updateNamePosts(newname, auth.currentUser);
  }).catch((error) => error);
}
// funcion cambiar nombre de usuario en los post
export async function updateNamePosts(newname, user) {
  const q = query(collection(db, 'posts'), where('UserId', '==', user.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((post) => {
    setDoc(doc(db, 'posts', post.id), { userName: newname }, { merge: true });
  });
}
// funcion que permite eliminar el usuario
export function deleteAccount() {
  const user = auth.currentUser;
  deleteUser(user).then(() => {
    deleteUserPosts(user);
  }).catch((error) => error);
}
// funcion pra eliminar post del usuario que borra su cuenta
export async function deleteUserPosts(user) {
  const q = query(collection(db, 'posts'), where('UserId', '==', user.uid));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  querySnapshot.forEach((post) => {
    deleteDoc(doc(db, 'posts', post.id));
  });
}
// funcion que crea el url de la foto de perfil del usuario y la inserta
export async function urlPhoto(filechoosen) {
  const storage = getStorage();
  const storageRef = ref(storage, filechoosen.name);
  await uploadBytes(storageRef, filechoosen).then(() => {
  });
  return getDownloadURL(ref(storage, filechoosen.name))
    .then((url) => url)
    .catch((error) => error);
}

// funcion para actualizar la info en firestore
export async function updatePostImage(id, title, post, url) {
  setDoc(doc(db, 'posts', id), { postTitle: title }, { merge: true });
  setDoc(doc(db, 'posts', id), { content: post }, { merge: true });
  setDoc(doc(db, 'posts', id), { image: url }, { merge: true });
}
// funcion para obtener la informacion del usuario actual
export function getUser() {
  // const auth = getAuth();
  const user = auth.currentUser;
  return user;
}
// Funcion que guarda post con foto en firebase
export function uploadPostImage(title, post, url, storageName, level, type) {
  // const auth = getAuth();
  const user = auth.currentUser;
  console.log(url);
  addDoc(collection(db, 'posts'), {
    UserId: user.uid,
    postTitle: title,
    content: post,
    date: new Date(),
    likes: [],
    image: url,
    storageImage: storageName,
    userImage: user.photoURL,
    userName: user.displayName,
    postLevel: level,
    postType: type,
  });
  findPostById();
}
// Funcion que guarda post sin foto en firebase
/* export function uploadPost(title, post, level, type) {
  // const auth = getAuth();
  const user = auth.currentUser;
  addDoc(collection(db, 'posts'), {
    UserId: user.uid,
    postTitle: title,
    content: post,
    date: new Date(),
    likes: [],
    image: '',
    storageImage: '',
    userImage: user.photoURL,
    userName: user.displayName,
    postLevel: level,
    postType: type,
  });
} */
// Funcion que muestra los posts del usuario dueno del perfil
export async function findPostById() {
  // const auth = getAuth();
  const user = auth.currentUser;
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where('UserId', '==', user.uid), orderBy('date', 'desc'));
  onSnapshot(q, (snapshot) => {
    showUserPostsById(snapshot);
    /* const containerPosts = document.getElementById('postsContainer');
    containerPosts.innerHTML = '';
    snapshot.forEach((e) => {
      containerPosts.innerHTML += ShowPostsById(e, e.data());
      // if (e.data().image === '') {
      //  document.getElementById('uploadPostImages').style.display = 'none';
      // }
      const button = document.querySelectorAll('.editButton');
      const text = document.querySelectorAll(`.${button.id}`);
      text.forEach((el) => {
        el.readonly = true;
      });
      editPosts();
      deletePosts();
    }); */
  });
}
// Funcion que busca todos los posts en la app
export async function findPosts() {
  const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
  onSnapshot(q, (querySnapshot) => {
    showPostsHome(querySnapshot);
    /* const containerPosts = document.getElementById('postsContainer');
    containerPosts.innerHTML = '';
    let createdPosts = '';
    querySnapshot.forEach((d) => {
      createdPosts += ShowPosts(d, d.data());
      containerPosts.innerHTML = createdPosts;
      // if (d.data().image === '') {
      //  document.getElementById('uploadPostImages').style.display = 'none';
      // }
      // console.log(d.data());
    });
    AddLikes(); */
    // search(createdPosts);
  });
}
/* function filterPost(arrayPosts, condition) {
  console.log(JSON.parse(arrayPosts).filter((post) => (post.postTitle).includes(condition)));
  // return;
} */
/* export function search(createdPost) {
  const searchPost = document.getElementById('searchPost');
  searchPost.addEventListener('keyup', () => {
    filterPost(createdPost, searchPost.value);
  });
} */
// Funcion que elimina los posts de la base de datos de firebase
export function postDeleted(id) {
  deleteDoc(doc(db, 'posts', id));
}
// Funcion que actualiza la informacion de un post cuando se lo edita en la base de datos
export async function updatePost(id, title, post) {
  setDoc(doc(db, 'posts', id), { postTitle: title }, { merge: true });
  setDoc(doc(db, 'posts', id), { content: post }, { merge: true });
  // setDoc(doc(db, 'posts', id), { date: new Date() }, { merge: true });
}
export function postLike(id, newArray) {
  setDoc(doc(db, 'posts', id), { likes: newArray }, { merge: true });
}
export async function getArrayLikes(e) {
  const docSnap = await getDoc(doc(db, 'posts', e));
  let array = docSnap.data().likes;
  return array;
}
export function AddLikes() {
  // const auth = getAuth();
  const user = auth.currentUser;
  putLikesPosts(user);
  /* const likeButton = document.querySelectorAll('.likeButton');
  likeButton.forEach((e) => {
    e.addEventListener('click', async () => {
      let arrayLikes = await getArrayLikes(e.id);
      let count = 0;
      const arrayCounter = arrayLikes.length;
      for (let i = 0; i < arrayLikes.length; i++) {
        if (arrayLikes[i] === user.uid) {
          arrayLikes.splice(i, 1);
          postLike(e.id, arrayLikes);
          break;
        } else {
          // eslint-disable-next-line no-unused-vars
          count++;
        }
      }
      if (count === arrayCounter) {
        arrayLikes.push(user.uid);
        postLike(e.id, arrayLikes);
      }
    });
  }); */
}
// Funcion que permite cerrar sesion de un usuario
export function SignOut() {
  // const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('Sesion cerrada satisfactoriamente');
  }).catch((/* error */) => {
    // An error happened.
  });
}
// funcion que permite obtener los por Postres
export async function findPostByType(type) {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where('postType', '==', type), orderBy('date', 'desc'));
  onSnapshot(q, (snapshot) => {
    const containerPosts = document.getElementById('postsContainer');
    containerPosts.innerHTML = '';
    snapshot.forEach((e) => {
      containerPosts.innerHTML += ShowPosts(e, e.data());
    });
  });
}
