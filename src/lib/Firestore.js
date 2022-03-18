/* eslint-disable default-case */
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

function emailVerification() {
  const auth = getAuth();
  const errorMessageText = document.querySelector('#message');
  sendEmailVerification(auth.currentUser)
    .then(() => {
      errorMessageText.classList.add('showMessage');
      errorMessageText.innerText = 'Email verification sent!';
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
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
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
