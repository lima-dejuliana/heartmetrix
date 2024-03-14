var authorization =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay0wOHc3OUBjaGVja2dvLWU4NjgwLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstMDh3NzlAY2hlY2tnby1lODY4MC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaWF0IjoxNzA4MDQzOTU5LjY5MiwiZXhwIjoxNzIzNTk1OTU5LjY5MiwidWlkIjoiWEpxUDVVU2t6Y1lUM3pTQ3hxaFhDRkVsdzVLMiIsImNsYWltcyI6eyJ1c2VyUHVibGljIjp0cnVlfX0.oF9kLU17OdU8T3OBpyuYXJfHdHP48krqRBlr4TsPgjnZc94FiKPI5isYy4mxWUxAQ5x4A44sMbdPnanx4G6OWDZIizAbU7h5dOfT2BWdovaAbQYi855mFEWConzTAJQ0kcpJLbqlQD58jiflPVfbNPw05wO4YzfZ6W0bU8DWGsRQ_isg5qkpl8xFSTPinuMrZo05ubt1-HNA0Jt4_2GrVRElYw3XOFyket-bu1OhviiL507kqz2FqWOgL2JYbG1Bf616y1onGtIa1PLSlFBhARoZQuhr4INJ7S1A_IbmI72HJ9cVzhLzu0pMSBDAgrku7uqNqrXQrU5FpQZxhGheGg';

let userId, userEmail, userType, userName;

/* ##### INÍCIO_VERIFICAÇÃO DO SESSION STORAGE ##### */
if (
  sessionStorage.getItem('userId') !== null &&
  sessionStorage.getItem('userEmail') !== null &&
  sessionStorage.getItem('userType') !== null &&
  sessionStorage.getItem('userName') !== null
) {
  // Verificar se os itens não estão vazios
  if (
    sessionStorage.getItem('userId') !== '' &&
    sessionStorage.getItem('userEmail') !== '' &&
    sessionStorage.getItem('userType') !== '' &&
    sessionStorage.getItem('userName') !== ''
  ) {
    // Faça algo com os itens, se necessário
    userId = sessionStorage.getItem('userId');
    userEmail = sessionStorage.getItem('userEmail');
    userType = sessionStorage.getItem('userType');
    userName = sessionStorage.getItem('userName');
  } else {
    if (!sessionStorage.getItem('redirected')) {
      sessionStorage.setItem('redirected', 'true');
      window.location.href = './login.html';
    } else {
      //console.log('Redirecionamento já ocorreu.');
    }
  }
} else {
  if (!sessionStorage.getItem('redirected')) {
    sessionStorage.setItem('redirected', 'true');
    window.location.href = './login.html';
  } else {
    //console.log('Redirecionamento já ocorreu.');
  }
}
/* ##### FIM_VERIFICAÇÃO DO SESSION STORAGE ##### */

/* ##### INÍCIO_LOGOUT ##### */
$('#btn-logout').on('click', function () {
  sessionStorage.removeItem('userId');
  sessionStorage.removeItem('userEmail');
  sessionStorage.removeItem('userType');
  sessionStorage.removeItem('userName');
  window.location.href = './login.html';
});
/* ##### FIM_LOGOUT ##### */

/* ##### INÍCIO_MENU DINÂNICO ##### */
const itensMenu = [
  {
    nome: 'Relatório gerencial',
    tipo: 'medico',
    link: 'medico-relatorio-gerencial.html',
    icon: 'icon-home-storage.svg',
    alt: 'icon home storage',
    status: '1',
  },
  {
    nome: 'Relatório individual',
    tipo: 'ambos',
    link: '-relatorio-individual.html',
    icon: 'icon-summarize.svg',
    alt: 'icon summarize',
    status: '1',
  },
  {
    nome: 'Qualidade de vida',
    tipo: 'ambos',
    link: 'form-qualidade-de-vida.html',
    icon: 'icon-ecg-heart.svg',
    alt: 'icon ecg heart',
    status: '1',
  },
  {
    nome: 'Exames clínicos',
    tipo: 'ambos',
    link: 'form-exames-clinicos.html',
    icon: 'icon-stethoscope.svg',
    alt: 'icon stethoscope',
    status: '1',
  },
  {
    nome: 'Educacional',
    tipo: 'medico',
    link: 'medico-educacional.html',
    icon: 'icon-school.svg',
    alt: 'icon school',
    status: '1',
  },
  {
    nome: 'Cadastro Paciente',
    tipo: 'medico',
    link: 'cadastro-paciente.html',
    icon: 'icon-user-plus.svg',
    alt: 'icon user plus',
    status: '1',
  },
  {
    nome: 'Cadastro Médico',
    tipo: 'admin',
    link: 'cadastro-medico.php',
    icon: 'icon-user-plus.svg',
    alt: 'icon user plus',
    status: '1',
  },
  {
    nome: 'Lista Pacientes',
    tipo: 'admin',
    link: 'lista-pacientes.html',
    icon: 'icon-list.svg',
    alt: 'icon list',
    status: '1',
  },
];
let menu = '';
itensMenu.map((item) => {
  if (userType == 'admin') {
    menu +=
      item.tipo == userType
        ? '<li><a href="./' +
          (item.link == '-relatorio-individual.html'
            ? userType == 'paciente'
              ? 'usuario'
              : 'medico'
            : '') +
          item.link +
          '">' +
          '<picture class="areah__nav__icon">' +
          '<source srcset="./assets/images/icons/' +
          item.icon +
          '" type="image/svg">' +
          '<img src="./assets/images/icons/' +
          item.icon +
          '" alt="' +
          item.alt +
          '">' +
          '</picture>' +
          '<span class="areah__nav__desc">' +
          item.nome +
          '</span>' +
          '</a></li>'
        : '';
  } else {
    menu +=
      item.tipo == userType || item.tipo == 'ambos'
        ? '<li><a href="./' +
          (item.link == '-relatorio-individual.html'
            ? userType == 'paciente'
              ? 'usuario'
              : 'medico'
            : '') +
          item.link +
          '">' +
          '<picture class="areah__nav__icon">' +
          '<source srcset="./assets/images/icons/' +
          item.icon +
          '" type="image/svg">' +
          '<img src="./assets/images/icons/' +
          item.icon +
          '" alt="' +
          item.alt +
          '">' +
          '</picture>' +
          '<span class="areah__nav__desc">' +
          item.nome +
          '</span>' +
          '</a></li>'
        : '';
  }
});
$('.areah__nav__list').html(menu);
/* ##### FIM_MENU DINÂNICO ##### */

/* ##### INÍCIO_FUNÇÃO PARA VERIFICAR RADIOS DE MENOPAUSA ##### */
function checkMenopausa() {
  const isCheckedFemale = $("input[name='genero']:checked").val() === 'F';

  if (isCheckedFemale) {
    if (document.querySelectorAll('.EC-ME').length > 0) {
      $('#22-EV').prop('required', true);
      $('#22-EV-null').prop('checked', false);
      $('#EC-ME').prop('required', true);
      $('#EC-ME-null').prop('checked', false);
      $('#EC-ME-view').show();
    }
  } else {
    $('#22-EV-null').prop('checked', true);
    $('#22-EV-view').hide();
    $('#EC-ME-null').prop('checked', true);
    $('#EC-ME-view').hide();
  }
}
/* ##### FIM_FUNÇÃO PARA VERIFICAR RADIOS DE MENOPAUSA ##### */

$(document).ready(function () {
  /* ##### INÍCIO_VISUALIZAÇÃO DE SENHA ##### */
  if (document.querySelectorAll('.form__visenha').length > 0) {
    $('.form__visenha').click(function () {
      $(this).toggleClass('active');
      let inpSenha = $(this).parent().find('.form__inp');
      $(inpSenha).attr('type', (_, attr) =>
        attr == 'text' ? 'password' : 'text'
      );
    });
  }
  /* ##### FIM_VISUALIZAÇÃO DE SENHA ##### */

  /* ##### INÍCIO_MENU MOBILE ##### */
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
  /* ##### FIM_MENU MOBILE ##### */

  /* ##### INÍCIO_TABELA DE EXEMPLO PARA APRESENTAÇÃO DE RELATÓRIOS ##### */
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
            emptyTable: 'Nenhum dado disponível na tabela',
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
          emptyTable: 'Nenhum dado disponível na tabela',
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
  /* ##### FIM_TABELA DE EXEMPLO PARA APRESENTAÇÃO DE RELATÓRIOS ##### */

  /* ##### INÍCIO_GRÁFICO DE EXEMPLO PARA APRESENTAÇÃO DE RELATÓRIOS ##### */
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
  /* ##### FIM_GRÁFICO DE EXEMPLO PARA APRESENTAÇÃO DE RELATÓRIOS ##### */
});

/* ##### INÍCIO_SLIDE PARA APRESENTAR OS CAMPOS DE FORMULÁRIO EM APENAS 1 PÁGINA ##### */
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
/* ##### FIM_SLIDE PARA APRESENTAR OS CAMPOS DE FORMULÁRIO EM APENAS 1 PÁGINA ##### */

/* ##### INÍCIO_ALERT CUSTOMIZADO ##### */
function showAlert(message) {
  const alertBox = document.getElementById('customAlert');
  const messageSpan = alertBox.querySelector('.message');
  const closeButton = alertBox.querySelector('.close-button');

  messageSpan.textContent = message;
  alertBox.style.display = 'flex';

  closeButton.addEventListener('click', function () {
    alertBox.style.display = 'none';
  });
}
/* ##### FIM_ALERT CUSTOMIZADO ##### */

/* ##### INÍCIO_TESTE WebCrypto ##### */
if (window.crypto && window.crypto.subtle) {
  //console.log('WebCrypto API está disponível.');
} else {
  //console.error('WebCrypto API não está disponível neste ambiente.');
}
