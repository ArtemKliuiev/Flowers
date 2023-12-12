export default class FillData{
    constructor(){
        this.oneImgPng = document.querySelector('.one-img-png');
        this.oneImgWebP = document.querySelector('.one-img-webp');
        this.twoImgPng = document.querySelector('.two-img-png');
        this.twoImgWebP = document.querySelector('.two-img-webp');
        this.threeImgPng = document.querySelector('.three-img-png');
        this.threeImgWebP = document.querySelector('.three-img-webp');
        this.mainPicture = document.querySelector('.main-image__picture');
        this.onePicture = document.querySelector('.inform__image-one');
        this.title = document.querySelector('.inform__title');
        this.categoty = document.querySelector('.categoty');
        this.price = document.getElementById('price');
        this.oldPrice = document.getElementById('old-price');
        this.starsWrapper = document.querySelector('.inform__stars');
        this.infoFlower = document.querySelector('.inform__info-flowers');
        this.infoSize = document.querySelector('.inform__info-size');
        this.infoMaterian = document.querySelector('.inform__info-material');
        this.infoMore = document.querySelector('.inform__info-more');
        this.tabDelovery = document.querySelector('.tabs__info-delivery');
        this.tabDescription = document.querySelector('.tabs__info-description');
        this.tabReviews = document.querySelector('.tabs__info-reviewsv');
        this.reviewsQuatity = document.querySelector('.tabs__reviews-quantity');
        this.reviewContainer = document.querySelector('.reviews-container');
    }
    fill(data){
        console.log(data);
        this.oneImgPng.src = data.img.default;
        this.oneImgWebP.srcset = data.img.webP;
        this.twoImgPng.src = data.moreImage.onePng;
        this.twoImgWebP.srcset = data.moreImage.oneWebP;
        this.threeImgPng.src = data.moreImage.twoPng;
        this.threeImgWebP.srcset = data.moreImage.twoWebP;
        this.title.textContent = data.name;
        this.categoty.textContent = data.bouquets;
        this.price.dataset.price = data.price;
        this.price.textContent = data.price;
        this.oldPrice.textContent = data.oldPrice;
        this.infoFlower.textContent = data.name;
        this.infoSize = data.size;
        this.infoMaterian = data.material;
        this.infoMore = data.Additionally;
        this.tabDelovery.textContent = data.delivery;
        this.tabDescription.textContent = data.description;
        this.reviewsQuatity.textContent = data.reviews.length ?? 0
        this.stars(data.stars);
        this.change();
        this.reviews(data.reviews)

    }
    reviews(data){
        for(let i = 0; i < data.length; i++){
            if(i < 10){
                const commitInfo = JSON.parse(data[i])
                let stars = ''
                for(let i = 0; i < commitInfo.stars; i++){
                    stars += '<img src="./images/main/stock/Star.svg" alt="star">';
                }

                this.reviewContainer.innerHTML += `
                    <div class="review">
                        <div class="review__picture">
                            <picture>
                                <source srcset="${commitInfo.img.webP}" type="image/webp">
                                <img src="${commitInfo.img.default}" alt="PNG Image">
                            </picture>
                        </div>
                        <div class="review__main">
                            <div class="review__top-info">
                                <span class="review__data">${commitInfo.data}</span>
                                <div class="review__stars">${stars}</div>
                            </div>
                            <div class="review__name">${commitInfo.name}</div>
                            <div class="review__text">${commitInfo.text}</div>
                        </div>
                    </div>
                `;
            }
        }
    }
    stars(quantitySrats){
        for(let i = 0 ;i < quantitySrats; i++){
            this.starsWrapper.innerHTML += `<img src="./images/main/stock/Star.svg" alt="star">`;
        }
    }
    change(){
        this.mainPicture.innerHTML = this.onePicture.innerHTML;
    }

}