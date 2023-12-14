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
  const itensPdf = gerarLaudo(itemAtual);

  gerarPDF(itensPdf);

  $('.vertodos').click(function () {
    examesGeral(itensMaisRecentes);
    window.location.href =
      './medico-relatorio-exames.html?=' + $(this).attr('data-name');
  });
}
