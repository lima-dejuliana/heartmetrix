$(document).ready(function () {
  $('.form__visenha').click(function () {
    $(this).toggleClass('active');
    let inpSenha = $(this).parent().find('.form__inp');
    $(inpSenha).attr('type', (_, attr) =>
      attr == 'text' ? 'password' : 'text'
    );
  });
  $('.areah__hamb.mobile').click(function () {
    let isActive = $('.areah__nav').hasClass('active');
    if (isActive == true) {
      $('.areah__nav').removeClass('active');
      $('.areah__nav').addClass('noactive');
    } else {
      $('.areah__nav').removeClass('noactive');
      $('.areah__nav').addClass('active');
    }
  });
  $('.areah__hamb.desk').click(function () {
    $('.areah__nav').toggleClass('off', 300, 'easeOutSine');
    $('main').toggleClass('off', 300, 'easeOutSine');
  });
});
