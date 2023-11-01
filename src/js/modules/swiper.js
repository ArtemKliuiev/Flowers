import Swiper, { Navigation, Pagination, Autoplay, Scrollbar } from "swiper";
// import "swiper/swiper-bundle.min.css";
Swiper.use([Navigation, Pagination, Autoplay, Scrollbar]);

function certificateSwiper() {
    let swiper = new Swiper(".certificateSwiper", {
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
      });
      
}
certificateSwiper();