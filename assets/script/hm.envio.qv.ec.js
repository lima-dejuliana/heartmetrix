$(document).ready(function () {
  // verificaEditar();

  $('input[name="genero"]').change(function () {
    const isCheckedFemale = $("input[name='genero']:checked").val() === 'F';

    if (isCheckedFemale) {
      if (document.querySelectorAll('.EC-ME').length > 0) {
        $('#22-EV').prop('required', true);
        $('#22-EV-null').prop('checked', false);
      }
    } else {
      $('#22-EV-null').prop('checked', true);
      $('#22-EV-view').hide();
    }
  });

  /* Click do avançar */
  $('[data-btn="next"]').click(function () {
    let retorno = validaCampos();

    if (retorno) {
      if ($(this).hasClass('envio')) {
        $('[data-id="load"]').css('display', 'flex');
        lerInputs();
        criarEnvioData();
        envioAjax();
        camposInp.length = 0;
        envioData.length = 0;
        filterData.length = 0;
      } else {
        let retornoSlide = plusSlides(1);
        $(this).text(retornoSlide ? 'SALVAR DADOS' : 'AVANÇAR');
        $('html, body').animate(
          {
            scrollTop: $('.areasl.active').offset(),
          },
          1000
        );
      }
    } else {
      camposInp.length = 0;
      envioData.length = 0;
      filterData.length = 0;
      return;
    }
  });

  /* Clique do voltar */
  $('[data-btn="previous"]').click(function () {
    let retornoSlide = plusSlides(-1);
    $('[data-btn="next"]').text(retornoSlide ? 'SALVAR DADOS' : 'AVANÇAR');
    $('html, body').animate(
      {
        scrollTop: $('.areasl.active').offset(),
      },
      800
    );
  });
});

function verificaEditar() {
  const objetoFiltrado = response.dataResult[0].campos.filter(
    (campo) => campo.id === 'e57734a2-0156-335f-16c5-cda2fbc59853'
  );
}

/*validar os campos required*/
function validaCampos() {
  let form = document.querySelector('.areasl.active');
  let errorMessages = document.getElementById('errorMessages');
  let invalidInputs = Array.from(form.querySelectorAll(':invalid'));

  // Remova todas as classes 'invalid' antes de começar a validação
  $('.invalid').removeClass('invalid');

  if (invalidInputs.length === 0) {
    // Se não houver campos inválidos, retorne true
    errorMessages.innerHTML = ''; // Limpa as mensagens de erro
    return true;
  } else {
    invalidInputs.forEach(function (item) {
      if (item.type == 'email') {
        $(item).addClass('invalid');
        $('#errorDisplay').text('Por favor, insira um e-mail válido.');
      } else if (item.type != 'radio') {
        $(item).addClass('invalid');
      } else {
        let lblRadio = item.closest('.item--radio').querySelector('.form__lbl');
        $(lblRadio).addClass('invalid');
      }
    });

    showAlert(
      'Preencha todos os campos antes de prosseguir para a próxima etapa!'
    );
    return false;
  }
}

function validaEmail() {
  let form = document.querySelector('.areasl.active');
  let campoEspecifico = form.querySelector('input[type="email"]');
  $(campoEspecifico).removeClass('invalid');
  if (
    campoEspecifico.value.length > 3 &&
    campoEspecifico &&
    campoEspecifico.validity &&
    !campoEspecifico.validity.valid
  ) {
    $('#errorDisplay').text('Por favor, insira um e-mail válido.');
    $(campoEspecifico).addClass('invalid');
  } else {
    $('#errorDisplay').text('');
  }
}

/*array com todos os inputs*/
let camposInp = [];
/*função com todos os inputs*/
function lerInputs() {
  if (document.querySelectorAll('.EC-ME').length > 0) {
    // $('#qldd-menopausada-quali').val($("input[name='EC-ME']:checked").val());
  } else if (document.querySelectorAll('.EV-meno').length > 0) {
    $('#qldd-menopausada-ambos').val($("input[name='22-EV']:checked").val());
  }
  $('input[data-idCampo]').each(function (index, item) {
    if (
      camposInp.filter((el) => el.campoId === $(item).attr('data-idCampo'))
        .length > 0
    ) {
      return;
    } else {
      inserirArray($(item));
    }
  });
}

/*função validar input:radio selecionado e inserir valores no array*/
function inserirArray(item) {
  let itemObj = '';
  if ($(item).prop('type') == 'radio') {
    let selectedValue = $("input[name='" + $(item).attr('name') + "']:checked");

    itemObj = {
      campoId: $(selectedValue).attr('data-idCampo'),
      campoValue: $(selectedValue).val(),
      campoName: $(selectedValue).attr('name'),
      addNotExists: true,
      processCalc: $(selectedValue).attr('data-processCalc'),
    };
  } else {
    itemObj = {
      campoId: $(item).attr('data-idCampo'),
      campoValue: $(item).val().replace(/,/g, '.'),
      campoName: $(item).attr('id').replace('qldd-', ''),
      addNotExists: true,
      processCalc: $(item).attr('data-processCalc'),
    };
  }
  camposInp.push(itemObj);
}

/*criar data ajax*/
let envioData = [];
let filterData = [];

function criarEnvioData() {
  let data = new Date(),
    dia = data.getDate().toString(),
    diaF = dia.length == 1 ? '0' + dia : dia,
    mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = mes.length == 1 ? '0' + mes : mes,
    anoF = data.getFullYear(),
    hora = data.getHours(),
    min = data.getMinutes();

  // Função para formatar minutos com 2 dígitos
  function formatarMinutos(minutos) {
    return minutos < 10 ? '0' + minutos : minutos;
  }

  min = formatarMinutos(min);

  let dataAmericana = anoF + '-' + mesF + '-' + diaF;
  let horaF = hora + ':' + min;
  envioData.push(
    {
      id: 'e57734a2-0156-335f-16c5-cda2fbc59853',
      value: dataAmericana,
      addNotExists: true,
      processCalc: false,
    },
    {
      id: 'c8846730-f11e-e885-5906-6044628f2e56',
      value: horaF,
      addNotExists: true,
      processCalc: false,
    }
  );
  filterData.push({
    id: 'e57734a2-0156-335f-16c5-cda2fbc59853',
    value: dataAmericana,
  });

  $(camposInp).each(function (index, item) {
    let itemEnvio = {
      id: item.campoId,
      /*campo data*/
      value: stringParaBoolean(item.campoValue),
      addNotExists: stringParaBoolean(item.addNotExists),
      processCalc: stringParaBoolean(item.processCalc),
    };
    envioData.push(itemEnvio);

    // campo email
    if (item.campoId == '4dcd7a92-74d3-2c5e-36c2-3a41a42209a4') {
      let itemFilter = { id: item.campoId, value: item.campoValue };
      filterData.push(itemFilter);
    }
  });
}

function stringParaBoolean(str) {
  if (str === 'true') {
    return true;
  } else if (str === 'false') {
    return false;
  } else if (str === 'null') {
    return null;
  } else {
    return str;
  }
}

/*envia o ajax*/
function envioAjax() {
  /*configurações header ajax*/
  let settings = {
    url: 'https://southamerica-east1-checkgo-e8680.cloudfunctions.net/apiV2/public/theme/answers/dc0234d3-83fb-42a8-9829-134f68558b2a',
    method: 'PUT',
    timeout: 0,
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay0wOHc3OUBjaGVja2dvLWU4NjgwLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstMDh3NzlAY2hlY2tnby1lODY4MC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaWF0IjoxNjkyNjY1OTQ3LjE5NCwiZXhwIjoxNzA4MjE3OTQ3LjE5NCwidWlkIjoiWEpxUDVVU2t6Y1lUM3pTQ3hxaFhDRkVsdzVLMiIsImNsYWltcyI6eyJ1c2VyUHVibGljIjp0cnVlfX0.LpmXePJfDI1PDfMf_5cW0gUk19m_RMyWk7Pjwx3FPPXvdqSae8ZTYWP4f8iBm1MZYXYCBeqxsoX0y9dh00TzWGRnw_sJMLeo2HeIAwscca0ZrT9Qh5tc3n5is0mUjZL7Kj6DBBrAQJqh1c7I3N6udyIGCYXtRfT_mYYBiLmkuQP3g3u6QR0-RvZZyf2_BcGUYBb4E8n--aUeff4EfYTToc9U-5vtGNxsIUqTfX0_xu9uA3czVotHGaPjupeN-MQjyKX7MV8anRCi6HpuI2Xfx3_b91bgUB3d3E5cbH8VJ2OhGWBXfdtt7LtTq0n1Ii_l8kuEBJ8npHlJe4ZYUx7TKA',
    },
    data: JSON.stringify({
      fields: envioData,
      filters: filterData,
      addAnswerIfNotExists: true,
    }),
  };

  // console.log('envio ajax');
  /*envio do ajax*/
  $.ajax(settings)
    .done(function (response) {
      // console.log('Feito:', response);
      window.location.href = './envio-obrigado.html';
    })
    .fail(function (error) {
      $('[data-id="load"]').css('display', 'none');
      showAlert('Não foi possível completar a solicitação. Tente novamente.');
      // console.log('Falha:', error);
      camposInp.length = 0;
      envioData.length = 0;
      filterData.length = 0;
    });
}
