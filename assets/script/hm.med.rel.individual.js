const dataArmazenado = localStorage.getItem('dataBusca');

if (dataArmazenado != null || dataArmazenado != '') {
  $('#tbMedRelInd').show();
  buscaPacientes(dataArmazenado);
  $('#filtro-data').val(dataArmazenado);
  localStorage.removeItem('dataBusca');
}

function buscaPacientes(inpData) {
  let settings = {
    url: 'https://southamerica-east1-checkgo-e8680.cloudfunctions.net/apiV2/public/theme/dc0234d3-83fb-42a8-9829-134f68558b2a/answers/null/0',
    method: 'POST',
    timeout: 0,
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay0wOHc3OUBjaGVja2dvLWU4NjgwLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstMDh3NzlAY2hlY2tnby1lODY4MC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaWF0IjoxNjkyNjY1OTQ3LjE5NCwiZXhwIjoxNzA4MjE3OTQ3LjE5NCwidWlkIjoiWEpxUDVVU2t6Y1lUM3pTQ3hxaFhDRkVsdzVLMiIsImNsYWltcyI6eyJ1c2VyUHVibGljIjp0cnVlfX0.LpmXePJfDI1PDfMf_5cW0gUk19m_RMyWk7Pjwx3FPPXvdqSae8ZTYWP4f8iBm1MZYXYCBeqxsoX0y9dh00TzWGRnw_sJMLeo2HeIAwscca0ZrT9Qh5tc3n5is0mUjZL7Kj6DBBrAQJqh1c7I3N6udyIGCYXtRfT_mYYBiLmkuQP3g3u6QR0-RvZZyf2_BcGUYBb4E8n--aUeff4EfYTToc9U-5vtGNxsIUqTfX0_xu9uA3czVotHGaPjupeN-MQjyKX7MV8anRCi6HpuI2Xfx3_b91bgUB3d3E5cbH8VJ2OhGWBXfdtt7LtTq0n1Ii_l8kuEBJ8npHlJe4ZYUx7TKA',
    },
    data: JSON.stringify({
      filters: [
        {
          id: 'e57734a2-0156-335f-16c5-cda2fbc59853',
          value: inpData,
        },
      ],
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    let itemHtml = '';
    $.each(response.dataResult, function (index, item) {
      //campo qualificação
      let qualificacao = validaDados(
        item,
        '7dac6dca-786a-60fd-d308-2dc34fa13b3e'
      );
      const classeCSS = Qualificacao.getClasseCSS(qualificacao);
      let = email = validaDados(item, '4dcd7a92-74d3-2c5e-36c2-3a41a42209a4');

      itemHtml +=
        '<tr>' +
        '<td><input type="radio" name="medRelIndId" id="' +
        validaDados(item, 'e57734a2-0156-335f-16c5-cda2fbc59853').replace(
          /T(.*)/,
          ''
        ) +
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
        '</td><td><a href="./usuario-qualidade-de-vida.html?=' +
        validaDados(item, 'e57734a2-0156-335f-16c5-cda2fbc59853').replace(
          /T(.*)/,
          ''
        ) +
        '?=' +
        email +
        '" class="btn__editar">Editar Qualidade de Vida</a><a href="./usuario-exames-clinicos.html?=' +
        validaDados(item, 'e57734a2-0156-335f-16c5-cda2fbc59853').replace(
          /T(.*)/,
          ''
        ) +
        '?=' +
        email +
        '"" class="btn__editar">Editar Exames Clínicos</a></td></tr>';
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
  let inpData = $('#filtro-data').val();

  if (inpData.length > 0) {
    localStorage.setItem('dataBusca', inpData);
    location.reload();
  } else {
    showAlert('Preencha a data para prosseguir!');
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
