// const firebase = require('firebase/app');
import {firebase} from "firebase";
require('firebase/firestore');

export class Firebase {
    constructor() {
        this.init();
        this._config = {
            apiKey: "AIzaSyDMpVZOO6fuD8sWf5-nCXOShVz60Ac8P1U",
            authDomain: "whatsapp-clone-6f540.firebaseapp.com",
            projectId: "whatsapp-clone-6f540",
            storageBucket: "whatsapp-clone-6f540.appspot.com",
            messagingSenderId: "64547458557",
            appId: "1:64547458557:web:a250e0c9a89863218cdd94"
        };
    }
    init() {
        // Your web app's Firebase configuration
        if (!this._initialized) {
            firebase.initializeApp(this._config);
            firebase.firestore().settings({
                timestampsInSnapshots: true
            })
            this._initialized = true;
        }
    }

    static db() {
        return firebase.firestore();
    }

    static hd() {
        return firebase.storage();
    }
}