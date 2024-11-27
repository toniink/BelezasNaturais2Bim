const accordions = document.querySelectorAll('.accordion');

accordions.forEach(accordion => {
    accordion.addEventListener('click', () => {
        const body = accordion.querySelector('.accordion-body');
        body.classList.toggle('active');
    })
})


let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const navbarPlaceholder = document.getElementById('navbar-placeholder');

navbarPlaceholder.style.height = `${navbar.offsetHeight}px`;

window.addEventListener('scroll', () => {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    navbar.style.top = `-${navbar.offsetHeight}px`;
  } else {
    navbar.style.top = '0';
  }
  lastScrollTop = scrollTop;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    window.scrollTo({
      top: targetElement.offsetTop - 120,
      behavior: 'smooth'
    });
  });
});

document.querySelectorAll('.navbar li').forEach(item => {
  item.classList.remove('active');
});

document.querySelectorAll('.navbar li a').forEach(link => {
  if (link.href === window.location.href) {
    link.parentElement.classList.add('active');
  }
});



const galleryItems = document.querySelectorAll('.gallery-item');
const thumbnails = document.querySelectorAll('.thumbnail');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.querySelector('.close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prevSlider = document.getElementById('prevSlider');
const nextSlider = document.getElementById('nextSlider');
let currentIndex = 0;

function updateMainSlider() {
    galleryItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
    });
    thumbnails.forEach((item, index) => {
        item.classList.toggle('selected', index === currentIndex);
    });
    updateLightboxThumbnails();
}

function updateLightboxThumbnails() {
    const lightboxThumbnailsContainer = document.createElement('div');
    lightboxThumbnailsContainer.classList.add('lightbox-thumbnails');

    thumbnails.forEach((item, index) => {
        const thumbnailClone = item.cloneNode(true);
        thumbnailClone.classList.add('lightbox-thumbnail');
        if (index === currentIndex) {
            thumbnailClone.classList.add('selected');
        }
        thumbnailClone.addEventListener('click', () => {
            currentIndex = index;
            lightboxImg.src = galleryItems[currentIndex].src;
            updateMainSlider();
        });
        lightboxThumbnailsContainer.appendChild(thumbnailClone);
    });

    const existingThumbnails = document.querySelector('.lightbox-thumbnails');
    if (existingThumbnails) {
        existingThumbnails.remove();
    }

    lightbox.appendChild(lightboxThumbnailsContainer);

    const imageCount = document.createElement('div');
    imageCount.classList.add('image-count');
    imageCount.innerText = `Imagem ${currentIndex + 1} de ${galleryItems.length}`;

    const existingCount = document.querySelector('.image-count');
    if (existingCount) {
        existingCount.remove();
    }

    lightbox.appendChild(imageCount);
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = item.src;
        currentIndex = index;
        updateLightboxThumbnails();
    });
});

thumbnails.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        updateMainSlider();
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? galleryItems.length - 1 : currentIndex - 1;
    lightboxImg.src = galleryItems[currentIndex].src;
    updateLightboxThumbnails();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === galleryItems.length - 1) ? 0 : currentIndex + 1;
    lightboxImg.src = galleryItems[currentIndex].src;
    updateLightboxThumbnails();
});

prevSlider.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? galleryItems.length - 1 : currentIndex - 1;
    updateMainSlider();
});

nextSlider.addEventListener('click', () => {
    currentIndex = (currentIndex === galleryItems.length - 1) ? 0 : currentIndex + 1;
    updateMainSlider();
});

updateMainSlider();

window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});


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

