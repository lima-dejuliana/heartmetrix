let timeoutID;
function reiniciarContagem() {
  clearTimeout(timeoutID);
  timeoutID = setInterval(() => {
    carouselAut(); // Mudança para a próxima imagem
  }, 5000);
}

let carouselIndex = 1;
carouselShow(carouselIndex);

// Next/previous controls
function carouselPlus(n) {
  clearTimeout(timeoutID);
  carouselShow((carouselIndex += n));
  reiniciarContagem();
}

carouselAut(carouselIndex);

function carouselAut(n) {
  clearTimeout(timeoutID);
  carouselShow(n);
  carouselIndex++;
  reiniciarContagem();
}

// Thumbnail image controls
function carouselCurrent(n) {
  carouselShow((carouselIndex = n));
  changePre(carouselIndex); // Altera a imagem prévia ao clicar em uma miniatura
}

function carouselShow(n) {
  let i;
  let slides = document.getElementsByClassName('cap__dados__slide');
  let thumbs = document.getElementsByClassName('cap__dados__demo');
  let areaThumbs = document.getElementsByClassName('cap__dados__column');
  if (n > slides.length) {
    carouselIndex = 1;
  }
  if (n < 1) {
    carouselIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < areaThumbs.length; i++) {
    areaThumbs[i].style.display = 'block';
  }
  for (i = 0; i < thumbs.length; i++) {
    thumbs[i].className = thumbs[i].className.replace(' active', '');
  }
  if (carouselIndex > slides.length) {
    carouselIndex = 1;
  }
  slides[carouselIndex - 1].style.display = 'block';
  thumbs[carouselIndex - 1].className += ' active';
  document.getElementById(`pre${carouselIndex}`).style.display = 'none';
}

// document.addEventListener('DOMContentLoaded', function () {
//   autoChange();
// });

// botão menu
let menuButton = document.getElementById('menu-button');
let menuNav = document.querySelector('.menu-nav');

menuButton.addEventListener('click', function () {
  if (menuNav.style.display === 'block') {
    menuNav.style.display = 'none';
  } else {
    menuNav.style.display = 'block';
    menuButton.style.display = 'none';
  }
});

let closeButton = document.getElementById('moboclose');
closeButton.addEventListener('click', function () {
  document.getElementById('menu-nav').style.display = 'none';
  menuButton.style.display = 'block';
});

// Slide beneficios
let width = window.innerWidth;
let slideIndex = 1;
if (width < 600) {
  showSlides(slideIndex);
}
// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}
// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName('benef');
  //let dot = document.getElementsByClassName('dot');
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  // for (i = 1; i < dot.length; i++) {
  //   dot[i].className = dot[i].className.replace(' active', '');
  // }
  slides[slideIndex - 1].style.display = 'flex';
  //dot[slideIndex - 1].className += ' active';
}

window.addEventListener('resize', function () {
  width = window.innerWidth;
  if (width < 600) {
    showSlides(slideIndex);
  }
});
