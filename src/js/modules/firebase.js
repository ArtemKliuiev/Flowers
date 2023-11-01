
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDH9L4r0Zr6BUptfcdBcr0OgY_OHs9sX1o",
  authDomain: "flowers-1a297.firebaseapp.com",
  projectId: "flowers-1a297",
  storageBucket: "flowers-1a297.appspot.com",
  messagingSenderId: "705338550855",
  appId: "1:705338550855:web:4a2f095824a761bbfc1f62"
};

class Firebase {
    constructor() {
      if (!Firebase.instance) {
        this.app = initializeApp(firebaseConfig);
        Firebase.instance = this;
      }
  
      return Firebase.instance;
    }
  
    getAuth() {
      return getAuth(this.app);
    }
  
    getFirestore() {
      return getFirestore(this.app);
    }
  
    getDatabase() {
      return getDatabase(this.app);
    }
  }
  
  const firebase = new Firebase();
  
  export default firebase;