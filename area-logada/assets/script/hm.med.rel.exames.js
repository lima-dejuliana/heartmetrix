let pageUrl = window.location.href;
let arraySel = pageUrl.split('?=');
let paciente = decodeURIComponent(arraySel[arraySel.length - 1]).toUpperCase();

$('#paciente').text(paciente || '');

const dados = JSON.parse(localStorage.getItem('exames'));

//console.log(dados);

dados.forEach((item) => {
  const inicioTb =
    '<div class="areacard">' +
    '<h2 class="areacard__title">Exames - ' +
    DateFormatter(item.data) +
    '</h2>' +
    '<div class="row">' +
    '<div class="col-lg-12">' +
    '<table class="tb stripe tbExames" id="tbExames-' +
    item.data +
    '">' +
    '<thead><tr><th>Exames</th><th>Resultado</th></tr></thead><tbody>';

  const finalTb = '</tbody></table></div></div></div>';

  let tbItem = '';

  item.exames.forEach((exame) => {
    tbItem += `<tr><td>${exame.nome}</td><td>${
      !isNaN(exame.value) && /\.\d\d/.test(exame.value)
        ? parseFloat(exame.value).toFixed(2)
        : exame.value
    } <span style="font-size:0.75em;font-style: italic;">${
      exame.medida
    }</span></td></tr>`;
  });

  $('#cardExames').append(inicioTb + tbItem + finalTb);

  // Inicializar a tabela DataTable (você pode personalizar as opções conforme necessário)
  let table = new DataTable($('#tbExames-' + item.data), {
    info: false,
    ordering: false,
    paging: true,
    lengthChange: false,
    searching: false,
    pagingType: 'simple_numbers',
    pageLength: 10,
    language: {
      emptyTable: 'Nenhum dado disponível na tabela',
      paginate: {
        previous:
          '<img src="./assets/images/icons/icon-arrow-circle-left.svg" alt="Anterior">',
        next: '<img src="./assets/images/icons/icon-arrow-circle-right.svg" alt="Próximo">',
      },
    },
  });
});

function DateFormatter(data) {
  const date = !data.includes('T')
    ? new Date(data + 'T00:00:00')
    : new Date(data);
  return date.toLocaleDateString('pt-BR');
}
