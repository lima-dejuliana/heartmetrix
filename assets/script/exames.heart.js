$(document).ready(function () {
  /*Click do avançar*/
  $('[data-btn="next"]').click(function () {
    let retorno = validaCampos();

    if (retorno == true) {
      if ($(this).hasClass('envio')) {
        $('[data-id="load"]').css('display', 'flex');
        lerInputs();
        criarEnvioData();
        // envioAjax();

        envioData = '';
      } else {
        let retornoSlide = plusSlides(1);

        if (retornoSlide == true) {
          $(this).text('SALVAR DADOS');
        } else {
          $(this).text('AVANÇAR');
        }
      }
    } else {
      return;
    }
    $('[data-id="load"]').css('display', 'none');
  });

  /*Clique do voltar*/
  $('[data-btn="previous"]').click(function () {
    let retornoSlide = plusSlides(-1);

    if (retornoSlide == true) {
      $('[data-btn="next"]').text('SALVAR DADOS');
    } else {
      $('[data-btn="next"]').text('AVANÇAR');
    }
  });
});

/*validar os campos required*/
function validaCampos() {
  let form = document.querySelector('.areasl.active');
  let errorMessages = document.getElementById('errorMessages');
  let invalidInputs = Array.from(form.querySelectorAll(':invalid'));

  if (invalidInputs.length === 0) {
    retorno = true;
    errorMessages.innerHTML = ''; /*Limpa as mensagens de erro*/
  } else {
    retorno = false;
    showAlert(
      'Preencha todos os campos antes de prosseguir para a próxima etapa!'
    );
  }
  return retorno;
}

/*array com todos os inputs*/
let camposInp = [];
/*função com todos os inputs*/
function lerInputs() {
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
  console.log(camposInp);
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
    };
  } else {
    itemObj = {
      campoId: $(item).attr('data-idCampo'),
      campoValue: $(item).val(),
      campoName: $(item).attr('id').replace('qldd-', ''),
    };
  }
  camposInp.push(itemObj);
}

/*criar data ajax*/
let envioData = [];

function criarEnvioData() {
  let data = new Date(),
    dia = data.getDate().toString(),
    diaF = dia.length == 1 ? '0' + dia : dia,
    mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = mes.length == 1 ? '0' + mes : mes,
    anoF = data.getFullYear(),
    hora = data.getHours(),
    min = data.getMinutes();

  let dataAmericana = anoF + '-' + mesF + '-' + diaF;
  let horaF = hora + ':' + min;
  envioData.push(
    {
      id: '89f34d7d-1449-d1af-77e6-bcb06fa25ef1',
      value: dataAmericana,
    },
    {
      id: '06015c7f-0d9b-9e7f-8497-d0eb9662e67d',
      value: horaF,
    }
  );

  $(camposInp).each(function (index, item) {
    let itemEnvio = {
      id: item.campoId,
      // value: item.campoValue,
      value:
        item.campoId == 'a13d0055-6127-3276-6de7-3d13e37601e6'
          ? parseInt(item.campoValue)
          : item.campoValue,
    };
    envioData.push(itemEnvio);
  });
  console.log(envioData);
}

/*envia o ajax*/
function envioAjax() {
  /*configurações header ajax*/
  let settings = {
    url: 'https://southamerica-east1-checkgo-e8680.cloudfunctions.net/apiV2/public/theme/answers/c3bf3d66-adf7-82aa-b644-bcdf25b589c3',
    method: 'POST',
    timeout: 0,
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay0wOHc3OUBjaGVja2dvLWU4NjgwLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstMDh3NzlAY2hlY2tnby1lODY4MC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaWF0IjoxNjg5ODgwNTk0Ljg0MywiZXhwIjoxNjkyNDcyNTk0Ljg0MywidWlkIjoiWEpxUDVVU2t6Y1lUM3pTQ3hxaFhDRkVsdzVLMiIsImNsYWltcyI6eyJ1c2VyUHVibGljIjp0cnVlfX0.NwnKYGeDAWM3uiERgEIPsZRIkgveGdij1P8QkGXljsv3FD8N7IZcugzh4s1qvHtEv0GriNo6X3DFs0RngcCqu6bzBY66JFmzRZkUzU0AYuVjd6AwW_1dFXwiim1VNJ_SPWX3nLR8qos1p--Erwi3vWDUme-lTa8KSdEmGMvsamToTOkgGszhp5qUr7X3tl6JoEsCPI1vcuPECMHWMVks8Af7dLcWAqtbwLpGi-YnpXpALCjuzm8_u7E2CMDy6wgb_i17svj95bXKwCpEfhSu8XoFb5ZddvQsBhhjaWhtNs5szJjYXFnRsXq9rqNTfko0aXijURf6eKNJEDY6zGGcZw',
    },
    data: JSON.stringify({
      fields: envioData,
    }),
  };

  // console.log('envio ajax');
  /*envio do ajax*/
  $.ajax(settings)
    .done(function (response) {
      console.log('Feito:', response);
      showAlert('Envio realizado com sucesso!');
    })
    .fail(function (error) {
      showAlert('Não foi possível completar a solicitação. Tente novamente.');
      console.log('Falha:', error);
    });
}
