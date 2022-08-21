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

function virar(divCarta) {
    const gif = divCarta.children[1].children[0].src;
    divCarta.classList.add('virada')

    contarJogadas++

    if (contarJogadas % 2 === 1) {
        primeiraClicada = gif.toString()
    } else if (contarJogadas % 2 === 0) {
        segundaClicada = gif.toString()
    }

    if (primeiraClicada !== undefined && segundaClicada === undefined) {
        permanecerVirada()
    }


    if (contarJogadas % 2 === 0) {

        if (primeiraClicada !== undefined && segundaClicada !== undefined) {
            if (primeiraClicada !== segundaClicada) {
                setTimeout(virarCartas, 2000)
            }
        }

        if (primeiraClicada !== undefined && segundaClicada !== undefined) {
            if (primeiraClicada === segundaClicada) {
                permanecerVirada()
            }
        }

    }


    console.log(primeiraClicada == segundaClicada)
    console.log(primeiraClicada)
    console.log(segundaClicada)
    console.log(contarJogadas)


}

function virarCartas() {
    const cartasCLicadas = document.querySelectorAll('.virada')
    for (i = 0; i < cartasCLicadas.length; i++) {
        cartasCLicadas[i].classList.remove('virada')
    }
}

function permanecerVirada() {
    const cartasCLicadas = document.querySelectorAll('.virada')
    for (i = 0; i < cartasCLicadas.length; i++) {
        cartasCLicadas[i].classList.add('virada')
    }
}