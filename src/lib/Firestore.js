import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,
  GoogleAuthProvider, signInWithPopup, sendEmailVerification, signOut,
} from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import {
  getFirestore, collection, addDoc, query, where, orderBy, deleteDoc, doc, setDoc, onSnapshot,
} from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';
import { app } from './FirebaseInit.js';
import { ShowPosts, ShowPostsById } from '../components/ShowPosts.js';
import { goToLogIn, showHome, editPosts, deletePosts } from '../main.js';

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
// Funcion que registra un nuevo usuario en Firebase
export function register(email, password) {
  const auth = getAuth();
  const errorMessageText = document.querySelector('#message');
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user);
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
    }).catch((error) => {
      const errorMessage = error.message;
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
export function setUser(displayName) { // PHOTOURL
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    user.displayName = displayName;
    const uid = user.uid;
    return uid;
  }
}
// Funcion que guarda post en firebase
export function uploadPost(title, post) {
  const auth = getAuth();
  const user = auth.currentUser;
  addDoc(collection(db, 'posts'), { UserId: user.uid, postTitle: title, content: post, date: new Date(), likes: 0 });
}
// Funcion que muestra los posts del usuario dueno del perfil
export async function findPostById() {
  const auth = getAuth();
  const user = auth.currentUser;
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where('UserId', '==', user.uid), orderBy('date', 'desc'));
  onSnapshot(q, (snapshot) => {
    snapshot.forEach((e) => {
      const containerPosts = document.getElementById('postsContainer');
      containerPosts.innerHTML += ShowPostsById(e, e.data());
      const button = document.querySelectorAll('.editButton');
      const text = document.querySelectorAll(`.${button.id}`);
      text.forEach((el) => {
        el.readonly = true;
      });
    });
    deletePosts();
    editPosts();
  });
}
// Funcion que busca todos los posts en la app
export async function findPosts() {
  const containerPosts = document.getElementById('postsContainer');
  containerPosts.innerHTML = '';
  const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
  onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((d) => {
      containerPosts.innerHTML += ShowPosts(d.data());
    });
  });
}
// Funcion que elimina los posts de la base de datos de firebase
export function postDeleted(id) {
  deleteDoc(doc(db, 'posts', id));
}
// Funcion que actualiza la informacion de un post cuando se lo edita en la base de datos
export async function updatePost(id, title, post) {
  setDoc(doc(db, 'posts', id), { postTitle: title, content: post, date: new Date() }, { merge: true });
}

function postLike(id) {
  const userRef = collection('posts').doc(id);
  const increment = firebase.firestore.FieldValue.increment(1);
  userRef.update('count', increment);
}

function postDislike(id) {
  const userRef = collection('posts').doc(id);
  const decrement = firebase.firestore.FieldValue.increment(-1);
  userRef.update('count', decrement);
}

function AddLikes() {
  let like = true;
  const likeButton = document.getElementById('likeButton');
  likeButton.addEventListener('click', () => {
    if (like) {
      like = false;
      postLike(likeButton.id);
      console.log('like +');
    } else {
      like = true;
      postDislike(likeButton.id);
      console.log('like -');
    }
  });
}
// Funcion que permite cerrar sesion de un usuario
export function SignOut() {
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('Sesion cerrada satisfactoriamente');
  }).catch((error) => {
    // An error happened.
  });
}
