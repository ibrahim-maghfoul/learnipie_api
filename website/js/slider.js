var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  autoplay: true,
  loop: true,
  spaceBetween: 10,
  coverflowEffect: {
    rotate: 40,
    stretch: 10,
    depth: 200,
    modifier: 5,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  breakpoints: {
    768: {
      centeredSlides: true,
      slidesPerView: "auto",
      loop: true,
      coverflowEffect: {
        modifier: 2
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    },
  },
});


var swiper = new Swiper('.blog-slider', {
  spaceBetween: 30,
  effect: 'fade',
  loop: true,
  mousewheel: {
    invert: false,
  },
  // autoHeight: true,
  pagination: {
    el: '.blog-slider__pagination',
    clickable: true,
  }
});