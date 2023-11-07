import Swiper, { Navigation, Pagination, Autoplay, Scrollbar } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Scrollbar]);

function certificateSwiper() {
  let swiper = new Swiper('.certificateSwiper', {
    pagination: {
      el: '.certificate__swiper-pagination',
    },
  });
}
certificateSwiper();

function stockSwiper() {
  let swiper = new Swiper('.stock-swiper', {
    slidesPerView: 'auto',
    pagination: {
      el: '.stock__swiper-pagination',
    },
    navigation: {
      nextEl: '.stock__swiper-button-next',
      prevEl: '.stock__swiper-button-prev',
    },
  });
}
stockSwiper();

function seasonSwiper() {
  let swiper = new Swiper('.season-swiper', {
    slidesPerView: 'auto',
    pagination: {
      el: '.season__swiper-pagination',
    },
    navigation: {
      nextEl: '.season__swiper-button-next',
      prevEl: '.season__swiper-button-prev',
    },
  });
}
seasonSwiper();

function presentSwiper() {
  let swiper = new Swiper('.present-swiper', {
    slidesPerView: 'auto',
    pagination: {
      el: '.present__swiper-pagination',
    },
    navigation: {
      nextEl: '.present__swiper-button-next',
      prevEl: '.present__swiper-button-prev',
    },
  });
}
presentSwiper();
