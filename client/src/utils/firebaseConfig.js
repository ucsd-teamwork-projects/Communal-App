import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "communal-259804.firebaseapp.com",
    databaseURL: "https://communal-259804.firebaseio.com",
    projectId: "communal-259804",
    storageBucket: "communal-259804.appspot.com",
    messagingSenderId: "820576001683",
    appId: "1:820576001683:web:68c33022c4cad056387766",
    measurementId: "G-L848G8FYVT"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    firebase,
    storage as
    default
};