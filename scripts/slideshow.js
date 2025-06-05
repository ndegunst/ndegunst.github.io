const buttons = document.querySelectorAll("[data-carousel-button]");
const slidesContainer = document.querySelector("[data-slides]");
const pageNumbersContainer = document.querySelector(".page-numbers");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const activeSlide = slidesContainer.querySelector("[data-active]");
    let newIndex = [...slidesContainer.children].indexOf(activeSlide) + offset;
    const totalSlides = slidesContainer.children.length;

    if (newIndex < 0) {
      newIndex = totalSlides - 1;
    }
    if (newIndex >= totalSlides) {
      newIndex = 0;
    }

    slidesContainer.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;

    updatePageNumbers(newIndex, totalSlides);
  });
});

function updatePageNumbers(activeIndex, totalSlides) {
  pageNumbersContainer.innerHTML = "";
  for (let i = 0; i < totalSlides; i++) {
    const pageNumber = document.createElement("span");
    pageNumber.textContent = i + 1;
    pageNumber.classList.toggle("active", i === activeIndex);
    pageNumbersContainer.appendChild(pageNumber);
  }
}
const activeSlide = slidesContainer.querySelector("[data-active]");
const initialIndex = [...slidesContainer.children].indexOf(activeSlide);
const totalSlides = slidesContainer.children.length;
updatePageNumbers(initialIndex, totalSlides);