/* eslint-disable import/no-unresolved */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,
  GoogleAuthProvider, signInWithPopup, sendEmailVerification, signOut, updateProfile,
  getFirestore, collection, addDoc, query, where, orderBy,
  deleteDoc, doc, setDoc, onSnapshot, getDoc, getStorage,
  ref, uploadBytes, getDownloadURL, deleteUser, getDocs,
} from './FirebaseImport.js';
import { app } from './FirebaseInit.js';
import {
  showUserPostsById, showPostsByType, showPostsHome, messageErrorCases,
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
    }).then(() => {})
      .catch((error) => error);
  });
}
// Funcion que permite a un usuario loggearse con su email y password
export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential)
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      messageErrorCases(errorMessage);
    });
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
export function setUserPhoto(photoUserURL) {
  return updateProfile(auth.currentUser, {
    photoURL: photoUserURL,
  }).then(() => {})
    .catch((error) => error);
}
// funcion cambiar nombre de usuario en los post
export async function updatePhotoPosts(photoUserURL) {
  const user = auth.currentUser;
  const q = query(collection(db, 'posts'), where('UserId', '==', user.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((post) => setDoc(doc(db, 'posts', post.id), { userImage: photoUserURL }, { merge: true }));
  return findPostById();
}
// funcion que permite editar el nombre de usurio
export function setUserInfo(newname) {
  return updateProfile(auth.currentUser, {
    displayName: newname,
  }).then(() => {})
    .catch((error) => error);
}
// funcion cambiar nombre de usuario en los post
export async function updateNamePosts(newname) {
  const user = auth.currentUser;
  const q = query(collection(db, 'posts'), where('UserId', '==', user.uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.forEach((post) => setDoc(doc(db, 'posts', post.id), { userName: newname }, { merge: true }));
}
// funcion que permite eliminar el usuario
export function deleteAccount() {
  const user = auth.currentUser;
  return deleteUser(user).then(() => deleteUserPosts(user))
    .catch((error) => error);
}
// funcion pra eliminar post del usuario que borra su cuenta
export async function deleteUserPosts(user) {
  const q = query(collection(db, 'posts'), where('UserId', '==', user.uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.forEach((post) => deleteDoc(doc(db, 'posts', post.id)));
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
  return setDoc(doc(db, 'posts', id), { image: url }, { merge: true });
}
// Funcion que guarda post con foto en firebase
export function uploadPostImage(title, post, url, storageName, level, type) {
  const user = auth.currentUser;
  console.log(url);
  return addDoc(collection(db, 'posts'), {
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
}
// Funcion que muestra los posts del usuario dueno del perfil
export async function findPostById() {
  const user = auth.currentUser;
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where('UserId', '==', user.uid), orderBy('date', 'desc'));
  return onSnapshot(q, (snapshot) => showUserPostsById(snapshot));
}
// Funcion que busca todos los posts en la app
export async function findPosts() {
  const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
  return onSnapshot(q, (querySnapshot) => showPostsHome(querySnapshot));
}
// funcion que permite obtener los por el tipo de receta
export async function findPostByType(type) {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where('postType', '==', type), orderBy('date', 'desc'));
  return onSnapshot(q, (snapshot) => showPostsByType(snapshot));
}
// Funcion que elimina los posts de la base de datos de firebase
export const postDeleted = (id) => deleteDoc(doc(db, 'posts', id));

// Funcion que actualiza la informacion de un post cuando se lo edita en la base de datos
export async function updatePost(id, title, post) {
  setDoc(doc(db, 'posts', id), { postTitle: title }, { merge: true });
  return setDoc(doc(db, 'posts', id), { content: post }, { merge: true });
}
// Funcion que sube un nuevo array con los ids de los usuarios que han dado like a la publicacion
export function postLike(id, newArray) {
  return setDoc(doc(db, 'posts', id), { likes: newArray }, { merge: true });
}
// Funcion que obtiene el array de likes de una publicacion
export async function getArrayLikes(e) {
  const docSnap = await getDoc(doc(db, 'posts', e));
  let array = docSnap.data().likes;
  return array;
}
// Funcion que permite cerrar sesion de un usuario
export function SignOut() {
  return signOut(auth).then(() => {})
    .catch((error) => error);
}
