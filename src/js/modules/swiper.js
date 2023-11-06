import Swiper, { Navigation, Pagination, Autoplay, Scrollbar } from "swiper";
Swiper.use([Navigation, Pagination, Autoplay, Scrollbar]);

function certificateSwiper() {
    let swiper = new Swiper(".certificateSwiper", {
        pagination: {
          el: ".swiper-pagination",
        },
      });
      
}
certificateSwiper();


function stockSwiper() {

    let swiper = new Swiper(".stock-swiper", {
        pagination: {
          el: ".stock__swiper-pagination",
        },
        navigation: {
          nextEl: '.stock__swiper-button-next',
          prevEl: '.stock__swiper-button-prev',
        },
      });
      
}
stockSwiper();