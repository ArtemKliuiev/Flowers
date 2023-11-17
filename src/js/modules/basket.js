
async function basket() {
    const productCards = document.querySelectorAll('.product-card');
    const basketNumEl = document.querySelectorAll('.basket-amount p');
    const basketWrapper = document.querySelector('.basket__wrapper');
    const basketMessage = document.querySelector('.basket__message');

    let basketNum = 0;
    let imgSrc = null;
    let productName = null;
    let newPrice = null;
    let oldPrice = null;

    const storedBasket = sessionStorage.getItem('basket');
    if (storedBasket) {
        const parsedBasket = JSON.parse(storedBasket);
        basketNum = parsedBasket.basketNum;
        imgSrc = parsedBasket.imgSrc;
        basketNumEl.textContent = basketNum;
        productName = parsedBasket.productName;
        newPrice = parsedBasket.newPrice;
        oldPrice = parsedBasket.oldPrice;
    }

    productCards.forEach((productCard) => {
        const button = productCard.querySelector('.product-card__bottom-button-desktop');
        button.addEventListener('click', (e) => {
            e.preventDefault();
            basketNum += 1;
            basketNumEl.textContent = basketNum;

            const productEl = e.target.parentNode.parentNode.parentNode;

            imgSrc = productEl.querySelector('.product-card__img img').src;
            productName = productEl.querySelector('.product-card__bottom-name').textContent;
            newPrice = productEl.querySelector('.product-card__bottom-price').
            textContent.replace('грн', '');
            oldPrice = productEl.querySelector('.product-card__bottom-old-price').textContent.
            textContent.replace('грн', '');
              
            const dataToStore = { basketNum, imgSrc , productName, newPrice, oldPrice};
            sessionStorage.setItem('basket', JSON.stringify(dataToStore));

        });
    });

    if (basketNum > 0) {
        let template = `
    <div class="basket__wrapper-left">
                <div class="basket__wrapper-text">
                  <p>Название</p>
                  <p>Цена за шт.</p>
                  <p>Кол-во</p>
                  <p>Итог</p>
                </div>
          
                <div class="basket__wrapper-card basket__card">
                  <div class="basket__card-img">
                    <img src="${imgSrc}" />
                  </div>
                  <div class="basket__card-center-wrapper">
                    <div class="basket__card-name">
                      <p>${productName}</p>
                    </div>
                    <div class="basket__card-price">
                      <p class="basket__card-new-price">${newPrice} ₴</p>
                      <p class="basket__card-old-price">${oldPrice} ₴</p>
                    </div>
                    <div class="basket__card-num-wrapper">
                      <div class="basket__card-arrow-left">
                        <svg ><use xlink:href="./images/Sprite.svg#basket-arrow-left"></use></svg>
                      </div>
                      <div class="basket__card-num">
                        <p>2</p>
                      </div>
                      <div class="basket__card-arrow-right">
                        <svg ><use xlink:href="./images/Sprite.svg#basket-arrow-right"></use></svg>
                      </div>
                    </div>
                  </div>
                  <div class="basket__card-all-price">
                    <p>1590 ₴</p>
                  </div>
                  <div class="basket__card-del-wrapper">
                    <div class="basket__card-del">
                      <svg ><use xlink:href="./images/Sprite.svg#basket-card-del"></use></svg>
                    </div>
                    <div class="product-card__top-like basket__like">
                      <svg ><use xlink:href="./images/Sprite.svg#basket-like"></use></svg>
                      <div class="product-card__top-like_active basket__like_active">
                        <svg ><use xlink:href="./images/Sprite.svg#basket-like-active"></use></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          
              <div class="basket__wrapper-right">
                  <div class="basket__right-nav">
                      <a href="#">Продолжить покупки</a>
                      <svg ><use xlink:href="./images/Sprite.svg#basket-nav-arrow"></use></svg>
                    </div>
                    <div class="basket__wrapper-right-content">
                      <h2 class="basket__wrapper-right-title">Ваш заказ</h2>
                <div class="basket__wrapper-right-inner">
                  <div class="basket__wrapper-right-prices">
                    <div class="basket__wrapper-right-products">
                      <p>Товары</p>
                    </div>
                    <p>5 558 ₴</p>
                  </div>
                  <div class="basket__wrapper-right-stock">
                    <div class="basket__wrapper-right-products">
                      <p>Скидка</p>
                    </div>
                    <p>254 ₴</p>
                  </div>
                </div>
                <div class="basket__wrapper-right-all">
                  <p class="basket__wrapper-right-all-text">Всего</p>
                  <p>5 304 ₴</p>
                </div>
                <a href="./order.html">
                  <div class="product-card__bottom-button-desktop order__button-wrapper">
                    Оформить заказ
                    <img
                      src="./images/main/stock/button-branch.png"
                      alt="button-branch"
                    />
                  </div>
                </a>
              </div>
                
              </div> 
    `;

    if (basketWrapper) {
        basketWrapper.insertAdjacentHTML('beforeend', template);
    }

    const orderButton = document.querySelector('.product-card__bottom-button-desktop.order__button-wrapper');
    if (orderButton) {

        orderButton.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('basket');
            window.location.href = './order.html';
        });
    }
    } else {
        if(basketMessage) {
            basketMessage.style.display = 'block';
        }
        
    }
    
}

export default basket;

