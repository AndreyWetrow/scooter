 // ===================slick=============
  $(".banner-section__slider").slick({
    dots: true,
    prevArrow: '<button class="banner-section__slider-btn banner-section__slider-btnPrev"><img src="images/arrow-left.svg"></button>',
    nextArrow: '<button class="banner-section__slider-btn banner-section__slider-btnNext"><img src="images/arrow-right.svg"></button>',
  });

  $(".product__slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<button class="product-slider__slider-btn product-slider__slider-btnPrev"><img src="images/arrow-black-left.svg"></button>',
    nextArrow: '<button class="product-slider__slider-btn product-slider__slider-btnNext"><img src="images/arrow-black-right.svg"></button>',
  });

// =================== Моя функция для одинаковой высоты слайдов============
  $('.product__slider').on('setPosition', function() { 
    var heights = [];
    var maxHeights = 0;
    $(this).find('.slick-slide').each(function(indx, element) {
       heights.push($(element).outerHeight());
    });
    maxHeights = Math.max(...heights);
    $(this).find('.product-item').css('height', maxHeights + 'px');
    // =================== Моя функция для одинаковой высоты слайдов end============
  });

  // ===================slick end=============