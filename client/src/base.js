import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB4HRofXEd096H1WNsncgeZGxXfnrYyCK8",
    authDomain: "maxval-319f0.firebaseapp.com",
    databaseURL: "https://maxval-319f0.firebaseio.com",
    projectId: "maxval-319f0",
    storageBucket: "maxval-319f0.appspot.com",
    messagingSenderId: "303231343749"
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { app, base, facebookProvider, googleProvider }