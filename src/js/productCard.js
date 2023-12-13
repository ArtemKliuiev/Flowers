import burger from './modules/menu/burger';
import menuSwitch from "./modules/menu/menuSwitch";
import ProductFirebase from './modules/product-card/ProductFirebase';

class ProductCard{
    constructor(){
        this.tabsBtn = document.querySelector('.tabs__line');
        this.tabsBlock = document.querySelector('.tabs');
        this.counterArrowLeft = document.querySelector('.counter__arrow-left');
        this.counterArrowRight = document.querySelector('.counter__arrow-right');
        this.like = document.querySelector('.main-image__like');
        this.input = document.querySelector('.fast-order__input');
        this.moreImages = document.querySelectorAll('.inform__more-image');
        this.mainPicture = document.querySelector('.main-image__picture');
        this.firebase = new ProductFirebase();
        this.tabs();
        this.counter();
        this.clickLike();
        this.focus();
        this.imageTabs();
        this.zoom();
    }
    clickLike(){
        this.like.addEventListener('click', () => {
            this.like.classList.toggle('main-image__like_active')
        })
    }
    tabs(){
        this.tabsBtn.addEventListener('click', (e) => {
            if(e.target.classList.contains('tabs__btn-delivery')){
                this.tabsBlock.classList.add('tabs_delivery');
                this.tabsBlock.classList.remove('tabs_description');
                this.tabsBlock.classList.remove('tabs_reviews');
            }else if(e.target.classList.contains('tabs__btn-description')){
                this.tabsBlock.classList.add('tabs_description');
                this.tabsBlock.classList.remove('tabs_delivery');
                this.tabsBlock.classList.remove('tabs_reviews');
            }else if(e.target.classList.contains('tabs__btn-reviews')){
                this.tabsBlock.classList.add('tabs_reviews');
                this.tabsBlock.classList.remove('tabs_delivery');
                this.tabsBlock.classList.remove('tabs_description');
            }
        });
    }
    imageTabs(){
        this.moreImages.forEach(img => {
            img.addEventListener('click', () => {
                this.mainPicture.innerHTML = img.innerHTML;
                this.mainPicture.classList.add('main-image__picture_animation');
                setTimeout(()=>{
                    this.mainPicture.classList.remove('main-image__picture_animation')
                },100)
            });
        });
    }
    zoom(){
        this.mainPicture.addEventListener("click", () => {
            this.mainPicture.classList.toggle('main-image__picture_zoom');
        })
    }
    focus(){
        const inputLine = document.querySelector('.fast-order__input-line')
        this.input.addEventListener('focus', () => {
            inputLine.classList.add('fast-order__input-line_focus');
        })
        document.addEventListener('click', (e) => {
            if(!e.target.classList.contains('fast-order__input')){
                inputLine.classList.remove('fast-order__input-line_focus');
            }
        })
    }
    counter(){
        const input = document.querySelector('.counter__number');
        input.value = 1;
        this.counterArrowLeft.addEventListener('click', () => {
            count(1);
        });
        this.counterArrowRight.addEventListener('click', () => {
            count(2);
        });
        input.addEventListener('change', () => {
            count(0);
        })

        input.addEventListener('change', () => {
            count(0);
        })

        function count(condition){
            const input = document.querySelector('.counter__number')
            const num = +input.value;

            if(num === 0){
                input.value = 1;
            }else if(condition === 1 && num > 1){
                input.value = num - 1;
            }else if (num >= 999){
                alert('Максимальный заказ через сайт 999 букетов, если вам нужно больше обратитесь пожалуйста к администрации сайта');
                input.value = 999;
            } else if(condition === 2){
                input.value = num + 1;
            }else if(num < 1){
                alert('Вы не можете заказать менее одного букета');
                input.value = 1;
            }
            priceCalculator(input.value)
        }
        function priceCalculator(num){
            const price = document.getElementById('price');
            const newPrice = +price.dataset.price * +num;
            price.textContent = newPrice;
        }
        count(0);
    }
}

const productClass = new ProductCard();