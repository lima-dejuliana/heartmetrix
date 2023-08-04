$(document).ready(function () {
  $('.form__visenha').click(function () {
    $(this).toggleClass('active');
    let inpSenha = $(this).parent().find('.form__inp');
    $(inpSenha).attr('type', (_, attr) =>
      attr == 'text' ? 'password' : 'text'
    );
  });
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
    }
  });

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
});
