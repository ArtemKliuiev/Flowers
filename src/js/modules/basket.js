
async function basket() {
    const productCards = document.querySelectorAll('.product-card');
    const basketNumEl = document.querySelectorAll('.basket-amount p');
    const basketWrapper = document.querySelector('.basket__wrapper');
    const basketMessage = document.querySelector('.basket__message');
    
    let basketNum = 0;
    let parsedBasket = [];
    let quantNum = 1;

    function renderBasket() {
      parsedBasket.forEach((item) => {
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
                      <img src="${item.imgSrc}" />
                    </div>
                    <div class="basket__card-center-wrapper">
                      <div class="basket__card-name">
                        <p>${item.productName}</p>
                      </div>
                      <div class="basket__card-price">
                        <p class="basket__card-new-price">${item.newPrice} ₴</p>
                        <p class="basket__card-old-price">${item.oldPrice} ₴</p>
                      </div>
                      <div class="basket__card-num-wrapper">
                        <div class="basket__card-arrow-left">
                          <svg ><use xlink:href="./images/Sprite.svg#basket-arrow-left"></use></svg>
                        </div>
                        <div class="basket__card-num">
                          <p>${item.quantNum}</p>
                        </div>
                        <div class="basket__card-arrow-right">
                          <svg ><use xlink:href="./images/Sprite.svg#basket-arrow-right"></use></svg>
                        </div>
                      </div>
                    </div>
                    <div class="basket__card-all-price">
                      <p>${item.newPrice * basketNum} ₴</p>
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
                      <p class="basket__wrapper-right-price">5 558 ₴</p>
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
      })
      
    }

    function quantProduct() {
      const buttonWrapper = document.querySelector('.basket__wrapper');
      const quantNumberEl = document.querySelector('.basket__card-num p');
    
      if (buttonWrapper && quantNumberEl) {
        buttonWrapper.addEventListener('click', (e) => {
          const clickEl = e.target.parentNode;
    
          if (clickEl.classList.contains('basket__card-arrow-left')) {
            quantNum -= 1;
          } else if (clickEl.classList.contains('basket__card-arrow-right')) {
            quantNum += 1;
          }
    
          quantNumberEl.textContent = quantNum;
          renderAllPrice();
        });
      }
    }

    function renderAllPrice() {
      const allPrice = document.querySelector('.basket__card-all-price p');
    
      if (allPrice) {
        const currentItem = parsedBasket.find(item => item.productName === 'Название товара');
    
        if (currentItem) {
          allPrice.textContent = currentItem.newPrice * quantNum + ' ' + '₴';
        }
      }
    }
    
    const storedBasket = sessionStorage.getItem('basket');
    if (storedBasket) {
    parsedBasket = JSON.parse(storedBasket);
    basketNum = parsedBasket.length;
    basketNumEl.textContent = basketNum;
  }

    productCards.forEach((productCard) => {
        const button = productCard.querySelector('.product-card__bottom-button-desktop');
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const productEl = e.target.parentNode.parentNode.parentNode;

            const newBasketItem = {
              imgSrc: productEl.querySelector('.product-card__img img').src,
              productName: productEl.querySelector('.product-card__bottom-name').textContent,
              newPrice: parseFloat(productEl.querySelector('.product-card__bottom-price').textContent.replace('грн', '')),
              oldPrice: parseFloat(productEl.querySelector('.product-card__bottom-old-price').textContent.replace('грн', '')),
              quantNum: 1
          };

            parsedBasket = Array.isArray(parsedBasket) ? parsedBasket : [];
            parsedBasket.push(newBasketItem);
            basketNum += 1;
            basketNumEl.textContent = basketNum;
              
            sessionStorage.setItem('basket', JSON.stringify(parsedBasket));

        });
    });
    
    quantProduct();
    renderAllPrice();
    renderBasket();
    
}

export default basket;

