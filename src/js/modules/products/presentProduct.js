import firebase from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
const presentCardWrapper = document.querySelectorAll('.present__wrapper');

export default class productsPresent {
  constructor() {
    this.db = firebase.getFirestore();
  }
  async loadCards() {
    const allCards = query(
      collection(this.db, 'products'),
      where('price', '!=', null)
    );
    const filterSale = query(
      collection(this.db, 'products'),
      where('sale', '!=', null)
    );
    const filterSeason = query(
      collection(this.db, 'products'),
      where('sale', '==', null),
      where('present', '==', null)
    );
    const filterPresent = query(
      collection(this.db, 'products'),
      where('present', '==', '')
    );

    const querySnapshot = await getDocs(filterPresent);
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const { name, stars, price, sale, img, oldPrice } = product;

      let star = '';
      for (let i = 0; i < stars; i++) {
        star += `<path d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z" fill="#F8E582"/>`;
      }

      let template = `
      <div class="product-card">
      <div class="product-card__top">
          <div class="product-card__img">
              <img src="${img.default}" alt="flowers">
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
        presentCardWrapper.forEach((slide) => {
        slide.insertAdjacentHTML('beforeend', template);
      });
    });
  }
}
