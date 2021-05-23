// import * as firebase from 'firebase'
// import * as firestore from 'firebase/firestore'


const firebase = require("firebase/app").default;


import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


// const firebase = require('firebase/app');
// require('firebase/firestore');

export class Firebase {
    constructor() {
        this._config = {
            apiKey: "AIzaSyDMpVZOO6fuD8sWf5-nCXOShVz60Ac8P1U",
            authDomain: "whatsapp-clone-6f540.firebaseapp.com",
            projectId: "whatsapp-clone-6f540",
            storageBucket: "whatsapp-clone-6f540.appspot.com",
            messagingSenderId: "64547458557",
            appId: "1:64547458557:web:a250e0c9a89863218cdd94"
        };
        this.init();
    }
    init() {
        // Your web app's Firebase configuration
        if (!window._initializedFirebase) {
            firebase.initializeApp(this._config);
            firebase.firestore().settings({});
            window._initializedFirebase = true;
        }
    }

    static db() {
        return firebase.firestore();
    }

    static hd() {
        return firebase.storage();
    }

    initAuth() {
        return new Promise((s, f) => {
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(result => {
                    let token = result.credential.accessToken;
                    let user = result.user;
                    s({
                        user,
                        token
                    });
                })
                .catch(err => {
                    f(err);
                });
        });
    }


}