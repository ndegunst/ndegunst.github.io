const images = document.querySelectorAll('.slide-image');

images.forEach(image => {
  image.addEventListener('mousemove', e => {
    const rect = image.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateX = y * 20;
    const rotateY = x * 20;
    image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    image.style.transition = 'transform 0.5s ease-out';
  });

  image.addEventListener('mouseleave', () => {
    image.style.transform = '';
    image.style.transition = 'transform 0.7s ease-out';
  });
});
