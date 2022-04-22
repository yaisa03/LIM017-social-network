/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */

export const initializeApp = jest.fn(() => {});
export const getFirestore = jest.fn(() => {});
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
  (currentUser, displayname) => Promise.resolve({
    currentUser: {
      displayName: displayname,
    },
  }),
);
// eslint-disable-next-line import/no-mutable-exports
export let signInWithEmailAndPassword = jest.fn((auth, email, password) => Promise.resolve({}));
export const GoogleAuthProvider = jest.fn(() => {});
export const signInWithPopup = jest.fn((auth, provider) => Promise.resolve({}));
export const sendPasswordResetEmail = jest.fn((auth, email) => Promise.resolve({}));

export const signOut = jest.fn(() => Promise.resolve({}));
// export const onAuthStateChanged = jest.fn(() => Promise.resolve({}));

export const deleteUser = jest.fn(() => Promise.reject('something bad happened'));

export const deleteDoc = jest.fn(() => {});

export const db = jest.fn();

export const collection = jest.fn((_db_, _collection_) => _collection_);

export const addDoc = jest.fn((Collection, data) => Promise.resolve({ [Collection]: data }));

export const doc = jest.fn((_db_, nameCol, idDoc) => Object({ [nameCol]: idDoc }));
export const getDoc = jest.fn(() => ({}));
export const getDocs = jest.fn(() => Promise.resolve({
  post: {
    id: '25448661',
  },
}));
export const uploadBytes = jest.fn(() => Promise.resolve({}));

export const getDownloadURL = jest.fn(() => Promise.resolve({}));

export const getStorage = jest.fn(() => {});

export const ref = jest.fn(() => {});

export const query = jest.fn(() => {});

export const where = jest.fn(() => {});

export const orderBy = jest.fn(() => {});

export const onSnapshot = jest.fn(() => {});

export const setDoc = jest.fn(() => {});
