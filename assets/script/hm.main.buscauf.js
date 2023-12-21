$(document).ready(function () {
  const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  const selectEstados = document.getElementById('cadUF');

  buscaIbge(url, selectEstados);
});

function atualizarCidades() {
  const estadoSelect = document.getElementById('cadUF');
  const estadoSelecionado = estadoSelect.value;
  const cidadeSelect = document.getElementById('cadCidade');
  const url =
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' +
    estadoSelecionado +
    '/municipios';

  cidadeSelect.innerHTML =
    '<option value="" disabled selected>Selecione uma cidade</option>';

  if (estadoSelecionado) {
    buscaIbge(url, cidadeSelect);
    $(cidadeSelect).prop('disabled', false);
  } else {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Selecione um estado primeiro';
    cidadeSelect.appendChild(option);
  }
}

function ajustarSelectCidade() {
  const valueEspecifico = '3550308';

  const optionEspecifico = $(
    '#cadCidade option[value="' + valueEspecifico + '"]'
  );
  const secondOption = $('#cadCidade option:eq(0)');

  optionEspecifico.detach().insertAfter(secondOption);
}

function buscaIbge(url, select) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let retornoItens = JSON.parse(xhr.responseText);
        retornoItens = retornoItens.sort((a, b) =>
          a.nome.localeCompare(b.nome, 'pt-BR')
        );
        retornoItens.forEach(function (item) {
          const option = document.createElement('option');
          option.value = item.id;
          option.textContent = item.nome;
          select.appendChild(option);
        });

        ajustarSelectCidade();
      } else {
        console.error('Erro na requisição:', xhr.status);
      }
    }
  };

  xhr.open('GET', url);
  xhr.send();
}
