// ===================tabs==================
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