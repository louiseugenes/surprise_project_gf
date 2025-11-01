const correctAnswers = {
    1: 'd',
    2: 'a',
    3: 'a',
    4: '120208',
    5: '102004',
    6: 'a'
};

const bgMusic = document.getElementById('bg-music');
const romanticBgMusic = document.getElementById('romantic-bg-music');
const ourVideo = document.getElementById('our-video');
const errorOverlay = document.getElementById('error-overlay');

function startGame() {
    bgMusic.play().catch(error => {
        console.log("Música misteriosa não pôde tocar automaticamente.", error);
    });

    showScreen('question-1');
}

function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
        activeScreen.classList.add('active');
    }
}

function checkAnswer(questionIndex, selectedAnswer) {
    const isCorrect = correctAnswers[questionIndex] === selectedAnswer;

    if (isCorrect) {
        const nextQuestionId = `question-${questionIndex + 1}`;
        const nextScreen = document.getElementById(nextQuestionId);

        if (nextScreen) {
            showScreen(nextQuestionId);
        } else {
            showScreen('final-prize-reveal');
        }
    } else {
        showError();
    }
}

function checkInputAnswer(questionIndex) {
    const inputElement = document.getElementById(`q${questionIndex}-input`);
    if (!inputElement) return;

    const userAnswer = inputElement.value.trim().toLowerCase();

    const expectedAnswer = String(correctAnswers[questionIndex]).trim().toLowerCase();

    const isCorrect = (userAnswer === expectedAnswer);

    if (isCorrect) {
        const nextQuestionId = `question-${questionIndex + 1}`;
        const nextScreen = document.getElementById(nextQuestionId);

        if (nextScreen) {
            showScreen(nextQuestionId);
        } else {
            showScreen('final-prize-reveal');
        }
    } else {
        showError();
    }
}

function showError() {
    document.getElementById('error-gif').src = 'assets/error.gif';
    errorOverlay.classList.remove('hidden');
}

function hideError() {
    errorOverlay.classList.add('hidden');
}

function transitionToCelebration() {
    bgMusic.pause();
    bgMusic.currentTime = 0;

    romanticBgMusic.play().catch(error => {
        console.log("Música romântica não pôde tocar automaticamente.", error);
    });

    showScreen('celebration-screen');

    ourVideo.load();
    ourVideo.muted = false;
    ourVideo.play().catch(error => {
        console.log("Vídeo não pôde tocar automaticamente, usuário pode precisar interagir.", error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    showScreen('start-screen');
    ourVideo.load();
});