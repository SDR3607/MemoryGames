// --- 1. Data Setup ---
// The Trei Asar in order
const TREIASAR = [
    // --- COLUMN 1 ---
    { id: "hoshea", display: "הושע", alts: ["hoshea", "hosea", "הושע"] },
    { id: "yoel", display: "יואל", alts: ["yoel", "joel", "יואל"] },
    { id: "amos", display: "עמוס", alts: ["amos", "עמוס"] },
    { id: "ovadia", display: "עובדיה", alts: ["ovadia", "ovadiah", "obadiah", "עובדיה"] },
    { id: "yona", display: "יונה", alts: ["yona", "yonah", "jonah", "יונה"] },
    { id: "micha", display: "מיכה", alts: ["micha", "michah", "micah", "מיכה"] },

    // --- COLUMN 2 ---
    { id: "nachum", display: "נחום", alts: ["nachum", "nahum", "נחום"] },
    { id: "chabakuk", display: "חבקוק", alts: ["chabakuk", "habakkuk", "חבקוק"] },
    { id: "tzefanya", display: "צפניה", alts: ["tzefanya", "tzefaniah", "zephaniah", "צפניה"] },
    { id: "chagai", display: "חגי", alts: ["chagai", "haggai", "חגי"] },
    { id: "zecharya", display: "זכריה", alts: ["zecharya", "zechariah", "זכריה"] },
    { id: "malachi", display: "מלאכי", alts: ["malachi", "malachi", "מלאכי"] }
];

// 2 Columns
const COLUMN_SIZES = [6, 6];
const TITLES = ["First 6", "Last 6"];

let correctAnswers = new Set();
let timeRemaining = 2 * 60; // 6 minutes and 13 seconds
let timerInterval;
let gameActive = false;

// --- 2. Initialize the Game Board ---
function initGame() {
    const board = document.getElementById('game-board');
    let parshaIndex = 0;

    for (let i = 0; i < COLUMN_SIZES.length; i++) {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'book-column';

        const title = document.createElement('div');
        title.className = 'book-title';
        title.textContent = TITLES[i];
        columnDiv.appendChild(title);

        const size = COLUMN_SIZES[i];
        for (let j = 0; j < size; j++) {
            if (parshaIndex < TREIASAR.length) {
                const data = TREIASAR[parshaIndex];

                const slot = document.createElement('div');
                slot.className = 'answer-slot';

                // Show the Hebrew Name
                slot.textContent = data.display;

                // Use the English ID for logic
                slot.setAttribute('data-name', data.id);

                columnDiv.appendChild(slot);
                parshaIndex++;
            }
        }
        board.appendChild(columnDiv);
    }
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
const controlBtn = document.getElementById('control-btn');
const inputField = document.getElementById('answer-input');
const messageBox = document.getElementById('message');
const scoreDisplay = document.getElementById('score');

inputField.addEventListener('input', function() {
    if (!gameActive) return;

    const userInput = this.value.trim().toLowerCase();

    // Check 'alts' for the user input
    const match = TREIASAR.find(p => p.alts.includes(userInput));

    if (match) {
        // Track progress using the safe ID
        if (correctAnswers.has(match.id)) {
            messageBox.textContent = "Already answered!";
            messageBox.style.color = "orange";
        } else {
            correctAnswers.add(match.id);

            // Reveal using the ID
            const slot = document.querySelector(`.answer-slot[data-name="${match.id}"]`);
            if (slot) slot.classList.add('revealed');

            this.value = "";
            messageBox.textContent = "Correct!";
            messageBox.style.color = "green";
            scoreDisplay.textContent = `${correctAnswers.size} / ${TREIASAR.length}`;

            if (correctAnswers.size === TREIASAR.length) endGame(true);
        }
    }
});

controlBtn.addEventListener('click', () => {
    if (gameActive) {
        // If game is running, this button acts as "Give Up"
        endGame(false);
    } else {
        // If game is over or hasn't started, this acts as "Start/Play Again"
        startGame();
    }
});

// --- 5. Start Game Logic ---
function startGame() {
    // 1. Reset Internal State
    gameActive = true;
    correctAnswers.clear();
    timeRemaining = (6 * 60) + 13;

    // 2. Reset Visuals
    document.getElementById('score').textContent = `0 / ${TREIASAR.length}`;
    messageBox.textContent = "Go!";
    messageBox.style.color = "#333";
    inputField.value = "";
    inputField.disabled = false;
    inputField.focus();

    // 3. Button Visuals
    controlBtn.textContent = "Give Up";
    controlBtn.classList.add('give-up'); // Turns red

    // 4. Clear the Board (Remove colors)
    // We select all slots and remove the 'revealed' and 'missed' classes
    document.querySelectorAll('.answer-slot').forEach(slot => { // Use .tractate-slot for Mishna
        slot.classList.remove('revealed', 'missed');
    });

    // 5. Start Timer
    clearInterval(timerInterval); // Safety clear
    startTimer();
}

// --- 6. End Game Logic ---
function endGame(won) {
    gameActive = false;
    clearInterval(timerInterval);
    inputField.disabled = true;

    controlBtn.textContent = "Play Again";
    controlBtn.classList.remove('give-up');

    if (won) {
        messageBox.textContent = "MAZEL TOV! You finished the whole Torah!";
        messageBox.style.color = "green";
        document.getElementById('timer').style.color = "green";
    } else {
        messageBox.textContent = "Time's up!";
        messageBox.style.color = "red";

        TREIASAR.forEach(p => {
            // Check if ID is in correctAnswers
            if (!correctAnswers.has(p.id)) {
                const slot = document.querySelector(`.answer-slot[data-name="${p.id}"]`);
                if (slot) slot.classList.add('missed');
            }
        });
    }
}

initGame();