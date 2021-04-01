///Увеличение уменьшение количества.........../////////////////
let quantityButtons = document.querySelectorAll(".quantity__button"); 
if (quantityButtons.length > 0) {
  for (let i = 0; i < quantityButtons.length; i++) {
    const quantityButton = quantityButtons[i];
    quantityButton.addEventListener("click", () => {
      let value = parseInt(
        quantityButton.closest(".quantity").querySelector("input").value
      );
      if (quantityButton.classList.contains("quantity__button_plus")) {
        value++;
      } else {
        value--;
        if (value < 1) {
          value = 1;
        }
      }
      quantityButton.closest(".quantity").querySelector("input").value = value;
    });
  }
}