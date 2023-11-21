async function basket() {
  const productCards = document.querySelectorAll('.product-card');
  const basketNumEls = document.querySelectorAll('.basket-amount p');
  const basketWrapper = document.querySelector('.basket__wrapper');
  const basketWrapperRight = document.querySelector('.basket__wrapper-right');
  const basketWrapperText = document.querySelector('.basket__wrapper-text');
  const basketMessage = document.querySelector('.basket__message');

  let basketNum = 0;
  let parsedBasket = [];

  function renderBasket() {

    if (parsedBasket.length > 0) {
      parsedBasket.forEach((item) => {
        renderOrder(item);

        let template = `
          <div class="basket__wrapper-left">   
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
              <p>${item.newPrice * item.quantNum} ₴</p>
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
          `;

        if (basketWrapper) {
          basketWrapper.insertAdjacentHTML('beforeend', template);
        }

        const orderButton = document.querySelector(
          '.product-card__bottom-button-desktop.order__button-wrapper'
        );
        if (orderButton) {
          orderButton.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('basket');
            window.location.href = './order.html';
          });
        }
      });
    } else {
      if (parsedBasket && basketWrapperRight) {
        basketWrapperRight.style.display = 'none';
        basketWrapperText.style.display = 'none';
        basketMessage.style.display = 'block';
      }
    }
  }

  function quantProduct() {
    const buttonWrapper = document.querySelector('.basket__wrapper');
    if (buttonWrapper) {
      buttonWrapper.addEventListener('click', (e) => {
        const clickEl = e.target.parentNode;
        const basketCard = clickEl.closest('.basket__wrapper-card');

        if (basketCard) {
          const productId = basketCard.querySelector(
            '.basket__card-img img'
          ).src;
          const currentItem = parsedBasket.find(
            (item) => item.imgSrc === productId
          );
          if (currentItem) {
            if (clickEl.classList.contains('basket__card-arrow-left')) {
              currentItem.quantNum = Math.max(1, currentItem.quantNum - 1);
            } else if (clickEl.classList.contains('basket__card-arrow-right')) {
              currentItem.quantNum += 1;
            }

            const quantNumberEl = basketCard.querySelector(
              '.basket__card-num p'
            );
            const allPriceEl = basketCard.querySelector(
              '.basket__card-all-price p'
            );

            if (quantNumberEl && allPriceEl) {
              quantNumberEl.textContent = currentItem.quantNum;
              allPriceEl.textContent =
                currentItem.newPrice * currentItem.quantNum + ' ₴';
              renderOrder(currentItem);
            }

            updateLocalStorage();
            sessionStorage.setItem('basket', JSON.stringify(parsedBasket));
          }
        }
      });
    }
  }

  function renderOrder(item) {
    const allPrice = document.querySelector('.basket__wrapper-right-price');
    const allStock = document.getElementById('allStock');
    const allCost = document.getElementById('allCost');

    let totalPrice = 0;
    let totalStock = 0;
    let totalCost = 0;

    if (allPrice) {
      parsedBasket.forEach((item) => {
        if(item.oldPrice) {
          totalPrice += item.oldPrice * item.quantNum;
        } else {
          totalPrice += item.newPrice * item.quantNum;
        }
        
      });

      allPrice.textContent = totalPrice + ' ₴';
      console.log(allPrice);
    }

    if (allStock) {
      parsedBasket.forEach((item) => {
        if (item.oldPrice) {
          totalStock +=
          item.oldPrice * item.quantNum - item.newPrice * item.quantNum;
        } else {
          totalStock += 0;
        }  
      });

      allStock.textContent = totalStock + ' ₴';
      
    }

    if (allCost) {
      totalCost += totalPrice - totalStock;
      allCost.textContent = totalCost + ' ₴';
    }
  }

  function updateLocalStorage() {
    localStorage.setItem('basket', JSON.stringify(parsedBasket));
    sessionStorage.setItem('basket', JSON.stringify(parsedBasket));
  }

  function updateStateBasketNum() {
    const storedBasket = sessionStorage.getItem('basket');
    if (storedBasket) {
      parsedBasket = JSON.parse(storedBasket);
      basketNumEls.forEach((basketNumEl) => {
        basketNum = parsedBasket.length;
        basketNumEl.textContent = basketNum;
      });
    }
  }

  updateStateBasketNum();

  productCards.forEach((productCard) => {
    const button = productCard.querySelector(
      '.product-card__bottom-button-desktop'
    );
    button.addEventListener('click', (e) => {
      e.preventDefault();

      const productEl = e.target.parentNode.parentNode.parentNode;

      const newBasketItem = {
        imgSrc: productEl.querySelector('.product-card__img img').src,
        productName: productEl.querySelector('.product-card__bottom-name')
          .textContent,
        newPrice: parseFloat(
          productEl
            .querySelector('.product-card__bottom-price')
            .textContent.replace('грн', '')
        ),
        oldPrice: (() => {
          const oldPriceElement = productEl.querySelector('.product-card__bottom-old-price');
          return oldPriceElement ? parseFloat(oldPriceElement.textContent.replace('грн', '')) : 0;
        })(),
        quantNum: 1,
      };

      const existingItemIndex = parsedBasket.findIndex(
        (item) => item.imgSrc === newBasketItem.imgSrc
      );

      if (existingItemIndex !== -1) {
        parsedBasket[existingItemIndex].quantNum += 1;
      } else {
        parsedBasket.push(newBasketItem);
      }

      sessionStorage.setItem('basket', JSON.stringify(parsedBasket));

      updateLocalStorage();
      updateStateBasketNum();
    });
  });

  function delProduct() {
    const delButtons = document.querySelectorAll('.basket__card-del');

    delButtons.forEach((delButton) => {
      delButton.addEventListener('click', (e) => {
        const delEl = e.target.closest('.basket__wrapper-card');

        if (delEl) {
          const delImg = delEl.querySelector('.basket__card-img img').src;

          const delIndex = parsedBasket.findIndex(
            (item) => item.imgSrc === delImg
          );

          if (delIndex !== -1) {
            parsedBasket.splice(delIndex, 1);

            if (parsedBasket.length === 0) {
              renderBasket();
            }

            delEl.remove();
            updateLocalStorage();
            updateStateBasketNum();
            renderOrder();
          }
        }
      });
    });
  }

  quantProduct();
  renderOrder();
  renderBasket();
  delProduct();
}

export default basket;
