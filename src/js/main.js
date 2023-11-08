import headerDropdown from './modules/headerDropdown';
import certificateSwiper from './modules/swiper';
import stockSwiper from './modules/swiper';
import seasonSwiper from './modules/swiper';
import presentSwiper from './modules/swiper';
import forumSwiper from './modules/swiper';
import productsStock from './modules/stockProduct';
import productsSeason from './modules/seasonProduct';
import productsPresent from './modules/presentProduct';
import burger from './modules/burger';
import menuSwitch from "./modules/menu/menuSwitch"
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
