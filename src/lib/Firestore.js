/* eslint-disable default-case */
/* eslint-disable import/no-duplicates */
// eslint-disable-next-line import/no-unresolved
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
// eslint-disable-next-line import/no-unresolved
import { GoogleAuthProvider, signInWithPopup, sendEmailVerification, signOut } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
// eslint-disable-next-line import/no-unresolved
import { getFirestore, collection, addDoc, query, where, getDocs, orderBy, deleteDoc, doc, setDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';
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
      // Signed in
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
    });
}

export function logInGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      showHome();
    }).catch((error) => {
      const errorMessage = error.message;
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
    const uid = user.uid;
    return uid;
  }
}

export function uploadPost(title, post) {
  const auth = getAuth();
  const user = auth.currentUser;
  addDoc(collection(db, 'posts'), { UserId: user.uid, postTitle: title, content: post, date: new Date(), likes: 0 });
}

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
        console.log(el);
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
export async function deletePost(id) {
  const q = await doc(db, 'posts', id);
  deleteDoc(q);
}

function deletePosts() {
  const deleteButton = document.querySelectorAll('.deleteButton');
  deleteButton.forEach((button) => {
    button.addEventListener('click', () => {
      if (window.confirm('¿Estas seguro de eliminar este post?')) {
        deleteDoc(doc(db, 'posts', button.id));
        return findPostById();
      }
    });
  });
}

function editPosts() {
  const editButton = document.querySelectorAll('.editButton');
  editButton.forEach((button) => {
    button.addEventListener('click', () => {
      const text = document.querySelectorAll(`.text${button.id}`);
      text.forEach((e) => {
        e.removeAttribute('readonly');
        e.style.backgroundColor = 'white';
        document.querySelector(`.editButton.${button.id}`).classList.add('hide');
        document.querySelector(`.publishButton.${button.id}`).classList.remove('hide');
      });
    });
  });
  const publishButton = document.querySelectorAll('.publishButton');
  publishButton.forEach((button) => {
    button.addEventListener('click', () => {
      if (window.confirm('¿Estas seguro de guardar tus cambios?')) {
        const text = document.querySelectorAll(`.text${button.id}`);
        text.forEach((e) => {
          e.setAttribute('readonly', true);
          e.style.backgroundColor = '#FFF1CE';
          const title = document.querySelector(`.title.text${button.id}`);
          const post = document.querySelector(`.description.text${button.id}`);
          // document.getElementById('postsContainer').innerHTML = '';
          updatePost(button.id, title.value, post.value);
          document.querySelector(`.editButton.${button.id}`).classList.remove('hide');
          document.querySelector(`.publishButton.${button.id}`).classList.add('hide');
        });
      }
    });
  });
}

async function updatePost(id, title, post) {
  setDoc(doc(db, 'posts', id), { postTitle: title, content: post, date: new Date() } , { merge: true });
 // return findPostById();
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

export function SignOut() {
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('sesion cerrada satisfactoriamente');
  }).catch((error) => {
    // An error happened.
  });
}
