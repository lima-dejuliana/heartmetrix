// medidas padroes do doc
// { x: 0},
// { y: 0 },
// { largura: 50.8 },
// { altura: 28.58 },

/*** Ao clicar no botão ***/
function gerarPDF(itensPdf) {
  const urlImg = 'http://127.0.0.1:5501';
  //const urlImg = 'https://deploy.rai.com.br/heartmetrix/';

  let listaImg = [
    {
      nome: 'page_1',
      url: urlImg + '/assets/images/laudo/laudo_pagina_1.jpg',
      textos: [
        {
          //texto: 'lorem ipsum 1 lorem ipsum 2',
          texto: 'paciente',
          x: 0.82,
          y: 12.03,
          maxLargura: 9.8,
          fontSize: 24,
          color: 'black',
          letterSpacing: '1.8',
          textAlign: 'center',
          fontWeight: 'normal',
          textUp: true,
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
          fontWeight: '400',
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
          fontWeight: '400',
          textUp: 'normal',
        },
        {
          texto:
            '(considerado ' +
            itensPdf.find((el) => el.nome === 'doencas_degenerativas')
              .qualificacao +
            ')',
          x: 1.17,
          y: 15.67,
          maxLargura: 16.5,
          fontSize: 20,
          color: '#7b7b7b',
          letterSpacing: '1',
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
          fontWeight: '400',
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
          fontWeight: '400',
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
          letterSpacing: '1',
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
          fontWeight: '400',
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
          fontWeight: '400',
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
          letterSpacing: '1',
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
          fontWeight: '400',
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
          fontWeight: '400',
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
          letterSpacing: '1',
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
          fontWeight: '400',
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
          fontWeight: '400',
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
          letterSpacing: '1',
          textAlign: 'left',
          fontWeight: 'bold',
          textUp: 'lowercase',
        },
        {
          texto: itensPdf.find((el) => el.nome === 'score_geral').scorenp + '%',
          x: 1.12,
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
          x: 25.65,
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
  ];

  $('#btnlaudo').click(async function () {
    try {
      const paciente = $(this).attr('data-name');
      await createPDF(listaImg, paciente);
      console.log('PDF gerado com sucesso!');
      console.log(itensPdf);
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
    }
  });
}

/*** Criar o doc PDF ***/
const createPDF = async (listaImg, paciente) => {
  const doc = new jsPDF('l', 'cm', [50.8, 28.58]);
  doc.setFont('Helvetica'); // Define a família da fonte

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
const normalFont = 'Helvetica'; // Substitua pela sua fonte normal
const boldFont = 'Axiforma'; // Substitua pela sua fonte negrito
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
  const lineHeight = fontSize * 1.2;
  let processedText = text; // Onde text é a variável que contém o texto a ser processado

  switch (textUp) {
    case 'uppercase':
      processedText = processedText.toUpperCase();
      break;
    case 'lowercase':
      processedText = processedText.toLowerCase();
      break;
    default:
      // Nenhuma operação, mantém o texto original se a opção não for 'uppercase' ou 'lowercase'
      break;
  }

  const textLines = doc.splitTextToSize(processedText, maxWidth);
  //let yPos = y;

  for (let i = 0; i < textLines.length; i++) {
    const textWidth = doc.getTextWidth(textLines[i]);
    const centerX = x + (maxWidth - textWidth) / 2;
    //0.8225555555555554
    //5.45
    if (fontWeight === 'bold') {
      doc.setFontStyle('bold');
    } else {
      doc.setFontStyle('normal');
    }
    doc.setFontSize(fontSize); // Definir o tamanho da fonte
    doc.setTextColor(color);
    doc.text(
      textLines[i],
      align === 'center' ? centerX : x,
      align === 'center' ? y + i * lineHeight : y + i * lineHeight,
      {
        charSpace: spacing,
      }
    );
  }
};
