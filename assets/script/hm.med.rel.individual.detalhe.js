let pageUrl = window.location.href;
let arraySel = pageUrl.split('?=');
let dataSel = arraySel[arraySel.length - 2];
let emailSel = arraySel[arraySel.length - 1];

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
    ],
  }),
};

$.ajax(settings).done(function (response) {
  // Mapeando campos de response.dataResult
  const campos = response.dataResult.map((item) => item.campos);
  let nome;
  campos.map((item) => {
    nome = item.filter(
      (el) => el.id === 'efca7027-fdac-825d-a9a1-d7ce0e710434'
    );
  });
  nome.map((item) => {
    nome = item.value;
  });

  $('#paciente').text(nome);

  doencasDegenerativas(campos);
  doencasCardiovasculares(campos);
  capacidadeCognitiva(campos);
  imunidade(campos);
  burnout(campos);
  scoreGeral(campos);

  // Alertas e Exames Destaque
  if (campos.length > 0) {
    const idData = 'e57734a2-0156-335f-16c5-cda2fbc59853';
    const idMelhores = 'e5dee89f-8700-9f3b-9ee4-1e49655ac3b8';
    const idPiores = '614fed4c-f2c7-5cb2-1048-9475b89284bf';

    processarItens(campos, idData, idMelhores, idPiores);
  }
});

// Função para encontrar a data mais recente em um campo específico
function encontrarDataMaisRecente(campos, id, dataSel) {
  const resultado = campos.reduce((maisRecente, campo) => {
    const campoData = campo.find((el) => el.id === id);
    const dataForm = campoData.valueDate.includes('T')
      ? campoData.valueDate.replace(/T.*/, '')
      : campoData.valueDate;
    if (dataForm == dataSel) {
      return { campo, data: dataSel };
    }
    return maisRecente;
  }, null);

  return resultado ? resultado : null;
}

function construirHTMLItens(itens) {
  let cardHtml = '';

  itens.forEach((item) => {
    cardHtml +=
      '<div class="areacard"><h2 class="alerta__title">' +
      item.nome +
      '</h2><p class="alerta__prg">' +
      item.value +
      '</p></div>';
  });

  return cardHtml;
}

function inicializarSlides() {
  if (document.querySelectorAll('.alerts').length > 0) {
    let itensSlide = document.querySelectorAll('.alerts__geral');

    for (let i = 0; itensSlide.length > i; i++) {
      let data = itensSlide[i].id;
      new Glider(document.querySelector('#' + data), {
        draggable: true,
        dots: false,
        arrows: false,
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
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 3.4,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }
  }
}

function processarItens(campos, idData, idMelhores, idPiores) {
  const dataMaisRecente = encontrarDataMaisRecente(campos, idData, dataSel);

  if (dataMaisRecente) {
    const itensAlertaGeral = dataMaisRecente.campo.filter((el) =>
      el.nome.includes('Alerta')
    );

    console.log(itensAlertaGeral);
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

    let cardHtml;
    if (itensAlerta.length > 0) {
      cardHtml = construirHTMLItens(itensAlerta);
    } else {
      cardHtml = construirHTMLItens([{ value: 'Sem Alertas', nome: '' }]);
    }

    $('#alerts-slide').html(cardHtml);
    inicializarSlides();

    const processarItemEAdicionarTabela = (idCampo, itemName) => {
      const edItens = dataMaisRecente.campo.filter((el) => el.id === idCampo);
      const arrayItens = edItens[0].valueString.split(';');
      let itemHtml = '';
      let arrayFilt = [];

      $(arrayItens).each(function (index, item) {
        const objetoFiltrado = dataMaisRecente.campo.filter(
          (campo) => campo.nome === item
        );
        if (objetoFiltrado.length > 0) {
          if (!arrayFilt.includes(objetoFiltrado[0])) {
            arrayFilt.push(objetoFiltrado[0]);
          }
        }
      });

      $(arrayItens).each(function (index, item) {
        const objetoFiltrado = dataMaisRecente.campo.filter(
          (campo) => campo.nome === item
        );
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

    processarItemEAdicionarTabela(idMelhores, 'edMelhores');
    processarItemEAdicionarTabela(idPiores, 'edPiores');
  }
}

function doencasDegenerativas(campos) {
  let arrayIds = [
    { nome: 'qualificação', id: '0c06bc44-2af3-bc81-66f9-afaeed7afc71' },
    { nome: 'score ponderado', id: 'ff7828fe-3116-55a7-27a0-41584e36a939' },
    { nome: 'análise', id: '3dba2013-32f5-6177-c4d2-c6bf9eb06032' },
  ];

  // array dos ids e campos a serem tratados
  const processor = new DataProcessor(arrayIds);
  const itemFinal = processor.process(campos);

  // id da tabela a ser gerada + array com itens
  const tableGenerator = new HtmlTableGenerator('avDoencasDegenerativas');
  tableGenerator.generateTable(itemFinal);
  tableGenerator.setupTooltipClickListener();

  // id do chart a ser gerado + array com itens
  const chartGenerator = new HtmlChartGenerator('chartAvDoencasDegenerativas');
  chartGenerator.generateChart(itemFinal);
}
function doencasCardiovasculares(campos) {
  let arrayIds = [
    { nome: 'qualificação', id: 'b97c99fe-5fba-41a5-067a-94c92fdce2a5' },
    { nome: 'score ponderado', id: '4c3d9c47-a8b6-c738-3a97-0fd0796c74a4' },
    { nome: 'análise', id: 'ab6bd85e-a7e6-a5d8-b1aa-5721c8501027' },
  ];

  // array dos ids e campos a serem tratados
  const processor = new DataProcessor(arrayIds);
  const itemFinal = processor.process(campos);

  // id da tabela a ser gerada + array com itens
  const tableGenerator = new HtmlTableGenerator('avDoencasCardiovasculares');
  tableGenerator.generateTable(itemFinal);

  // id do chart a ser gerado + array com itens
  const chartGenerator = new HtmlChartGenerator(
    'chartAvDoencasCardiovasculares'
  );
  chartGenerator.generateChart(itemFinal);
}
function capacidadeCognitiva(campos) {
  let arrayIds = [
    { nome: 'qualificação', id: '6b907f31-eeee-13c3-3f71-7de15705889d' },
    { nome: 'score ponderado', id: 'c425b3a5-4ad5-72b0-a69d-049bd2f97356' },
    { nome: 'análise', id: 'e1256f1a-4a92-433d-d50b-d3fc1b7edf78' },
  ];

  // array dos ids e campos a serem tratados
  const processor = new DataProcessor(arrayIds);
  const itemFinal = processor.process(campos);

  // id da tabela a ser gerada + array com itens
  const tableGenerator = new HtmlTableGenerator('avCapacidadeCognitiva');
  tableGenerator.generateTable(itemFinal);
  tableGenerator.setupTooltipClickListener();

  // id do chart a ser gerado + array com itens
  const chartGenerator = new HtmlChartGenerator('chartAvCapacidadeCognitiva');
  chartGenerator.generateChart(itemFinal);
}
function imunidade(campos) {
  let arrayIds = [
    { nome: 'qualificação', id: '675e51fa-069c-2580-c57a-0e7ca3391843' },
    { nome: 'score ponderado', id: '7f1e99ea-91b1-dbd0-6a1b-21438729c08a' },
    { nome: 'análise', id: '4ff6c7cd-b963-7ed1-d536-d1504f56d93a' },
  ];

  // array dos ids e campos a serem tratados
  const processor = new DataProcessor(arrayIds);
  const itemFinal = processor.process(campos);

  // id da tabela a ser gerada + array com itens
  const tableGenerator = new HtmlTableGenerator('avImunidade');
  tableGenerator.generateTable(itemFinal);
  tableGenerator.setupTooltipClickListener();

  // id do chart a ser gerado + array com itens
  const chartGenerator = new HtmlChartGenerator('chartAvImunidade');
  chartGenerator.generateChart(itemFinal);
}
function burnout(campos) {
  let arrayIds = [
    { nome: 'qualificação', id: '36f14c97-0573-f7af-e4f1-222594a78eb5' },
    { nome: 'score ponderado', id: '691c2d70-e8c7-89d2-744c-d4532644f245' },
    { nome: 'análise', id: '18af101e-025c-e2bd-626b-d7ec9c462ae0' },
  ];

  // array dos ids e campos a serem tratados
  const processor = new DataProcessor(arrayIds);
  const itemFinal = processor.process(campos);

  // id da tabela a ser gerada + array com itens
  const tableGenerator = new HtmlTableGenerator('avBurnout');
  tableGenerator.generateTable(itemFinal);
  tableGenerator.setupTooltipClickListener();

  // id do chart a ser gerado + array com itens
  const chartGenerator = new HtmlChartGenerator('chartAvBurnout');
  chartGenerator.generateChart(itemFinal);
}
function scoreGeral(campos) {
  let arrayIds = [
    { nome: 'qualificação', id: '7dac6dca-786a-60fd-d308-2dc34fa13b3e' },
    { nome: 'score ponderado', id: 'cba14097-60a1-1441-1547-133b1548d7ed' },
    { nome: 'score não ponderado', id: '946f2ad4-258b-3ca9-f73a-61dd5be9927a' },
  ];

  // array dos ids e campos a serem tratados
  const processor = new DataProcessor(arrayIds);
  const itemFinal = processor.process(campos);

  // id da tabela a ser gerada + array com itens
  const tableGenerator = new HtmlTableGenerator('avScoreGeral');
  tableGenerator.generateTable(itemFinal);

  // id do chart a ser gerado + array com itens
  const chartGenerator = new HtmlChartGenerator('chartAvScoreGeral');
  chartGenerator.generateChart(itemFinal);

  // id do chart a ser gerado + array com itens
  const scoreGenerator = new HtmlScoreGenerator('ScoreGeral');
  scoreGenerator.generateScore(itemFinal);
}

class DataProcessor {
  constructor(arrayIds) {
    this.arrayConcatenado = [
      { nome: 'data', id: 'e57734a2-0156-335f-16c5-cda2fbc59853' },
      ...arrayIds,
    ];
  }

  process(campos) {
    const itemQual = campos.map((obj) => {
      return this.arrayConcatenado.reduce((arrayComp, item) => {
        const itemComp = obj.filter((el) => el.id === item.id);

        const mappedItemComp = itemComp.map((e) => ({
          nome: e.nome,
          value: e.value,
        }));
        return arrayComp.concat(mappedItemComp);
      }, []);
    });

    let itemFinal = itemQual.map((obj, index) => {
      const itemObj = {
        data: obj[0].value,
        qualificacao: obj[1].value,
        score: obj[2].value,
      };

      if (obj.length > 3 && obj[3].nome.includes('Análise')) {
        itemObj.analise = obj[3].value;
      } else if (obj.length > 3 && !obj[3].nome.includes('Análise')) {
        itemObj.npscore = obj[3].value;
      }
      return itemObj;
    });

    itemFinal = itemFinal.sort(function (a, b) {
      return new Date(a.data) < new Date(b.data)
        ? -1
        : new Date(a.data) > new Date(b.data)
        ? 1
        : 0;
    });

    itemFinal = itemFinal.map((obj, index) => ({
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
        let dataFormatada = this.formatData(item.data);
        const qualificacao = item.qualificacao;
        const classeCSS = Qualificacao.getClasseCSS(qualificacao);

        itemHtml +=
          '<tr><td>' +
          dataFormatada +
          '</td>' +
          '<td><span class="tb__status ' +
          classeCSS +
          '">' +
          qualificacao +
          '</span>' +
          (this.tableId !== 'avScoreGeral'
            ? '<span class="tb_tooltip" data-tooltip="' +
              item.analise +
              '"></span>'
            : '') +
          '</td>' +
          '<td>' +
          item.score +
          '</td>' +
          (this.tableId == 'avScoreGeral'
            ? '<td>' + item.npscore + '</td></tr>'
            : '</tr>');

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
      dataSel = this.formatDataUS(dataSel);
      const qualificacao = item.qualificacao;
      const classeCSS = Qualificacao.getClasseCSS(qualificacao);

      const classAtual = dataFormatadaUS === dataSel ? ' data--atual' : '';

      itemHtml +=
        '<a href="./medico-relatorio-individual-det.html?=' +
        dataFormatadaUS +
        '?=' +
        emailSel +
        '" class="areascore__item' +
        classAtual +
        '">' +
        '<span class="areascore__item__valor">' +
        item.score +
        '</span>' +
        '<p class="areascore__item__data';
      if (dataFormatadaUS === dataSel) {
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
