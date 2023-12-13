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

const addTextToPDF = async (txts, doc, paciente) => {
  if (txts.length > 0) {
    await Promise.all(
      txts.map(async (txt) => {
        await addCenteredTextWithLimit(
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

const addEmbeddedImageToPDF = async (url, morePage, txts, doc, paciente) => {
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

const addImagesToPDF = async (listaImg, paciente) => {
  const doc = new jsPDF('l', 'cm', [50.8, 28.58]);
  doc.setFont('Helvetica'); // Define a família da fonte

  const promises = listaImg.map(async (item, index, array) => {
    let morePage = index !== array.length - 1;
    await addEmbeddedImageToPDF(item.url, morePage, item.textos, doc, paciente);
  });

  await Promise.all(promises);
  doc.save('meu_documento_com_imagens.pdf');
};

/*** Função para inserir texto ***/
const addCenteredTextWithLimit = async (
  text,
  x,
  y,
  maxWidth,
  fontSize,
  spacing,
  align,
  doc
) => {
  return new Promise((resolve) => {
    const lineHeight = fontSize * 1.2;
    const textLines = doc.splitTextToSize(text.toUpperCase(), maxWidth);

    const addTextLine = (line, index) => {
      return new Promise((innerResolve) => {
        const textWidth = doc.getTextWidth(line);
        const centerX = x + (maxWidth - textWidth) / 2;

        doc.text(
          line,
          align === 'center' ? centerX : x,
          align === 'center' ? y + index * lineHeight : y + index * lineHeight,
          {
            charSpace: spacing,
            fontSize: fontSize,
          }
        );
        innerResolve();
      });
    };

    const promises = textLines.map((line, index) => addTextLine(line, index));

    Promise.all(promises).then(() => {
      resolve();
    });
  });
};

// Ao clicar no botão
$('#btnlaudo').click(async function () {
  try {
    const paciente = $(this).attr('data-name');
    await addImagesToPDF(listaImg, paciente);
    console.log('PDF gerado com sucesso!');
  } catch (error) {
    console.error('Erro ao gerar o PDF:', error);
  }
});

// $('#btnlaudo').click(function () {
//   /** Função para carregar uma imagem como base64 **/
//   const getBase64Image = (url) => {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.crossOrigin = 'Anonymous'; // Habilita o CORS, se necessário
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = img.width;
//         canvas.height = img.height;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0);
//         const dataURL = canvas.toDataURL('image/jpeg'); // Pode mudar o formato se necessário (png, etc.)
//         resolve(dataURL);
//       };
//       img.onerror = reject;
//       img.src = url;
//     });
//   };

//   const addTextToPDF = async (txts) => {
//     if (txts.length > 0) {
//       await Promise.all(
//         txts.map(async (txt) => {
//           await addCenteredTextWithLimit(
//             txt.texto === 'paciente' ? $(this).attr('data-name') : txt.texto,
//             txt.x,
//             txt.y,
//             txt.maxLargura,
//             txt.fontSize,
//             txt.letterSpacing,
//             txt.textAlign
//           );
//         })
//       );
//     }
//   };

//   // Cria um novo documento PDF
//   const doc = new jsPDF('l', 'cm', [50.8, 28.58]);

//   /** Função para carregar uma imagem e adicionar ao PDF**/
//   const addEmbeddedImageToPDF = async (url, morePage, txts) => {
//     try {
//       const base64Img = await getBase64Image(url);
//       doc.addImage(base64Img, 'JPEG', 0, 0, 50.8, 28.58);
//       /** add texto com limite de largura e centralizado **/
//       await addTextToPDF(txts);

//       if (morePage === true) {
//         doc.addPage();
//       } else {
//         doc.save('meu_documento_com_imagens.pdf'); // Salva o PDF após todas as imagens
//       }
//     } catch (error) {
//       console.error('Erro ao incorporar a imagem:', error);
//     }
//   };

//   /* Chamada para adicionar a imagem incorporada ao PDF*/
//   listaImg.map((item, index, array) => {
//     let morePage;
//     if (index !== array.length - 1) {
//       morePage = true;
//     } else {
//       morePage = false;
//     }

//     addEmbeddedImageToPDF(item.url, morePage, item.textos);
//   });

//   /*** Função para inserir texto ***/
//   const addCenteredTextWithLimit = async (
//     text,
//     x,
//     y,
//     maxWidth,
//     fontSize,
//     spacing,
//     align
//   ) => {
//     const lineHeight = fontSize * 1.2; // Altura da linha baseada no tamanho da fonte
//     const textLines = doc.splitTextToSize(text.toUpperCase(), maxWidth); // Converte para letras maiúsculas e divide o texto em linhas

//     doc.setFont('Helvetica'); // Define a família da fonte

//     textLines.forEach((line, index) => {
//       const textWidth = doc.getTextWidth(line); // Obtém a largura do texto
//       const centerX = x + (maxWidth - textWidth) / 2; // Calcula a posição x centralizada

//       // Adiciona o texto centralizado
//       doc.text(
//         line,
//         align === 'center' ? centerX : x,
//         align === 'center' ? y + index * lineHeight : y * lineHeight,
//         {
//           charSpace: spacing,
//           fontSize: fontSize,
//         }
//       );
//     });
//   };
// });
