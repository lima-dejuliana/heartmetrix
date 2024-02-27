<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="./assets/css/heart.site.css" rel="stylesheet" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <link href="./assets/images/favicon/favicon.png" rel="shortcut icon" type="image/x-icon">
  <link href="./assets/images/favicon/apple-touch-icon.png" rel="apple-touch-icon">

  <title>Heart Metrix&#174;</title>
</head>

<body>
  <header>
    <div class="areah">
      <div class="areah__top">
        <span class="areah__hamb mobile"></span>
        <picture class="areah__logo">
          <source srcset="./assets/images/logos/LogoHeartMetrix-mini.webp" type="image/webp" media="(max-width: 599px)">
          <source srcset="./assets/images/logos/LogoHeartMetrix-mini.png" type="image/png" media="(max-width: 599px)">
          <img src="./assets/images/logos/LogoHeartMetrix-mini.png" alt="Heart Metrix&#174; logo">
        </picture>
      </div>
      <nav class="areah__nav">
        <span class="areah__hamb desk"></span>
        <ul class="areah__nav__list">
          <!-- criar menu -->
        </ul>
        <button type="button" class="areah__nav__sair" id="btn-logout">
          <picture class="areah__nav__icon">
            <source srcset="./assets/images/icons/icon-logout.svg" type="image/svg">
            <img src="./assets/images/icons/icon-logout.svg" alt="icon logout">
          </picture>
          <span class="areah__nav__desc">Sair</span>
        </button>
      </nav>
    </div>
  </header>
  <main class="geral">
    <section class="sec">
      <div class="container">
        <h1 class="sec__title">Novo Cadastro de Médico</h1>
        <form class="formCad" id="formCadMedico">
          <div class="form__row">
            <input type="hidden" id="idCampoGuid" data-processCalc="false" class="form__inp" data-idCampo="c03eb5b1-88a9-0a65-70dc-cb4c69e6a9fd">
            <div class="col-md-4">
              <label for="cadNome" class="form__lbl">Nome</label>
              <input type="text" required class="form__inp inp--full" id="cadNome" placeholder="DIGITE SEU Nome" data-idCampo="5538d2b2-07d1-078d-2208-56a3dc9def85" data-processCalc="false">
            </div>
            <div class="col-md-4">
              <label for="cadEmail" class="form__lbl">E-mail</label>
              <input type="email" class="form__inp inp--full" required id="cadEmail" placeholder="DIGITE SEU E-MAIL" onkeyup="validarEmail()" data-idCampo="95a4c111-684a-25c2-0c17-8f121e819678" data-processCalc="false" />
              <span id="errorDisplay" class="errorDisplay"></span>
            </div>
            <div class="col-md-4"><label for="cadEspecialidade" class="form__lbl">Especialidade</label>
              <input type="text" required class="form__inp inp--full" id="cadEspecialidade" placeholder="DIGITE SUA Especialidade" data-idCampo="02d2d4ee-12d7-7b15-3046-c275e8846718" data-processCalc="false">
            </div>
          </div>
          <div class="form__row">
            <div class="col-md-4">
              <label for="cadLogoSub" class="form__lbl">Logo (apenas arquivos de imagem)</label>
              <input type="text" id="cadLogoVal" class="form__inp inp--full" data-idCampo="35d4be4b-f8e0-e844-a50d-8a297fc87908" data-processCalc="false" hidden value="null">
              <input type="file" id="cadLogo" hidden required>
              <div class="form__row">
                <!-- our custom upload button -->
                <label for="cadLogo" class="form__lbl__file">Escolher Arquivo</label>
                <!-- name of file chosen -->
                <span id="file-chosen" class="form__inp__file">Nenhum arquivo escolhido</span>
              </div>
            </div>
            <div class="col-md-4">
              <label for="cadCRM" class="form__lbl">CRM</label>
              <input type="text" required class="form__inp inp--full" id="cadCRM" placeholder="DIGITE o CRM" data-idCampo="afdc5c08-aac4-d1ee-ac78-69d041467a55" data-processCalc="false">
            </div>
            <div class="col-md-4">
              <label for="cadUF" class="form__lbl">Estado</label>
              <select id="cadUF" onchange="atualizarCidades()" required class="form__inp inp--full" data-idCampo="93cfd6b2-f877-0380-adc7-bc53dfd10150" data-processCalc="false">
                <option value="">Selecione um estado</option>
              </select>
            </div>
          </div>
          <div class="form__row">
            <div class="col-md-4">
              <label for="cadCidade" class="form__lbl">Cidade</label>
              <select id="cadCidade" required class="form__inp inp--full" data-idCampo="a4e1dccc-748e-911b-056b-21a0f19f8cfe" disabled data-processCalc="false">
                <option value="">Selecione um estado primeiro</option>
              </select>
            </div>
            <div class="col-md-4">
              <label for="cadCorPrimaria" class="form__lbl">Cor Primária (clique para selecionar)</label>
              <input type="color" class="form__inp inp--full" id="cadCorPrimaria" data-idCampo="13e07e30-441b-3dee-3ba8-b938afbfb508" data-processCalc="false">
            </div>
            <div class="col-md-4">
              <label for="cadCorSecundaria" class="form__lbl">Cor Secundária (clique para selecionar)</label>
              <input type="color" class="form__inp inp--full" id="cadCorSecundaria" data-idCampo="9c70fe2f-d4b4-fb6d-9d5f-851bb0d98b92" data-processCalc="false">
            </div>
          </div>
          <div class="form__row">
            <div class="col-md-4">
              <label for="cadUsuario" class="form__lbl">Usuário</label>
              <input type="text" required class="form__inp inp--full" id="cadUsuario" placeholder="DIGITE o Usuário" data-idCampo="d34768c5-2e7a-060d-c10d-d5ccd2de0c5f" data-processCalc="false">
            </div>
            <div class="col-md-4" style="position: relative;">
              <label for="cadSenha" class="form__lbl">Senha</label>
              <div class="form__pw">
                <input type="password" required class="form__inp inp--full" id="cadSenha" placeholder="DIGITE UMA SENHA" autocomplete="new-password">
                <span class="form__visenha"></span>
              </div>
              <input type="hidden" id="cadSenhaRes" data-idCampo="82d5405a-61fb-67d9-b9b2-1b9c66e0e710" data-processCalc="false">

              <span class="form__valpw" id="validasenha-min">Mínimo de 6
                caracteres</span>
              <span class="form__valpw" id="validasenha-dig">Conter ao menos um
                digito ('0'-'9')</span>
              <span class="form__valpw" id="validasenha-ca">Conter ao menos um
                caracter em caixa alta
                ('A'-'Z')</span>
              <span class="form__valpw" id="validasenha-ce">Conter ao menos um
                caracter especial
                ('!,@,#,$,%,*')</span>
            </div>
            <div class="col-md-4">
              <label for="cadSenhaConf" class="form__lbl">Confirme a Senha</label>
              <div class="form__pw">
                <input type="password" required class="form__inp inp--full" id="cadSenhaConf" placeholder="DIGITE A SENHA NOVAMENTE" data-processCalc="false" autocomplete="new-password">
                <span class="form__visenha"></span>
              </div>
              <span id="errorSenhaConf" class="errorDisplay"></span>
            </div>
          </div>
          <div class="form__areabtn center">
            <div id="errorMessages"></div>

            <span class="btn btnprim" data-btn="envio-medico">SALVAR DADOS</span>
            <button class="btn btnint ms-lg-4" type="reset">CANCELAR</button>
          </div>
        </form>
      </div>
    </section>
    <!-- alert -->
    <div id="customAlert" class="custom-alert">
      <span class="message"></span>
      <button id="closeAlert" class="close-button">Fechar</button>
    </div>
    <!-- alert ends -->
  </main>

  <script src="./assets/script/plugins/jquery-3.7.0.min.js"></script>
  <script src="./assets/script/plugins/bcrypt.min.js"></script>
  <script src="./assets/script/hm.main.js"></script>
  <script src="./assets/script/hm.main.buscauf.js"></script>
  <script src="./assets/script/hm.presend.js"></script>
  <script src="./assets/script/hm.cadastros.js"></script>
  <script src="./assets/script/hm.cad.medico.js"></script>
</body>

</html>