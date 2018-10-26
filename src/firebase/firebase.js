import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
    apiKey: "AIzaSyBjdizHEIZ5uUHYuyObxTLijG6P_CZISnU",
    authDomain: "virtualhouse-cd00e.firebaseapp.com",
    databaseURL: "https://virtualhouse-cd00e.firebaseio.com",
    projectId: "virtualhouse-cd00e",
    storageBucket: "virtualhouse-cd00e.appspot.com",
    messagingSenderId: "139357386047"
};
  
const devConfig = {
    apiKey: "AIzaSyDaF3J_nXOh0iVP8oKZ-P6X3pT9Hwj9DtM",
    authDomain: "virtualhouses-dev.firebaseapp.com",
    databaseURL: "https://virtualhouses-dev.firebaseio.com",
    projectId: "virtualhouses-dev",
    storageBucket: "virtualhouses-dev.appspot.com",
    messagingSenderId: "786326035157"
};
  
const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;

if (!firebase.apps.length) {
    firebase.initializeApp(config);
};

const db = firebase.database();
const auth = firebase.auth();

export {
    db,
    auth,
};
