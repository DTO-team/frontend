import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCJLwXazUG8uPTqQ6tr1nqugiBFTUVAB2A',
  authDomain: 'dtocodes.firebaseapp.com',
  projectId: 'dtocodes',
  storageBucket: 'dtocodes.appspot.com',
  messagingSenderId: '352156804018',
  appId: '1:352156804018:web:b8fdc2d7b0d9833088faab',
  measurementId: 'G-0YJYE0VR7H'
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
