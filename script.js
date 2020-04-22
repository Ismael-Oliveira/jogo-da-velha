let jogador = "X";
let arrayjogo = [];

function verificarJogador(jogador){
    if(jogador == "X"){
        $('.placar span').removeClass("jogadorY")
                         .addClass("jogadorX")
                         .html("X");
    }else{
        $('.placar span').removeClass("JogadorX")
                         .addClass("jogadorY")
                         .html("O");
    }
}

function initarray(){
    for (let l = 0; l < 3; l++) {
        arrayjogo[l] = [0, 0, 0];
    }
}

function lerarray(){
    for (let l = 0; l < 3; l++) {
        for (let c = 0; c < 3; c++) {
            document.write(arrayjogo[l][c]+" ");
        }
        document.write("<br>");      
    }   
}


function atualizarJogo(id, jogada){
    
    let vencedor = ""; 

    if(('0'== id) || ('1' == id) || ('2' == id)){
        arrayjogo[0][id] = jogada;
        // debugger;
    }

    if(('3'== id) || ('4' == id) || ('5' == id)){
        arrayjogo[1][id - 3] = jogada;
        
    }

    if(('6'== id) || ('7' == id) || ('8' == id)){
        arrayjogo[2][id-6] = jogada;
    }

    verificarVencedor();
}

function verificarVencedor(){
    let vencedorX = [];
    let vencedorY = [];
    let vencedorXV = [];
    let vencedorYV = [];
    // controle diagonal principal
    let vencedorDX = false;
    let vencedorDY = false;
    // controle diagonal secundária
    let vencedorDSX = false;
    let vencedorDSY = false;
    
    // verifica vitória horizontal/vertical/diagonal principal/diagonal secundária
    for (let l = 0; l < 3; l++) {
        for (let c = 0; c < 3; c++) {
            let op = arrayjogo[l][c];
            let opV = arrayjogo[c][l];

            // verifica diagonal principal
            if(arrayjogo[0][0] == "X" && arrayjogo[1][1] == "X" && arrayjogo[2][2] == "X"){
                vencedorDX = true;
                break;
            }else if(arrayjogo[0][0] == "O" && arrayjogo[1][1] == "O" && arrayjogo[2][2] == "O"){
                vencedorDY = true;
                break;
            }

            // verifica diagonal secundaria
            if(arrayjogo[0][2] == "X" && arrayjogo[1][1] == "X" && arrayjogo[2][0] == "X"){
                vencedorDX = true;
                break;
            }else if(arrayjogo[0][2] == "O" && arrayjogo[1][1] == "O" && arrayjogo[2][0] == "O"){
                vencedorDY = true;
                break;
            }

            // verifica vencedor na horizontal
            if(op == "X"){
                vencedorX.push(op);
            }else if(op == "O") {
                vencedorY.push(op);
            }

            // verifica vencedor na vertical
            if(opV == "X"){
                vencedorXV.push(op);
            }else if(opV == "O") {
                vencedorYV.push(op);
            }
        }
        // verifica se houve vencedor 
        if(vencedorX.length == 3 || vencedorXV.length == 3 || vencedorDX || vencedorDSX){
            // console.log("vencedor X");
            exibirVencedor("X")
            return;
        }else if(vencedorY.length == 3 || vencedorYV.length == 3 || vencedorDY || vencedorDSY) {
            // console.log("vencedor Y");
            exibirVencedor("O");
            return;
        }
        // para verificar proxima linha
        vencedorX = [];vencedorY = []; 
        // para verificar proxima coluna   
        vencedorXV = [];vencedorYV = [];
          
    }
    
    if($('.area').has('span').length == 9){
        exibirVencedor("empate");
    }
}

function exibirVencedor(v){

    if(v == "empate"){
        $(".winner").fadeIn();
        $('.winner .res .fim').html("<span>Empate</span>");
    }else{
        $(".winner").fadeIn();
        $(".winner .fim span").html(v);        
    }

}

$(".res button").on('click', function(){
    initarray();
    $(".area").html("");
    $(".winner").fadeOut();
    $('.winner .res .fim').html("<p>O jogador</p><span></span><p>venceu</p>");
});

$(function(){    

    $('.area').on('click', function(){
        let id = 100;
        //verifica se uma célula ja foi clicada
        if($(this).has("span").length != 0){
            return;
            // debugger
        }else if(jogador == "X"){
            $(this).html('<span class="jogadorX">X</span>');
            $(this).attr('data-jogada', 'X');
            // remove o evento de click parte selecinada no tabuleiro
            // $(this).off('click');
            id = $(this).attr('data-id');
            jogador = "O";
            verificarJogador(jogador);
            atualizarJogo(id, "X");
            
            
        }else {
            $(this).html('<span class="jogadorY">O</span>');
            $(this).attr('data-jogada', 'O');
            // $(this).off('click');
            id = $(this).attr('data-id');
            jogador = "X";
            verificarJogador(jogador);
            atualizarJogo(id, "O");       
            
        }

    });

    initarray();

});
