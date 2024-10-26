let currentQuestion = 0;
let currentLevel = 0;

// Agrega el código de audio aquí
const startSound = document.getElementById('start-sound');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const levelUpSound = document.getElementById('level-up-sound');
const winSound = document.getElementById('win-sound');

// Iniciar el sonido al hacer clic en "¡Empezar el Juego!"
document.getElementById('start-btn').addEventListener('click', () => {
    startSound.play().catch(error => {
        console.error("Error al reproducir el sonido de inicio:", error);
    });
});

// Detener el sonido al entrar en los niveles
function stopStartSound() {
    if (!startSound.paused) {
        startSound.pause();
        startSound.currentTime = 0; // Reiniciar el tiempo solo si estaba reproduciéndose
    }
}

// Reproducir sonidos de respuesta
function selectOption(option) {
    const feedback = document.getElementById('feedback');
    const current = questions[currentLevel][currentQuestion];

    if (option === current.correct) {
        feedback.innerText = "¡Correcto!";
        correctSound.play().catch(error => {
            console.error("Error al reproducir el sonido correcto:", error);
        });
        // Lógica para avanzar a la siguiente pregunta o nivel
    } else {
        feedback.innerText = "Incorrecto, intenta de nuevo.";
        wrongSound.play().catch(error => {
            console.error("Error al reproducir el sonido incorrecto:", error);
        });
        // Lógica para manejar la respuesta incorrecta
    }
}

// Cuando se selecciona un nivel
function showQuizScreen(level) {
    currentLevel = level - 1; // Ajustar el índice del nivel
    stopStartSound(); // Detener el sonido de inicio
    // Resto de la lógica para mostrar la pantalla de preguntas
}

// Arreglo de preguntas por nivel
const questions = [
    // Nivel 1
    [
        { question: "¿Cuál es el color del cielo?", options: ["Azul", "Verde", "Rojo"], correct: 1 },
        { question: "¿Cuál es el día de Navidad?", options: ["24 de diciembre", "25 de diciembre", "31 de diciembre"], correct: 2 },
        { question: "¿Cuántas patas tiene un perro?", options: ["2", "4", "6"], correct: 2 },
    ],
    // Nivel 2
    [
        { question: "¿Cuál es la capital de Francia?", options: ["Londres", "Berlín", "París"], correct: 3 },
        { question: "¿Quién escribió 'Don Quijote'?", options: ["Cervantes", "Shakespeare", "Borges"], correct: 1 },
        { question: "¿Qué planeta es conocido como el 'planeta rojo'?", options: ["Marte", "Júpiter", "Venus"], correct: 1 },
    ],
    // Nivel 3
    [
        { question: "¿Cuál es la fórmula química del agua?", options: ["H2O", "CO2", "O2"], correct: 1 },
        { question: "¿Quién descubrió América?", options: ["Cristóbal Colón", "Fernando de Magallanes", "Hernán Cortés"], correct: 1 },
        { question: "¿Cuál es el planeta más cercano al sol?", options: ["Venus", "Marte", "Mercurio"], correct: 3 },
    ],
    // Nivel 4
    [
        { question: "¿Qué es un quasar?", options: ["Una estrella", "Un agujero negro", "Un núcleo galáctico"], correct: 3 },
        { question: "¿Qué es la teoría de la relatividad?", options: ["Una teoría matemática", "Una teoría física", "Una teoría química"], correct: 2 },
        { question: "¿Cuál es el río más largo del mundo?", options: ["Amazonas", "Nilo", "Yangtsé"], correct: 2 },
    ],
    // Nivel 5
    [
        { question: "¿Cuál es la teoría que explica la evolución de las especies?", options: ["Teoría del Big Bang", "Teoría de la selección natural", "Teoría de la relatividad"], correct: 2 },
        { question: "¿Qué es la materia oscura?", options: ["Una forma de energía", "Un tipo de estrella", "Una sustancia invisible"], correct: 3 },
        { question: "¿Quién formuló las leyes del movimiento?", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei"], correct: 1 },
    ],
];

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const options = document.querySelectorAll('.option');
    const feedback = document.getElementById('feedback');

    feedback.innerText = '';
    document.getElementById('retry-btn').classList.add('hidden');
    document.getElementById('next-level-btn').classList.add('hidden');

    const current = questions[currentLevel][currentQuestion];
    questionElement.innerText = current.question;
    options.forEach((option, index) => {
        option.innerText = current.options[index];
    });
}

function selectOption(option) {
    const feedback = document.getElementById('feedback');
    const current = questions[currentLevel][currentQuestion];
    const payaso = document.getElementById('payaso');
    const splash = document.getElementById('splash');

    if (option === current.correct) {
        feedback.innerText = "¡Correcto!";
        feedback.classList.add('correct');
        feedback.classList.remove('incorrect');

        payaso.classList.add('fall');
        splash.classList.add('show-splash');

        setTimeout(() => {
            payaso.classList.remove('fall');
            splash.classList.remove('show-splash');
            payaso.style.opacity = 1; // Mostrar de nuevo el payaso
        }, 1000);

        currentQuestion++;
        if (currentQuestion >= questions[currentLevel].length) {
            unlockNextLevel(); // Desbloquear el siguiente nivel
            document.getElementById('next-level-btn').classList.remove('hidden');
        } else {
            loadQuestion();
        }
    } else {
        feedback.innerText = "Incorrecto, intenta de nuevo.";
        feedback.classList.add('incorrect');
        feedback.classList.remove('correct');

        // Animación de burla
        payaso.classList.add('burlarse');
        setTimeout(() => {
            payaso.classList.remove('burlarse');
        }, 500); // Duración de la burla

        document.getElementById('retry-btn').classList.remove('hidden');
    }
}

function unlockNextLevel() {
    currentLevel++;
    if (currentLevel < 5) {
        document.getElementById('level-' + (currentLevel + 1)).disabled = false;
        document.getElementById('level-' + (currentLevel + 1)).classList.remove('locked');
    }else {
        // Si se completan los 5 niveles, mostrar el mensaje de felicitación
        document.getElementById('congratulations-message').classList.remove('hidden');
    }
}

function nextLevel() {
    currentQuestion = 0; // Reiniciar las preguntas para el nuevo nivel
    loadQuestion();
    document.getElementById('quiz-screen').classList.add('active');
    document.getElementById('level-map').classList.remove('active');
}

// Agrega aquí el evento para el botón de "Volver al Inicio"
document.getElementById('back-to-start-btn').addEventListener('click', () => {
    document.getElementById('level-map').classList.remove('active');
    document.getElementById('start-screen').classList.add('active');
});

function retryQuestion() {
    loadQuestion();
}

function showInstructionsScreen() {
    document.getElementById('instructions-screen').classList.add('active');
    document.getElementById('start-screen').classList.remove('active');
}

function showLevelMap() {
    document.getElementById('level-map').classList.add('active');
    document.getElementById('instructions-screen').classList.remove('active');
}

function showQuizScreen(level) {
    currentLevel = level - 1; // Ajustar el índice del nivel
    currentQuestion = 0; // Reiniciar las preguntas
    document.getElementById('level-map').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    loadQuestion();
}

function restartGame() {
    currentQuestion = 0;
    currentLevel = 0; // Reiniciar nivel
    document.getElementById('end-screen').classList.remove('active');
    document.getElementById('start-screen').classList.add('active');
}

document.getElementById('start-btn').addEventListener('click', showInstructionsScreen);
document.getElementById('continue-btn').addEventListener('click', showLevelMap);
document.getElementById('retry-btn').addEventListener('click', retryQuestion);
document.getElementById('next-level-btn').addEventListener('click', () => {
    document.getElementById('quiz-screen').classList.remove('active');
    showLevelMap();
});

// Eventos para los botones de niveles
document.querySelectorAll('.level').forEach((levelButton) => {
    levelButton.addEventListener('click', () => {
        const levelId = levelButton.id.split('-')[1];
        showQuizScreen(levelId);
    });
});

document.getElementById('restart-btn').addEventListener('click', restartGame);


