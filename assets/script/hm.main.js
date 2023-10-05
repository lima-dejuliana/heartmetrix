var authorization =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay0wOHc3OUBjaGVja2dvLWU4NjgwLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstMDh3NzlAY2hlY2tnby1lODY4MC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaWF0IjoxNjkyNjY1OTQ3LjE5NCwiZXhwIjoxNzA4MjE3OTQ3LjE5NCwidWlkIjoiWEpxUDVVU2t6Y1lUM3pTQ3hxaFhDRkVsdzVLMiIsImNsYWltcyI6eyJ1c2VyUHVibGljIjp0cnVlfX0.LpmXePJfDI1PDfMf_5cW0gUk19m_RMyWk7Pjwx3FPPXvdqSae8ZTYWP4f8iBm1MZYXYCBeqxsoX0y9dh00TzWGRnw_sJMLeo2HeIAwscca0ZrT9Qh5tc3n5is0mUjZL7Kj6DBBrAQJqh1c7I3N6udyIGCYXtRfT_mYYBiLmkuQP3g3u6QR0-RvZZyf2_BcGUYBb4E8n--aUeff4EfYTToc9U-5vtGNxsIUqTfX0_xu9uA3czVotHGaPjupeN-MQjyKX7MV8anRCi6HpuI2Xfx3_b91bgUB3d3E5cbH8VJ2OhGWBXfdtt7LtTq0n1Ii_l8kuEBJ8npHlJe4ZYUx7TKA';

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
