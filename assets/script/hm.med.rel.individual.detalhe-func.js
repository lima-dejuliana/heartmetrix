/*** Encontrar o nome do paciente para ser apresentado ***/
function encontrarNome(campos) {
  // Encontrar o nome do paciente para ser apresentado
  const nome = campos
    .flatMap((item) =>
      item.filter((el) => el.id === 'efca7027-fdac-825d-a9a1-d7ce0e710434')
    )
    .map((item) => item.value)
    .find(Boolean); // Retorna o primeiro valor não nulo/undefined

  $('#paciente').text(nome || ''); // Define o texto do elemento #paciente com o nome, ou uma string vazia se for nulo ou indefinido
  $('.vertodos').attr('data-name', nome);
  $('#btnlaudo').attr('data-name', nome);
}
/*** Encontrar as três datas mais recentes ***/
function processarItensRecentes(campos) {
  // Extrair e ordenar as datas únicas em ordem decrescente
  const datasUnicas = [
    ...new Set(
      campos.map(
        (lista) => lista.find((item) => item.tipo === 'date').valueDate
      )
    ),
  ];
  const datasOrdenadas = datasUnicas.sort((a, b) => new Date(b) - new Date(a));

  // Selecionar os três conjuntos de dados correspondentes às três datas mais recentes
  const itensMaisRecentes = datasOrdenadas.slice(0, 3).flatMap((data) => {
    return campos
      .filter(
        (lista) => lista.find((item) => item.tipo === 'date').valueDate === data
      )
      .slice(0, 1);
  });

  console.log(itensMaisRecentes);
  return itensMaisRecentes;
}
/*** retornar apenas o item da data atual ***/
function filtrarItemAtual(itensMaisRecentes) {
  let itemAtual;
  itensMaisRecentes.map((objeto) => {
    const objetoFiltrado = objeto.filter(
      (el) =>
        el.id === 'e57734a2-0156-335f-16c5-cda2fbc59853' &&
        el.value.includes(dataAtual)
    );
    if (
      objetoFiltrado != null &&
      objetoFiltrado != undefined &&
      objetoFiltrado.length > 0
    ) {
      itemAtual = objeto;
    }
  });
  console.log(itemAtual);
  return itemAtual;
}

function examesDestaque(itemAtual) {
  const idExMelhores = 'e5dee89f-8700-9f3b-9ee4-1e49655ac3b8';
  const idExPiores = '614fed4c-f2c7-5cb2-1048-9475b89284bf';

  const processarItemEAdicionarTabela = (idCampo, itemName) => {
    const edItens = itemAtual.filter((el) => el.id === idCampo);
    const arrayItens = edItens[0].valueString.split(';');
    let itemHtml = '';
    let arrayFilt = [];

    $(arrayItens).each(function (index, item) {
      const objetoFiltrado = itemAtual.filter((campo) => campo.nome === item);
      if (objetoFiltrado.length > 0) {
        if (!arrayFilt.includes(objetoFiltrado[0])) {
          arrayFilt.push(objetoFiltrado[0]);
        }
      }
    });

    $(arrayItens).each(function (index, item) {
      const objetoFiltrado = itemAtual.filter((campo) => campo.nome === item);
      if (objetoFiltrado.length > 0) {
        const medida = medidas.filter((el) => el.nome === item);
        if (medida.length > 0) {
          objetoFiltrado[0].medida = medida[0].medida;

          if (!arrayFilt.includes(objetoFiltrado[0])) {
            arrayFilt.push(objetoFiltrado[0]);
          }
        }
      }
    });

    arrayFilt = arrayFilt.sort((a, b) =>
      a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0
    );

    $(arrayFilt).each(function (index, item) {
      item.value == undefined || item.value == null
        ? (item.value = 0)
        : item.value;
      itemHtml += `<tr><td>${item.nome}</td><td>${
        !isNaN(item.value) && /\.\d\d/.test(item.value)
          ? parseFloat(item.value).toFixed(2)
          : item.value
      } <span style="font-size:0.75em;font-style: italic;">${
        item.medida
      }</span></td></tr>`;
    });

    $(`#${itemName} tbody`).html(itemHtml);

    // Inicializar a tabela DataTable
    new DataTable($(`#${itemName}`), {
      info: false,
      ordering: false,
      paging: true,
      lengthChange: false,
      searching: false,
      pagingType: 'simple_numbers',
      pageLength: 10,
      language: {
        paginate: {
          previous:
            '<img src="./assets/images/icons/icon-arrow-circle-left.svg" alt="Anterior">',
          next: '<img src="./assets/images/icons/icon-arrow-circle-right.svg" alt="Próximo">',
        },
      },
    });
  };

  processarItemEAdicionarTabela(idExMelhores, 'edMelhores');
  processarItemEAdicionarTabela(idExPiores, 'edPiores');
}

function estiloVida(itemAtual) {
  const idEVMelhores = '83b038ef-8301-e86b-eae4-162f842eab5a';
  const idEVPiores = '83bf2697-e9d0-4e26-5b42-4d82cf7dd086';

  const processarItemEAdicionarTabela = (idCampo, itemName) => {
    let edItens = itemAtual.filter((el) => el.id === idCampo);
    let arrayItens =
      edItens.length < 1
        ? (edItens = 'Não há itens')
        : edItens[0].valueString.split(';');
    let itemHtml = '';

    if (Array.isArray(arrayItens)) {
      arrayItens = arrayItens.sort((a, b) =>
        a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0
      );
    }

    $(arrayItens).each(function (index, item) {
      itemHtml += `<tr><td>${item}</td></tr>`;
    });

    $(`#${itemName} tbody`).html(itemHtml);

    // Inicializar a tabela DataTable
    new DataTable($(`#${itemName}`), {
      info: false,
      ordering: false,
      paging: true,
      lengthChange: false,
      searching: false,
      pagingType: 'simple_numbers',
      pageLength: 10,
      language: {
        paginate: {
          previous:
            '<img src="./assets/images/icons/icon-arrow-circle-left.svg" alt="Anterior">',
          next: '<img src="./assets/images/icons/icon-arrow-circle-right.svg" alt="Próximo">',
        },
      },
    });
  };

  processarItemEAdicionarTabela(idEVMelhores, 'evMelhores');
  processarItemEAdicionarTabela(idEVPiores, 'evPiores');
}

function apresentarAlertas(itemAtual) {
  const itensAlertaGeral = itemAtual.filter((el) => el.nome.includes('Alerta'));
  let itensAlerta;

  if (Array.isArray(itensAlertaGeral)) {
    itensAlerta = itensAlertaGeral
      .filter(
        (el) =>
          el.valueString &&
          el.valueString.length > 6 &&
          el.valueString != 'Sem alerta'
      )
      .map((el) => el);

    console.log(itensAlerta);
  } else {
    console.error('itensAlertaGeral não é um array ou é undefined.');
  }

  const construirHTMLItens = (itens) => {
    let cardHtml = '';

    itens.forEach((item) => {
      cardHtml +=
        '<div class="areacard"><h2 class="alerta__title">' +
        item.nome.replace('(JS) ', '') +
        '</h2><p class="alerta__prg">' +
        item.value +
        '</p></div>';
    });

    return cardHtml;
  };

  let cardHtml;
  if (itensAlerta.length > 0) {
    cardHtml = construirHTMLItens(itensAlerta);
  } else {
    cardHtml = construirHTMLItens([{ value: 'Sem Alertas', nome: '' }]);
  }

  $('#alerts-slide').html(cardHtml);
  inicializarSlides();
}

function inicializarSlides() {
  if (document.querySelectorAll('.alerts').length > 0) {
    let itensSlide = document.querySelectorAll('.alerts__geral');

    for (let i = 0; itensSlide.length > i; i++) {
      let data = itensSlide[i].id;
      new Glider(document.querySelector('#' + data), {
        draggable: false,
        dots: false,
        arrows: {
          prev: '.alerts__geral__prev',
          next: '.alerts__geral__next',
        },
        dots: false,
        responsive: [
          {
            breakpoint: 300,
            settings: {
              slidesToShow: 1.2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1.5,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 3.2,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 3.4,
              slidesToScroll: 3,
            },
          },
        ],
      });
    }
  }
}

function examesGeral(itensMaisRecentes) {
  let arrayLocal = [];
  itensMaisRecentes.forEach((objeto) => {
    let dataItem = objeto.find((el) => el.nome === 'Data').value;
    dataItem = dataItem.includes('T') ? dataItem.replace(/T.*/, '') : dataItem;

    let itemArray = [];
    medidas.forEach((item) => {
      let itemExame = objeto.find((el) => el.nome === item.nome);
      if (itemExame) {
        itemArray.push({
          nome: itemExame.nome,
          value:
            itemExame.value != undefined || itemExame.value != null
              ? itemExame.value
              : 0,
          medida: item.medida,
        });
      }
    });

    arrayLocal.push({
      data: dataItem,
      exames: itemArray,
    });
  });

  localStorage.setItem('exames', JSON.stringify(arrayLocal));
}

/*alert customizado*/
function showTooltip(message) {
  const alertBox = document.getElementById('tooltipAlert');
  const messageSpan = alertBox.querySelector('.tooltip__message');
  const closeButton = alertBox.querySelector('.tooltip__close__button');

  messageSpan.textContent = message;
  alertBox.style.display = 'flex';

  closeButton.addEventListener('click', function () {
    alertBox.style.display = 'none';
  });
}
