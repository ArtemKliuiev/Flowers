import firebase from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

export default class Firebase{
    constructor(){

        this.load();

    }
    async load(){
        const db = firebase.getFirestore();
        const colect = collection(db, "products");

        const q = query(collection(db, "products"), where("sale", "==", 19));

        const querySnapshot = await getDocs(colect);
        querySnapshot.forEach((doc) => {

          console.log(doc.id, " => ", doc.data());
        });
    }

}


