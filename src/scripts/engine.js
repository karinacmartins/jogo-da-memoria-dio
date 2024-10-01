const emojis = [
    "😺", "😺", "👻", "👻", "🐸", "🐸",
    "🐼", "🐼", "🙉", "🙉", "🐓", "🐓",
    "🕷", "🕷", "🐠", "🐠"
];

let openCards = [];
let shuffleEmojis = [];
let timeLeft = 60; // Tempo em segundos
let timer; // Variável para o temporizador
let gameStarted = false; // Para controlar o início do jogo

// Esconder o temporizador até o jogo começar
document.querySelector("#timer").style.display = "none";

// Função que embaralha os emojis e cria o tabuleiro
function createBoard() {
    shuffleEmojis = emojis.sort(() => Math.random() > 0.5 ? 2 : -1);

    const gameBoard = document.querySelector(".game");
    gameBoard.innerHTML = ""; // Limpar o tabuleiro

    for (let i = 0; i < emojis.length; i++) {
        let box = document.createElement("div");
        box.className = "item";
        box.innerHTML = shuffleEmojis[i];
        box.onclick = handleClick;
        gameBoard.appendChild(box);
    }
}

// Lógica do clique nas cartas
function handleClick() {
    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if (openCards.length == 2) {
        setTimeout(checkMatch, 500);
    }
}

// Verifica se as cartas formam um par
function checkMatch() {
    if (openCards[0].innerHTML == openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    // Verificar se todos os pares foram encontrados
    if (document.querySelectorAll(".boxMatch").length == emojis.length) {
        clearInterval(timer); // Para o temporizador
        let timeSpent = 60 - timeLeft; // Calcula o tempo gasto
        alert(`Você venceu! Tempo gasto: ${timeSpent} segundos.`);

        // Recarregar a página para reiniciar o jogo
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
}

// Função que inicia o temporizador
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.querySelector("#timer").textContent = `Tempo restante: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer); // Para o temporizador
            alert("O tempo acabou!");

            // Recarregar a página para reiniciar o jogo
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    }, 1000); // Atualiza o tempo a cada segundo
}

// Função que inicia o jogo
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        createBoard(); // Criar o tabuleiro
        startTimer(); // Iniciar o temporizador
        document.querySelector("#timer").style.display = "block"; // Mostrar o temporizador
        document.querySelector("#startButton").style.display = "none"; // Esconder o botão Start
    }
}

// Adiciona o evento de clique ao botão "Start"
document.querySelector("#startButton").addEventListener("click", startGame);
