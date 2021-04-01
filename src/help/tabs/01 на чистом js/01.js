let tab = function () {
  let tabNav = document.querySelectorAll("._tabs-item");
  // let tabContent = document.querySelectorAll("._tabs-block");
  let tabName;
  let mainTab;
  let tabContent;

  tabNav.forEach((item) => {
    item.addEventListener("click", selectTabNav);
  });

  function selectTabNav() {
    mainTab = this.closest("._tabs");
    mainTab.querySelectorAll("._tabs-item").forEach((item) => {
      item.classList.remove("_active");
    });
    // tabNav.forEach((item) => {
    //   item.classList.remove("_active");
    // });
    this.classList.add("_active");
    tabName = this.dataset.tabName;
    selectTabContent(tabName);

    function selectTabContent(tabName) {
      tabContent = mainTab.querySelectorAll("._tabs-block");
      tabContent.forEach((item) => {
        if (item.classList.contains(`${tabName}`)) {
          item.classList.add("_active");
        } else {
          item.classList.remove("_active");
        }
      });
    }
  }
};

tab();
