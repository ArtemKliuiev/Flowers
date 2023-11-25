import firebase from '../firebase';
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";

export default class Firebase{
    constructor(){

        this.load();

    }
    async load(){
        const db = firebase.getFirestore();
        const colect = collection(db, "products");

 
        const categoriesToSearch = ['Бабушке', 'Коллеге'];

        const q = query(
            collection(db, "products"),
            where("whom", "in", categoriesToSearch),
            // orderBy('price')
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

          console.log(doc.id, " => ", doc.data());
        });
    }

}

// const db = firebase.getFirestore();
// const q = query(collection(db, "products"), where('sale', '==', 19));

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   console.log(doc.id, " => ", doc.data());
// });
