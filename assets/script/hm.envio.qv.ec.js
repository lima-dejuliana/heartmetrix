$(document).ready(function () {
  $('.form__nsa input').change(function () {
    const idInp = '#' + $(this).attr('name');
    if ($(this).is(':checked')) {
      $(idInp).prop('disabled', true);
    } else {
      $(idInp).prop('disabled', false);
    }
  });

  $('input[name="genero"]').change(function () {
    checkMenopausa();
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
    if (item.disabled) {
      item.value = '9';
    }
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

const calculoRazao = [
  {
    campoNome: 'Razão Colesterol total/HDL',
    campoIdRazao: '00773994-95c4-1876-3ada-fb573064304e',
    campoIdValor1: '02e36b6f-7add-c251-7fb2-07bc3d6455a9',
    campoIdValor2: 'a547fbb7-b517-39ea-d2e6-0c049e0f6a43',
    operacao: '/',
  },
  {
    campoNome: 'Razão Apo B/Apo A',
    campoIdRazao: '41630111-ad34-7a8a-b0e3-b16af0aec78b',
    campoIdValor1: 'a2b1c698-3c63-b39e-f137-49735922ab86',
    campoIdValor2: 'ef2ecf74-42fb-eaf6-9d9a-9b27fffdf5ca',
    operacao: '/',
  },
  {
    campoNome: 'Razão Triglicérides/HDL',
    campoIdRazao: '89d452b1-28b2-c2af-5fc0-b8c04ab8d665',
    campoIdValor1: '96c323d9-140f-7d1e-39cd-014891290ef6',
    campoIdValor2: 'a547fbb7-b517-39ea-d2e6-0c049e0f6a43',
    operacao: '/',
  },
];

function validaRazao(idCampo) {
  const itemRazao = calculoRazao.find((el) => el.campoIdRazao === idCampo);
  if (itemRazao != null) {
    const valor1 = $('[data-idCampo=' + itemRazao.campoIdValor1 + ']').val();
    const valor2 = $('[data-idCampo=' + itemRazao.campoIdValor2 + ']').val();
    const operador = itemRazao.operacao;

    let resultado;
    switch (operador) {
      case '+':
        resultado = valor1 + valor2;
        break;
      case '-':
        resultado = valor1 - valor2;
        break;
      case '*':
        resultado = valor1 * valor2;
        break;
      case '/':
        resultado = valor1 / valor2;
        break;
      default:
        resultado = 'Operação inválida';
    }

    return resultado;
  } else {
    return false;
  }
}

/*função validar input:radio selecionado e inserir valores no array*/
function inserirArray(item) {
  let itemObj = '';
  if ($(item).prop('type') == 'radio') {
    let selectedValue = $("input[name='" + $(item).attr('name') + "']:checked");

    itemObj = {
      campoId: $(selectedValue).data('idcampo'),
      campoValue: $(selectedValue).val(),
      campoName: $(selectedValue).attr('name'),
      addNotExists: true,
      processCalc: $(selectedValue).attr('data-processCalc'),
    };
  } else {
    let valorFinal;
    if ($(item).nextAll('.form__inp__sel').length > 0) {
      const multiplicador = $(item).nextAll('.form__inp__sel').val();
      const valor = $(item).val().replace(/,/g, '.');
      if (
        $(item).attr('data-idCampo') == '69f46649-135e-7781-5e0e-1c7fb89992e3'
      ) {
        valorFinal = valor / multiplicador;
      } else {
        valorFinal = valor * multiplicador;
      }
    } else {
      // const resultadoValidaRazao = validaRazao($(item).attr('data-idCampo'));
      // if (resultadoValidaRazao) {
      //   valorFinal = resultadoValidaRazao;
      // } else {
      //   valorFinal = $(item).val();
      // }
      valorFinal = $(item).val();
    }

    itemObj = {
      campoId: $(item).data('idcampo'),
      campoValue: valorFinal.toString(),
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
  let data = '';
  if ($('#data-edit').val() != '') {
    data = new Date($('#data-edit').val() + 'T00:00:00');
  } else {
    data = new Date();
  }
  let dia = data.getDate().toString(),
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
      Authorization: authorization,
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
