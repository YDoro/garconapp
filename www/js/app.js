$('.acao-finalizar').on('click', function () {
    $.ajax({
        url: 'http://cozinhapp.sergiolopes.org/novopedido',
        data: {
            mesa: $('#numero-mesa').val(),
            pedido: $('#resumo').text()
        },
        error: function(erro){
            Materialize.toast(erro.responseText,3000,'red-text');
        },
        success: function(dados){
            Materialize.toast(dados,2000);
            $('#numero-mesa').val('');
            $('.badge').remove();
        }
    });
});
$('.collection').on('click', '.collection-item', function () {
    var $badge = $('.badge', this);
    var nomeProduto = this.firstChild.textContent;
    Materialize.toast(nomeProduto + '	adicionado', 1000);
    //correção aplicada por mim para não dar erro na hora de fazer parse em um text vazio
    if ($badge.text() === "") { $badge.text('0'); }

    if ($badge.length === 0) {
        $badge = $('<span	class="badge	brown-text"></span>').appendTo(this);
    }
    $badge.text(parseInt($badge.text()) + 1);
});
$('.modal-trigger').leanModal();
$('#confirmar').on('click', function () {
    var texto = "";
    $('.badge').parent().each(function () {
        //correção para evitar trazer os valores zerados ou em branco na lista
        if (this.lastChild.textContent) {
            texto += this.firstChild.textContent + ':	';
            //corrigido para gerar uma quebra de linha para cada item da lista
            texto += this.lastChild.textContent + ',\n	 ';
        }
    });
    $('#resumo').empty().text(texto);
});
$('.collection').on('click', '.badge', function () {
    var $parent = this.parentNode;
    $(this).remove();
    //correção para evitar erro ao remover esse nó, não contava pois o nó badge não existia
    $('<span	class="badge	brown-text"></span>').appendTo($parent);
    return false;
})
$('.acao-limpar').on('click', function () {
    $('#numero-mesa').val('');
    $('.badge').parent().each(function () {
        //correção para a remoção, função descrita no livro gera um erro pois remove o badge inteiro ao invés de somente seus valores
        if (this.lastChild.textContent !== "") this.lastChild.textContent = "";
    });
});
$('.scan-qrcode').on('click', function () { cordova.plugins.barcodeScanner.scan(function (resultado) { if (resultado.text) { Materialize.toast('Mesa	' + resultado.text, 2000); $('#numero-mesa').val(resultado.text); } }, function (error) { Materialize.toast('Erro:	' + error, 3000, 'red-text'); }); });
