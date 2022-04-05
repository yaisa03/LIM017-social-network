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
  deleteDoc, doc, setDoc, onSnapshot, getDoc,
} from './FirebaseImport.js';
import { app } from './FirebaseInit.js';
import { ShowPosts, ShowPostsById } from '../components/ShowPosts.js';
import {
  goToLogIn, showHome, editPosts, deletePosts,
} from '../main.js';

const db = getFirestore(app);

export function emailVerification() {
  const auth = getAuth();
  const errorMessageText = document.querySelector('#message');
  sendEmailVerification(auth.currentUser)
    .then(() => {
      errorMessageText.classList.add('showMessage');
      errorMessageText.innerText = 'Email verification sent!';
      setTimeout(goToLogIn, 2000);
    });
}
// Funcion que registra un nuevo usuario en Firebase
export function register(email, password, displayname) {
  const auth = getAuth();
  const errorMessageText = document.querySelector('#message');
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user);
    updateProfile(auth.currentUser, {
      displayName: displayname,
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((/* error */) => {
      // An error occurred
      // ...
    });
    emailVerification();
  })
    .catch((error) => {
      const errorMessage = error.message;
      errorMessageText.classList.add('showMessageError');
      switch (errorMessage) {
        case 'Firebase: Error (auth/email-already-in-use).':
          errorMessageText.innerText = 'email ya registrado';
          break;
        case 'Firebase: Error (auth/internal-error).':
          errorMessageText.innerText = 'ingresar contraseña';
          break;
        case 'Firebase: Error (auth/invalid-email).':
          errorMessageText.innerText = 'email invalido';
          break;
        default:
          break;
      }
    });
}
// Funcion que permite a un usuario loggearse con su email y password
export function logIn(email, password) {
  const auth = getAuth();
  const errorMessageText = document.querySelector('#message');
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      errorMessageText.classList.remove('showMessageError');
      errorMessageText.innerText = ' ';
      switch (user.emailVerified) {
        case true:
          console.log(user);
          showHome();
          break;
        case false:
          errorMessageText.classList.add('showMessageError');
          errorMessageText.innerText = 'verificar usuario mediante el link enviado a tu correo';
          break;
        default:
          break;
      }
    })
    .catch((error) => {
      const errorMessage = error.message;
      errorMessageText.classList.add('showMessageError');
      switch (errorMessage) {
        case 'Firebase: Error (auth/user-not-found).':
          errorMessageText.innerText = 'usuario no encontrado';
          break;
        case 'Firebase: Error (auth/wrong-password).':
          errorMessageText.innerText = 'contraseña incorrecta';
          break;
        case 'Firebase: Error (auth/invalid-email).':
          errorMessageText.innerText = 'email invalido';
          break;
        case 'Firebase: Error (auth/internal-error).':
          errorMessageText.innerText = 'ingresar contraseña';
          break;
        case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
          errorMessageText.innerText = 'la contraseña debe tener al menos 6 caracteres';
          break;
        default:
          break;
      }
    });
}
// Funcion que permite a un usuario loggearse con su cuenta de Gmail
export function logInGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      /* const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken; */
      const user = result.user;
      console.log(user);
      showHome();
    }).catch((/* error */) => {
      // const errorMessage = error.message;
    });
}
// Funcion que permite reestablecer contraseña enviando un correo al usuario
export function emailResetPassword(email) {
  const auth = getAuth();
  const errorMessageText = document.querySelector('#message');
  sendPasswordResetEmail(auth, email)
    .then(() => {
      errorMessageText.classList.remove('showMessageError');
      errorMessageText.classList.add('showMessage');
      errorMessageText.innerText = 'Email de reestablecimiento de contraseña enviado';
      setTimeout(goToLogIn, 2000);
    })
    .catch((error) => {
      const errorMessage = error.message;
      errorMessageText.classList.remove('showMessage');
      errorMessageText.classList.add('showMessageError');
      switch (errorMessage) {
        case 'Firebase: Error (auth/user-not-found).':
          errorMessageText.innerText = 'usuario no encontrado';
          break;
        case 'Firebase: Error (auth/invalid-email).':
          errorMessageText.innerText = 'email invalido';
          break;
        case 'Firebase: Error (auth/missing-email).':
          errorMessageText.innerText = 'ingresar email';
          break;
        default:
          break;
      }
    });
}

// eslint-disable-next-line consistent-return
export function setUser(displayName, photoURL) { // PHOTOURL
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    user.displayName = displayName;
    user.photoURL = photoURL;
    const uid = user.uid;
    return uid;
  }
}

export function getUser() {
  const auth = getAuth();
  const user = auth.currentUser;
  return user;
}
// Funcion que guarda post en firebase
export function uploadPost(title, post) {
  const auth = getAuth();
  const user = auth.currentUser;
  addDoc(collection(db, 'posts'), {
    UserId: user.uid, postTitle: title, content: post, date: new Date(), likes: [],
  });
}
// Funcion que muestra los posts del usuario dueno del perfil
export async function findPostById() {
  const auth = getAuth();
  const user = auth.currentUser;
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where('UserId', '==', user.uid), orderBy('date', 'desc'));
  onSnapshot(q, (snapshot) => {
    const containerPosts = document.getElementById('postsContainer');
    containerPosts.innerHTML = '';
    snapshot.forEach((e) => {
      containerPosts.innerHTML += ShowPostsById(e, e.data());
      const button = document.querySelectorAll('.editButton');
      const text = document.querySelectorAll(`.${button.id}`);
      text.forEach((el) => {
        el.readonly = true;
      });
      editPosts();
      deletePosts();
    });
  });
}
// Funcion que busca todos los posts en la app
export async function findPosts() {
  const containerPosts = document.getElementById('postsContainer');
  const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
  onSnapshot(q, (querySnapshot) => {
    containerPosts.innerHTML = '';
    let createdPosts = '';
    querySnapshot.forEach((d) => {
      createdPosts += ShowPosts(d, d.data());
      containerPosts.innerHTML = createdPosts;
      // console.log(d.data());
    });
    AddLikes();
    // search(createdPosts);
  });
}
function filterPost(arrayPosts, condition) {
  console.log(JSON.parse(arrayPosts).filter((post) => (post.postTitle).includes(condition)));
  // return;
}
export function search(createdPost) {
  const searchPost = document.getElementById('searchPost');
  searchPost.addEventListener('keyup', () => {
    filterPost(createdPost, searchPost.value);
  });
}
// Funcion que elimina los posts de la base de datos de firebase
export function postDeleted(id) {
  deleteDoc(doc(db, 'posts', id));
}
// Funcion que actualiza la informacion de un post cuando se lo edita en la base de datos
export async function updatePost(id, title, post) {
  setDoc(doc(db, 'posts', id), { postTitle: title }, { merge: true });
  setDoc(doc(db, 'posts', id), { content: post }, { merge: true });
  setDoc(doc(db, 'posts', id), { date: new Date() }, { merge: true });
}
function postLike(id, newArray) {
  setDoc(doc(db, 'posts', id), { likes: newArray }, { merge: true });
}
async function getArrayLikes(e) {
  const docSnap = await getDoc(doc(db, 'posts', e));
  let array = docSnap.data().likes;
  return array;
}
export function AddLikes() {
  const auth = getAuth();
  const user = auth.currentUser;
  const likeButton = document.querySelectorAll('.likeButton');
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
  });
}
// Funcion que permite cerrar sesion de un usuario
export function SignOut() {
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('Sesion cerrada satisfactoriamente');
  }).catch((/* error */) => {
    // An error happened.
  });
}
