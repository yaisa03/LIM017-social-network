/* eslint-disable default-case */
/* eslint-disable import/no-duplicates */
// eslint-disable-next-line import/no-unresolved
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
// eslint-disable-next-line import/no-unresolved
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
// eslint-disable-next-line import/no-unresolved
import { getFirestore, collection, addDoc , query, where, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';
// eslint-disable-next-line import/no-unresolved
import { ShowPosts, ShowPostsById } from '../components/ShowPosts.js';
// eslint-disable-next-line import/no-cycle
import { goToLogIn, showHome } from '../main.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBnTpBzOUriU6ztyOeGumDQE8HHpkjqreU',
  authDomain: 'foodbook-66988.firebaseapp.com',
  databaseURL: 'https://foodbook-66988-default-rtdb.firebaseio.com',
  projectId: 'foodbook-66988',
  storageBucket: 'foodbook-66988.appspot.com',
  messagingSenderId: '558953316138',
  appId: '1:558953316138:web:d5c91f573abe129835e853',
  measurementId: 'G-YN3T2EDM93',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function emailVerification() {
  const auth = getAuth();
  const errorMessageText = document.querySelector('#message');
  sendEmailVerification(auth.currentUser)
    .then(() => {
      errorMessageText.classList.add('showMessage');
      errorMessageText.innerText = 'Email verification sent!';
      setTimeout(goToLogIn, 2000);
    });
}

export function register(email, password) {
  const auth = getAuth();
  const errorMessageText = document.querySelector('#message');
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // user.sendEmailVerification();
    console.log('Usuario registrado!:');
    console.log(user);
    emailVerification();
  })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
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

export function logIn(email, password) {
  const auth = getAuth();
  const errorMessageText = document.querySelector('#message');
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in\
      const user = userCredential.user;
      errorMessageText.classList.remove('showMessageError');
      errorMessageText.innerText = ' ';
      switch (user.emailVerified) {
        case true:
          console.log('Se inicio sesion correctamente');
          console.log(user);
          console.log(user.uid);
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
      // console.log(errorMessage);
    });
}

export function logInGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // eslint-disable-next-line no-unused-vars
      const token = credential.accessToken;
      // The signed-in user info.
      // eslint-disable-next-line no-unused-vars
      const user = result.user;
    }).catch((error) => {
      // Handle Errors here.
      const errorMessage = error.message;
      // ...
      console.log(errorMessage);
    });
}

export function emailResetPassword(email) {
  const auth = getAuth();
  const errorMessageText = document.querySelector('#message');
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('Password reset email sent!');
      errorMessageText.classList.remove('showMessageError');
      errorMessageText.classList.add('showMessage');
      errorMessageText.innerText = 'Password reset email sent';
      setTimeout(goToLogIn, 2000);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
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
export function setUser(displayName) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    user.displayName = displayName;
    // const email = user.email;
    // const photoURL = user.photoURL;
    // const emailVerified = user.emailVerified;
    const uid = user.uid;
    return uid;
  }
}
export function uploadPost(title, post) {
  const auth = getAuth();
  const user = auth.currentUser;
  /* const postsRef = collection(db, 'users');
  const q = query(postsRef, where('Id', '==', user.uid));
  setDoc(q, { postTitle: title, contain: post }, { merge: true }); */
  addDoc(collection(db, 'posts'), { UserId: user.uid, postTitle: title, content: post });
}
export async function findPostById() {
  const auth = getAuth();
  const user = auth.currentUser;
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where('UserId', '==', user.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const containerPosts = document.getElementById('postsContainer');
    containerPosts.innerHTML += ShowPostsById(doc.data());
  });
}
export async function findPosts() {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where('postTitle', '!=', ''));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const containerPosts = document.getElementById('postsContainer');
    containerPosts.innerHTML += ShowPosts(doc.data());
  });
}
