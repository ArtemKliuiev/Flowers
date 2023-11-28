import firebase from '../firebase';
import { collection, query, orderBy, where, getDocs, or, and } from "firebase/firestore";

export default class loadFirebase{
    async load(info){
        const db = firebase.getFirestore();
        const colect = collection(db, "products");
        let sort = ''
        const filters = [
            or(
                where("bouquets", "in", info.bouquets),
                where("roses", "in", info.roses),
                where("in-box", "in", info.inBox),
                where("compositions", "in", info.compositions),
                where("gift", "in", info.gift),
                where("gift-basket", "in", info.giftBasket),
                where("for-bride", "in", info.forBride),
                where("delicious", "in", info.delicious),
            )
        ];

        if(info.whom.length != 0){
            filters.push(where("whom", "==", info.whom))
            console.log('whom')
        }
        if(info.color.length != 0){
            filters.push(where("color", "==", info.color))
            console.log('color')
        }
        if(info.occasion.length != 0){
            filters.push(where("occasion", "==", info.occasion))
            console.log('occasion')
        }

        if(info.sort === 'Цена(вверх)'){
            sort = 'price'
        }else if(info.sort === 'Цена(вниз)'){
            sort = 'price', 'desc'
        }else{
            sort = 'price'
        }

        console.log(info.sort)

        const q = query(
            colect,
            and(...filters),
            orderBy('price', 'desc')
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

          console.log(doc.id, " => ", doc.data());
        });
    }

}


