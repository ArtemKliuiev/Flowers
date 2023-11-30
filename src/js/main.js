import headerDropdown from './modules/headerDropdown';
import headerDropdownMobile from './modules/headerDropdown';
import certificateSwiper from './modules/swiper';
import stockSwiper from './modules/swiper';
import seasonSwiper from './modules/swiper';
import presentSwiper from './modules/swiper';
import previewsSwiper from './modules/swiper';
import photoSwiper from './modules/swiper';
import forumSwiper from './modules/swiper';
import productLike from "./modules/like/like";
import productsStock from './modules/products/stockProduct';
import productsSeason from './modules/products/seasonProduct';
import productsPresent from './modules/products/presentProduct';
import burger from './modules/menu/burger';
import menuSwitch from "./modules/menu/menuSwitch";
import basket from './modules/basket';
import orderValidator from './modules/validator';
import stickyHeader from './modules/stickyHeader';


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

  await stockProduct.loadCards();
  await seasonProduct.loadCards();
  await presentProduct.loadCards();

  let basketEl = await basket();
  let likeProduct = await productLike();

}

go();
