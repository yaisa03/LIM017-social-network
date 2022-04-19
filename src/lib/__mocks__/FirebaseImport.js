/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */

export const initializeApp = () => {};
// eslint-disable-next-line import/no-mutable-exports
export let signInWithEmailAndPassword = jest.fn(() => Promise.resolve({}));
// signInWithEmailAndPassword = jest.fn(() => Promise.reject((throw new TypeError('NO')));
export const createUserWithEmailAndPassword = jest.fn(
  (email, password, user) => Promise.resolve({
    userData: {
      userEmail: email,
      userPassword: password,
      username: user,
    },
  }),
  // Promise.reject(new Error('ERROR')),
);

export const GoogleAuthProvider = jest.fn();
export const getAuth = jest.fn(() => ({
  currentUser: {
    displayName: 'name',
    email: 'bob@example.com',
    photoURL: null,
    uid: 'uid2234',
  },
}));

export const updateProfile = jest.fn((auth, { photoURL: URL }) => Promise.resolve({}));

export const signOut = jest.fn(() => Promise.resolve({}));
// export const onAuthStateChanged = jest.fn(() => Promise.resolve({}));
export const sendPasswordResetEmail = jest.fn(() => Promise.resolve({}));

export const sendEmailVerification = jest.fn(() => Promise.resolve({}));

export const deleteUser = jest.fn(() => Promise.reject('something bad happened'));

export const deleteDoc = jest.fn();

export const signInWithPopup = jest.fn((_auth_, provider) => Promise.resolve({ provider }));

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

export const getFirestore = () => {};

export const getStorage = () => {};

export const ref = () => {};

export const query = () => {};

export const where = () => {};

export const orderBy = () => {};

export const onSnapshot = () => {};
