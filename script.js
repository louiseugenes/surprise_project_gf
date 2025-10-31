// --- CONFIGURAÇÃO DAS RESPOSTAS CORRETAS ---
// Mude aqui quais são as respostas certas para cada pergunta
// Importante: No HTML, você deve colocar a alternativa 'a', 'b', 'c', etc.
// que corresponde à sua resposta certa.
const correctAnswers = {
    1: 'c', // Resposta certa da Pergunta 1 é a alternativa 'c'
    2: 'b', // Resposta certa da Pergunta 2 é a alternativa 'b'
    3: 'c', // Resposta certa da Pergunta 3 é a alternativa 'c'
    4: 'b', // Resposta certa da Pergunta 4 (cálculo 1) é a alternativa 'b'
    5: 'c', // Resposta certa da Pergunta 5 (cálculo 2) é a alternativa 'c'
    6: 'a'  // Resposta certa da Pergunta 6 (cálculo 3) é a alternativa 'a'
};

// --- FIM DA CONFIGURAÇÃO ---

// Variáveis globais para as músicas e elementos
const bgMusic = document.getElementById('bg-music'); // Música misteriosa
const romanticBgMusic = document.getElementById('romantic-bg-music'); // Música romântica
const ourVideo = document.getElementById('our-video'); // Vídeo
const errorOverlay = document.getElementById('error-overlay');

// Função para iniciar o jogo (chamada pelo primeiro botão)
function startGame() {
    // Toca a música misteriosa. Navegadores exigem interação do usuário.
    bgMusic.play().catch(error => {
        console.log("Música misteriosa não pôde tocar automaticamente.", error);
    });
    
    // Mostra a primeira pergunta
    showScreen('question-1');
}

// Função para mostrar a tela desejada
function showScreen(screenId) {
    // Esconde todas as telas
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostra a tela específica
    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
        activeScreen.classList.add('active');
    }
}

// Função para checar a resposta
function checkAnswer(questionIndex, selectedAnswer) {
    const isCorrect = correctAnswers[questionIndex] === selectedAnswer;

    if (isCorrect) {
        // Se for correta, avança para a próxima tela
        const nextQuestionId = `question-${questionIndex + 1}`;
        const nextScreen = document.getElementById(nextQuestionId);
        
        if (nextScreen) {
            showScreen(nextQuestionId);
        } else {
            // Se não houver mais perguntas (após a 6), vai para a tela de revelação do tesouro
            showScreen('final-prize-reveal');
        }
    } else {
        // Se for errada, mostra a animação de erro
        showError();
    }
}

// Função para mostrar o erro
function showError() {
    // Você pode usar o GIF que você baixou na pasta 'assets'
    // const gifUrl = 'assets/error.gif';
    // Ou um link direto da web (se preferir, mas local é mais seguro):
    // const gifUrl = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGx1cnFqZjQ4aW1sdXRyNzN1NjE1eW11b2N1bW10ajB2c281Z2EzZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26ufj0T8z24QyPzLq/giphy.gif';
    
    document.getElementById('error-gif').src = 'assets/error.gif'; // Certifique-se que o caminho está correto
    errorOverlay.classList.remove('hidden');
}

// Função para esconder o erro (chamada pelo botão no overlay)
function hideError() {
    errorOverlay.classList.add('hidden');
}

// Transição para a tela de celebração
function transitionToCelebration() {
    // Para a música misteriosa
    bgMusic.pause();
    bgMusic.currentTime = 0; // Reinicia a música para o próximo uso

    // Toca a música romântica
    romanticBgMusic.play().catch(error => {
        console.log("Música romântica não pôde tocar automaticamente.", error);
    });

    // Mostra a tela de celebração
    showScreen('celebration-screen');

    // Toca o vídeo. O autoplay é permitido se a música estiver mutada ou após interação do usuário.
    // Garante que o vídeo toque e esteja no início.
    ourVideo.load(); // Garante que o vídeo seja recarregado se já tiver tocado
    ourVideo.muted = false; // Ajuste conforme quiser o áudio do vídeo
    ourVideo.play().catch(error => {
        console.log("Vídeo não pôde tocar automaticamente, usuário pode precisar interagir.", error);
    });
}

// Garante que a primeira tela (start-screen) seja mostrada ao carregar
document.addEventListener('DOMContentLoaded', () => {
    showScreen('start-screen');
    // Preload do vídeo para evitar atrasos na reprodução
    ourVideo.load();
});