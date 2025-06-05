// Smooth scroll function
function smoothScroll(target, duration) {
  const targetElement = document.querySelector(target);
  if (!targetElement) return; // prevent error if element not found
  const targetPosition = targetElement.offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  function scrollAnimation(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeProgress = easingFunction(progress);
    window.scrollTo(0, startPosition + distance * easeProgress);

    if (timeElapsed < duration) {
      requestAnimationFrame(scrollAnimation);
    }
  }

  function easingFunction(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  requestAnimationFrame(scrollAnimation);
}

// Add click event listener to the scroll links
const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');

    // Check if it's an in-page anchor (starts with "#")
    if (href.startsWith('#')) {
      event.preventDefault();
      const duration = 1000;
      smoothScroll(href, duration);
    }
    // Otherwise, let the browser handle normal navigation (e.g., to another page)
  });
});
