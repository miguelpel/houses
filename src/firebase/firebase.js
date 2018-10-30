import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
  
const devConfig = {
    apiKey: "AIzaSyDaF3J_nXOh0iVP8oKZ-P6X3pT9Hwj9DtM",
    authDomain: "virtualhouses-dev.firebaseapp.com",
    databaseURL: "https://virtualhouses-dev.firebaseio.com",
    projectId: "virtualhouses-dev",
    storageBucket: "virtualhouses-dev.appspot.com",
    messagingSenderId: "786326035157"
};

if (!firebase.apps.length) {
    firebase.initializeApp(devConfig);
};

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

export {
    db,
    auth,
    storage
};
