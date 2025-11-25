// --- 1. Data Setup ---
// The 54 Parshas in order
const PARSHAS = [
    // Breishis (12)
    "Breishis", "Noach", "Lech Lecha", "Vayeira", "Chayei Sarah", "Toldos",
    "Vayetzei", "Vayishlach", "Vayeshev", "Miketz", "Vayigash", "Vayechi",
    // Shemos (11)
    "Shemos", "Vaera", "Bo", "Beshalach", "Yisro", "Mishpatim",
    "Terumah", "Tetzaveh", "Ki Tisa", "Vayakhel", "Pekudei",
    // Vayikra (10)
    "Vayikra", "Tzav", "Shemini", "Tazria", "Metzora",
    "Acharei Mos", "Kedoshim", "Emor", "Behar", "Bechukosai",
    // Bamidbar (10)
    "Bamidbar", "Nasso", "Behaaloscha", "Shlach", "Korach",
    "Chukas", "Balak", "Pinchas", "Mattos", "Masei",
    // Devarim (11)
    "Devarim", "Vaeschanan", "Eikev", "Reeh", "Shoftim", "Ki Teitzei",
    "Ki Tavo", "Nitzavim", "Vayelech", "Haazinu", "Vezos Haberachah"
];

// 5 Columns for the 5 Books
const COLUMN_SIZES = [12, 11, 10, 10, 11];
const TITLES = ["Breishis", "Shemos", "Vayikra", "Bamidbar", "Devarim"];

let correctAnswers = new Set();
let timeRemaining = 5 * 60; // 5 minutes
let timerInterval;
let gameActive = true;

// --- 2. Initialize the Game Board ---
function initGame() {
    const board = document.getElementById('game-board');
    let parshaIndex = 0;

    // Loop through the 5 Chumashim
    for (let i = 0; i < COLUMN_SIZES.length; i++) {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'book-column'; // Changed class name for clarity

        const title = document.createElement('div');
        title.className = 'book-title';
        title.textContent = TITLES[i];
        columnDiv.appendChild(title);

        const size = COLUMN_SIZES[i];
        for (let j = 0; j < size; j++) {
            if (parshaIndex < PARSHAS.length) {
                const name = PARSHAS[parshaIndex];

                const slot = document.createElement('div');
                slot.className = 'answer-slot';
                slot.textContent = name;
                // Remove spaces/special chars for the data attribute ID matching
                // e.g., "Lech Lecha" becomes "lechlecha"
                const cleanName = name.replace(/[^a-zA-Z]/g, "").toLowerCase();
                slot.setAttribute('data-name', cleanName);

                columnDiv.appendChild(slot);
                parshaIndex++;
            }
        }
        board.appendChild(columnDiv);
    }

    startTimer();
}

// --- 3. Timer Logic (Same as Mishna) ---
function startTimer() {
    const timerDisplay = document.getElementById('timer');
    timerInterval = setInterval(() => {
        if (!gameActive) return;
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeRemaining <= 0) endGame(false);
    }, 1000);
}

// --- 4. Input Handling ---
const inputField = document.getElementById('answer-input');
const messageBox = document.getElementById('message');
const scoreDisplay = document.getElementById('score');

inputField.addEventListener('input', function() {
    if (!gameActive) return;

    // Normalize user input (remove spaces/apostrophes to match data)
    // This allows "Beha'aloscha" to match "Behaaloscha"
    const userInput = this.value.toLowerCase().replace(/[^a-z]/g, "");

    // Find matching Parsha
    const matchIndex = PARSHAS.findIndex(p => {
        const cleanP = p.toLowerCase().replace(/[^a-z]/g, "");
        return cleanP === userInput;
    });

    if (matchIndex !== -1) {
        const officialName = PARSHAS[matchIndex];
        const cleanName = officialName.replace(/[^a-zA-Z]/g, "").toLowerCase();

        if (correctAnswers.has(officialName)) {
            messageBox.textContent = "Already answered!";
            messageBox.style.color = "orange";
        } else {
            correctAnswers.add(officialName);

            // Reveal Logic
            const slot = document.querySelector(`.answer-slot[data-name="${cleanName}"]`);
            if (slot) slot.classList.add('revealed');

            this.value = "";
            messageBox.textContent = "Correct!";
            messageBox.style.color = "green";
            scoreDisplay.textContent = `${correctAnswers.size} / ${PARSHAS.length}`;

            if (correctAnswers.size === PARSHAS.length) endGame(true);
        }
    }
});

// --- 5. End Game Logic ---
function endGame(won) {
    gameActive = false;
    clearInterval(timerInterval);
    inputField.disabled = true;

    if (won) {
        messageBox.textContent = "MAZEL TOV! You finished the whole Torah!";
        messageBox.style.color = "green";
        document.getElementById('timer').style.color = "green";
    } else {
        messageBox.textContent = "Time's up!";
        messageBox.style.color = "red";
        PARSHAS.forEach(p => {
            if (!correctAnswers.has(p)) {
                const cleanName = p.replace(/[^a-zA-Z]/g, "").toLowerCase();
                const slot = document.querySelector(`.answer-slot[data-name="${cleanName}"]`);
                if (slot) slot.classList.add('missed');
            }
        });
    }
}

initGame();