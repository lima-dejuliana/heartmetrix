let pageUrl = window.location.href;
let arraySel = pageUrl.split('?=');
let dataAtual = arraySel[arraySel.length - 2];
let emailAtual = arraySel[arraySel.length - 1];

/*** Verifica se o item existe no localStorage ***/
if (localStorage.getItem('exames')) {
  localStorage.removeItem('exames');
}

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
        value: emailAtual,
      },
    ],
  }),
};

$.ajax(settings).done(function (response) {
  /*** Mapeando campos de response.dataResult ***/
  const campos = response.dataResult.map((item) => item.campos);
  /*** Encontrar o nome do paciente para ser apresentado ***/
  encontrarNome(campos);
  /*** Encontrar as três datas mais recentes ***/
  const itensMaisRecentes = processarItensRecentes(campos);
  /*** Processar os itens ***/
  callItens(itensMaisRecentes);
});

/*** Dados dos itens de chamada ***/
let listaDados = [
  {
    nome: 'doencas_degenerativas',
    campos: [
      { nome: 'qualificacao', id: '0c06bc44-2af3-bc81-66f9-afaeed7afc71' },
      { nome: 'score', id: 'ce6c8e01-248b-98b0-778b-adbaf24d4c7a' } /*PPA*/,
      { nome: 'analise', id: '3dba2013-32f5-6177-c4d2-c6bf9eb06032' },
    ],
    html: [
      {
        table: 'avDoencasDegenerativas',
        grafico: 'chartAvDoencasDegenerativas',
      },
    ],
  },
  {
    nome: 'doencas_cardiovasculares',
    campos: [
      { nome: 'qualificacao', id: 'b97c99fe-5fba-41a5-067a-94c92fdce2a5' },
      { nome: 'score', id: '29f52c74-23e6-bf7e-012a-bb6e333062ce' } /*PPA*/,
      { nome: 'analise', id: 'ab6bd85e-a7e6-a5d8-b1aa-5721c8501027' },
    ],
    html: [
      {
        table: 'avDoencasCardiovasculares',
        grafico: 'chartAvDoencasCardiovasculares',
      },
    ],
  },
  {
    nome: 'capacidade_cognitiva',
    campos: [
      { nome: 'qualificacao', id: '6b907f31-eeee-13c3-3f71-7de15705889d' },
      { nome: 'score', id: '9c7cf0c4-cfe1-1270-f62a-6a6f38f9bb60' } /**PPA */,
      { nome: 'analise', id: 'e1256f1a-4a92-433d-d50b-d3fc1b7edf78' },
    ],
    html: [
      {
        table: 'avCapacidadeCognitiva',
        grafico: 'chartAvCapacidadeCognitiva',
      },
    ],
  },
  {
    nome: 'imunidade',
    campos: [
      { nome: 'qualificacao', id: '675e51fa-069c-2580-c57a-0e7ca3391843' },
      { nome: 'score', id: '2e410a7a-988a-38ff-c3e7-1f2a6f76a532' } /*PPA */,
      { nome: 'analise', id: '4ff6c7cd-b963-7ed1-d536-d1504f56d93a' },
    ],
    html: [
      {
        table: 'avImunidade',
        grafico: 'chartAvImunidade',
      },
    ],
  },
  {
    nome: 'bornout',
    campos: [
      { nome: 'qualificacao', id: '36f14c97-0573-f7af-e4f1-222594a78eb5' },
      { nome: 'score', id: 'c3201d11-443c-e60b-8629-412f500afb26' } /*PPA */,
      { nome: 'analise', id: '18af101e-025c-e2bd-626b-d7ec9c462ae0' },
    ],
    html: [
      {
        table: 'avBurnout',
        grafico: 'chartAvBurnout',
      },
    ],
  },
  {
    nome: 'score_geral',
    campos: [
      { nome: 'qualificacao', id: '7dac6dca-786a-60fd-d308-2dc34fa13b3e' },
      { nome: 'score', id: 'cba14097-60a1-1441-1547-133b1548d7ed' },
      { nome: 'npscore', id: '946f2ad4-258b-3ca9-f73a-61dd5be9927a' },
    ],
    html: [
      {
        table: 'avScoreGeral',
        grafico: 'chartAvScoreGeral',
      },
    ],
  },
  {
    nome: 'tonus_mental',
    campos: [{ nome: 'score', id: '992293d9-bd61-662b-d5cf-1c5a061fb8ab' }],
    html: [
      {
        table: 'avTonusMental',
        grafico: 'chartAvTonusMental',
      },
    ],
  },
  {
    nome: 'status_emocional',
    campos: [{ nome: 'score', id: '061eef61-fb9f-279c-6e9a-d313f3755435' }],
    html: [
      {
        table: 'avStatusEmocional',
        grafico: 'chartAvStatusEmocional',
      },
    ],
  },
  {
    nome: 'estilo_de_vida',
    campos: [{ nome: 'score', id: '7e389dac-06c1-e008-7aae-a1e0e0aaab9f' }],
    html: [
      {
        table: 'avEV',
        grafico: 'chartAvEV',
      },
    ],
  },
];
/*** Processar os itens ***/
function callItens(itensMaisRecentes) {
  listaDados.map((item) => {
    /*** array dos ids e campos a serem tratados ***/
    const processor = new DataProcessor(item.campos);
    const itemFinal = processor.process(itensMaisRecentes);

    /*** id da tabela a ser gerada + array com itens ***/
    const tableGenerator = new HtmlTableGenerator(item.html[0].table);
    tableGenerator.generateTable(itemFinal);
    tableGenerator.setupTooltipClickListener();
    /*** id do chart a ser gerado + array com itens ***/
    const chartGenerator = new HtmlChartGenerator(item.html[0].grafico);
    chartGenerator.generateChart(itemFinal);

    if (item.nome == 'score_geral') {
      /*** id do chart a ser gerado + array com itens ***/
      const scoreGenerator = new HtmlScoreGenerator('ScoreGeral');
      scoreGenerator.generateScore(itemFinal);
    }
  });

  const itemAtual = filtrarItemAtual(itensMaisRecentes);
  apresentarAlertas(itemAtual);
  examesDestaque(itemAtual);
  estiloVida(itemAtual);
  $('.vertodos').click(function () {
    examesGeral(itensMaisRecentes);
    window.location.href =
      './medico-relatorio-exames.html?=' + $(this).attr('data-name');
  });
}

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
/*** classes ***/
class DataProcessor {
  constructor(arrayIds) {
    this.arrayConcatenado = [
      { nome: 'data', id: 'e57734a2-0156-335f-16c5-cda2fbc59853' },
      ...arrayIds,
    ];
  }

  process(itensMaisRecentes) {
    const itemQual = itensMaisRecentes.map((obj) => {
      return this.arrayConcatenado.reduce((objComp, item) => {
        const itemComp = obj.find((el) => el.id === item.id);

        if (itemComp) {
          if (!isNaN(itemComp.value)) {
            objComp[item.nome] = /\.\d\d/.test(itemComp.value)
              ? parseFloat(itemComp.value).toFixed(2)
              : itemComp.value;
          } else {
            objComp[item.nome] = item.nome == 'score' ? 0 : itemComp.value;
          }
        } else {
          objComp[item.nome] = item.nome == 'score' ? 0 : '-';
        }

        return objComp;
      }, {});
    });

    let itemFinal = itemQual.sort(function (a, b) {
      return new Date(a.data) < new Date(b.data)
        ? -1
        : new Date(a.data) > new Date(b.data)
        ? 1
        : 0;
    });

    itemFinal = itemQual.map((obj, index) => ({
      ...obj,
      order: index,
    }));

    return itemFinal;
  }
}
class HtmlTableGenerator {
  constructor(tableId) {
    this.tableId = tableId;
  }

  generateTable(dataArray) {
    dataArray = dataArray.sort(function (a, b) {
      return a.order < b.order ? 1 : a.order > b.order ? -1 : 0;
    });

    let itemHtml = '';
    let contador = 0;
    dataArray.forEach((item) => {
      if (contador < 3) {
        let colunaItemHtml = [];
        for (const chave in item) {
          if (item.hasOwnProperty(chave)) {
            switch (chave) {
              case 'data':
                colunaItemHtml +=
                  '<td>' + this.formatData(item[chave]) + '</td>';
                break;
              case 'qualificacao':
                colunaItemHtml +=
                  '<td><span class="tb__status ' +
                  Qualificacao.getClasseCSS(item[chave]) +
                  '">' +
                  item[chave] +
                  '</span>' +
                  (item.hasOwnProperty('analise')
                    ? '<span class="tb_tooltip" data-tooltip="' +
                      item.analise +
                      '"></span></td>'
                    : '</td>');
                break;
              case 'analise':
                break;
              case 'order':
                break;
              default:
                colunaItemHtml += '<td>' + item[chave] + '</td>';
                break;
            }
          }
        }
        itemHtml += '<tr>' + colunaItemHtml + '</tr>';

        contador++;
      }
    });

    // Adicionar o HTML gerado à tabela com o ID especificado
    $('#' + this.tableId + ' tbody').html(itemHtml);

    // Inicializar a tabela DataTable (você pode personalizar as opções conforme necessário)
    let table = new DataTable($('#' + this.tableId), {
      info: false,
      ordering: false,
      paging: false,
      searching: false,
    });
  }

  formatData(data) {
    const dataA = data;
    return DateFormatter.formatData(dataA);
  }

  setupTooltipClickListener() {
    const self = this; // Captura a referência à instância da classe

    // Configura o ouvinte de eventos para elementos .tb_tooltip
    $('.tb_tooltip').on('click', function () {
      self.showAlert($(this).attr('data-tooltip'));
    });
  }
  showAlert(message) {
    showTooltip(message);
  }
}
class HtmlChartGenerator {
  constructor(chartId) {
    this.chartId = chartId;
  }

  generateChart(dataArray) {
    // Limitar dataArray aos primeiros 3 elementos
    const novoDataArray = dataArray.slice(0, 3);

    // Ordenar o novoDataArray com base na propriedade 'order'
    novoDataArray.sort((a, b) => a.order - b.order);

    // Extrair labelsChart e dataChart diretamente do novoDataArray
    const labelsChart = novoDataArray.map((item) => this.formatData(item.data));
    const dataChart = novoDataArray.map((item) =>
      item.npscore != undefined ? item.npscore : item.score
    );

    // Inicializar chart
    new Chart($('#' + this.chartId), {
      type: 'line',
      data: {
        labels: labelsChart,
        datasets: [
          {
            label: '',
            data: dataChart,
            borderWidth: 2,
            borderColor: '#358CCB',
            backgroundColor: 'rgba(53, 140, 203, 0.25)',
            fill: 'origin',
          },
        ],
      },

      options: {
        plugins: {
          filler: {
            propagate: false,
          },
          legend: {
            labels: false,
          },
        },
        interaction: {
          intersect: false,
        },
        tooltip: {
          enabled: true,
        },
        cutout: 70,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            max: 100,
            beginAtZero: true,
            ticks: {
              stepSize: 20, // Intervalo entre os ticks no eixo Y
              callback: function (value) {
                return value; // Retorna o valor do tick
              },
            },
            grid: {
              display: true,
            },
          },
        },
        elements: {
          line: {
            tension: 0.35, // Ajuste a tensão para criar ondas
          },
        },
      },
    });
  }

  formatData(data) {
    const dataA = data;
    return DateFormatter.formatData(dataA);
  }
}
class HtmlScoreGenerator {
  constructor(scoreId) {
    this.scoreId = scoreId;
  }

  generateScore(dataArray) {
    // Limitar dataArray aos primeiros 3 elementos
    const novoDataArray = dataArray.slice(0, 3);

    // Ordenar o novoDataArray com base na propriedade 'order'
    novoDataArray.sort((a, b) => a.order - b.order);
    let itemHtml = '';
    // montar campos de score inicial
    novoDataArray.forEach((item, index) => {
      let dataFormatada = this.formatData(item.data);
      let dataFormatadaUS = this.formatDataUS(item.data);
      dataAtual = this.formatDataUS(dataAtual);
      const qualificacao = item.qualificacao;
      const classeCSS = Qualificacao.getClasseCSS(qualificacao);

      const classAtual = dataFormatadaUS === dataAtual ? ' data--atual' : '';

      itemHtml +=
        '<a href="./medico-relatorio-individual-det.html?=' +
        dataFormatadaUS +
        '?=' +
        emailAtual +
        '" class="areascore__item' +
        classAtual +
        '">' +
        '<span class="areascore__item__valor">' +
        item.score +
        '</span>' +
        '<p class="areascore__item__data';
      if (dataFormatadaUS === dataAtual) {
        itemHtml += ' data--atual">Score atual';
      } else {
        itemHtml += '">' + dataFormatada;
      }
      itemHtml +=
        '</p><p class="areascore__item__qual"><span class="tb__status ' +
        classeCSS +
        '">' +
        qualificacao +
        '</span></p>' +
        '</a>';
    });
    // Adicionar o HTML gerado à tabela com o ID especificado
    $('#area' + this.scoreId).html(itemHtml);

    // Extrair labelsChart e dataChart diretamente do novoDataArray
    const labelsChart = novoDataArray.map((item) => this.formatData(item.data));
    const dataChart = novoDataArray.map((item) => item.score);

    // Inicializar chart
    new Chart($('#chart' + this.scoreId), {
      type: 'line',
      data: {
        labels: labelsChart,
        datasets: [
          {
            label: '',
            data: dataChart,
            borderWidth: 2,
            borderColor: '#358CCB',
            backgroundColor: 'rgba(53, 140, 203, 0.25)',
            fill: 'origin',
          },
        ],
      },

      options: {
        plugins: {
          filler: {
            propagate: false,
          },
          legend: {
            labels: false,
          },
        },
        interaction: {
          intersect: false,
        },
        tooltip: {
          enabled: true,
        },
        cutout: 70,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            max: 100,
            beginAtZero: true,
            ticks: {
              stepSize: 20, // Intervalo entre os ticks no eixo Y
              callback: function (value) {
                return value; // Retorna o valor do tick
              },
            },
            grid: {
              display: true,
            },
          },
        },
        elements: {
          line: {
            tension: 0.3, // Ajuste a tensão para criar ondas
          },
        },
      },
    });
  }

  formatData(data) {
    const dataA = data;
    return DateFormatter.formatData(dataA);
  }
  formatDataUS(data) {
    const dataA = data;
    return DateFormatterUS.formatDataUS(dataA);
  }
}
class DateFormatter {
  static formatData(data) {
    const date = !data.includes('T')
      ? new Date(data + 'T00:00:00')
      : new Date(data);
    return date.toLocaleDateString('pt-BR');
  }
}
class DateFormatterUS {
  static formatDataUS(data) {
    const date = data.includes('T') ? data.replace(/T.*/, '') : data;
    return date;
  }
}
class Qualificacao {
  static getClasseCSS(qualificacao) {
    switch (qualificacao) {
      case 'Péssimo':
        return 'st--pes';
      case 'Ruim':
        return 'st--ruim';
      case 'Regular':
        return 'st--reg';
      case 'Bom':
        return 'st--bom';
      case 'Ótimo':
        return 'st--otimo';
      default:
        return '';
    }
  }
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

$('#btnlaudo').click(function () {
  // Função para carregar uma imagem como base64
  const getBase64Image = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Habilita o CORS, se necessário
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/jpeg'); // Pode mudar o formato se necessário (png, etc.)
        resolve(dataURL);
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  // Cria um novo documento PDF
  const doc = new jsPDF('l', 'cm', [50.8, 28.58]);
  // Adiciona a imagem incorporada ao PDF
  const addEmbeddedImageToPDF = async (url, x, y, width, height) => {
    try {
      const base64Img = await getBase64Image(url);
      doc.addImage(base64Img, 'JPEG', x, y, width, height);
      /** add texto com limite de largura e centralizado **/
      addCenteredTextWithLimit($(this).attr('data-name'), 0.93, 12, 13.12);
      doc.save('arquivo.pdf');
    } catch (error) {
      console.error('Erro ao incorporar a imagem:', error);
    }
  };

  /*** Função para adicionar texto limitado em largura e centralizado ***/
  const addCenteredTextWithLimit = (text, x, y, maxWidth) => {
    const lineHeight = doc.internal.getFontSize() * 1.2; // Altura da linha baseada no tamanho da fonte
    const textLines = doc.splitTextToSize(text, maxWidth); // Divide o texto em linhas de acordo com a largura máxima

    textLines.forEach((line, index) => {
      const textWidth = doc.getTextWidth(line); // Obtém a largura do texto
      const centerX = x + (maxWidth - textWidth) / 2; // Calcula a posição x centralizada

      // Adiciona o texto centralizado
      doc.text(line, centerX, y + index * lineHeight);
    });
  };

  // Chamada para adicionar a imagem incorporada ao PDF
  addEmbeddedImageToPDF(
    'http://127.0.0.1:5501/assets/images/laudo/laudo_pagina_1.jpg',
    0,
    0,
    50.8,
    28.58
  ); // Altere o caminho da imagem
});
