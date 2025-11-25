// --- 1. Data Setup (Copied from your Java Code) ---
const TRACTATES = [
    "Brachos", "Peah", "Demai", "Kilayim", "Sheviis", "Terumos", "Maaseros",
    "Maaser Sheni", "Challah", "Orlah", "Bikkurim", "Shabbos", "Eruvin", "Pesachim",
    "Shekalim", "Yoma", "Sukkah", "Beitzah", "Rosh Hashanah", "Taanis", "Megillah",
    "Moed Katan", "Chagigah", "Yevamos", "Kesubos", "Nedarim", "Nazir", "Sotah",
    "Gittin", "Kiddushin", "Bava Kama", "Bava Metzia", "Bava Basra", "Sanhedrin",
    "Makkos", "Shevuos", "Eduyos", "Avodah Zarah", "Avos", "Horayos", "Zevachim",
    "Menachos", "Chullin", "Bechoros", "Arachin", "Temurah", "Kerisos", "Meilah",
    "Tamid", "Middos", "Kinim", "Keilim", "Oholos", "Negaim", "Parah", "Tohoros",
    "Mikvaos", "Niddah", "Machshirin", "Zavim", "Tevul Yom", "Yadayim", "Uktzim"
];

const COLUMN_SIZES = [11, 12, 7, 10, 11, 12];
const TITLES = ["Zeraim", "Moed", "Nashim", "Nezikin", "Kodshim", "Taharos"];

let correctAnswers = new Set();
let timeRemaining = (6 * 60) + 13; // 6 minutes 13 seconds
let timerInterval;
let gameActive = true;

// --- 2. Initialize the Game Board ---
function initGame() {
    const board = document.getElementById('game-board');
    let tractateIndex = 0;

    // Loop through the 6 Sedarim (Columns)
    for (let i = 0; i < COLUMN_SIZES.length; i++) {
        // Create the Column Div
        const columnDiv = document.createElement('div');
        columnDiv.className = 'seder-column';

        // Add the Title
        const title = document.createElement('div');
        title.className = 'seder-title';
        title.textContent = TITLES[i];
        columnDiv.appendChild(title);

        // Add the slots for this column
        const size = COLUMN_SIZES[i];
        for (let j = 0; j < size; j++) {
            if (tractateIndex < TRACTATES.length) {
                const tractateName = TRACTATES[tractateIndex];

                const slot = document.createElement('div');
                slot.className = 'tractate-slot';
                slot.textContent = tractateName;
                // We use a data attribute to find this specific slot later
                slot.setAttribute('data-name', tractateName.toLowerCase());

                columnDiv.appendChild(slot);
                tractateIndex++;
            }
        }
        board.appendChild(columnDiv);
    }

    startTimer();
}

// --- 3. Timer Logic ---
function startTimer() {
    const timerDisplay = document.getElementById('timer');

    timerInterval = setInterval(() => {
        if (!gameActive) return;

        timeRemaining--;

        // Format Minutes and Seconds
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Time's Up Logic
        if (timeRemaining <= 0) {
            endGame(false);
        }
    }, 1000);
}

// --- 4. Input Handling ---
const inputField = document.getElementById('answer-input');
const messageBox = document.getElementById('message');
const scoreDisplay = document.getElementById('score');

inputField.addEventListener('input', function() {
    if (!gameActive) return;

    const userInput = this.value.trim().toLowerCase();

    // Check if the input matches ANY tractate
    // We look for the exact index in our array (case insensitive)
    const matchIndex = TRACTATES.findIndex(t => t.toLowerCase() === userInput);

    if (matchIndex !== -1) {
        const officialName = TRACTATES[matchIndex];

        // Check if already answered
        if (correctAnswers.has(officialName)) {
            messageBox.textContent = "You already got that one!";
            messageBox.style.color = "orange";
        } else {
            // Success!
            correctAnswers.add(officialName);
            revealAnswer(officialName);

            // Clear input
            this.value = "";
            messageBox.textContent = "Correct!";
            messageBox.style.color = "green";

            // Update Score
            scoreDisplay.textContent = `${correctAnswers.size} / ${TRACTATES.length}`;

            // Check Win Condition
            if (correctAnswers.size === TRACTATES.length) {
                endGame(true);
            }
        }
    } else {
        messageBox.textContent = "...";
        messageBox.style.color = "#666";
    }
});

// --- 5. Helper Functions ---
function revealAnswer(name) {
    // Find the slot with the matching data-name
    const slot = document.querySelector(`.tractate-slot[data-name="${name.toLowerCase()}"]`);
    if (slot) {
        slot.classList.add('revealed');
    }
}

function endGame(won) {
    gameActive = false;
    clearInterval(timerInterval);
    inputField.disabled = true;

    if (won) {
        messageBox.textContent = "MAZEL TOV! You named them all!";
        messageBox.style.color = "green";
        document.getElementById('timer').style.color = "green";
    } else {
        messageBox.textContent = "Time's up!";
        messageBox.style.color = "red";

        // Reveal missed answers in red
        TRACTATES.forEach(t => {
            if (!correctAnswers.has(t)) {
                const slot = document.querySelector(`.tractate-slot[data-name="${t.toLowerCase()}"]`);
                if (slot) {
                    slot.classList.add('missed'); // See CSS for 'missed' style
                }
            }
        });
    }
}

// Start the game when the page loads
initGame();