let camposInp = [];

function valores() {
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
      id: '23783b0b-a128-c342-a3c1-83be70f97c45',
      value: dataAmericana,
    },
    {
      id: '8a45f3c3-b27a-eddc-5f68-3c16e944aaf8',
      value: horaF,
    }
  );

  $(camposInp).each(function (index, item) {
    let itemEnvio = {
      id: item.campoId,
      value: item.campoValue,
    };
    envioData.push(itemEnvio);
  });
  console.log(envioData);
}

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

function teste() {
  var form = document.getElementById('myForm');
  var errorMessages = document.getElementById('errorMessages');

  // form.addEventListener('input', function (event) {
  var invalidInputs = Array.from(form.querySelectorAll(':invalid'));

  if (invalidInputs.length === 0) {
    errorMessages.innerHTML = ''; // Limpa as mensagens de erro
  } else {
    showAlert('Esta é uma mensagem de alerta personalizado!');

    // Exemplo de uso:
  }
  // });
}

function showAlert(message) {
  var alertBox = document.getElementById('customAlert');
  var messageSpan = alertBox.querySelector('.message');
  var closeButton = alertBox.querySelector('.close-button');

  messageSpan.textContent = message;
  alertBox.style.display = 'block';

  closeButton.addEventListener('click', function () {
    alertBox.style.display = 'none';
  });
}

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

// envia o ajax pelo clique

// $(document).ready(function() {
//   // Quando o botão for clicado
//   $("#seuBotaoID").click(function() {
//     // Configurações da requisição AJAX
//     var settings = {
//       url: "sua-url-aqui",
//       method: "GET", // ou "POST", "PUT", etc.
//       // Outras configurações de acordo com suas necessidades
//     };

//     // Realiza a requisição AJAX
//     $.ajax(settings).done(function(response) {
//       console.log(response);
//     });
//   });
// });
