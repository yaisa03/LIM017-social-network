/* eslint-disable import/no-unresolved */
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,
  GoogleAuthProvider, signInWithPopup, sendEmailVerification, signOut, updateProfile,
} from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import {
  getFirestore, collection, addDoc, query, where, orderBy,
  deleteDoc, doc, setDoc, onSnapshot, getDoc,
} from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';

export {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,
  GoogleAuthProvider, signInWithPopup, sendEmailVerification, signOut, updateProfile,
  getFirestore, collection, addDoc, query, where, orderBy,
  deleteDoc, doc, setDoc, onSnapshot, getDoc,
};
