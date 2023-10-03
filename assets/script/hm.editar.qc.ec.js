let arrayIds = [];

$('[data-view="true"]').each(function () {
  if (
    arrayIds.length > 0 &&
    arrayIds.filter((el) => el.id === $(this).attr('data-idCampo')).length > 0
  ) {
    return;
  } else {
    arrayIds.push({
      id: $(this).attr('data-idCampo'),
      type: $(this).attr('type'),
    });
  }
});

let emailSel;
let dataSel;

const pageUrl = window.location.href;
const padrao = /\?=/;

if (pageUrl.match(padrao)) {
  console.log('A string contém o trecho desejado.');
  let arraySel = pageUrl.split('?=');
  dataSel = arraySel[arraySel.length - 2];
  emailSel = arraySel[arraySel.length - 1];

  buscaResult();
} else {
  console.log('A string não contém o trecho desejado.');
}

function buscaResult() {
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
          id: '4dcd7a92-74d3-2c5e-36c2-3a41a42209a4',
          value: emailSel,
        },
        {
          id: 'e57734a2-0156-335f-16c5-cda2fbc59853',
          value: dataSel,
        },
      ],
    }),
  };

  $.ajax(settings)
    .done(function (response) {
      console.log(response.dataResult);
      montarCampos(response.dataResult);
    })
    .fail(function (error) {
      showAlert('Não foi possível apresentar as informações. Tente novamente.');
    });
}

function montarCampos(dataResult) {
  $(arrayIds).each(function (index, item) {
    const objetoFiltrado = dataResult[0].campos.filter(
      (campo) => campo.id === item.id
    );

    if (item.type != 'radio') {
      $('[data-idCampo="' + item.id + '"]').val(objetoFiltrado[0].value);
    } else if (item.type == 'radio') {
      const radiosItem = $('[data-idCampo="' + item.id + '"]');
      radiosItem.prop('checked', false); // Desmarca todos os radios com o mesmo data-idCampo

      const radioCorrespondente = radiosItem.filter(function () {
        if (typeof objetoFiltrado[0].value != 'string') {
          return parseFloat($(this).val()) === objetoFiltrado[0].value;
        } else {
          return $(this).val() === objetoFiltrado[0].value;
        }
      });

      radioCorrespondente.prop('checked', true); // Marca o radio correspondente
    }
  });
}
