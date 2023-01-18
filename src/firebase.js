import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: 'AIzaSyD5hHxiHr5gzsGz1I_eLBUL-K5qjSaBdzo',
    authDomain: "realtor-clone-822ee.firebaseapp.com",
    projectId: "realtor-clone-822ee",
    storageBucket: "realtor-clone-822ee.appspot.com",
    messagingSenderId: "935166766797",
    appId: "1:935166766797:web:6d7fa61979fc58bf3ac384"
};

initializeApp(firebaseConfig);
export const db = getFirestore();