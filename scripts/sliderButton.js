const sliderButton = document.querySelector('.slider-button');

sliderButton.addEventListener('click', () => {
  smoothScrollToTop(500); // Adjust the time (in milliseconds) as desired
});

function smoothScrollToTop(duration) {
  const startingY = window.pageYOffset;
  const diff = startingY * -1;
  let start;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);
    window.scrollTo(0, startingY + diff * percent);
    if (time < duration) window.requestAnimationFrame(step);
  });
}
