if (document.querySelector(".products-slider")) {
  var productsSlider = new Swiper(".products-slider__item", {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: true,
    speed: 800,
    pagination: {
      el: ".products-slider__info",
      type: "fraction",
    },
    // Navigation arrows
    navigation: {
      nextEl: ".products-slider__arrow-next",
      prevEl: ".products-slider__arrow-prev",
    },
  });
}

// или 
if (document.querySelector(".brands-slider")) {
  var brandsSlider = new Swiper(".brands-slider__body", {
    observer: true,
    observeParents: true,
    slidesPerView: 5,
    spaceBetween: 0,
    // autoHeight: true,
    speed: 800,
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: ".brands-slider__arrow_next",
      prevEl: ".brands-slider__arrow_prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      520: {
        slidesPerView: 2,
      },
      760: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1180: {
        slidesPerView: 5,
      },
    },
  });
}