import firebase from '../firebase';
import { collection, query, orderBy, where, getCountFromServer, startAfter, startAt,endAt, getDocs, or, and, limit } from "firebase/firestore";
import Pagination from '../pagination';



export default class loadFirebase{
    constructor(){
        this.productCardWrapper = document.querySelector('.cards__items');
        this.pagination = new Pagination();
        document.addEventListener('paginationEvent', (e) => {
            this.pages(e.detail.page)
        });
    }
    async filters(info){
        const db = firebase.getFirestore();
        this.colect = collection(db, "products");
        this.sort = [];

        this.filter = [
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
            this.filter.push(where("whom", "==", info.whom))}
        if(info.color.length != 0){
            this.filter.push(where("color", "==", info.color))}
        if(info.occasion.length != 0){
            this.filter.push(where("occasion", "==", info.occasion))}


        if(info.sort === 'Цена(вверх)'){
            this.sort = ['price']
        }else if(info.sort === 'Цена(вниз)'){
            this.sort = ['price', 'desc'];
        }else if(info.sort === 'Популярность'){
            this.sort = ['popular'];
        }else{
            this.sort = ['price']
        }

        const mainQuery = query(
                this.colect,
                and(...this.filter),
                orderBy(...this.sort),
                limit(12),
        );
        this.loadGoods(mainQuery, true, true);

        this.infoQuery = query(
            this.colect,
            and(...this.filter),
            orderBy(...this.sort),
        );
    }

    async getInfo(startOne){
        const snapshotTwo = await getCountFromServer(this.infoQuery);
        this.quantityAll = snapshotTwo.data().count;

        const querySnapshot = await getDocs(this.infoQuery);
        this.lastVisible = querySnapshot.docs




        if(this.quantityPages < 1 || this.quantityLeft === 0){
            this.quantityPages = 1
        }
        //КОНСОЛЬ
        // console.clear();
        // console.table({
        //     "Количество страниц": this.quantityPages,
        //     "Всего карточек": this.quantityAll,
        //     "На странице": this.quantityNow,
        //     "Осталось": this.quantityLeft,
        // });
        this.quantityPages = Math.ceil(this.quantityAll / 12);
        this.pagination.quantityPages(this.quantityPages);
        if(startOne){
            this.pagination.currentPages(1);
        }

        this.currentPage = this.pagination.getPage()

        this.quantityLeft = this.quantityAll - ((this.currentPage * 12) - 12) - this.quantityNow;

        if(this.quantityLeft >= 3){
            this.quantityAddMore = 3;
        }else if(this.quantityLeft > 0){
            this.quantityAddMore = this.quantityLeft;
        }else if(this.quantityLeft <= 0){
            this.quantityAddMore = 0;
        }
        
        this.loadMoreBtn();
    }


            // [querySnapshot.docs.length-1]

    pages(page){
        this.start = this.lastVisible[(page * 12) - 12]
        this.loadPage = query(
            this.colect,
            and(...this.filter),
            orderBy(...this.sort),
            startAt(this.start),
            limit(12),
        );
        this.loadGoods(this.loadPage, true);
    }

    loadMore(){

        let limitCard = 3
        if(this.quantityLeft < 3){
            limitCard = this.quantityLeft
        } 
        
        this.loadMoreQuery = query(
            this.colect,
            and(...this.filter),
            orderBy(...this.sort),
            startAt(this.lastVisible[this.quantityNow + ((12 * this.currentPage) - 12)]),
            limit(limitCard),
        );
        this.loadGoods(this.loadMoreQuery, false);
    }

     loadMoreBtn(){

        document.querySelector('.cards__button-info').textContent = this.quantityAddMore;
        
        if(this.quantityAll > 12 && this.quantityLeft > 0){
            document.querySelector('.cards__btn').style.display = 'block'
        }else{
            document.querySelector('.cards__btn').style.display = 'none'
        }
    }

    async loadGoods(mainQuery, deletFil = true, startOne = false){
        if(deletFil){
            this.productCardWrapper.innerHTML = '';
        }
        try{
            const querySnapshot = await getDocs(mainQuery);
            querySnapshot.forEach((doc) => {
                this.createGoods(doc.data())
                // console.log(doc.id, " => ", doc.data(), this);
            });
        }catch(error){
            const errorText = 'Too many disjunctions after normalization';
            if(error.message.includes(errorText)){
                const countQuery = +error.message.replace(/\D/g, '').slice(0, -2);
                const overkill = countQuery - 30;
                alert(`Выбранно слишком много категорий, убрерите пожалуйста : ${overkill} категории`)
            }else{
                console.log(error)
            }
        }
        this.quantityNow = document.querySelectorAll('.product-card').length;

        this.getInfo(startOne);


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
    }
}
