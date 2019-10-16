import firebase from "firebase";
// Required for side-effects

firebase.initializeApp({
  apiKey: "AIzaSyAr4msYX0eSfrc2Bgm-dWLAiL87YQ2mk30",
  authDomain: "tracker-5756d.firebaseapp.com",
  databaseURL: "https://tracker-5756d.firebaseio.com",
  projectId: "tracker-5756d",
  storageBucket: "tracker-5756d.appspot.com",
  messagingSenderId: "263471316363"
});

export default firebase;
export const auth = firebase.auth;
export const storage = firebase.storage;
export const database = firebase.database;
export const firestore = firebase.firestore;
