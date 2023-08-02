$(document).ready(function () {
  $('.form__visenha').click(function () {
    $(this).toggleClass('active');
    let inpSenha = $(this).parent().find('.form__inp');
    $(inpSenha).attr('type', (_, attr) =>
      attr == 'text' ? 'password' : 'text'
    );
  });
});
