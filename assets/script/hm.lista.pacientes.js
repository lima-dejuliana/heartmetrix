buscaPacientes();

function buscaPacientes() {
  let settings = {
    url: 'https://southamerica-east1-checkgo-e8680.cloudfunctions.net/apiV2/public/theme/723b7a2a-e8ca-9b51-9f45-f0b7e8bf042c/answers/null/0',
    method: 'POST',
    timeout: 0,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    data: JSON.stringify({
      filters: [
        // {
        //   id: 'e57734a2-0156-335f-16c5-cda2fbc59853',
        //   value: inpDataInicio,
        //   operator: '>=',
        // },
        // {
        //   id: 'e57734a2-0156-335f-16c5-cda2fbc59853',
        //   value: inpDataFinal,
        //   operator: '<=',
        // },
      ],
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    let itemHtml = '';
    $.each(response.dataResult, function (index, item) {
      let email = validaDados(item, '28b6b1fd-7d09-88e4-16dc-e5cc7d54a2d0');

      itemHtml +=
        '<tr>' +
        '<td><input type="hidden" name="tbListaPacientesId" id="' +
        validaDados(item, '0171bd38-710a-cc8a-a60e-603346301926').replace(
          /T(.*)/,
          ''
        ) +
        '"></td><td>' +
        validaDados(item, 'cb04940a-9433-0a80-6215-ffa1d6d3ec32') +
        '</td><td>' +
        email +
        '</td><td>' +
        (validaDados(item, '99d397a5-3712-e28c-f7f2-c85604fab92a') == 'F'
          ? 'Feminino'
          : 'Masculino') +
        '</td><td>' +
        validaDados(item, 'd279b8b6-e6f8-cfb4-ed05-cf8792b5b53b') +
        '</td></tr>';
    });
    $('#tbListaPacientes tbody').html(itemHtml);

    let table = new DataTable($('#tbListaPacientes'), {
      info: false,
      ordering: false,
      searching: true,
      lengthChange: false,
      scrollX: true,
      pagingType: 'simple_numbers',
      pageLength: 8,
      language: {
        emptyTable: 'Nenhum dado disponível na tabela',
        search: '',
        searchPlaceholder: 'Digite sua pesquisa aqui',
        paginate: {
          previous:
            '<img src="./assets/images/icons/icon-arrow-circle-left.svg" alt="Anterior">',
          next: '<img src="./assets/images/icons/icon-arrow-circle-right.svg" alt="Próximo">',
        },
      },
    });
  });
}

function validaDados(item, idcampo) {
  let itemFiltro = item.campos.filter((el) => el.id == idcampo);
  if (itemFiltro.length > 0) {
    return itemFiltro[0].value;
  } else {
    return '-';
  }
}
