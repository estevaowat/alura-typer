$("#botao-placar").click(mostraPlacar);
$("#botao-sincronizar").click(sincronizaPlacar);

function mostraPlacar(){
    $(".placar").stop().slideToggle(500);
}

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var nomeJogador = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();
    
    var linha = novaLinha(nomeJogador,numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    
    corpoTabela.append(linha);
    mostraPlacar();
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    
    $("html").animate(
        {
            scrollTop: posicaoPlacar + "px"
        }, 1000);
}

function novaLinha(nomeJogador,numPalavras){
    var linha = $("<tr>");
    var colunaJogador = $("<td>").text(nomeJogador);
    var colunaPontuacao = $("<td>").text(numPalavras);
    var colunaBotaoRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
     
    link.append(icone);
    colunaBotaoRemover.append(link);

    linha.append(colunaJogador);
    linha.append(colunaPontuacao);
    linha.append(colunaBotaoRemover);
    
    return linha;
}

function removeLinha(event){
    event.preventDefault();

    var linha = $(this).parent().parent();
    
    linha.fadeOut();
    setTimeout(function(){
        linha.remove();
    }, 1000);   
}

function sincronizaPlacar(){
    var placar =[];
    var linhas = $("tbody>tr");

    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: palavras
        }
        placar.push(score);
    });

    var dados = {
        placar: placar
    }
    
    $.post("http://localhost:3000/placar", dados, function(){
        console.log("Dados sincronizados com sucesso!");
    });    
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar", function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        });
});
}