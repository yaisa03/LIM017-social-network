/* eslint-disable import/no-duplicates */
// eslint-disable-next-line import/no-unresolved
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
// eslint-disable-next-line import/no-unresolved
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { firebaseConfig } from './FirebaseInit.js';

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export function register(email, password) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // user.sendEmailVerification();
    console.log('Usuario registrado!');
    emailVerification();
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

export function logIn(email, password) {
  const auth = getAuth();
  const errorMessageText = document.querySelector('#message');
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      errorMessageText.classList.remove('showMessageError');
      errorMessageText.innerText = ' ';
      console.log('Se inicio sesion correctamente');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
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
        default:
          break;
      }
      console.log(errorMessage);
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
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

function emailVerification() {
  const auth = getAuth();
  sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log('Email verification sent!');
      // ...
    });
}

export function emailResetPassword(email) {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('Password reset email sent!');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
