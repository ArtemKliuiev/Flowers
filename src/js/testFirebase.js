import firebase from './modules/firebase';
import { collection, getDocs } from "firebase/firestore";

export default class TestFirebase {
    constructor(){
        this.db = firebase.getFirestore()
        this.loadCards();
    }
    async loadCards(){
        const querySnapshot = await getDocs(collection(this.db, "Cards-test"));
        querySnapshot.forEach((doc) => {

          console.log(doc.id, " => ", doc.data());
        });
    }
}

