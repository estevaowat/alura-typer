$("#botao-frase").click(fraseAleatoria);
$("#botao-selecionar").click(fraseSelecionar);

function fraseAleatoria(){
    $(".loader").show();
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function(){
        $(".erro").show();
        setTimeout(function(){
            $(".erro").hide();
            $(".loader").hide();
        }, 2000);
    })
    .always(function(){
        $(".loader").hide();
    });
}

function trocaFraseAleatoria(data) {
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    console.log(numeroAleatorio);
    $(".frase").text(data[numeroAleatorio].texto);
    inicializaFrase();
    inicializaTempo(data[numeroAleatorio].tempo);
}

function fraseSelecionar(){
    $(".loader").show();
    var fraseId = $("#fraseId").val();
    var dados = {
        id: fraseId 
    }
    $.get("http://localhost:3000/frases", dados, trocaFraseSelecionada)
    .fail(function(){
        $(".erro").show();
        setTimeout(function(){
            $(".erro").hide();
            $(".loader").hide();
        }, 2000);
    })
    .always(function(){
        $(".loader").hide();
    });
}
function trocaFraseSelecionada(data){
    $(".frase").text(data.texto);
    inicializaFrase();
    inicializaTempo(data.tempo);
}
