let pageUrl = window.location.href;
let dataAtual = '';
let emailAtual = '';

/*** Verifica se a url vem de médico ou paciente ***/
if (pageUrl.includes('?=')) {
  let arraySel = pageUrl.split('?=');
  dataAtual = arraySel[arraySel.length - 2];
  emailAtual = arraySel[arraySel.length - 1];
} else {
  emailAtual = sessionStorage.getItem('userEmail');
}

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
  $('[data-id="load"]').css('display', 'flex');
  /*** Mapeando campos de response.dataResult ***/
  const campos = response.dataResult.map((item) => item.campos);
  /*** Encontrar o nome do paciente para ser apresentado ***/
  encontrarNome(campos);
  /*** Encontrar as três datas mais recentes ***/
  const itensMaisRecentes = processarItensRecentes(campos);
  /*** Processar os itens ***/
  callItens(itensMaisRecentes);
  $('[data-id="load"]').css('display', 'none');
});

/*** Processar os itens ***/
function callItens(itensMaisRecentes) {
  if (dataAtual == '') {
    let idata = itensMaisRecentes[0].filter(
      (el) => el.id === 'e57734a2-0156-335f-16c5-cda2fbc59853'
    );
    dataAtual = idata[0].valueDate;
  }

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
  apresentarRecomendacoes(itemAtual);
  examesDestaque(itemAtual);
  estiloVida(itemAtual);
  inicializarSlides();
  const itensPdf = gerarLaudo(itemAtual);

  gerarPDF(itensPdf);

  $('.vertodos').click(function () {
    examesGeral(itensMaisRecentes);
    window.location.href =
      './medico-relatorio-exames.html?=' + $(this).attr('data-name');
  });
}
