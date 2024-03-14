const dataArmazenadoInicio = localStorage.getItem('dataInicio');
const dataArmazenadoFinal = localStorage.getItem('dataFinal');

if (
  (dataArmazenadoInicio != null || dataArmazenadoInicio != '') &&
  (dataArmazenadoFinal != null || dataArmazenadoFinal != '')
) {
  $('#tbMedRelInd').show();
  buscaPacientes(dataArmazenadoInicio, dataArmazenadoFinal);
  $('#filtro-data-inicio').val(dataArmazenadoInicio);
  $('#filtro-data-final').val(dataArmazenadoFinal);
  localStorage.removeItem('dataInicio');
  localStorage.removeItem('dataFinal');
}

function buscaPacientes(inpDataInicio, inpDataFinal) {
  let settings = {
    url: 'https://southamerica-east1-checkgo-e8680.cloudfunctions.net/apiV2/public/theme/dc0234d3-83fb-42a8-9829-134f68558b2a/answers/null/0',
    method: 'POST',
    timeout: 0,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    data: JSON.stringify({
      filters: [
        {
          id: 'e57734a2-0156-335f-16c5-cda2fbc59853',
          value: inpDataInicio,
          operator: '>=',
        },
        {
          id: 'e57734a2-0156-335f-16c5-cda2fbc59853',
          value: inpDataFinal,
          operator: '<=',
        },
      ],
    }),
  };

  $.ajax(settings).done(function (response) {
    //console.log(response);
    let result = response.dataResult.sort((a, b) =>
      a.dataCheck < b.dataCheck ? 1 : a.dataCheck > b.dataCheck ? -1 : 0
    );
    let itemHtml = '';
    $.each(result, function (index, item) {
      //campo qualificação
      let qualificacao = validaDados(
        item,
        '7dac6dca-786a-60fd-d308-2dc34fa13b3e'
      );
      const classeCSS = Qualificacao.getClasseCSS(qualificacao);
      let = email = validaDados(item, '4dcd7a92-74d3-2c5e-36c2-3a41a42209a4');
      let dataCad = validaDados(
        item,
        'e57734a2-0156-335f-16c5-cda2fbc59853'
      ).replace(/T(.*)/, '');

      itemHtml +=
        '<tr>' +
        '<td><input type="radio" name="medRelIndId" id="' +
        dataCad +
        '?=' +
        email +
        '"></td><td>' +
        validaDados(item, 'efca7027-fdac-825d-a9a1-d7ce0e710434') +
        '</td><td>' +
        email +
        '</td><td>' +
        (validaDados(item, '32aa8ed8-a545-be32-96d7-aa900674249d') == 'F'
          ? 'Feminino'
          : 'Masculino') +
        '</td><td>' +
        validaDados(item, 'e6b22050-fbe2-8b58-5744-7819a8e77146') +
        '</td><td>' +
        validaDados(item, 'cba14097-60a1-1441-1547-133b1548d7ed') +
        '<td><span class="tb__status ' +
        classeCSS +
        '">' +
        qualificacao +
        '</td><td><a href="./form-qualidade-de-vida.html?=' +
        validaDados(item, 'e57734a2-0156-335f-16c5-cda2fbc59853').replace(
          /T(.*)/,
          ''
        ) +
        '?=' +
        email +
        '" class="btn__editar">Editar Qualidade de Vida</a><a href="./form-exames-clinicos.html?=' +
        validaDados(item, 'e57734a2-0156-335f-16c5-cda2fbc59853').replace(
          /T(.*)/,
          ''
        ) +
        '?=' +
        email +
        '"" class="btn__editar">Editar Exames Clínicos</a></td><td><button class="btn__editar btnRecalcular" type="button" data-cadastro="' +
        dataCad +
        '" data-email="' +
        email +
        '">Recalcular</button></td></tr>';
    });
    $('#tbMedRelInd tbody').html(itemHtml);

    let table = new DataTable($('#tbMedRelInd'), {
      info: false,
      ordering: false,
      searching: true,
      lengthChange: false,
      scrollX: true,
      pagingType: 'simple_numbers',
      pageLength: 5,
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

    $('.btnRecalcular').on('click', function () {
      recalcularDados($(this).data('cadastro'), $(this).data('email'));
    });
  });
}

function recalcularDados(dataCad, email) {
  $('[data-id="load"]').css('display', 'flex');
  let settings = {
    url: 'https://southamerica-east1-checkgo-e8680.cloudfunctions.net/apiV2/public/theme/answers/dc0234d3-83fb-42a8-9829-134f68558b2a',
    method: 'PUT',
    timeout: 0,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    data: JSON.stringify({
      filters: [
        {
          id: 'e57734a2-0156-335f-16c5-cda2fbc59853',
          value: dataCad,
          operator: '==',
        },
        {
          id: '4dcd7a92-74d3-2c5e-36c2-3a41a42209a4',
          value: email,
          operator: '==',
        },
      ],
      processCalcAll: true,
    }),
  };

  $.ajax(settings)
    .done(function (response) {
      $('[data-id="load"]').css('display', 'none');
      showAlert('Dados atualizados com sucesso.');
    })
    .fail(function (error) {
      $('[data-id="load"]').css('display', 'none');
      showAlert('Não foi possível atualizar os dados. Tente novamente.');
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

$('[data-btn="next-tbMedRelInd"]').click(function () {
  let verificaSelecionado = $("input[name='medRelIndId']:checked");
  if (verificaSelecionado.length > 0) {
    window.location.href =
      './medico-relatorio-individual-det.html?=' + $(verificaSelecionado)[0].id;
  } else {
    showAlert('Selecione algum paciente para prosseguir!');
  }
});

$('#btn-busca-filtro').click(function () {
  let inpDataInicio = $('#filtro-data-inicio').val();
  let inpDataFinal = $('#filtro-data-final').val();

  if (!inpDataInicio || !inpDataFinal) {
    showAlert('Por favor, preencha ambas as datas.');
  } else if (inpDataInicio > inpDataFinal) {
    showAlert('A data de início não pode ser maior que a data de fim.');
  } else if (inpDataFinal < inpDataInicio) {
    showAlert('A data de fim não pode ser menor que a data de início.');
  } else {
    localStorage.setItem('dataInicio', inpDataInicio);
    localStorage.setItem('dataFinal', inpDataFinal);
    location.reload();
  }
});

class Qualificacao {
  static getClasseCSS(qualificacao) {
    switch (qualificacao) {
      case 'Péssimo':
        return 'st--pes';
      case 'Ruim':
        return 'st--ruim';
      case 'Regular':
        return 'st--reg';
      case 'Bom':
        return 'st--bom';
      case 'Ótimo':
        return 'st--otimo';
      default:
        return '';
    }
  }
}
