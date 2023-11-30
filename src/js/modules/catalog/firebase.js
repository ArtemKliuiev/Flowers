import firebase from '../firebase';
import { collection, query, orderBy, where, startAfter, getDocs, or, and, limit } from "firebase/firestore";

export default class loadFirebase{
    constructor(){
        this.productCardWrapper = document.querySelector('.cards__items');
    }
    async load(info, quantity = 12, deletFilter = true){
        if(deletFilter){
            this.productCardWrapper.innerHTML = '';
        }
        const db = firebase.getFirestore();
        const colect = collection(db, "products");

        let sort = [];

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
        }
        if(info.color.length != 0){
            filters.push(where("color", "==", info.color))
        }
        if(info.occasion.length != 0){
            filters.push(where("occasion", "==", info.occasion))
        }

        if(info.sort === 'Цена(вверх)'){
            sort = ['price']
        }else if(info.sort === 'Цена(вниз)'){
            sort = ['price', 'desc'];
        }else if(info.sort === 'Популярность'){
            sort = ['popular'];
        }else{
            sort = ['price']
        }



        const startQuery = query(
                colect,
                and(...filters),
                orderBy(...sort),
                limit(quantity),
        );

        const addQuery = query(
                colect,
                and(...filters),
                orderBy(...sort),
                limit(3),
                startAfter(quantity),
        );

        try{
            if(deletFilter){
                const querySnapshot = await getDocs(startQuery);
                querySnapshot.forEach((doc) => {
                    this.createGoods(doc.data())
                    console.log(doc.id, " => ", doc.data(), this);
                });
            }else{
                const querySnapshot = await getDocs(addQuery);
                querySnapshot.forEach((doc) => {
                    this.createGoods(doc.data())
                    console.log(doc.id, " => ", doc.data(), this);
                });
            }
        }catch(error){
            const countQuery = +error.message.replace(/\D/g, '').slice(0, -2);
            const overkill = countQuery - 30;
            alert(`Выбранно слишком много категорий, убрерите пожалуйста : ${overkill} категории`)
        }
    }
    createGoods(product){
    const { name, stars, price, sale, img, oldPrice, id } = product;

    let star = '';
    for (let i = 0; i < stars; i++) {
      star += `<path d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z" fill="#F8E582"/>`;
    }

    let template = `
        <div data-id='${id}' class="product-card">
        <div class="product-card__top">
            <div class="product-card__img">
                <img src="${img.default}" alt="flowers">
            </div>
            <div class="product-card__top-sales">
            <svg ><use xlink:href="./images/Sprite.svg#product-card-round-sales"></use></svg>
                <p class="product-card__top-sale">-${sale}%</p>
            </div>
            <div class="product-card__top-like">
                <svg ><use xlink:href="./images/Sprite.svg#product-card-like"></use></svg>
                    <div class="product-card__top-like_active">
                    <svg ><use xlink:href="./images/Sprite.svg#product-card-like_active"></use></svg>
            </div>
            </div>
            <div class="product-card__top-sign">
                TOP
            </div>
        </div>
        <div class="product-card__bottom">
            <div class="product-card__bottom-stars">
            `;
        for (let i = 0; i < stars; i++) {
        template += `
                <img src="./images/main/stock/Star.svg" alt="star">`;
        }
        template += `
                </div>
                    <div class="product-card__bottom-name-price">
                        <div class="product-card__bottom-name">
                            ${name}
                        </div>
                        <div class="product-card__bottom-prices">
                            <div class="product-card__bottom-old-price">${oldPrice} грн</div>
                            <div class="product-card__bottom-price">${price} грн</div>
                        </div>
                    </div>
                    <div class="product-card__bottom-buttons">
                        <a href="#" class="product-card__bottom-button-desktop">
                            
                                Заказать
                                <img src="./images/main/stock/button-branch.png" alt="button-branch">
                            
                            </a>    
                        <a href="#">
                            <div class="product-card__bottom-button-mobile">
                                <img src="./images/main/stock/button-mobile.png" alt="button-branch"> 
                            </div>
                        </a>
                        <a href="#">
                            <div class="product-card__bottom-order">Быстрый заказ</div>
                        </a>
                    </div>
                </div>
            </div>`;

        this.productCardWrapper.insertAdjacentHTML('beforeend', template);

        console.log(this.productCardWrapper)
    }
}




