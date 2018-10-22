var tempoInicial = $("#tempo-digitacao").text();
var textoCampoDigitacao = $(".campo-digitacao");
var frase = $(".frase").text();

$(function() {
    inicializaFrase();
    inicializaContadores();
    inicializaMarcadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
    atualizaPlacar();
    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });
});
/**
 * Contador da frase que o jogador ira digitar
 */

function inicializaFrase(){
    var frase = $(".frase").text();
    var numeroPalavras = frase.split(" ").length;
    $("#numero-palavras").text(numeroPalavras);    
}

function inicializaTempo(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function inicializaMarcadores(){
    
    textoCampoDigitacao.on("input", function(){
        var frase = $(".frase").text();
        var digitado = textoCampoDigitacao.val();
        if(frase.startsWith(digitado)){
            textoCampoDigitacao.addClass("borda-verde");
            textoCampoDigitacao.removeClass("borda-vermelha");
        }else {
            textoCampoDigitacao.addClass("borda-vermelha");
            textoCampoDigitacao.removeClass("borda-verde");
        }
    });
}

/**
 * Contador de caracteres e palavras do textarea que o jogador
 * ira digitar
 */
function inicializaContadores(){ 
    textoCampoDigitacao.on("input",function() {
    var conteudo = textoCampoDigitacao.val();
    
    var qtdeCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdeCaracteres);

    var qtdePalavras = conteudo.split(/\S+/).length - 1; 
    $("#contador-palavras").text(qtdePalavras);
    });
}

/**
 * Contador chegar ate zero e parar
 */

function inicializaCronometro(){
    
    textoCampoDigitacao.one("focus",function() {
        var tempoRestante = $("#tempo-digitacao").text();
        $("#botao-reiniciar").attr("disabled",true);
        var idContador = setInterval(function(){
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);
        if(tempoRestante < 1) {
            clearInterval(idContador);
            finalizaJogo();
       }
    },1000);
    });
}

function finalizaJogo(){
    $(".campo-digitacao").attr("disabled", true);
    $("#botao-reiniciar").attr("disabled",false);
    textoCampoDigitacao.toggleClass("campo-desativado");
    inserePlacar();
}

function reiniciaJogo(){
    $(".campo-digitacao").attr("disabled", false);
    $(".campo-digitacao").val("");
    $("#tempo-digitacao").text(tempoInicial);
    $("#contador-caracteres").text("0");
    $("#contador-palavras").text("0");
    inicializaCronometro();
    textoCampoDigitacao.toggleClass("campo-desativado");
    textoCampoDigitacao.removeClass("borda-verde");
    textoCampoDigitacao.removeClass("borda-vermelha");
}

