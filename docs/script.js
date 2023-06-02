$(document).ready(function() {
  // Array de URLs das imagens
  var urlsImagens = [];

  // Índice da imagem atual
  var indiceImagem = 0;

  // Função para alternar as imagens
  function alternarImagem() {
    // Obtém o URL da próxima imagem com base no índice atual
    var imageUrl = urlsImagens[indiceImagem];

    // Atualiza a imagem exibida na div
    $('#imagem').html('<img src="' + imageUrl + '">');

    // Incrementa o índice da imagem
    indiceImagem++;

    // Verifica se o índice da imagem é maior ou igual ao número de imagens
    if (indiceImagem >= urlsImagens.length) {
      // Reinicia o índice para exibir a primeira imagem novamente
      indiceImagem = 0;
    }
  }

  // Função para carregar os URLs das imagens usando AJAX
  function carregarUrlsImagens() {
    $.ajax({
      url: './imagens.json', // URL para obter o JSON com os URLs das imagens
      method: 'GET',
      dataType: 'json',
      success: function(response) {
        // Sucesso na solicitação AJAX
        urlsImagens = response.urls; // Atualiza o array de URLs das imagens
        alternarImagem(); // Chama a função para exibir a primeira imagem
        setInterval(alternarImagem, 1000); // Define o intervalo para alternar as imagens
      },
      error: function() {
        // Ocorreu um erro na solicitação AJAX
        console.log('Erro ao obter os URLs das imagens.');
      }
    });
  }

  // Chama a função para carregar os URLs das imagens
  carregarUrlsImagens();
});
