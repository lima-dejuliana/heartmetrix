$(document).ready(function () {
  if (document.querySelectorAll('.form__visenha').length > 0) {
    $('.form__visenha').click(function () {
      $(this).toggleClass('active');
      let inpSenha = $(this).parent().find('.form__inp');
      $(inpSenha).attr('type', (_, attr) =>
        attr == 'text' ? 'password' : 'text'
      );
    });
  }

  if (document.querySelectorAll('.areah__hamb').length > 0) {
    $('.areah__hamb.mobile').click(function () {
      let isActive = $('.areah__nav').hasClass('active');
      if (isActive == true) {
        $('.areah__nav').removeClass('active');
        $('.areah__nav').addClass('noactive');
      } else {
        $('.areah__nav').removeClass('noactive');
        $('.areah__nav').addClass('active');
      }
    });
    $('.areah__hamb.desk').click(function () {
      $('.areah__nav').toggleClass('off', 300, 'easeOutSine');
      $('main').toggleClass('off', 300, 'easeOutSine');
    });
  }

  if (document.querySelectorAll('.tb').length > 0) {
    $('.tb').each(function (index, table) {
      let dataTb = $(this).attr('data-table');
      if (dataTb == 'tb-smp') {
        let table = new DataTable($(this), {
          info: false,
          ordering: false,
          paging: false,
          searching: false,
        });
      } else if (dataTb == 'tb-pag') {
        let table = new DataTable($(this), {
          info: false,
          ordering: false,
          searching: false,
          lengthChange: false,
          scrollX: true,
          pagingType: 'simple_numbers',
          pageLength: 5,
          language: {
            paginate: {
              previous:
                '<img src="./assets/images/icons/icon-arrow-circle-left.svg" alt="Anterior">',
              next: '<img src="./assets/images/icons/icon-arrow-circle-right.svg" alt="Próximo">',
            },
          },
        });
      } else if (dataTb == 'tb-spag') {
        let table = new DataTable($(this), {
          info: false,
          ordering: false,
          searching: true,
          lengthChange: false,
          scrollX: true,
          pagingType: 'simple_numbers',
          pageLength: 5,
          language: {
            search: '',
            paginate: {
              previous:
                '<img src="./assets/images/icons/icon-arrow-circle-left.svg" alt="Anterior">',
              next: '<img src="./assets/images/icons/icon-arrow-circle-right.svg" alt="Próximo">',
            },
          },
        });
      }
    });
  }

  if (document.querySelectorAll('.myChart').length > 0) {
    $('.myChart').each(function (index, chart) {
      let ctx = $(this);

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['60+', '20 - 40', '40 - 60'],
          datasets: [
            {
              label: '# of Votes',
              data: [15, 40, 45],
              borderWidth: 1,
              backgroundColor: [
                'rgba(96, 195, 173, 1)',
                'rgba(53, 140, 203, 1)',
                'rgba(79, 198, 224, 1)',
                'rgba(53, 203, 83, 1)',
                'rgba(198, 203, 53, 1)',
                'rgba(164, 53, 203, 1)',
              ],
            },
          ],
        },

        options: {
          plugins: {
            legend: {
              position: 'right',
              // align: 'end',
              labels: {
                usePointStyle: true,
                font: {
                  size: 14, // Altere esse valor para o tamanho da fonte desejado
                },
              },
            },
          },
          cutout: 70,
          scales: {
            x: {
              display: false,
              grid: {
                display: false,
              },
            },
            y: {
              display: false,
              grid: {
                display: false,
              },
            },
          },
        },
      });
    });
  }
});

if (document.querySelectorAll('.areasl').length > 0) {
  if (window.innerWidth < 800) {
    let $parentDiv = $('#areadots').parent('.sec').parent('.container');
    $parentDiv.css({
      paddingTop: '40px',
    });
  }

  let pagQual = document.querySelectorAll('.areasl');
  let dots = '';

  pagQual.forEach(function (item, index) {
    dots += '<span class="dot"></span>';
  });
  document.querySelector('#areadots').innerHTML = dots;

  let slideIndex = 1;
  showSlides(slideIndex);

  /*Next/previous controls*/
  function plusSlides(n) {
    showSlides((slideIndex += n));
    return retornoSlide;
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName('areasl');
    let dots = document.getElementsByClassName('dot');
    if (n == slides.length) {
      document.querySelector('[data-btn="next"]').className += ' envio';
      retornoSlide = true;
    } else {
      document.querySelector('[data-btn="next"]').classList.remove('envio');
      retornoSlide = false;
    }
    if (n > slides.length) {
      slideIndex = slides.length;
    }
    if (n < 1) {
      slideIndex = 1;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].classList.remove('active');
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[slideIndex - 1].className += ' active';
    dots[slideIndex - 1].className += ' active';
  }
}

/*alert customizado*/
function showAlert(message) {
  var alertBox = document.getElementById('customAlert');
  var messageSpan = alertBox.querySelector('.message');
  var closeButton = alertBox.querySelector('.close-button');

  messageSpan.textContent = message;
  alertBox.style.display = 'flex';

  closeButton.addEventListener('click', function () {
    alertBox.style.display = 'none';
  });
}
