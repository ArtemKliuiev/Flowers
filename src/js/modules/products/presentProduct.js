import firebase from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
const presentCardWrapper = document.querySelectorAll('.present__wrapper');

export default class productsPresent {
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
              <svg xmlns="http://www.w3.org/2000/svg" width="33" height="30" viewBox="0 0 33 30" fill="none">
                <path d="M16.5 29.0654C16.0302 29.0654 15.5772 28.9 15.2243 28.5994C13.8911 27.4661 12.6059 26.4011 11.4719 25.4617L11.4661 25.4568C8.14147 22.7024 5.27054 20.3237 3.273 17.9805C1.04006 15.361 0 12.8773 0 10.1641C0 7.52789 0.929785 5.09586 2.6179 3.31565C4.32616 1.51439 6.67013 0.522339 9.21879 0.522339C11.1237 0.522339 12.8682 1.10783 14.4037 2.26241C15.1787 2.8452 15.8811 3.55846 16.5 4.39044C17.1191 3.55846 17.8213 2.8452 18.5965 2.26241C20.132 1.10783 21.8765 0.522339 23.7814 0.522339C26.3298 0.522339 28.674 1.51439 30.3823 3.31565C32.0704 5.09586 32.9999 7.52789 32.9999 10.1641C32.9999 12.8773 31.9601 15.361 29.7272 17.9803C27.7296 20.3237 24.859 22.7022 21.5349 25.4563C20.3989 26.3972 19.1116 27.4639 17.7754 28.5999C17.4227 28.9 16.9695 29.0654 16.5 29.0654ZM9.21879 2.40168C7.21647 2.40168 5.37704 3.17858 4.03889 4.58943C2.68084 6.02158 1.93283 8.00128 1.93283 10.1641C1.93283 12.4461 2.80522 14.4869 4.76121 16.7814C6.65175 18.9993 9.46377 21.329 12.7196 24.0266L12.7257 24.0315C13.8639 24.9746 15.1543 26.0437 16.4972 27.1854C17.8482 26.0415 19.1405 24.9707 20.281 24.0261C23.5367 21.3285 26.3484 18.9993 28.239 16.7814C30.1947 14.4869 31.0671 12.4461 31.0671 10.1641C31.0671 8.00128 30.3191 6.02158 28.9611 4.58943C27.6231 3.17858 25.7835 2.40168 23.7814 2.40168C22.3146 2.40168 20.9679 2.85499 19.7788 3.74889C18.7191 4.54586 17.9809 5.55334 17.5481 6.25827C17.3255 6.62078 16.9338 6.83715 16.5 6.83715C16.0662 6.83715 15.6744 6.62078 15.4519 6.25827C15.0193 5.55334 14.2811 4.54586 13.2212 3.74889C12.0321 2.85499 10.6854 2.40168 9.21879 2.40168Z" fill="#956D84"/>
              </svg>
              <div class="product-card__top-like_active">
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="30" viewBox="0 0 34 30" fill="none">
                  <path d="M17 29.2981C16.5302 29.2981 16.0773 29.1326 15.7243 28.832C14.3912 27.6987 13.1059 26.6337 11.9719 25.6943L11.9662 25.6894C8.64153 22.935 5.77061 20.5563 3.77307 18.2131C1.54012 15.5935 0.500061 13.1098 0.500061 10.3965C0.500061 7.76028 1.42985 5.32822 3.11796 3.54799C4.82622 1.7467 7.17019 0.754639 9.71885 0.754639C11.6237 0.754639 13.3683 1.34014 14.9038 2.49473C15.6787 3.07753 16.3812 3.7908 17 4.62278C17.6191 3.7908 18.3213 3.07753 19.0965 2.49473C20.6321 1.34014 22.3766 0.754639 24.2815 0.754639C26.8299 0.754639 29.1741 1.7467 30.8824 3.54799C32.5705 5.32822 33.5 7.76028 33.5 10.3965C33.5 13.1098 32.4602 15.5935 30.2272 18.2128C28.2297 20.5563 25.359 22.9347 22.0349 25.6889C20.8989 26.6298 19.6116 27.6965 18.2755 28.8325C17.9228 29.1326 17.4696 29.2981 17 29.2981ZM9.00006 21.5204C6.99774 21.5204 7.33822 17.679 6.00006 19.0899C4.64202 20.522 2.00006 14.7149 3.00006 10.8261C3.00006 13.1081 3.30528 14.7194 5.26128 17.0139C7.15181 19.2318 9.96383 21.5616 13.2197 24.2592L13.2258 24.2641C14.364 25.2072 15.6543 26.2764 16.9973 27.418C18.3483 26.2742 19.6406 25.2033 20.7811 24.2587C24.0367 21.5611 26.8485 19.2318 28.739 17.0139C30.6948 14.7194 31.5672 12.6785 31.5672 10.3965C31.5672 8.23367 33.858 13.8533 32.5 12.4211C31.1621 11.0103 32.8844 14.8517 30.8824 14.8517C29.4155 14.8517 29.9281 16.12 28.739 17.0139C27.6793 17.8109 24.4329 22.2738 24.0001 22.9787C23.7775 23.3412 17.4311 27.418 16.9973 27.418C16.5635 27.418 16.7226 28.2023 16.5001 27.8398C17.1093 28.832 14.9019 24.0956 11.5605 25.3533C10.3714 24.4594 10.4666 21.5204 9.00006 21.5204Z" fill="#956D84"/>
                </svg>
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
