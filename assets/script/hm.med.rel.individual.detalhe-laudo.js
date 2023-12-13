const urlImg = 'http://127.0.0.1:5501';
//const urlImg = 'https://deploy.rai.com.br/heartmetrix/';

// medidas padroes do doc
// { x: 0},
// { y: 0 },
// { largura: 50.8 },
// { altura: 28.58 },

let listaImg = [
  {
    nome: 'page_1',
    url: urlImg + '/assets/images/laudo/laudo_pagina_1.jpg',
    textos: [
      {
        texto: 'paciente',
        x: 0.93,
        y: 12.02,
        maxLargura: 13.12,
        fontSize: 24,
        color: 'red',
        letterSpacing: '1.8',
        textAlign: 'center',
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
        x: 18.12,
        y: 6.87,
        maxLargura: 30,
        fontSize: 60,
        color: 'red',
        letterSpacing: '1.8',
        textAlign: 'left',
      },
    ],
  },
];

/*** Ao clicar no botão ***/
$('#btnlaudo').click(async function () {
  try {
    const paciente = $(this).attr('data-name');
    await createPDF(listaImg, paciente);
    console.log('PDF gerado com sucesso!');
  } catch (error) {
    console.error('Erro ao gerar o PDF:', error);
  }
});

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
  doc
) => {
  const lineHeight = fontSize * 1.2;
  const textLines = doc.splitTextToSize(text.toUpperCase(), maxWidth);

  for (let i = 0; i < textLines.length; i++) {
    const textWidth = doc.getTextWidth(textLines[i]);
    const centerX = x + (maxWidth - textWidth) / 2;

    doc.text(
      textLines[i],
      align === 'center' ? centerX : x,
      align === 'center' ? y + i * lineHeight : y + i * lineHeight,
      {
        charSpace: spacing,
        fontSize: fontSize,
      }
    );
  }
};
