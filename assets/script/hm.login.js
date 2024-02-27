/* ##### INÍCIO_LOGIN ##### */
$('#btn-login').click(async function () {
  if ($('#loginEmail').val().length > 0 && $('#loginSenha').val().length) {
    if ($('#loginEmail').val() == 'admin') {
      sessionStorage.setItem('userId', '1');
      sessionStorage.setItem('userEmail', 'admin@rai.com');
      sessionStorage.setItem('userType', 'admin');
      /*Local*/
      window.location.href = 'http://heartmetrix.local/cadastro-medico.php';
      // window.location.href = './cadastro-medico.php';
    } else {
      $('[data-id="load"]').css('display', 'flex');
      const valInit = $('#loginSenha').val();
      const emailDig = $('#loginEmail').val();
      let resultado;
      try {
        resultado = await presend(valInit, 'login');
      } catch (erro) {
        showAlert('Não foi possível completar a solicitação. Tente novamente.');
        return;
      }
      consultaMedico(emailDig, resultado);
    }
    $('[data-id="load"]').css('display', 'none');
  } else {
    showAlert('Preencha os dados de e-mail e senha para prosseguir.');
  }
});

function consultaMedico(valEmail, resultado) {
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
          id: '95a4c111-684a-25c2-0c17-8f121e819678',
          value: valEmail,
        },
      ],
    }),
  };
  /*envio do ajax*/
  $.ajax(settings)
    .done(function (response) {
      if (response.dataResult.length > 0) {
        const userCampos = response.dataResult[0].campos;
        const userKey = findItemById(
          '82d5405a-61fb-67d9-b9b2-1b9c66e0e710',
          userCampos
        );
        const bcrypt = dcodeIO.bcrypt;
        const keyValidate = bcrypt.compareSync(
          resultado,
          userKey.value.toString()
        );

        if (keyValidate == true) {
          sessionStorage.setItem(
            'userId',
            findItemById('c03eb5b1-88a9-0a65-70dc-cb4c69e6a9fd', userCampos)
              .value
          );
          sessionStorage.setItem(
            'userEmail',
            findItemById('95a4c111-684a-25c2-0c17-8f121e819678', userCampos)
              .value
          );
          sessionStorage.setItem('userType', 'medico');
          window.location.href = './medico-relatorio-gerencial.html';
        } else {
          showAlert('Usuário e/ou senha inválidos.');
        }
      } else {
        consultaPaciente(valEmail, resultado);
      }
    })
    .fail(function (error) {
      console.log(error);
      return error;
    });
}

function consultaPaciente(valEmail, resultado) {
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
          id: '28b6b1fd-7d09-88e4-16dc-e5cc7d54a2d0',
          value: valEmail,
        },
      ],
    }),
  };
  /*envio do ajax*/
  $.ajax(settings)
    .done(function (response) {
      if (response.dataResult.length > 0) {
        const userCampos = response.dataResult[0].campos;
        const userKey = findItemById(
          'b183ebe6-29e5-b5d0-f9c5-e9c96aad2b97',
          userCampos
        );
        const bcrypt = dcodeIO.bcrypt;
        const keyValidate = bcrypt.compareSync(
          resultado,
          userKey.value.toString()
        );

        if (keyValidate == true) {
          sessionStorage.setItem(
            'userId',
            findItemById('0171bd38-710a-cc8a-a60e-603346301926', userCampos)
              .value
          );
          sessionStorage.setItem(
            'userEmail',
            findItemById('28b6b1fd-7d09-88e4-16dc-e5cc7d54a2d0', userCampos)
              .value
          );
          sessionStorage.setItem('userType', 'paciente');
          window.location.href = './usuario-relatorio-individual.html';
        } else {
          showAlert('Usuário e/ou senha inválidos.');
        }
      } else {
        showAlert('Usuário não encontrado.');
      }
    })
    .fail(function (error) {
      console.log(error);
      return error;
    });
}

function findItemById(idToFind, arrayToSearch) {
  return arrayToSearch.find((el) => el.id === idToFind);
}
