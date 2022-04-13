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
  ref, uploadBytes, getDownloadURL, deleteUser,
} from './FirebaseImport.js';
import { app } from './FirebaseInit.js';
/* import { ShowPosts, ShowPostsById } from '../components/ShowPosts.js'; */
import {
  emailMessageVerificacionOK, cleanMessageError,
  verifyEmailMessage, removeMessageError, addMessage,
  resetPasswordMessageOK, removeMessage, addMessageError, messageErrorCases,
  getFileChoosenProfile, getReferenceImg, getFileChoosenPost, showUserPostsById,
  showPostsHome, putLikesPosts, goToHome, getFileChoosenPostEdit,
} from './index.js';

const db = getFirestore(app);

// Funcion que envia un mensaje de verificacion al usuario que se ha registrado
export function emailVerification() {
  const auth = getAuth();
  sendEmailVerification(auth.currentUser)
    .then(() => {
      emailMessageVerificacionOK();
    });
}
// Funcion que registra un nuevo usuario en Firebase
export function register(email, password, displayname) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password).then(() => {
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
      messageErrorCases(errorMessage);
    });
}
// Funcion que permite a un usuario loggearse con su email y password
export function logIn(email, password) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      cleanMessageError();
      switch (user.emailVerified) {
        case true:
          goToHome();
          break;
        case false:
          verifyEmailMessage();
          break;
        default:
          break;
      }
    })
    .catch((error) => {
      const errorMessage = error.message;
      messageErrorCases(errorMessage);
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
      goToHome();
    }).catch((/* error */) => {
      // const errorMessage = error.message;
    });
}
// Funcion que permite reestablecer contraseña enviando un correo al usuario
export function emailResetPassword(email) {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      removeMessageError();
      addMessage();
      resetPasswordMessageOK();
    })
    .catch((error) => {
      const errorMessage = error.message;
      removeMessage();
      addMessageError();
      messageErrorCases(errorMessage);
    });
}

// eslint-disable-next-line consistent-return
export function setUser(displayName, photoURL) {
  const auth = getAuth();
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
  const auth = getAuth();
  updateProfile(auth.currentUser, {
    photoURL: photoUserURL,
  }).then(() => {
    // Profile updated!
    console.log('se cargo la imagen');
  }).catch((/* error */) => {
    // An error occurred
    console.log('NO se cargo la imagen');
  });
}
export function setUserInfo(newname) {
  const auth = getAuth();
  updateProfile(auth.currentUser, {
    displayName: newname,
  }).then(() => {
    // Profile updated!
    console.log('cambio el nombre');
  }).catch((/* error */) => {
    // An error occurred
    console.log('NO cambio');
  });
}
export function deleteAccount() {
  const auth = getAuth();
  const user = auth.currentUser;

  deleteUser(user).then(() => {
    // User deleted.
    console.log('elininado');
  }).catch(() => {
    // An error ocurred
    // ...
  });
}
// funcion que crea el url de la foto de perfil del usuario y la inserta
export async function getURLProfilePhoto() {
  // Recuperar datos
  const filechoosen = getFileChoosenProfile();
  const storage = getStorage();
  // eslint-disable-next-line prefer-template
  const storageRef = ref(storage, filechoosen.name);
  await uploadBytes(storageRef, filechoosen).then(() => {
  });
  // eslint-disable-next-line prefer-template
  getDownloadURL(ref(storage, filechoosen.name))
    .then((url) => {
      getReferenceImg(url);
      setUserPhoto(url);
    })
    .catch((error) => {
      // Handle any errors
      console.log(error);
    });
}
// funcion que crea los url de las fotos insertadas en la posts
export async function getURLPostPhoto(title, post, level) {
  // Recuperar datos
  const filechoosen = getFileChoosenPost();
  const storage = getStorage();
  // eslint-disable-next-line prefer-template
  const storageRef = ref(storage, filechoosen.name);
  await uploadBytes(storageRef, filechoosen).then(() => {
  });
  getDownloadURL(ref(storage, filechoosen.name))
    .then((url) => {
      uploadPostImage(title, post, url, filechoosen.name, level);
    })
    .catch(() => {
    });
}
export async function updatePostPhoto(id, title, post) {
  // Recuperar datos
  const filechoosen = getFileChoosenPostEdit();
  const storage = getStorage();
  // eslint-disable-next-line prefer-template
  const storageRef = ref(storage, filechoosen.name);
  await uploadBytes(storageRef, filechoosen).then(() => {
  });
  getDownloadURL(ref(storage, filechoosen.name))
    .then((url) => {
      updatePostImage(id, title, post, url);
    })
    .catch(() => {
    });
}
export async function updatePostImage(id, title, post, url) {
  setDoc(doc(db, 'posts', id), { postTitle: title }, { merge: true });
  setDoc(doc(db, 'posts', id), { content: post }, { merge: true });
  setDoc(doc(db, 'posts', id), { image: url }, { merge: true });
}
export function getUser() {
  const auth = getAuth();
  const user = auth.currentUser;
  return user;
}
// Funcion que guarda post en firebase
export function uploadPostImage(title, post, url, storageName, level) {
  const auth = getAuth();
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
  });
  findPostById();
}
export function uploadPost(title, post, level) {
  const auth = getAuth();
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
  });
}
// Funcion que muestra los posts del usuario dueno del perfil
export async function findPostById() {
  const auth = getAuth();
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
  const auth = getAuth();
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
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('Sesion cerrada satisfactoriamente');
  }).catch((/* error */) => {
    // An error happened.
  });
}
