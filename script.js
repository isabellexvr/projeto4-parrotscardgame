function perguntarNumeroDeCartas() {
    numeroDeCartas = Number(prompt("Digite aqui o número de cartas (de 4 a 14, números pares)"));
}

let numeroDeCartas;

perguntarNumeroDeCartas()

const numerosPossiveis = [4, 6, 8, 10, 12, 14];

function aoCarregar() {
    for (i = 0; i <= 1; i++) {
        if (numeroDeCartas === numerosPossiveis[i] && numeroDeCartas % 2 === 0) {
            adicionarCartas();
        } else {
            alert("ERRO. Por favor, apenas números PARES, no intervalo entre 4 e 14.")
            perguntarNumeroDeCartas()
            aoCarregar()
        }
    }
}
aoCarregar()

function adicionarCartas() {
    const divCartas = document.querySelector('.cartas');
    for (i = 0; i < numeroDeCartas; i++) {
        let carta = `<div class="carta" onclick="virar(this)">
                        <img src="imagens/front 1.png" alt="parrot">
                    </div>`;
        divCartas.innerHTML += carta
    }

}

//fazer array com as divs carta



function virar(divCarta) {
    divCarta.classList.add('virada')
}

//ewfniekn