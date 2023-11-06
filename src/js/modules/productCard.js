
import firebase from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
const productCardWrapper = document.querySelectorAll('.product-card__wrapper');
const seasonCardWrapper = document.querySelectorAll('.season__wrapper');

export default class productsStock {
  constructor() {
    this.db = firebase.getFirestore();
    this.loadCards();
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

    const querySnapshot = await getDocs(filterSale);
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const { name, stars, price, sale, img, oldPrice } = product;
      console.log(img.default);
      console.log(name);
      console.log(stars);
      console.log(oldPrice);

      let template = `
      <div class="product-card">
      <div class="product-card__top">
          <div class="product-card__img">
              <img src="${img.default}" alt="flowers">
          </div>
          <div class="product-card__top-sales">
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <circle cx="28" cy="28" r="27.5" stroke="#E72222" stroke-dasharray="5 5"/>
                  </svg>
              <p class="product-card__top-sale">-${sale}%</p>
          </div>
          <div class="product-card__top-like">
              <svg xmlns="http://www.w3.org/2000/svg" width="33" height="30" viewBox="0 0 33 30" fill="none">
                  <path d="M16.5 29.0654C16.0302 29.0654 15.5772 28.9 15.2243 28.5994C13.8911 27.4661 12.6059 26.4011 11.4719 25.4617L11.4661 25.4568C8.14147 22.7024 5.27054 20.3237 3.273 17.9805C1.04006 15.361 0 12.8773 0 10.1641C0 7.52789 0.929785 5.09586 2.6179 3.31565C4.32616 1.51439 6.67013 0.522339 9.21879 0.522339C11.1237 0.522339 12.8682 1.10783 14.4037 2.26241C15.1787 2.8452 15.8811 3.55846 16.5 4.39044C17.1191 3.55846 17.8213 2.8452 18.5965 2.26241C20.132 1.10783 21.8765 0.522339 23.7814 0.522339C26.3298 0.522339 28.674 1.51439 30.3823 3.31565C32.0704 5.09586 32.9999 7.52789 32.9999 10.1641C32.9999 12.8773 31.9601 15.361 29.7272 17.9803C27.7296 20.3237 24.859 22.7022 21.5349 25.4563C20.3989 26.3972 19.1116 27.4639 17.7754 28.5999C17.4227 28.9 16.9695 29.0654 16.5 29.0654ZM9.21879 2.40168C7.21647 2.40168 5.37704 3.17858 4.03889 4.58943C2.68084 6.02158 1.93283 8.00128 1.93283 10.1641C1.93283 12.4461 2.80522 14.4869 4.76121 16.7814C6.65175 18.9993 9.46377 21.329 12.7196 24.0266L12.7257 24.0315C13.8639 24.9746 15.1543 26.0437 16.4972 27.1854C17.8482 26.0415 19.1405 24.9707 20.281 24.0261C23.5367 21.3285 26.3484 18.9993 28.239 16.7814C30.1947 14.4869 31.0671 12.4461 31.0671 10.1641C31.0671 8.00128 30.3191 6.02158 28.9611 4.58943C27.6231 3.17858 25.7835 2.40168 23.7814 2.40168C22.3146 2.40168 20.9679 2.85499 19.7788 3.74889C18.7191 4.54586 17.9809 5.55334 17.5481 6.25827C17.3255 6.62078 16.9338 6.83715 16.5 6.83715C16.0662 6.83715 15.6744 6.62078 15.4519 6.25827C15.0193 5.55334 14.2811 4.54586 13.2212 3.74889C12.0321 2.85499 10.6854 2.40168 9.21879 2.40168Z" fill="#956D84"/>
                  </svg>
          </div>
          <div class="product-card__top-sign">
              TOP
          </div>
      </div>
      <div class="product-card__bottom">
          <div class="product-card__bottom-stars">
          ${stars}
              <svg xmlns="http://www.w3.org/2000/svg" width="74" height="15" viewBox="0 0 74 15" fill="none">
                  <path d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z" fill="#F8E582"/>
                  <path d="M22.5 0L24.1839 5.18237H29.6329L25.2245 8.38525L26.9084 13.5676L22.5 10.3647L18.0916 13.5676L19.7755 8.38525L15.3671 5.18237H20.8161L22.5 0Z" fill="#F8E582"/>
                  <path d="M37.5 0L39.1839 5.18237H44.6329L40.2245 8.38525L41.9084 13.5676L37.5 10.3647L33.0916 13.5676L34.7755 8.38525L30.3671 5.18237H35.8161L37.5 0Z" fill="#F8E582"/>
                  <path d="M51.5 0L53.1839 5.18237H58.6329L54.2245 8.38525L55.9084 13.5676L51.5 10.3647L47.0916 13.5676L48.7755 8.38525L44.3671 5.18237H49.8161L51.5 0Z" fill="#F8E582"/>
                  <path d="M66.5 0L68.1839 5.18237H73.6329L69.2245 8.38525L70.9084 13.5676L66.5 10.3647L62.0916 13.5676L63.7755 8.38525L59.3671 5.18237H64.8161L66.5 0Z" fill="#F8E582"/>
                  </svg>
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
          <a href="#">
              <div class="product-card__bottom-button-desktop">
                  Заказать
                  <img src="./images/main/stock/button-branch.png" alt="button-branch">
              </div>
          </a>
          <a href="#">
              <div class="product-card__bottom-button-mobile">
                  <img src="./images/main/stock/button-branch.png" alt="button-branch">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16" fill="none">
                      <path d="M6.9949 12.7059H6.99589C6.99672 12.7059 6.99755 12.7058 6.99838 12.7058H18.5303C18.8142 12.7058 19.0638 12.5177 19.1418 12.245L21.686 3.35098C21.7408 3.15924 21.7024 2.9531 21.5823 2.79394C21.4621 2.63479 21.2741 2.54115 21.0745 2.54115H5.52801L5.07333 0.497477C5.00857 0.2068 4.7505 0 4.45235 0H0.636051C0.284732 0 0 0.284391 0 0.635288C0 0.986186 0.284732 1.27058 0.636051 1.27058H3.94219C4.02269 1.63272 6.11801 11.0505 6.2386 11.5924C5.56263 11.8858 5.0884 12.559 5.0884 13.3411C5.0884 14.3919 5.94442 15.2469 6.99656 15.2469H18.5303C18.8816 15.2469 19.1663 14.9625 19.1663 14.6116C19.1663 14.2607 18.8816 13.9763 18.5303 13.9763H6.99656C6.6459 13.9763 6.36051 13.6913 6.36051 13.3411C6.36051 12.9913 6.64491 12.7068 6.9949 12.7059ZM20.2312 3.81173L18.0504 11.4352H7.50672L5.81059 3.81173H20.2312Z" fill="white"/>
                      </svg>
              </div>
          </a>
          <a href="#">
              <div class="product-card__bottom-order">Быстрый заказ</div>
          </a>
      </div>
  </div>`;
      productCardWrapper.forEach((slide) => {
        slide.insertAdjacentHTML('beforeend', template);
      });
    });
  }
}

const stock = new productsStock();
