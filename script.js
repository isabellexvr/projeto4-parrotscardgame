// array com a source dos gifs
const srcGifs = [
    `"imagens/bobrossparrot.gif"`,
    `"imagens/explodyparrot.gif"`,
    `"imagens/fiestaparrot.gif"`,
    `"imagens/metalparrot.gif"`,
    `"imagens/revertitparrot.gif"`,
    `"imagens/tripletsparrot.gif"`,
    `"imagens/unicornparrot.gif"`
]

let contarJogadas = 0;

let acertos = 0;

let numeroDeCartas = parseInt(prompt("Digite aqui o número de cartas (de 4 a 14, números pares)"));

const numerosPossiveis = [4, 6, 8, 10, 12, 14];

function aoCarregar() {
    for (i = 0; i < numerosPossiveis.length; i++) {
        if (numeroDeCartas === numerosPossiveis[i]) {

            const arr = criarBaralho(numeroDeCartas);

            adicionarCartas(arr);
        }
    }
}
aoCarregar()



function adicionarCartas(baralho) {
    const divCartas = document.querySelector('.cartas');
    // cria o numero de cartas pedido
    for (i = 0; i < baralho.length; i++) {
        let carta = `<div class="carta" onclick="virar(this)">
                        <div class="frente">
                            <img src="imagens/front 1.png" alt="parrot">
                        </div>
                        <div class="costas">
                            <img src=${baralho[i]} alt="gif1">
                        </div>
                    </div>`;
        divCartas.innerHTML += carta
    }

}
//criarbaralho devolve arr c os pares embaralhados
function criarBaralho(numeroDeCartas) {
    let baralho = [];

    for (i = 0; i < numeroDeCartas / 2; i++) {
        baralho.push(srcGifs[i])
    }

    baralho = duplicate(baralho);
    baralho.sort(embaralhador);
    return baralho
}

function duplicate(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
        arr[i + len] = arr[i];
    }
    return arr
}

function embaralhador() {
    return Math.random() - 0.5;
}

//se for a primeira carta a ser clicada, só removerá o "virada" quando clicar na próxima

let primeiraClicada;
let segundaClicada;
const cartasClicadas = []

function virar(divCarta) {
    const cartaClicada = divCarta
    cartasClicadas.push(cartaClicada)

    console.log(cartasClicadas)

    const gif = divCarta.children[1].children[0].src;
    divCarta.classList.add('virada')

    contarJogadas++

    //quando o numero de jogadas for ímpar, coloca na variável primeiroClicada; quando for par, vai pra segundaClicada
    if (contarJogadas % 2 === 1) {
        primeiraClicada = gif.toString()
    } else if (contarJogadas % 2 === 0) {
        segundaClicada = gif.toString()
    }
    //se houver a primeira carta clicada, só será desvirada quando clicar no próximo clique
    if (primeiraClicada !== undefined && segundaClicada === undefined) {
        permanecerVirada()
    }

    //numero de jogadas par para que haja comparação entre duas cartas por vez
    if (contarJogadas % 2 === 0) {
        //se forem diferentes


        if (primeiraClicada !== undefined && segundaClicada !== undefined) {
            if (primeiraClicada !== segundaClicada) {
                setTimeout(virarCartas, 1000)
                cartaInativa()
                setTimeout(reativarCarta, 1000)
                //impedir de clicar noutras durante esse tempo; adicionar classe .inativa durante 800ms
            }
        }
        //se forem iguais
        if (primeiraClicada !== undefined && segundaClicada !== undefined) {
            if (primeiraClicada === segundaClicada) {
                permanecerVirada()
            }
        }

    }

    //problema: quando clico em 2 iguais, elas permanecem viradas, porem, quando clicadas noutras 2 diferentes, todas viram de volta

    if (numeroDeCartas === contarJogadas) {
        permanecerVirada()
    }
    //fim: quando todas as cartas tiverem .virada - aparecer alert(`Você ganhou em ${contarJogadas} jogadas!`) - fazer sumirem as cartas
    const cartasViradas = document.querySelectorAll('.virada');
    for (i = 0; i < cartasViradas; i++) {
        if (numeroDeCartas === cartasViradas.length) {
            alert("Você ganhou em "+contarJogadas+"jogadas!")
        }
    }


    return primeiraClicada, segundaClicada;

}



function virarCartas() {

    if (primeiraClicada !== segundaClicada) {
        cartasClicadas[cartasClicadas.length - 1].classList.remove('virada')
        cartasClicadas[cartasClicadas.length - 2].classList.remove('virada')

        /*
        for (i = 0; i < cartasCLicadas.length; i++) {
            cartasCLicadas[i].classList.remove('virada')
        }
        */
    }

}

function permanecerVirada() {
    const todasCartasViradas = document.querySelectorAll('.virada')
    for (i = 0; i < todasCartasViradas.length; i++) {
        todasCartasViradas[i].classList.add('virada')
    }
}

function cartaInativa() {
    const cartasEmJogo = document.querySelectorAll('.carta')
    for (i = 0; i < cartasEmJogo.length; i++) {
        cartasEmJogo[i].classList.add('inativa')
    }
}

function reativarCarta() {
    const cartasInativas = document.querySelectorAll('.inativa');
    for (i = 0; i < cartasInativas.length; i++) {
        cartasInativas[i].classList.remove('inativa')
    }
}