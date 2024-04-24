import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const APIKEY = process.env.REACT_APP_APIKEY

const firebaseConfig = {
    apiKey: "AIzaSyCm_ZcOTdvOXUrWVWEWOeJTtAObo6xOYnU",
    authDomain: "work-board-b48a9.firebaseapp.com",
    projectId: "work-board-b48a9",
    storageBucket: "work-board-b48a9.appspot.com",
    messagingSenderId: "520530913968",
    appId: "1:520530913968:web:779ab69c659d6e7c1c6975"
  };
  

// Initialize Firebase
firebase.initializeApp(firebaseConfig)


const db = firebase.firestore()

// firebase.firestore().enablePersistence()

export {firebase, db}