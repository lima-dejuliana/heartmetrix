userType == 'paciente'
  ? 'usuario-relatorio-individual.html?='
  : 'medico-relatorio-individual-det.html?=';

let emailSel;
let dataSel;

const pageUrl = window.location.href;
const padrao = /\?=/;

if (pageUrl.match(padrao)) {
  $('#area-selest-pacientes').hide();
  console.log('A string contém o trecho desejado.');
  let arraySel = pageUrl.split('?=');
  dataSel = arraySel[arraySel.length - 2];
  emailSel = arraySel[arraySel.length - 1];

  buscaResult();
} else {
  if (userType == 'paciente') {
    $('#area-selest-pacientes').hide();
    const emailPaciente = sessionStorage.getItem('userEmail');
    const idUser = sessionStorage.getItem('userId');
    buscaPaciente(emailPaciente, idUser);
  } else if (userType == 'medico') {
    $('#area-selest-pacientes').show();
    const emailMedico = sessionStorage.getItem('userEmail');
    const idUser = sessionStorage.getItem('userId');
    buscaRelacao(emailMedico, idUser);
  }
}

const equalPaciente = [
  //   {
  //   nome:"ID_Paciente",
  //   idCadPaciente: "0171bd38-710a-cc8a-a60e-603346301926",
  //   idCampo:"",
  // },
  {
    nome: 'Email',
    idCadPaciente: '28b6b1fd-7d09-88e4-16dc-e5cc7d54a2d0',
    idCampo: '4dcd7a92-74d3-2c5e-36c2-3a41a42209a4',
  },
  {
    nome: 'Nome',
    idCadPaciente: 'cb04940a-9433-0a80-6215-ffa1d6d3ec32',
    idCampo: 'efca7027-fdac-825d-a9a1-d7ce0e710434',
  },
  {
    nome: 'Gênero',
    idCadPaciente: '99d397a5-3712-e28c-f7f2-c85604fab92a',
    idCampo: '32aa8ed8-a545-be32-96d7-aa900674249d',
  },
  {
    nome: 'Idade',
    idCadPaciente: 'd279b8b6-e6f8-cfb4-ed05-cf8792b5b53b',
    idCampo: 'e6b22050-fbe2-8b58-5744-7819a8e77146',
  },
  {
    nome: 'Altura',
    idCadPaciente: '6b3d1f06-c7e9-084e-7208-1948e3163952',
    idCampo: '2385beb8-ddc5-c8a9-bf3c-f1ceeed55284',
  },
  {
    nome: 'Caso seja do sexo feminino, você é menopausada?',
    idCadPaciente: '538323e2-3e35-d34f-98ed-c783739d298b',
    idCampo: '48530622-5051-d561-1a91-4b038fce200f',
  },
];

function buscaPaciente(emailPaciente, idUser) {
  /*configurações header ajax*/
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
        {
          id: '0171bd38-710a-cc8a-a60e-603346301926',
          value: idUser,
          operator: '==',
        },
        {
          id: '28b6b1fd-7d09-88e4-16dc-e5cc7d54a2d0',
          value: emailPaciente,
          operator: '==',
        },
      ],
    }),
  };

  /*envio do ajax*/
  $.ajax(settings)
    .done(function (response) {
      if (response.dataResult.length > 0) {
        let switchIds = [];
        equalPaciente.map((item) => {
          const retornoPaciente = response.dataResult[0].campos.filter(
            (campo) => campo.id === item.idCadPaciente
          );
          switchIds.push({
            id: item.idCampo,
            nome: retornoPaciente[0].nome,
            value: retornoPaciente[0].value,
          });
        });
        montarCampos(switchIds);
      }
    })
    .fail(function (error) {
      console.log('error:', error);
    });
}

function buscaRelacao(emailMedico, idUser) {
  /*configurações header ajax*/
  let settings = {
    url: 'https://southamerica-east1-checkgo-e8680.cloudfunctions.net/apiV2/public/theme/c6a4debd-02ce-f676-21c7-cb4cc85b7d8d/answers/null/0',
    method: 'POST',
    timeout: 0,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    data: JSON.stringify({
      filters: [
        {
          id: 'e92e88fb-a833-844c-5be2-17048903ad17',
          value: idUser,
          operator: '==',
        },
        {
          id: '695ea58d-fa09-e2b6-9874-5582b3c7bf3e',
          value: emailMedico,
          operator: '==',
        },
      ],
    }),
  };

  /*envio do ajax*/
  $.ajax(settings)
    .done(function (response) {
      const retorno = response.dataResult;
      if (retorno.length > 0) {
        let pacientesRelacao =
          '<option value="" disabled selected>Selecione um paciente</option>';
        retorno.map((item) => {
          const idPaciente = item.campos.filter(
            (campo) => campo.id === '8dde3b7a-cebf-2707-7b69-cd717ff89bdb'
          );
          const nomePaciente = item.campos.filter(
            (campo) => campo.id === 'f5279fe9-2b3f-12b6-1635-d04f651d8606'
          );
          const emailPaciente = item.campos.filter(
            (campo) => campo.id === 'e04668e3-2ae1-6393-c808-56b827e0f6a3'
          );

          pacientesRelacao +=
            '<option value="' +
            emailPaciente[0].value +
            '" data-idPaciente="' +
            idPaciente[0].value +
            '">' +
            nomePaciente[0].value +
            ' - ' +
            emailPaciente[0].value +
            '</option>';
        });

        $('#select-pacientes').html(pacientesRelacao);
      }
    })
    .fail(function (error) {
      console.log('error:', error);
    });

  $('#select-pacientes').on('change', function () {
    const optionEmail = $('#' + $(this).attr('id') + ' option:selected').val();
    const optionId = $('#' + $(this).attr('id') + ' option:selected').attr(
      'data-idPaciente'
    );
    buscaPaciente(optionEmail, optionId);
  });
}

let arrayIds = [{ id: 'e57734a2-0156-335f-16c5-cda2fbc59853', type: 'hidden' }];

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
      disabled: $(this).attr('data-disabled')
        ? $(this).attr('data-disabled')
        : 'false',
    });
  }
});

function buscaResult() {
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
      montarCampos(response.dataResult[0].campos);
    })
    .fail(function (error) {
      showAlert('Não foi possível apresentar as informações. Tente novamente.');
    });
}

function montarCampos(campos) {
  $(arrayIds).each(function (index, item) {
    const objetoFiltrado = campos.filter((campo) => campo.id === item.id);

    if (item.type == 'hidden' && objetoFiltrado.length > 0) {
      $('#data-edit').val(objetoFiltrado[0].value);
    } else if (item.type != 'radio' && objetoFiltrado.length > 0) {
      $('[data-idCampo="' + item.id + '"]').val(objetoFiltrado[0].value);
      item.disabled == 'true'
        ? $('[data-idCampo="' + item.id + '"]').addClass('disabled')
        : '';
    } else if (item.type == 'radio' && objetoFiltrado.length > 0) {
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

      if (item.disabled == 'true') {
        radiosItem.addClass('disabled');
        radiosItem.closest('.form__lbl__radio').addClass('disabled');
      }
      if (objetoFiltrado[0].id == '32aa8ed8-a545-be32-96d7-aa900674249d') {
        checkMenopausa();
      }
    }
  });
}
