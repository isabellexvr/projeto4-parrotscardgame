let numeroDeCartas = parseInt(prompt("Digite aqui o número de cartas (de 4 a 14, números pares)"));

const numerosPossiveis = [4, 6, 8, 10, 12, 14];

function aoCarregar() {
    for (i = 0; i < numerosPossiveis.length; i++) {
        if (numeroDeCartas === numerosPossiveis[i] && numeroDeCartas % 2 === 0) {
            adicionarCartas();
        }
    }
}
aoCarregar()

function adicionarCartas() {
    //array com o src dos gifs
    const srcGifs = [
        `"imagens/bobrossparrot.gif"`,
        `"imagens/explodyparrot.gif"`,
        `"imagens/fiestaparrot.gif"`,
        `"imagens/metalparrot.gif"`,
        `"imagens/revertitparrot.gif"`,
        `"imagens/tripletsparrot.gif"`,
        `"imagens/unicornparrot.gif"`
    ]
    // para que hajam 2 cartas iguais possiveis para cada numero possivel de cartas, deve ser divido por 2
    const numeroDeGifs = numeroDeCartas/2
    // embaralha a array
    function embaralhador () {
        return Math.random() - 0.5;
    }
    //pega a quantidade x de gifs que é metade da quantidade de cartas, de modo aleatório
    // array vazia pra colocar lá dentro os gifs possivels
    const gifsPossiveis = []
    // coloca la dentro gifs aleatorizados no numero possivel de gifs (numerodecartas/2) - se forem 4 cartas, 2 gifs diferentes aleatorios
    for (i=0; i<numeroDeGifs; i++) {
        gifsPossiveis.push(srcGifs.sort(embaralhador)[0])
    }

    const gifsPossiveisDuplicados = gifsPossiveis.flatMap(i => [i,i]);

    gifsPossiveisDuplicados.sort(embaralhador);

    // faz-se uma seção pra cada dupla de cartas iguais

    const divCartas = document.querySelector('.cartas');
    // cria o numero de cartas pedido
    for (i = 0; i < numeroDeCartas; i++) {
        let carta = `<div class="carta" onclick="virar(this)">
                        <div class="frente">
                            <img src="imagens/front 1.png" alt="parrot">
                        </div>
                        <div class="costas">
                            <img src=${gifsPossiveisDuplicados[0]} alt="gif1">
                        </div>
                    </div>`;
        divCartas.innerHTML += carta
    }

}

function virar(divCarta) {
    divCarta.classList.toggle("virada")
}