// firebase.js
import firebase from 'firebase';

// Initialize Firebase
// USE YOUR CONFIG OBJECT
const firebaseConfig = {
  apiKey: "AIzaSyDSvdtYdDkj2dNWI_MBOvt9Cf47A9Gaqbg",
  authDomain: "brite-lites-8132a.firebaseapp.com",
  databaseURL: "https://brite-lites-8132a.firebaseio.com",
  projectId: "brite-lites-8132a",
  storageBucket: "",
  messagingSenderId: "20022463339",
  appId: "1:20022463339:web:e9f2a89bd90b071e"
};

firebase.initializeApp(firebaseConfig);

// this exports the CONFIGURED version of firebase
export default firebase;