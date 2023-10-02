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
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay0wOHc3OUBjaGVja2dvLWU4NjgwLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstMDh3NzlAY2hlY2tnby1lODY4MC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaWF0IjoxNjkyNjY1OTQ3LjE5NCwiZXhwIjoxNzA4MjE3OTQ3LjE5NCwidWlkIjoiWEpxUDVVU2t6Y1lUM3pTQ3hxaFhDRkVsdzVLMiIsImNsYWltcyI6eyJ1c2VyUHVibGljIjp0cnVlfX0.LpmXePJfDI1PDfMf_5cW0gUk19m_RMyWk7Pjwx3FPPXvdqSae8ZTYWP4f8iBm1MZYXYCBeqxsoX0y9dh00TzWGRnw_sJMLeo2HeIAwscca0ZrT9Qh5tc3n5is0mUjZL7Kj6DBBrAQJqh1c7I3N6udyIGCYXtRfT_mYYBiLmkuQP3g3u6QR0-RvZZyf2_BcGUYBb4E8n--aUeff4EfYTToc9U-5vtGNxsIUqTfX0_xu9uA3czVotHGaPjupeN-MQjyKX7MV8anRCi6HpuI2Xfx3_b91bgUB3d3E5cbH8VJ2OhGWBXfdtt7LtTq0n1Ii_l8kuEBJ8npHlJe4ZYUx7TKA',
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

  console.log(nome);
  console.log(campos);
  doencasDegenerativas(campos);
  doencasCardiovasculares(campos);
  capacidadeCognitiva(campos);
  imunidade(campos);
  burnout(campos);
  scoreGeral(campos);
});

function doencasDegenerativas(campos) {
  let arrayIds = [
    { nome: 'qualificação', id: '0c06bc44-2af3-bc81-66f9-afaeed7afc71' },
    { nome: 'score ponderado', id: 'ff7828fe-3116-55a7-27a0-41584e36a939' },
  ];

  // array dos ids e campos a serem tratados
  const processor = new DataProcessor(arrayIds);
  const itemFinal = processor.process(campos);

  // id da tabela a ser gerada + array com itens
  const tableGenerator = new HtmlTableGenerator('avDoencasDegenerativas');
  tableGenerator.generateTable(itemFinal);

  // id do chart a ser gerado + array com itens
  const chartGenerator = new HtmlChartGenerator('chartAvDoencasDegenerativas');
  chartGenerator.generateChart(itemFinal);
}
function doencasCardiovasculares(campos) {
  let arrayIds = [
    { nome: 'qualificação', id: 'b97c99fe-5fba-41a5-067a-94c92fdce2a5' },
    { nome: 'score ponderado', id: '4c3d9c47-a8b6-c738-3a97-0fd0796c74a4' },
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
  ];

  // array dos ids e campos a serem tratados
  const processor = new DataProcessor(arrayIds);
  const itemFinal = processor.process(campos);

  // id da tabela a ser gerada + array com itens
  const tableGenerator = new HtmlTableGenerator('avCapacidadeCognitiva');
  tableGenerator.generateTable(itemFinal);

  // id do chart a ser gerado + array com itens
  const chartGenerator = new HtmlChartGenerator('chartAvCapacidadeCognitiva');
  chartGenerator.generateChart(itemFinal);
}
function imunidade(campos) {
  let arrayIds = [
    { nome: 'qualificação', id: '675e51fa-069c-2580-c57a-0e7ca3391843' },
    { nome: 'score ponderado', id: '7f1e99ea-91b1-dbd0-6a1b-21438729c08a' },
  ];

  // array dos ids e campos a serem tratados
  const processor = new DataProcessor(arrayIds);
  const itemFinal = processor.process(campos);

  // id da tabela a ser gerada + array com itens
  const tableGenerator = new HtmlTableGenerator('avImunidade');
  tableGenerator.generateTable(itemFinal);

  // id do chart a ser gerado + array com itens
  const chartGenerator = new HtmlChartGenerator('chartAvImunidade');
  chartGenerator.generateChart(itemFinal);
}
function burnout(campos) {
  let arrayIds = [
    { nome: 'qualificação', id: '36f14c97-0573-f7af-e4f1-222594a78eb5' },
    { nome: 'score ponderado', id: '691c2d70-e8c7-89d2-744c-d4532644f245' },
  ];

  // array dos ids e campos a serem tratados
  const processor = new DataProcessor(arrayIds);
  const itemFinal = processor.process(campos);

  // id da tabela a ser gerada + array com itens
  const tableGenerator = new HtmlTableGenerator('avBurnout');
  tableGenerator.generateTable(itemFinal);

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

      if (obj.length > 3) {
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
          '</span></td>' +
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
      const qualificacao = item.qualificacao;
      const classeCSS = Qualificacao.getClasseCSS(qualificacao);

      itemHtml +=
        '<div class="areascore__item">' +
        '<span class="areascore__item__valor">' +
        item.score +
        '</span>' +
        '<p class="areascore__item__data';
      if (index === novoDataArray.length - 1) {
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
        '</div>';
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

class DateFormatter {
  static formatData(data) {
    const date = !data.includes('T')
      ? new Date(data + 'T00:00:00')
      : new Date(data);
    return date.toLocaleDateString('pt-BR');
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
