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
            objComp[item.nome] =
              item.nome == 'score' || item.nome == 'ppa' ? 0 : itemComp.value;
          }
        } else {
          objComp[item.nome] =
            item.nome == 'score' || item.nome == 'ppa' ? 0 : '-';
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
        '<a href="./' +
        (userType == 'paciente'
          ? 'usuario-relatorio-individual.html?='
          : 'medico-relatorio-individual-det.html?=') +
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
