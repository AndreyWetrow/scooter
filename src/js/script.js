// import "core-js/features/promise";
import $ from "jquery";
import "./ion.rangeSlider.min.js";
import "./jquery.formstyler.min.js";
import "slick-carousel";
import RateYo from "rateyo";

// import noUiSlider from "nouislider";
// import Swiper from "swiper/bundle";
// import wNumb from "wNumb";

// console.log(devide(30));
// console.log(devide(120));
// $("h1").addClass("red");

// new Promise((resolve, reject) => {
//   setTimeout(resolve, 1500);
// }).then(() => {
//   console.log(111111);
// });

// =============Jquery start================
// $(function(){});
// =============Jquery end==================

// ===================Рейтинг start==================
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".rate-yo")) {
    RateYo(document.querySelector(".rate-yo"), {
      numStars: 5,
      starWidth: "23px",
      spacing: "7px",
      readOnly: true,
      normalFill: "#c4c4c4",
      ratedFill: "#1C62CD",
    });
  }
  // ===================Рейтинг end==================

  // ===================tabs start==================
  // $(".tab").on("click", function (e) {
  //   e.preventDefault();
  //   $(".tab").removeClass("tab--active");
  //   $(".tabs-content").removeClass("tabs-content--active");

  //   $(this).addClass("tab--active");

  //   $($(this).attr("href")).addClass("tabs-content--active");
  // });

  // $(".tab").on("click", function (e) {
  //   e.preventDefault();
  //   $(this).closest(".tabs-wrapper").find(".tab").removeClass("tab--active");
  //   $(this)
  //     .closest(".tabs-wrapper")
  //     .find(".tabs-content")
  //     .removeClass("tabs-content--active");

  //   $(this).addClass("tab--active");

  //   $($(this).attr("href")).addClass("tabs-content--active");
  // });

  $(".tab").on("click", function (e) {
    e.preventDefault();
    let parent = $(this).closest(".tabs-wrapper");

    parent.find(".tab").removeClass("tab--active");

    parent.find(".tabs-content").removeClass("tabs-content--active");

    $(this).addClass("tab--active");

    parent
      .find("." + $(this).data("tab-name"))
      .addClass("tabs-content--active");

    if (parent.find(".product__slider").length > 0) {
      $(".product__slider").slick("setPosition");
    }
  });
  // ===================tabs end===============

  // ===================slick=============
  $(".banner-section__slider").slick({
    dots: true,
    prevArrow:
      '<button class="banner-section__slider-btn banner-section__slider-btnPrev"><img src="images/arrow-left.svg"></button>',
    nextArrow:
      '<button class="banner-section__slider-btn banner-section__slider-btnNext"><img src="images/arrow-right.svg"></button>',
    responsive: [
      {
        breakpoint: 968,
        settings: {
          arrows: false,
        },
      },
    ],
  });

  $(".product__slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow:
      '<button class="product-slider__slider-btn product-slider__slider-btnPrev"><img src="images/arrow-black-left.svg"></button>',
    nextArrow:
      '<button class="product-slider__slider-btn product-slider__slider-btnNext"><img src="images/arrow-black-right.svg"></button>',
    responsive: [
      {
        breakpoint: 1301,
        settings: {
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 1201,
        settings: {
          slidesToShow: 3,
          dots: true,
        },
      },
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 2,
          dots: true,
        },
      },
      {
        breakpoint: 590,
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
    ],
  });

  $(".product__slider").on("setPosition", function () {
    var heights = [];
    var maxHeights = 0;
    $(this)
      .find(".slick-slide")
      .each(function (indx, element) {
        heights.push($(element).outerHeight());
      });
    maxHeights = Math.max(...heights);
    $(this)
      .find(".product-item")
      .css("height", maxHeights + "px");
  });
  // ===================slick end=============

  // ===================favorite start===============
  $(".product-item__favorite").on("click", function (event) {
    // event.preventDefault();
    $(this).toggleClass("product-item__favorite--active");
  });
  // ===================favorite end===============

  // ===================catalog equal height start===============
  function catalogEqualHeight() {
    let heights = [];
    let maxHeights = 0;
    $(".catalog__inner-list")
      .find(".product-item__wrapper")
      .each(function (indx, element) {
        heights.push($(element).outerHeight());
      });
    maxHeights = Math.max(...heights);
    $(".catalog__inner-list")
      .find(".product-item")
      .css("height", maxHeights + "px");
  }
  catalogEqualHeight();
  // ===================catalog equal height end===============

  //====================form styler start================
  $(".filter-style").styler();
  //====================form styler end =================

  //====================filter start================
  $(".filter__item-drop, .filter__extra").on("click", function (event) {
    $(this).toggleClass("filter__item-drop--active");
    $(this).next().slideToggle(200);
  });
  //====================filter end =================

  //====================button start================
  $(".catalog__filter-btngrid").on("click", function (event) {
    $(this).addClass("catalog__filter-button--active");
    $(".catalog__filter-btnline").removeClass("catalog__filter-button--active");
    $(".product-item__wrapper").removeClass("product-item__wrapper--list");
  });
  $(".catalog__filter-btnline").on("click", function (event) {
    $(this).addClass("catalog__filter-button--active");
    $(".catalog__filter-btngrid").removeClass("catalog__filter-button--active");
    $(".product-item__wrapper").addClass("product-item__wrapper--list");
  });
  //====================button end =================

  //====================RangeSlider start================
  $(".js-range-slider").ionRangeSlider({
    type: "double",
    hide_from_to: "true",
  });
  //====================RangeSlider end================
  //====================Mobile menu start================
  $(".menu__btn").on("click", function () {
    $(".menu-mobile__list").toggleClass("menu-mobile__list--active");
  });
  //====================Mobile menu end================

  //====================footer start================
  $(window).on("resize", function () {
    $(".footer-list").each(function (indx, element) {
      if ($(document).width() > 540 && $(element).css("display") === "none") {
        $(element).css("display", "block");
      }
      if ($(document).width() <= 540 && $(element).css("display") === "block") {
        $(element).css("display", "none");
        $(".footer__topdrop").removeClass("footer__topdrop--active");
      }
    });
  });

  $(".footer__topdrop").on("click", function () {
    $(this).next().slideToggle(200);
    $(this).toggleClass("footer__topdrop--active");
  });

  //====================footer end================

  //====================filter start================
  $(".aside__btn").on("click", function () {
    $(this).next().slideToggle();
  });
  //====================filter end================

  // let tab = function () {
  //   let tabNav = document.querySelectorAll("._tabs-item");
  //   // let tabContent = document.querySelectorAll("._tabs-block");
  //   let tabName;
  //   let mainTab;
  //   let tabContent;

  //   tabNav.forEach((item) => {
  //     item.addEventListener("click", selectTabNav);
  //   });

  //   function selectTabNav() {
  //     mainTab = this.closest("._tabs");
  //     mainTab.querySelectorAll("._tabs-item").forEach((item) => {
  //       item.classList.remove("_active");
  //     });
  //     // tabNav.forEach((item) => {
  //     //   item.classList.remove("_active");
  //     // });
  //     this.classList.add("_active");
  //     tabName = this.dataset.tabName;
  //     selectTabContent(tabName);

  //     function selectTabContent(tabName) {
  //       tabContent = mainTab.querySelectorAll("._tabs-block");
  //       tabContent.forEach((item) => {
  //         if (item.classList.contains(`${tabName}`)) {
  //           item.classList.add("_active");
  //         } else {
  //           item.classList.remove("_active");
  //         }
  //       });
  //     }
  //   }
  // };

  // tab();
});
