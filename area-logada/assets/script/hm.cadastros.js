/* ##### INÍCIO_VALIDAR E-MAIL ##### */
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
/* ##### FIM_VALIDAR E-MAIL ##### */

/* ##### INÍCIO_VALIDAR SENHA ##### */
$('#cadSenha').on('input', function () {
  validarSenha($(this), $(this).val());
  conferirSenhas($('#cadSenhaConf').val());
});

function validarSenha(inpSenha, senha) {
  const numeros = /([0-9])/;
  const alfabeto = /([A-Z])/;
  const chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

  $('#validasenha-min').toggleClass('alert-success', senha.length >= 6);
  $('#validasenha-min').toggleClass('alert-danger', senha.length < 6);

  $('#validasenha-dig').toggleClass('alert-success', numeros.test(senha));
  $('#validasenha-dig').toggleClass('alert-danger', !numeros.test(senha));

  $('#validasenha-ca').toggleClass('alert-success', alfabeto.test(senha));
  $('#validasenha-ca').toggleClass('alert-danger', !alfabeto.test(senha));

  $('#validasenha-ce').toggleClass('alert-success', chEspeciais.test(senha));
  $('#validasenha-ce').toggleClass('alert-danger', !chEspeciais.test(senha));

  if (
    senha.length < 6 ||
    !numeros.test(senha) ||
    !alfabeto.test(senha) ||
    !chEspeciais.test(senha)
  ) {
    $(inpSenha).addClass('invalid');
  } else {
    $(inpSenha).removeClass('invalid');
  }
}

$('#cadSenhaConf').on('input', function () {
  conferirSenhas($(this).val());
});

function conferirSenhas(senhaConf) {
  if ($('#cadSenha').val().length > 0 && senhaConf != $('#cadSenha').val()) {
    $('#errorSenhaConf').text('As senhas não são iguais');
    $('#cadSenhaConf').addClass('invalid');
    return false;
  } else if (!senhaConf && !$('#cadSenha').val()) {
    $('#errorSenhaConf').text('');
    $('#cadSenhaConf').addClass('invalid');
    return false;
  } else {
    $('#errorSenhaConf').text('');
    $('#cadSenhaConf').removeClass('invalid');
    return true;
  }
}
/* ##### FIM_VALIDAR SENHA ##### */
