// eslint-disable-next-line import/no-unresolved
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { firebaseConfig } from './FirebaseInit.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function register(email, password) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
  // Signed in
    const user = userCredential.user;
    // user.sendEmailVerification();
    console.log('Usuario registrado!');
    console.log(user);
  })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

function logIn(email, password) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      console.log('Se inicio sesion correctamente');
      console.log(user);
    // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

export { app, register, logIn };
