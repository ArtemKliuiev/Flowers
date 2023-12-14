// import headerDropdown from './modules/headerDropdown';
// import headerDropdownMobile from './modules/headerDropdown';
// import headerCategoriesDropdown from './modules/headerDropdown';
// import searchDropdown from './modules/headerDropdown';
import app from './app';
import certificateSwiper from './modules/swiper';
import stockSwiper from './modules/swiper';
import seasonSwiper from './modules/swiper';
import presentSwiper from './modules/swiper';
import previewsSwiper from './modules/swiper';
import photoSwiper from './modules/swiper';
// import videoSwiper from './modules/swiper';
import forumSwiper from './modules/swiper';
// import newsSwiper from './modules/swiper';
import productLike from "./modules/like/like";
import productsStock from './modules/products/stockProduct';
import productsSeason from './modules/products/seasonProduct';
import productsPresent from './modules/products/presentProduct';
// import newsCard from './modules/news/news';
import photoCard from './modules/photo/photoProduct';
import forumCard from './modules/forum/forum';
import reviewsCard from './modules/reviews/reviews';
// import videoCard from './modules/video/videoProducts';
import justValidateRecomendation from './modules/justValidate';
import justValidateContacts from './modules/justValidate';

// import burger from './modules/menu/burger';
// import menuSwitch from "./modules/menu/menuSwitch";
// import basket from './modules/basket';
import orderValidator from './modules/validator';
import dropdownHandler from './modules/orderDropdown';



const titles = document.querySelectorAll('.accordion__title');
const contents = document.querySelectorAll('.accordion__content');

titles.forEach((item) =>
  item.addEventListener('click', () => {
    const activeContent = document.querySelector('#' + item.dataset.tab);

    if (activeContent.classList.contains('active')) {
      activeContent.classList.remove('active');
      item.classList.remove('active');
      activeContent.style.maxHeight = 0;
    } else {
      contents.forEach((element) => {
        element.classList.remove('active');
        element.style.maxHeight = 0;
      });

      titles.forEach((element) => element.classList.remove('active'));

      item.classList.add('active');
      activeContent.classList.add('active');
      activeContent.style.maxHeight = activeContent.scrollHeight + 'px';
    }
  })
);

async function go() {

  const stockProduct = new productsStock();
  const seasonProduct = new productsSeason();
  const presentProduct = new productsPresent();
  // const productNews = new newsCard();
  const productPhoto = new photoCard();
  const productForum = new forumCard();
  const productReviews = new reviewsCard();
  // const productVideo = new videoCard();

  await productReviews.loadCards();
  await stockProduct.loadCards();
  await seasonProduct.loadCards();
  await presentProduct.loadCards();
  await productPhoto.loadCards();
  await productForum.loadCards();
  await productVideo.loadCards();
  
  
  let likeProduct = await productLike();
  let basketEl = await basket();

}

go();

