import firebase from './modules/firebase';
import { collection, getDocs } from "firebase/firestore";

export default class TestFirebase {
    constructor(){
        this.db = firebase.getFirestore()
        this.loadCards();
    }
    async loadCards(){
        const querySnapshot = await getDocs(collection(this.db, "products"));
        querySnapshot.forEach((doc) => {
          //Тут мы поочереди получаем каждый елемент колекции
          console.log(doc.id, " => ", doc.data());
        });
    }
}

