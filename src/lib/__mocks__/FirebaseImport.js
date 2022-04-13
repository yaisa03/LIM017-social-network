/* export const initializeApp = () => {};

export const getAuth = () => ({
  currentUser: {
    displayName: 'name',
    email: 'bob@example.com',
    photoURL: 'http://example.com',
  },
});

export const getFirestore = () => { };

export const collection = () => { };

export const getDocs = () => Promise.resolve({});

export const sendEmailVerification = () => Promise.resolve({});

export const createUserWithEmailAndPassword = () => Promise.resolve({});

export const signInWithEmailAndPassword = () => Promise.resolve({});

export const GoogleAuthProvider = () => { };

export const signInWithPopup = () => Promise.resolve({});

export const sendPasswordResetEmail = () => Promise.resolve({});

export const updateProfile = () => Promise.resolve({});

export const getStorage = () => { };

export const ref = () => { };

export const uploadBytes = () => Promise.resolve({});

export const getDownloadURL = () => Promise.resolve({});

export const addDoc = () => { };

export const query = () => { };

export const where = () => { };

export const orderBy = () => { };

export const onSnapshot = () => { };

export const deleteDoc = () => { };

export const doc = () => {
  // eslint-disable-next-line no-unused-vars
  const data = () => { };
};

export const setDoc = () => { };

export const signOut = () => Promise.resolve({}); */
export const initializeApp = () => {};
export const signInWithEmailAndPassword = jest.fn(() => Promise.resolve({}));
export const createUserWithEmailAndPassword = jest.fn((email, password, user) => Promise.resolve({
  userData: {
    userEmail: email,
    userPassword: password,
    username: user,
  },
}));

export const signOut = jest.fn(() => Promise.resolve({}));
// export const onAuthStateChanged = jest.fn(() => Promise.resolve({}));
export const sendPasswordResetEmail = jest.fn(() => Promise.resolve({}));

export const sendEmailVerification = jest.fn(() => Promise.resolve({}));

export const getAuth = jest.fn(() => Promise.resolve({}));

export const signInWithPopup = jest.fn((_auth_, provider) => Promise.resolve({ provider }));

export const db = jest.fn();

export const collection = jest.fn((_db_, _collection_) => _collection_);

export const addDoc = jest.fn((Collection, data) => Promise.resolve({ [Collection]: data }));

export const doc = jest.fn((_db_, nameCol, idDoc) => Object({ [nameCol]: idDoc }));
// export const serverTimestamp = jest.fn();
export const getDoc = jest.fn(() => Promise.resolve({}));

export const getFirestore = () => {};

export const getStorage = () => {};

export const ref = () => {};

export const query = () => {};

export const where = () => {};

export const orderBy = () => {};

export const onSnapshot = () => {};
