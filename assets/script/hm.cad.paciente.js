$(document).ready(function () {
  const guid = uuidv4();
  $('#idCampoGuid').val(guid);
});

function atualizarMedicos() {
  const medicoSelect = document.getElementById('cadMedico');
  const estadoSelecionado = $('select#cadUF option:selected').text();
  const cidadeSelecionada = $('select#cadCidade option:selected').text();

  let settings = {
    url: 'https://southamerica-east1-checkgo-e8680.cloudfunctions.net/apiV2/public/theme/a3081220-d735-4f13-183e-a6957d6af534/answers/null/0',
    method: 'POST',
    timeout: 0,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    data: JSON.stringify({
      filters: [
        {
          id: '93cfd6b2-f877-0380-adc7-bc53dfd10150',
          value: estadoSelecionado,
          operator: '==',
        },
        {
          id: 'a4e1dccc-748e-911b-056b-21a0f19f8cfe',
          value: cidadeSelecionada,
          operator: '==',
        },
      ],
    }),
  };

  $.ajax(settings)
    .done(function (response) {
      /*** Mapeando campos de response.dataResult ***/
      const campos = response.dataResult.map((item) => item.campos);
      /*** Encontrar o nome do paciente para ser apresentado ***/
      let medicoHtml =
        '<option value="" disabled selected>Selecione um médico</option>';
      campos.map((item) => {
        const idMedico = item.find(
          (el) => el.id === 'c03eb5b1-88a9-0a65-70dc-cb4c69e6a9fd'
        ).value;
        const emailMedico = item.find(
          (el) => el.id === '95a4c111-684a-25c2-0c17-8f121e819678'
        ).value;
        const nomeMedico = item.find(
          (el) => el.id === '5538d2b2-07d1-078d-2208-56a3dc9def85'
        ).value;

        medicoHtml +=
          '<option value="' +
          idMedico +
          '" data-emailMedico=' +
          emailMedico +
          '>' +
          nomeMedico +
          '</option>';
      });
      $(medicoSelect).html(medicoHtml);
      $(medicoSelect).prop('disabled', false);
    })
    .fail(function (error) {
      $('[data-id="load"]').css('display', 'none');
      showAlert('Não foi possível completar a solicitação. Tente novamente.');
      console.log('Falha:', error);
    });
}

function dadosMedico() {
  const medicoSelecionado = $('select#cadMedico option:selected');

  $('#cadMedicoID').val($(medicoSelecionado).val());
  $('#cadMedicoNome').val($(medicoSelecionado).text());
  $('#cadMedicoEmail').val($(medicoSelecionado).attr('data-emailMedico'));
}

$('input[name="genero"]').change(function () {
  const isCheckedFemale = $("input[name='genero']:checked").val() === 'F';

  if (isCheckedFemale) {
    $('#menopausada-view').show();
    $('#menopausada').prop('required', true);
    $('#menopausada-null').prop('checked', false);
  } else {
    $('#menopausada').prop('required', false);
    $('#menopausada-null').prop('checked', true);
    $('#menopausada-view').hide();
  }
});

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/*emails*/
function validarEmail() {
  let form = document.querySelector('.formCad');
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

/*validar os campos required*/
function validarCampos() {
  let form = document.querySelector('.formCad');
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

/* Click do avançar */
$('[data-btn="envio-medico"]').click(function () {
  let retorno = validarCampos();

  if (retorno) {
    console.log(retorno);
    montarEnvios();
    camposInp.length = 0;
    envioData.length = 0;
    filterData.length = 0;
  } else {
    camposInp.length = 0;
    envioData.length = 0;
    filterData.length = 0;
    return;
  }
});

async function montarEnvios() {
  await envioPaciente();
}

async function envioPaciente() {
  lerInputs('data-idCampo');
  criarEnvioData(
    '0171bd38-710a-cc8a-a60e-603346301926',
    '28b6b1fd-7d09-88e4-16dc-e5cc7d54a2d0'
  );
  envioAjax('723b7a2a-e8ca-9b51-9f45-f0b7e8bf042c');
}
function envioRelacao() {
  lerInputs('data-idCampoRelacao');
  criarEnvioData(
    'e04668e3-2ae1-6393-c808-56b827e0f6a3',
    '695ea58d-fa09-e2b6-9874-5582b3c7bf3e'
  );
  envioAjax('c6a4debd-02ce-f676-21c7-cb4cc85b7d8d');
}

/*array com todos os inputs*/
let camposInp = [];
/*função com todos os inputs*/
function lerInputs(campoData) {
  $('input[' + campoData + ']').each(function (index, item) {
    if (
      camposInp.filter((el) => el.campoId === $(item).attr(campoData)).length >
      0
    ) {
      return;
    } else {
      inserirArray($(item), campoData);
    }
  });
}

function inserirArray(item, campoData) {
  campoData = campoData.replace('data-', '').toLowerCase();
  let itemObj = '';
  if ($(item).prop('type') == 'radio') {
    let selectedValue = $("input[name='" + $(item).attr('name') + "']:checked");

    itemObj = {
      campoId: $(selectedValue).data(campoData),
      campoValue: $(selectedValue).val(),
      campoName: $(selectedValue).attr('name'),
      addNotExists: true,
      processCalc: $(selectedValue).attr('data-processCalc'),
    };
  } else {
    itemObj = {
      campoId: $(item).data(campoData),
      campoValue: $(item).val().toString(),
      campoName: $(item).attr('id').replace('qldd-', ''),
      addNotExists: true,
      processCalc: $(item).data('processcalc'),
    };
  }
  camposInp.push(itemObj);
}

/*criar data ajax*/
let envioData = [];
let filterData = [];

function criarEnvioData(idFilter, emailFilter) {
  filterData.push({
    id: idFilter,
    value: $('#idCampoGuid').val(),
    operator: '==',
  });

  $(camposInp).each(function (index, item) {
    let itemEnvio = {
      id: item.campoId,
      value: item.campoValue,
      addNotExists: stringParaBoolean(item.addNotExists),
      processCalc: stringParaBoolean(item.processCalc),
    };
    envioData.push(itemEnvio);

    // campo email
    if (item.campoId == emailFilter) {
      let itemFilter = {
        id: item.campoId,
        value: item.campoValue,
        operator: '==',
      };
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
function envioAjax(idUrl) {
  /*configurações header ajax*/
  let settings = {
    url:
      'https://southamerica-east1-checkgo-e8680.cloudfunctions.net/apiV2/public/theme/answers/' +
      idUrl,
    method: 'PUT',
    timeout: 0,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    data: JSON.stringify({
      fields: envioData,
      filters: filterData,
      addAnswerIfNotExists: true,
    }),
  };

  /*envio do ajax*/
  $.ajax(settings)
    .done(function (response) {
      if (idUrl === '723b7a2a-e8ca-9b51-9f45-f0b7e8bf042c') {
        console.log('paciente ok');
        camposInp.length = 0;
        envioData.length = 0;
        filterData.length = 0;
        envioRelacao();
      } else {
        window.location.href = './envio-obrigado.html';
      }
    })
    .fail(function (error) {
      $('[data-id="load"]').css('display', 'none');
      showAlert('Não foi possível completar a solicitação. Tente novamente.');
      camposInp.length = 0;
      envioData.length = 0;
      filterData.length = 0;
    });
}
