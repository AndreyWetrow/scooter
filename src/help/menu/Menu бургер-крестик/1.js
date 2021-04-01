const menuPageBurger = document.querySelector(".menu-page__burger");
const menuPageBoby = document.querySelector(".menu-page__body");

menuPageBurger.addEventListener("click", (e) => {
  if (allowMenu) {
    allowMenu = false;
    menuPageBurger.classList.toggle("_active");
    // menuPageBoby.classList.toggle("_active");
    _slideToggle(menuPageBoby);
    // showHideMenu();
  }
});