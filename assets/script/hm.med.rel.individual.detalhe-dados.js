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
