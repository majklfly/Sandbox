import firebase from "firebase";
import "@firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDXVdpQU6UEcHU0j8PqHc3vKuHzpAn8O8E",
  authDomain: "sandbox-d24ea.firebaseapp.com",
  databaseURL: "https://sandbox-d24ea.firebaseio.com",
  projectId: "sandbox-d24ea",
  storageBucket: "sandbox-d24ea.appspot.com",
  messagingSenderId: "198200529590",
  appId: "1:198200529590:web:024c7583f063b231e60c17",
  measurementId: "G-7EL90R4BRF",
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
