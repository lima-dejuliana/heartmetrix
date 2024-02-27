$(document).ready(function () {
  //const guid = uuidv4();
  const guid = '3e8ad0a5-cfa1-446d-a6da-5e085e8e93f6';
  $('#idCampoGuid').val(guid);
});

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/*input file*/
const actualBtn = document.getElementById('cadLogo');

const fileChosen = document.getElementById('file-chosen');

actualBtn.addEventListener('change', function () {
  fileChosen.textContent = this.files[0].name;
});

/*validar os campos required*/
function validarCampos() {
  const validaSenha = conferirSenhas($('#cadSenhaConf').val());
  let form = document.querySelector('.formCad');
  let errorMessages = document.getElementById('errorMessages');
  let invalidInputs = Array.from(form.querySelectorAll(':invalid'));

  if (invalidInputs.length === 0 && validaSenha == true) {
    // Se não houver campos inválidos, retorne true
    if (
      !$('#cadSenhaConf').hasClass('invalid') &&
      !$('#cadSenha').hasClass('invalid')
    ) {
      errorMessages.innerHTML = ''; // Limpa as mensagens de erro
      $('.invalid').removeClass('invalid');
    }
    return true;
  } else {
    invalidInputs.forEach(function (item) {
      if (item.type == 'email') {
        $(item).addClass('invalid');
        $('#errorDisplay').text('Por favor, insira um e-mail válido.');
      } else if (item.id == 'cadSenhaConf') {
        conferirSenhas($(item).val());
      } else if (item.id == 'cadSenha') {
        validarSenha(item, $(item).val());
      } else if (item.type == 'file') {
        $('.form__lbl__file').addClass('invalid');
        $('.form__inp__file').addClass('invalid');
      } else if (item.type == 'radio') {
        let lblRadio = item.closest('.item--radio').querySelector('.form__lbl');
        $(lblRadio).addClass('invalid');
      } else {
        $(item).addClass('invalid');
      }
    });

    showAlert(
      'Preencha todos os campos antes de prosseguir para a próxima etapa!'
    );
    return false;
  }
}

function uploadImagem() {
  return new Promise((resolve, reject) => {
    const inputFile = document.getElementById('cadLogo');
    const file = inputFile.files[0];

    const formData = new FormData();
    formData.append('file', file);

    $.ajax({
      url: 'envio-logo-imagem.php',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        resolve(response);
      },
      error: function (response) {
        reject(response);
      },
    });
  });
}

$('[data-btn="envio-medico"]').click(async function () {
  let retorno = validarCampos();

  if (retorno) {
    $('[data-id="load"]').css('display', 'flex');
    try {
      let salvarImg = await uploadImagem();
      $('#cadLogoVal').val(salvarImg);
      console.log(salvarImg);
      if (
        (salvarImg != null || salvarImg != undefined || salvarImg != '') &&
        salvarImg.length > 0
      ) {
        try {
          const valInit = $('#cadSenha').val();
          const resultado = await presend(valInit, '');
          $('#cadSenhaRes').val(resultado);
          lerInputs();
          criarEnvioData();
          envioAjax();
          camposInp.length = 0;
          envioData.length = 0;
          filterData.length = 0;
        } catch (erro) {
          showAlert(
            'Não foi possível completar a solicitação. Tente novamente.'
          );
          return;
        }
        // lerInputs();
        // criarEnvioData();
        // envioAjax();
        // camposInp.length = 0;
        // envioData.length = 0;
        // filterData.length = 0;
      } else {
        camposInp.length = 0;
        envioData.length = 0;
        filterData.length = 0;
      }
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
    }
    $('[data-id="load"]').css('display', 'none');
  } else {
    return;
  }
});

/*array com todos os inputs*/
let camposInp = [];
/*função com todos os inputs*/
function lerInputs() {
  $('.form__inp[data-idCampo]').each(function (index, item) {
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

function inserirArray(item) {
  let itemObj = '';
  if ($(item).is('select')) {
    let selectedValue = $('select#' + $(item).attr('id'));

    itemObj = {
      campoId: $(selectedValue).data('idcampo'),
      campoValue: $('select#' + $(item).attr('id') + ' option:selected').text(),
      campoName: $(selectedValue).attr('id'),
      addNotExists: true,
      processCalc: $(selectedValue).attr('data-processCalc'),
    };
  } else {
    itemObj = {
      campoId: $(item).data('idcampo'),
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

function criarEnvioData() {
  filterData.push({
    id: 'c03eb5b1-88a9-0a65-70dc-cb4c69e6a9fd',
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
    if (item.campoId == '95a4c111-684a-25c2-0c17-8f121e819678') {
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
function envioAjax() {
  /*configurações header ajax*/
  let settings = {
    url: 'https://southamerica-east1-checkgo-e8680.cloudfunctions.net/apiV2/public/theme/answers/a3081220-d735-4f13-183e-a6957d6af534',
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
