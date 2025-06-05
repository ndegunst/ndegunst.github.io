document.addEventListener("DOMContentLoaded", function () {
  const audio = new Audio('music.mp3');
  audio.volume = 0.2;
  audio.loop = true;

  let musicEnabled = false;
  let observer = null;
  let wasPlaying = false;

  function createObserver() {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!musicEnabled) return;

        if (entry.isIntersecting) {
          if (!audio.paused && !wasPlaying) return;
          audio.play().catch(err => console.log('Autoplay prevented:', err));
          wasPlaying = true;
        } else {
          if (!audio.paused) {
            audio.pause();
            wasPlaying = true;
          } else {
            wasPlaying = false;
          }
        }
      });
    }, {
      threshold: 0.1
    });

    const target = document.getElementById('annee3');
    if (target) {
      observer.observe(target);
    } else {
      console.warn('Element with ID "annee3" not found');
    }
  }

  // Toggle music activation
  function toggleMusic() {
    musicEnabled = !musicEnabled;

    if (musicEnabled) {
      if (!observer) createObserver();
      audio.play().catch(err => console.log('Autoplay prevented:', err));
    } else {
      if (observer) observer.disconnect();
      observer = null;
      audio.pause();
    }
  }

  // Listen for clicks on the specific section to toggle music
  const musicZone = document.getElementById('annee3');
  if (musicZone) {
    musicZone.addEventListener('click', toggleMusic);
  }
});
