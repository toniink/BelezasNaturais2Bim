document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.slides');
  const dots = document.querySelectorAll('.dot');
  let slideIndex = 0;

  function showSlide(index) {
    const offset = -index * 100; 
    slides.style.transform = `translateX(${offset}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % dots.length; 
    showSlide(slideIndex);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      slideIndex = index;
      showSlide(slideIndex);
    });
  });

  setInterval(nextSlide, 3000);

  showSlide(slideIndex);
});
