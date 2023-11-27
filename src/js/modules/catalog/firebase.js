import firebase from '../firebase';
import { collection, query, orderBy, where, getDocs, or, and } from "firebase/firestore";

export default class loadFirebase{
    async load(info){
        const db = firebase.getFirestore();
        const colect = collection(db, "products");
        const q = query(
            colect,
            and(
                or(
                    where("whom", "in", info.whom),
                    where("color", "in", info.color),
                    where("occasion", "in", info.occasion),
                    where("bouquets", "in", info.bouquets),
                    where("roses", "in", info.roses),
                    where("in-box", "in", info.inBox),
                    where("compositions", "in", info.compositions),
                    where("gift", "in", info.gift),
                    where("gift-basket", "in", info.giftBasket),
                    where("for-bride", "in", info.forBride),
                    where("delicious", "in", info.delicious),
                )
            ),
            orderBy('price')
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

          console.log(doc.id, " => ", doc.data());
        });
    }

}


