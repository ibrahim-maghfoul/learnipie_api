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
      coverflowEffect: {
        modifier: 2
      }
    }
  }
});