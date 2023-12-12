const urlImg = 'http://127.0.0.1:5501';
//const urlImg = 'https://deploy.rai.com.br/heartmetrix/';

let listaImg = [
  {
    nome: 'page_1',
    url: urlImg + '/assets/images/laudo/laudo_pagina_1.jpg',
  },
  {
    nome: 'page_2',
    url: urlImg + '/assets/images/laudo/laudo_pagina_2.jpg',
  },
];

// medidas padroes
// { x: 0},
// { y: 0 },
// { largura: 50.8 },
// { altura: 28.58 },

$('#btnlaudo').click(function () {
  // Função para carregar uma imagem como base64
  const getBase64Image = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Habilita o CORS, se necessário
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/jpeg'); // Pode mudar o formato se necessário (png, etc.)
        resolve(dataURL);
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  // Cria um novo documento PDF
  const doc = new jsPDF('l', 'cm', [50.8, 28.58]);

  /** Função para carregar uma imagem e adicionar ao PDF**/
  const addEmbeddedImageToPDF = async (url, x, y, width, height, morePage) => {
    try {
      const base64Img = await getBase64Image(url);
      doc.addImage(base64Img, 'JPEG', x, y, width, height);
      /** add texto com limite de largura e centralizado **/
      addCenteredTextWithLimit(
        $(this).attr('data-name'),
        0.93,
        12.02,
        13.12,
        24
      );

      if (morePage === true) {
        doc.addPage();
      } else {
        doc.save('meu_documento_com_imagens.pdf'); // Salva o PDF após todas as imagens
      }
    } catch (error) {
      console.error('Erro ao incorporar a imagem:', error);
    }
  };

  // Chamada para adicionar a imagem incorporada ao PDF
  listaImg.map((item, index, array) => {
    let morePage;
    if (index !== array.length - 1) {
      morePage = true;
    } else {
      morePage = false;
    }

    addEmbeddedImageToPDF(item.url, 0, 0, 50.8, 28.58, morePage);
  });

  /*** Função para adicionar texto limitado em largura e centralizado ***/
  const addCenteredTextWithLimit = (text, x, y, maxWidth, fontSize) => {
    const lineHeight = fontSize * 1.2; // Altura da linha baseada no tamanho da fonte
    const textLines = doc.splitTextToSize(text.toUpperCase(), maxWidth); // Converte para letras maiúsculas e divide o texto em linhas

    doc.setFont('Helvetica'); // Define a família da fonte
    doc.setFontSize(fontSize); // Define o tamanho da fonte
    //doc.setCharSpace(charSpace); // Define o espaçamento entre letras
    doc.setTextColor('red'); // Define a cor do texto

    textLines.forEach((line, index) => {
      const textWidth = doc.getTextWidth(line); // Obtém a largura do texto
      const centerX = x + (maxWidth - textWidth) / 2; // Calcula a posição x centralizada

      // Adiciona o texto centralizado
      doc.text(line, centerX, y + index * lineHeight, { charSpace: '1.8' });
    });
  };
});
