import Swiper, { Navigation, Pagination, Autoplay, Scrollbar } from "swiper";
Swiper.use([Navigation, Pagination, Autoplay, Scrollbar]);

function certificateSwiper() {
    let swiper = new Swiper(".certificateSwiper", {
        pagination: {
          el: ".certificate__swiper-pagination",
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
        

        breakpoints: {
          320: {
            slidesPerView: 0.5,
          },
          375: {
            slidesPerView: 0.5,
          },
          768: {
            slidesPerView: 0.5,
          },
          991: {
            slidesPerView: 0.75,

          },
          1440: {
            slidesPerView: 1,
          }
          
        },
      });
      
}
stockSwiper();