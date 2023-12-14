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
    let arrayItens = [''];
    if (edItens.length > 0) {
      arrayItens =
        edItens[0].valueString != null && edItens[0].valueString != undefined
          ? edItens[0].valueString.split(';')
          : (edItens[0].valueString = ['']);
    }
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
        emptyTable: 'Nenhum dado disponível na tabela',
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
        emptyTable: 'Nenhum dado disponível na tabela',
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

function gerarLaudo(itemAtual) {
  const idsPdf = [
    {
      nome: 'doencas_degenerativas',
      scorenp: '9be0f459-a9ae-70a2-66ed-166e80bdc6b4',
      scorep: 'ff7828fe-3116-55a7-27a0-41584e36a939',
      qualificacao: '0c06bc44-2af3-bc81-66f9-afaeed7afc71',
      analise: '3dba2013-32f5-6177-c4d2-c6bf9eb06032',
      ppa: 'ce6c8e01-248b-98b0-778b-adbaf24d4c7a',
    },
    {
      nome: 'doencas_cardiovasculares',
      scorenp: '66de0d64-1b36-5606-28f9-4f70d551b405',
      scorep: '4c3d9c47-a8b6-c738-3a97-0fd0796c74a4',
      qualificacao: 'b97c99fe-5fba-41a5-067a-94c92fdce2a5',
      analise: 'ab6bd85e-a7e6-a5d8-b1aa-5721c8501027',
      ppa: '29f52c74-23e6-bf7e-012a-bb6e333062ce',
    },
    {
      nome: 'capacidade_cognitiva',
      scorenp: 'bc7826ab-d284-fb0b-5448-3e740f085799',
      scorep: 'c425b3a5-4ad5-72b0-a69d-049bd2f97356',
      qualificacao: '6b907f31-eeee-13c3-3f71-7de15705889d',
      analise: 'e1256f1a-4a92-433d-d50b-d3fc1b7edf78',
      ppa: '9c7cf0c4-cfe1-1270-f62a-6a6f38f9bb60',
    },
    {
      nome: 'imunidade',
      scorenp: 'c5049bd4-9bdd-26b4-8875-17fa2574a8f9',
      scorep: '7f1e99ea-91b1-dbd0-6a1b-21438729c08a',
      qualificacao: '675e51fa-069c-2580-c57a-0e7ca3391843',
      imunidade: '4ff6c7cd-b963-7ed1-d536-d1504f56d93a',
      ppa: '2e410a7a-988a-38ff-c3e7-1f2a6f76a532',
    },
    {
      nome: 'burnout',
      scorenp: '9a1f86f5-2ef8-c00f-586c-1e9f829fe0fa',
      scorep: '691c2d70-e8c7-89d2-744c-d4532644f245',
      qualificacao: '36f14c97-0573-f7af-e4f1-222594a78eb5',
      analise: '18af101e-025c-e2bd-626b-d7ec9c462ae0',
      ppa: 'c3201d11-443c-e60b-8629-412f500afb26',
    },
    {
      nome: 'score_geral',
      scorenp: '946f2ad4-258b-3ca9-f73a-61dd5be9927a',
      scorep: 'cba14097-60a1-1441-1547-133b1548d7ed',
      qualificacao: '7dac6dca-786a-60fd-d308-2dc34fa13b3e',
    },
  ];

  const arrayPdf = idsPdf.map((item) => {
    let itensArrayPdf = [];
    for (const chave in item) {
      if (item.hasOwnProperty(chave) && chave !== 'nome') {
        const itemComp = itemAtual.find((el) => el.id === `${item[chave]}`);
        let novoItem = {};

        if (itemComp) {
          if (!isNaN(itemComp.value)) {
            novoItem[chave] = /\.\d\d/.test(itemComp.value)
              ? parseFloat(itemComp.value).toFixed(2)
              : itemComp.value;
          } else {
            novoItem[chave] = item.nome === 'score' ? 0 : itemComp.value;
          }
        } else {
          novoItem[chave] = item.nome === 'score' ? 0 : '-';
        }

        itensArrayPdf.push(novoItem);
      } else {
        itensArrayPdf.push({ nome: `${item[chave]}` });
      }
    }

    return itensArrayPdf.reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});
  });

  return arrayPdf;
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
