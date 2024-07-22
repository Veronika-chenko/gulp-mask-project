import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export function reviewSlider() {
  new Swiper('.reviews-swiper-container', {
    spaceBetween: 24,
    slidesPerView: 1,
    breakpoints: {
      480: {
        slidesPerView: 'auto',
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });
}
