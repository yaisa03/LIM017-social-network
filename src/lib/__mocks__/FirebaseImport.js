/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */

export const initializeApp = jest.fn(() => { });
export const getFirestore = jest.fn(() => { });
export const getAuth = jest.fn(() => ({
  currentUser: {
    displayName: 'name',
    email: '',
    photoURL: null,
    uid: 'uid2234',
  },
}));
export const sendEmailVerification = jest.fn(() => Promise.resolve({}));
// signInWithEmailAndPassword = jest.fn(() => Promise.reject((throw new TypeError('NO')));
export const createUserWithEmailAndPassword = jest.fn(
  (auth, Email, password) => Promise.resolve({
    currentUser: {
      userPassword: password,
      email: Email,
    },
  }),
  // Promise.reject(new Error('ERROR')),
);
export const updateProfile = jest.fn(
  (currentUser, displayname) => new Promise((resolve, reject) => {
    let user = {
      currentUser: {
        displayName: displayname,
      },
    };
    if (displayname !== null) {
      resolve(user);
    } else {
      reject({ error: 'usuario no fue actualizado' });
    }
  }),
);
/* Promise.resolve({
  currentUser: {
    displayName: displayname,
  },
}), */
// eslint-disable-next-line import/no-mutable-exports
export let signInWithEmailAndPassword = jest.fn(
  (auth, email, password) => new Promise((resolve, reject) => {
    if (password !== '') {
      resolve({});
    } else {
      reject({ error: 'no se inicio sesion' });
    }
  }),
);
export const GoogleAuthProvider = jest.fn(() => { });
export const signInWithPopup = jest.fn((auth, provider) => Promise.resolve({}));
export const sendPasswordResetEmail = jest.fn((auth, email) => new Promise((resolve, reject) => {
  if (email !== '') {
    resolve({});
  } else {
    reject({ error: 'no se envio el correo' });
  }
}));

export const signOut = jest.fn((auth) => new Promise((resolve, reject) => {
  if (auth !== null) {
    resolve({});
  } else {
    reject({ error: 'no se cerro sesion' });
  }
}));
// export const onAuthStateChanged = jest.fn(() => Promise.resolve({}));

export const deleteUser = jest.fn(() => Promise.resolve({}));

export const deleteDoc = jest.fn(() => { });

export const db = jest.fn();

export const collection = jest.fn((_db_, _collection_) => _collection_);

export const addDoc = jest.fn((Collection, data) => Promise.resolve({ [Collection]: data }));

export const doc = jest.fn((_db_, nameCol, idDoc) => Object({
  [nameCol]: idDoc,
}));

export const getDoc = jest.fn(() => ({
  data: () => ({ likes: ['1', '2', '3'] }),
}));
export const getDocs = jest.fn(() => Promise.resolve({
  post: {
    id: '25448661',
  },
  forEach: () => ([{ post: { id: '25448661' } }]),
}));
export const uploadBytes = jest.fn(() => Promise.resolve({}));

export const getDownloadURL = jest.fn(() => Promise.resolve({}));

export const getStorage = jest.fn(() => { });

export const ref = jest.fn(() => { });

export const query = jest.fn(() => { });

export const where = jest.fn(() => { });

export const orderBy = jest.fn(() => { });

export const onSnapshot = jest.fn(() => Promise.resolve({}));

export const setDoc = jest.fn(() => Promise.resolve({}));
