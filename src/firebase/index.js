import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: "AIzaSyAC1Mv4TjLaAD3deUKWQ0F7ZweMb-Yc0cw",
  authDomain: "firetest-3fe8e.firebaseapp.com",
  databaseURL: "https://firetest-3fe8e.firebaseio.com",
  projectId: "firetest-3fe8e",
  storageBucket: "firetest-3fe8e.appspot.com",
  messagingSenderId: "688122141874",
  appId: "1:688122141874:web:4a1facd6696d87da45fdab",
  measurementId: "G-CC69QBSDBD"
});

let db = firebase.firestore();

let storage = firebase.storage();

let auth = firebase.auth();
let provider = new firebase.auth.GoogleAuthProvider();

export default {
	firebase, db, storage, auth, provider
}