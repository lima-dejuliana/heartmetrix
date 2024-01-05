// medidas padroes do doc
// { x: 0},
// { y: 0 },
// { largura: 50.8 },
// { altura: 28.58 },
const urlPorQualificacao = {
  Péssimo: '/assets/images/laudo/laudo_pagina_score_pessimo.jpg',
  Ruim: '/assets/images/laudo/laudo_pagina_score_ruim.jpg',
  Regular: '/assets/images/laudo/laudo_pagina_score_regular.jpg',
  Bom: '/assets/images/laudo/laudo_pagina_score_bom.jpg',
  Ótimo: '/assets/images/laudo/laudo_pagina_score_otimo.jpg',
};

/*** Ao clicar no botão ***/
function gerarPDF(itensPdf) {
  const urlAtual = window.location.href;
  console.log(urlAtual);
  const urlImg = urlAtual.includes('deploy')
    ? 'https://deploy.rai.com.br/heartmetrix'
    : 'http://127.0.0.1:5501';

  let listaImg = [
    {
      nome: 'page_1',
      url: urlImg + '/assets/images/laudo/laudo_pagina_1.jpg',
      textos: [
        {
          texto: 'paciente',
          x: 7.25,
          y: 12.03,
          maxLargura: 13,
          fontSize: 24,
          color: '#000',
          letterSpacing: '1.8',
          textAlign: 'center',
          fontWeight: 'normal',
          textUp: 'uppercase',
        },
      ],
    },
    {
      nome: 'page_2',
      url: urlImg + '/assets/images/laudo/laudo_pagina_2.jpg',
      textos: [],
    },
    {
      nome: 'page_3',
      url: urlImg + '/assets/images/laudo/laudo_pagina_3.jpg',
      textos: [],
    },
    {
      nome: 'page_4',
      url: urlImg + '/assets/images/laudo/laudo_pagina_4.jpg',
      textos: [],
    },
    {
      nome: 'page_5',
      url: urlImg + '/assets/images/laudo/laudo_pagina_5.jpg',
      textos: [],
    },
    {
      nome: 'page_6',
      url: urlImg + '/assets/images/laudo/laudo_pagina_6.jpg',
      textos: [
        {
          texto: 'paciente',
          x: 13.2,
          y: 6.18,
          maxLargura: 30,
          fontSize: 56,
          color: '#7b7b7b',
          letterSpacing: '1.8',
          textAlign: 'left',
          fontWeight: 'bold',
          textUp: 'uppercase',
        },
        {
          texto:
            itensPdf.find((el) => el.nome === 'doencas_degenerativas').scorenp +
            '%',
          x: 7.08,
          y: 14.07,
          maxLargura: 5,
          fontSize: 16,
          color: '#000',
          letterSpacing: '1.2',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto:
            itensPdf.find((el) => el.nome === 'doencas_degenerativas').scorep +
            '%',
          x: 4.525,
          y: 14.83,
          maxLargura: 5,
          fontSize: 16,
          color: '#000',
          letterSpacing: '1.2',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto:
            '(considerado ' +
            itensPdf.find((el) => el.nome === 'doencas_degenerativas')
              .qualificacao +
            ')',
          x: 1.16,
          y: 15.67,
          maxLargura: 16.5,
          fontSize: 20,
          color: '#7b7b7b',
          letterSpacing: '0',
          textAlign: 'left',
          fontWeight: 'bold',
          textUp: 'lowercase',
        },
        {
          texto:
            itensPdf.find((el) => el.nome === 'doencas_cardiovasculares')
              .scorenp + '%',
          x: 17.6,
          y: 14.07,
          maxLargura: 5,
          fontSize: 16,
          color: '#000',
          letterSpacing: '1.2',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto:
            itensPdf.find((el) => el.nome === 'doencas_cardiovasculares')
              .scorep + '%',
          x: 15.02,
          y: 14.83,
          maxLargura: 5,
          fontSize: 16,
          color: '#000',
          letterSpacing: '1.2',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto:
            '(considerado ' +
            itensPdf.find((el) => el.nome === 'doencas_cardiovasculares')
              .qualificacao +
            ')',
          x: 11.6,
          y: 15.67,
          maxLargura: 16.5,
          fontSize: 20,
          color: '#7b7b7b',
          letterSpacing: '0',
          textAlign: 'left',
          fontWeight: 'bold',
          textUp: 'lowercase',
        },
        {
          texto:
            itensPdf.find((el) => el.nome === 'capacidade_cognitiva').scorenp +
            '%',
          x: 26.62,
          y: 14.07,
          maxLargura: 5,
          fontSize: 16,
          color: '#000',
          letterSpacing: '1.2',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto:
            itensPdf.find((el) => el.nome === 'capacidade_cognitiva').scorep +
            '%',
          x: 24.15,
          y: 14.83,
          maxLargura: 5,
          fontSize: 16,
          color: '#000',
          letterSpacing: '1.2',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto:
            '(considerado ' +
            itensPdf.find((el) => el.nome === 'capacidade_cognitiva')
              .qualificacao +
            ')',
          x: 20.65,
          y: 15.67,
          maxLargura: 16.5,
          fontSize: 20,
          color: '#7b7b7b',
          letterSpacing: '0',
          textAlign: 'left',
          fontWeight: 'bold',
          textUp: 'lowercase',
        },
        {
          texto: itensPdf.find((el) => el.nome === 'imunidade').scorenp + '%',
          x: 37.3,
          y: 14.07,
          maxLargura: 5,
          fontSize: 16,
          color: '#000',
          letterSpacing: '1.2',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto: itensPdf.find((el) => el.nome === 'imunidade').scorep + '%',
          x: 34.8,
          y: 14.83,
          maxLargura: 5,
          fontSize: 16,
          color: '#000',
          letterSpacing: '1.2',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto:
            '(considerado ' +
            itensPdf.find((el) => el.nome === 'imunidade').qualificacao +
            ')',
          x: 31.285,
          y: 15.67,
          maxLargura: 16.5,
          fontSize: 20,
          color: '#7b7b7b',
          letterSpacing: '0',
          textAlign: 'left',
          fontWeight: 'bold',
          textUp: 'lowercase',
        },
        {
          texto: itensPdf.find((el) => el.nome === 'burnout').scorenp + '%',
          x: 46.66,
          y: 14.07,
          maxLargura: 5,
          fontSize: 16,
          color: '#000',
          letterSpacing: '1.2',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto: itensPdf.find((el) => el.nome === 'burnout').scorep + '%',
          x: 44.2,
          y: 14.83,
          maxLargura: 5,
          fontSize: 16,
          color: '#000',
          letterSpacing: '1.2',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto:
            '(considerado ' +
            itensPdf.find((el) => el.nome === 'burnout').qualificacao +
            ')',
          x: 40.75,
          y: 15.67,
          maxLargura: 16.5,
          fontSize: 20,
          color: '#7b7b7b',
          letterSpacing: '0',
          textAlign: 'left',
          fontWeight: 'bold',
          textUp: 'lowercase',
        },
        {
          texto: itensPdf.find((el) => el.nome === 'score_geral').scorenp + '%',

          x: 2.2,
          y: 23.4,
          maxLargura: 2.35,
          fontSize: 20,
          color: '#7b7b7b',
          letterSpacing: '0',
          textAlign: 'center',
          fontWeight: 'bold',
          textUp: 'uppercase',
        },
        {
          texto:
            ' - ' +
            itensPdf.find((el) => el.nome === 'score_geral').qualificacao,
          x: 3.47,
          y: 23.4,
          maxLargura: 10,
          fontSize: 20,
          color: '#7b7b7b',
          letterSpacing: '0',
          textAlign: 'left',
          fontWeight: 'bold',
          textUp: 'uppercase',
        },
        {
          texto: itensPdf.find((el) => el.nome === 'score_geral').scorep + '%',

          x: 26.8,
          y: 23.4,
          maxLargura: 2.35,
          fontSize: 20,
          color: '#7b7b7b',
          letterSpacing: '0',
          textAlign: 'center',
          fontWeight: 'bold',
          textUp: 'uppercase',
        },
        {
          texto:
            ' - ' +
            itensPdf.find((el) => el.nome === 'score_geral').qualificacao,
          x: 28,
          y: 23.4,
          maxLargura: 10,
          fontSize: 20,
          color: '#7b7b7b',
          letterSpacing: '0',
          textAlign: 'left',
          fontWeight: 'bold',
          textUp: 'uppercase',
        },
      ],
    },
    {
      nome: 'page_7',
      url: urlImg + '/assets/images/laudo/laudo_pagina_7.jpg',
      textos: [],
    },
    {
      nome: 'page_8',
      url: urlImg + '/assets/images/laudo/laudo_pagina_8.jpg',
      textos: [],
    },
    {
      nome: 'page_9',
      url: urlImg + '/assets/images/laudo/laudo_pagina_9.jpg',
      textos: [],
    },
    {
      nome: 'page_10',
      url: urlImg + '/assets/images/laudo/laudo_pagina_10.jpg',
      textos: [
        {
          texto:
            itensPdf.find((el) => el.nome === 'doencas_degenerativas').scorenp +
            '% e',
          x: 15.4,
          y: 16.95,
          maxLargura: 3.5,
          fontSize: 23,
          color: '#000',
          letterSpacing: '0',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto:
            itensPdf.find((el) => el.nome === 'doencas_degenerativas').scorep +
            '%',
          x: 10.45,
          y: 18.02,
          maxLargura: 2.7,
          fontSize: 22.5,
          color: '#000',
          letterSpacing: '0',
          textAlign: 'center',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto:
            itensPdf.find((el) => el.nome === 'doencas_degenerativas')
              .qualificacao + ').',
          x: 2.286,
          y: 19.125,
          maxLargura: 16.5,
          fontSize: 23,
          color: '#000',
          letterSpacing: '1.8',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'lowercase',
        },
      ],
    },
    {
      nome: 'page_11',
      url:
        urlImg +
        urlPorQualificacao[
          itensPdf.find((el) => el.nome === 'doencas_degenerativas')
            .qualificacao
        ],
      textos: [
        {
          texto:
            itensPdf.find((el) => el.nome === 'doencas_degenerativas').analise +
            ')',
          x: 1.815,
          y: 9.52,
          maxLargura: 41,
          fontSize: 22,
          color: '#000',
          letterSpacing: '1.3',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
      ],
    },
    {
      nome: 'page_12',
      url: urlImg + '/assets/images/laudo/laudo_pagina_12.jpg',
      textos: [
        {
          texto:
            itensPdf.find((el) => el.nome === 'doencas_cardiovasculares')
              .scorenp + '% e',
          x: 15.35,
          y: 14.74,
          maxLargura: 3.5,
          fontSize: 23,
          color: '#000',
          letterSpacing: '0',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto:
            itensPdf.find((el) => el.nome === 'doencas_cardiovasculares')
              .scorep + '%',
          x: 10.2,
          y: 15.8,
          maxLargura: 2.7,
          fontSize: 22.5,
          color: '#000',
          letterSpacing: '0',
          textAlign: 'center',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto:
            itensPdf.find((el) => el.nome === 'doencas_cardiovasculares')
              .qualificacao + ').',
          x: 2.287,
          y: 16.95,
          maxLargura: 16.5,
          fontSize: 23,
          color: '#000',
          letterSpacing: '1.8',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'lowercase',
        },
      ],
    },
    {
      nome: 'page_13',
      url:
        urlImg +
        urlPorQualificacao[
          itensPdf.find((el) => el.nome === 'doencas_cardiovasculares')
            .qualificacao
        ],
      textos: [
        {
          texto:
            itensPdf.find((el) => el.nome === 'doencas_cardiovasculares')
              .analise + ')',
          x: 1.815,
          y: 9.52,
          maxLargura: 41,
          fontSize: 22,
          color: '#000',
          letterSpacing: '1.3',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
      ],
    },
    {
      nome: 'page_14',
      url: urlImg + '/assets/images/laudo/laudo_pagina_14.jpg',
      textos: [
        {
          texto:
            itensPdf.find((el) => el.nome === 'capacidade_cognitiva').scorenp +
            '% e',
          x: 15.4,
          y: 16.83,
          maxLargura: 3.5,
          fontSize: 23,
          color: '#000',
          letterSpacing: '0',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto:
            itensPdf.find((el) => el.nome === 'capacidade_cognitiva').scorep +
            '%',
          x: 10.1,
          y: 17.945,
          maxLargura: 2.7,
          fontSize: 22.5,
          color: '#000',
          letterSpacing: '0',
          textAlign: 'center',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto:
            itensPdf.find((el) => el.nome === 'capacidade_cognitiva')
              .qualificacao + ').',
          x: 2.35,
          y: 19.0,
          maxLargura: 16.5,
          fontSize: 23,
          color: '#000',
          letterSpacing: '1.8',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'lowercase',
        },
      ],
    },
    {
      nome: 'page_15',
      url:
        urlImg +
        urlPorQualificacao[
          itensPdf.find((el) => el.nome === 'capacidade_cognitiva').qualificacao
        ],
      textos: [
        {
          texto:
            itensPdf.find((el) => el.nome === 'capacidade_cognitiva').analise +
            ')',
          x: 1.815,
          y: 9.52,
          maxLargura: 41,
          fontSize: 22,
          color: '#000',
          letterSpacing: '1.3',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
      ],
    },
    {
      nome: 'page_16',
      url: urlImg + '/assets/images/laudo/laudo_pagina_16.jpg',
      textos: [
        {
          texto: itensPdf.find((el) => el.nome === 'imunidade').scorenp + '% e',
          x: 15.4,
          y: 19.125,
          maxLargura: 3.5,
          fontSize: 23,
          color: '#000',
          letterSpacing: '0',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto: itensPdf.find((el) => el.nome === 'imunidade').scorep + '%',
          x: 10.12,
          y: 20.22,
          maxLargura: 2.7,
          fontSize: 22.5,
          color: '#000',
          letterSpacing: '0',
          textAlign: 'center',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto:
            itensPdf.find((el) => el.nome === 'imunidade').qualificacao + ').',
          x: 2.35,
          y: 21.3,
          maxLargura: 16.5,
          fontSize: 23,
          color: '#000',
          letterSpacing: '1.8',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'lowercase',
        },
      ],
    },
    {
      nome: 'page_17',
      url:
        urlImg +
        urlPorQualificacao[
          itensPdf.find((el) => el.nome === 'imunidade').qualificacao
        ],
      textos: [
        {
          texto: itensPdf.find((el) => el.nome === 'imunidade').analise + ')',
          x: 1.815,
          y: 9.52,
          maxLargura: 41,
          fontSize: 22,
          color: '#000',
          letterSpacing: '1.3',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
      ],
    },
    {
      nome: 'page_18',
      url: urlImg + '/assets/images/laudo/laudo_pagina_18.jpg',
      textos: [
        {
          texto: itensPdf.find((el) => el.nome === 'burnout').scorenp + '%',
          x: 15.28,
          y: 25.65,
          maxLargura: 3.5,
          fontSize: 23,
          color: '#000',
          letterSpacing: '0',
          textAlign: 'center',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto: itensPdf.find((el) => el.nome === 'burnout').scorep + '%',
          x: 4.95,
          y: 26.65,
          maxLargura: 2.7,
          fontSize: 22.5,
          color: '#000',
          letterSpacing: '0',
          textAlign: 'center',
          fontWeight: 'normal',
          textUp: 'normal',
        },
        {
          texto:
            itensPdf.find((el) => el.nome === 'burnout').qualificacao + ').',
          x: 14.45,
          y: 26.65,
          maxLargura: 16.5,
          fontSize: 23,
          color: '#000',
          letterSpacing: '1.8',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'lowercase',
        },
      ],
    },
    {
      nome: 'page_19',
      url:
        urlImg +
        urlPorQualificacao[
          itensPdf.find((el) => el.nome === 'burnout').qualificacao
        ],
      textos: [
        {
          texto: itensPdf.find((el) => el.nome === 'burnout').analise + ')',
          x: 1.815,
          y: 9.52,
          maxLargura: 41,
          fontSize: 22,
          color: '#000',
          letterSpacing: '1.3',
          textAlign: 'left',
          fontWeight: 'normal',
          textUp: 'normal',
        },
      ],
    },
    {
      nome: 'page_20',
      url: urlImg + '/assets/images/laudo/laudo_pagina_20.jpg',
      textos: [],
    },
    {
      nome: 'page_21',
      url: urlImg + '/assets/images/laudo/laudo_pagina_21.jpg',
      textos: [],
    },
    {
      nome: 'page_22',
      url: urlImg + '/assets/images/laudo/laudo_pagina_22.jpg',
      textos: [],
    },
    {
      nome: 'page_23',
      url: urlImg + '/assets/images/laudo/laudo_pagina_23.jpg',
      textos: [],
    },
    {
      nome: 'page_24',
      url: urlImg + '/assets/images/laudo/laudo_pagina_24.jpg',
      textos: [],
    },
    {
      nome: 'page_25',
      url: urlImg + '/assets/images/laudo/laudo_pagina_25.jpg',
      textos: [],
    },
    {
      nome: 'page_26',
      url: urlImg + '/assets/images/laudo/laudo_pagina_26.jpg',
      textos: [],
    },
    {
      nome: 'page_27',
      url: urlImg + '/assets/images/laudo/laudo_pagina_27.jpg',
      textos: [],
    },
    {
      nome: 'page_28',
      url: urlImg + '/assets/images/laudo/laudo_pagina_28.jpg',
      textos: [],
    },
    {
      nome: 'page_29',
      url: urlImg + '/assets/images/laudo/laudo_pagina_29.jpg',
      textos: [],
    },
    {
      nome: 'page_30',
      url: urlImg + '/assets/images/laudo/laudo_pagina_30.jpg',
      textos: [],
    },
    {
      nome: 'page_31',
      url: urlImg + '/assets/images/laudo/laudo_pagina_31.jpg',
      textos: [],
    },
    {
      nome: 'page_32',
      url: urlImg + '/assets/images/laudo/laudo_pagina_32.jpg',
      textos: [],
    },
    {
      nome: 'page_33',
      url: urlImg + '/assets/images/laudo/laudo_pagina_33.jpg',
      textos: [],
    },
    {
      nome: 'page_34',
      url: urlImg + '/assets/images/laudo/laudo_pagina_34.jpg',
      textos: [],
    },
    {
      nome: 'page_35',
      url: urlImg + '/assets/images/laudo/laudo_pagina_35.jpg',
      textos: [],
    },
    {
      nome: 'page_36',
      url: urlImg + '/assets/images/laudo/laudo_pagina_36.jpg',
      textos: [],
    },
    {
      nome: 'page_37',
      url: urlImg + '/assets/images/laudo/laudo_pagina_37.jpg',
      textos: [],
    },
    {
      nome: 'page_38',
      url: urlImg + '/assets/images/laudo/laudo_pagina_38.jpg',
      textos: [],
    },
    {
      nome: 'page_39',
      url: urlImg + '/assets/images/laudo/laudo_pagina_39.jpg',
      textos: [],
    },
    {
      nome: 'page_40',
      url: urlImg + '/assets/images/laudo/laudo_pagina_40.jpg',
      textos: [],
    },
    {
      nome: 'page_41',
      url: urlImg + '/assets/images/laudo/laudo_pagina_41.jpg',
      textos: [],
    },
    {
      nome: 'page_42',
      url: urlImg + '/assets/images/laudo/laudo_pagina_42.jpg',
      textos: [],
    },
    {
      nome: 'page_43',
      url: urlImg + '/assets/images/laudo/laudo_pagina_43.jpg',
      textos: [],
    },
    {
      nome: 'page_44',
      url: urlImg + '/assets/images/laudo/laudo_pagina_44.jpg',
      textos: [],
    },
    {
      nome: 'page_45',
      url: urlImg + '/assets/images/laudo/laudo_pagina_45.jpg',
      textos: [],
    },
    {
      nome: 'page_46',
      url: urlImg + '/assets/images/laudo/laudo_pagina_46.jpg',
      textos: [
        {
          texto: 'paciente',
          x: 29.9,
          y: 6.27,
          maxLargura: 16,
          fontSize: 50,
          color: '#7b7b7b',
          letterSpacing: '1.8',
          textAlign: 'left',
          fontWeight: 'bold',
          textUp: 'normal',
        },
        {
          texto: 'Zero',
          x: 13.25,
          y: 12.95,
          maxLargura: 8,
          fontSize: 22,
          color: '#7b7b7b',
          letterSpacing: '0',
          textAlign: 'left',
          fontWeight: 'bold',
          textUp: 'uppercase',
        },
        {
          texto: '4 (>= 4 É ALTO CUSTO)',
          x: 22.5,
          y: 12.95,
          maxLargura: 10,
          fontSize: 22,
          color: '#7b7b7b',
          letterSpacing: '0',
          textAlign: 'left',
          fontWeight: 'bold',
          textUp: 'uppercase',
        },
        {
          texto:
            itensPdf.find((el) => el.nome === 'score_geral').scorep +
            ' ' +
            itensPdf.find((el) => el.nome === 'score_geral').qualificacao,
          x: 32.4,
          y: 12.95,
          maxLargura: 7,
          fontSize: 22,
          color: '#7b7b7b',
          letterSpacing: '0',
          textAlign: 'left',
          fontWeight: 'bold',
          textUp: 'uppercase',
        },
        {
          texto: 'Alto',
          x: 40,
          y: 12.95,
          maxLargura: 8,
          fontSize: 22,
          color: '#7b7b7b',
          letterSpacing: '0',
          textAlign: 'left',
          fontWeight: 'bold',
          textUp: 'uppercase',
        },
      ],
    },
    {
      nome: 'page_47',
      url: urlImg + '/assets/images/laudo/laudo_pagina_47.jpg',
      textos: [],
    },
    {
      nome: 'page_48',
      url: urlImg + '/assets/images/laudo/laudo_pagina_48.jpg',
      textos: [],
    },
  ];

  $('#btnlaudo').click(async function () {
    $(this).prop('disabled', true);
    $('[data-id="load"]').css('display', 'flex');
    try {
      const paciente = $(this).attr('data-name');
      await createPDF(listaImg, paciente);
      console.log('PDF gerado com sucesso!');
      console.log(itensPdf);
      $('[data-id="load"]').css('display', 'none');
      $(this).prop('disabled', false);
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
    }
  });
}

/*** Criar o doc PDF ***/
const createPDF = async (listaImg, paciente) => {
  const doc = new jsPDF('l', 'cm', [50.8, 28.58]);

  for (let i = 0; i < listaImg.length; i++) {
    const morePage = i !== listaImg.length - 1;
    await addItemsToPDF(
      listaImg[i].url,
      morePage,
      listaImg[i].textos,
      doc,
      paciente
    );
  }
  const stringLimpa = await limparString(paciente);
  const dataHoraFormatada = await obterDataHoraFormatada();

  const resultadoFinal = `${'LAUDO_'}${stringLimpa}${'_'}${dataHoraFormatada}${'.pdf'}`;

  doc.save(resultadoFinal);
};

async function limparString(str) {
  /* Remove acentos e caracteres especiais */
  const stringLimpa = str
    .normalize('NFD')
    .replace(/[\u0300-\u036f|\u00b4|\u0060|\u005e|\u007e]/g, '');
  const stringFinal = stringLimpa.replace(/\s+/g, '').toUpperCase();

  return stringFinal;
}

async function obterDataHoraFormatada() {
  const data = new Date();
  const ano = data.getFullYear();
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const dia = data.getDate().toString().padStart(2, '0');
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');

  return `${ano}${mes}${dia}${hora}${minuto}${segundo}`;
}

/*** add itens ao PDF ***/
const addItemsToPDF = async (url, morePage, txts, doc, paciente) => {
  try {
    const base64Img = await getBase64Image(url);
    doc.addImage(base64Img, 'JPEG', 0, 0, 50.8, 28.58);
    await addTextToPDF(txts, doc, paciente);

    if (morePage === true) {
      doc.addPage();
    }
  } catch (error) {
    console.error('Erro ao incorporar a imagem:', error);
  }
};

/*** Inserir imagem ***/
const getBase64Image = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/jpeg');
      resolve(dataURL);
    };
    img.onerror = reject;
    img.src = url;
  });
};
/*** adicionar textos ***/
const addTextToPDF = async (txts, doc, paciente) => {
  if (txts.length > 0) {
    await Promise.all(
      txts.map(async (txt) => {
        await addTextStyle(
          txt.texto === 'paciente' ? paciente : txt.texto,
          txt.x,
          txt.y,
          txt.maxLargura,
          txt.fontSize,
          txt.letterSpacing,
          txt.textAlign,
          txt.color,
          txt.fontWeight,
          txt.textUp,
          doc
        );
      })
    );
  }
};

/*** Estilizar e inserir texto ***/
const addTextStyle = async (
  text,
  x,
  y,
  maxWidth,
  fontSize,
  spacing,
  align,
  color,
  fontWeight,
  textUp,
  doc
) => {
  let processedText = text; // Onde text é a variável que contém o texto a ser processado

  switch (textUp) {
    case 'uppercase':
      processedText = processedText.toUpperCase();
      break;
    case 'lowercase':
      processedText = processedText.toLowerCase();
      break;
    default:
      break;
  }
  if (fontWeight === 'bold') {
    doc.setFont('Helvetica', 'bold');
  } else {
    doc.setFont('Helvetica', 'normal');
  }
  doc.setFontSize(fontSize);
  doc.setTextColor(color);
  doc.text(processedText, x, y, {
    maxWidth: maxWidth,
    lineHeightFactor: 2.2,
    charSpace: spacing,
    align: align,
  });
};
