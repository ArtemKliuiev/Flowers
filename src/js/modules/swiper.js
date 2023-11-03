import Swiper, { Navigation, Pagination, Autoplay, Scrollbar } from "swiper";
// import "swiper/swiper-bundle.min.css";
Swiper.use([Navigation, Pagination, Autoplay, Scrollbar]);

function certificateSwiper() {
    let swiper = new Swiper(".certificateSwiper", {
        pagination: {
          el: ".swiper-pagination",
        },
      });
      
}
certificateSwiper();