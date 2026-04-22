// --- 1. Data Setup ---
// The 24 Sifrei Tanach in order
const TANACH = [
    // --- TORAH ---
    { id: "bereishis", display: "בראשית", alts: ["bereishis", "bereshit", "genesis", "בראשית"] },
    { id: "shemos", display: "שמות", alts: ["shemos", "shemot", "exodus", "שמות"] },
    { id: "vayikra", display: "ויקרא", alts: ["vayikra", "leviticus", "ויקרא"] },
    { id: "bamidbar", display: "במדבר", alts: ["bamidbar", "numbers", "במדבר"] },
    { id: "devarim", display: "דברים", alts: ["devarim", "deuteronomy", "דברים"] },

    // --- NEVIIM ---
    { id: "yehoshua", display: "יהושע", alts: ["yehoshua", "joshua", "יהושע"] },
    { id: "shoftim", display: "שופטים", alts: ["shoftim", "judges", "שופטים"] },
    { id: "shmuel", display: "שמואל", alts: ["shmuel", "samuel", "שמואל"] },
    { id: "melachim", display: "מלכים", alts: ["melachim", "kings", "מלכים"] },
    { id: "yeshaya", display: "ישעיהו", alts: ["yeshaya", "yeshayahu", "isaiah", "ישעיהו", "ישעיה"] },
    { id: "yirmiya", display: "ירמיהו", alts: ["yirmiya", "yirmiyahu", "jeremiah", "ירמיהו", "ירמיה"] },
    { id: "yechezkel", display: "יחזקאל", alts: ["yechezkel", "ezekiel", "יחזקאל"] },
    { id: "trei_asar", display: "תרי עשר", alts: ["trei asar", "trei assar", "minor prophets", "תרי עשר"] },

    // --- KESUVIM ---
    { id: "tehillim", display: "תהילים", alts: ["tehillim", "tehilim", "psalms", "תהילים", "תהלים"] },
    { id: "mishlei", display: "משלי", alts: ["mishlei", "proverbs", "משלי"] },
    { id: "iyov", display: "איוב", alts: ["iyov", "job", "איוב"] },
    { id: "shir_hashirim", display: "שיר השירים", alts: ["shir hashirim", "song of songs", "שיר השירים"] },
    { id: "rus", display: "רות", alts: ["rus", "rut", "ruth", "רות"] },
    { id: "eicha", display: "איכה", alts: ["eicha", "eichah", "lamentations", "איכה"] },
    { id: "koheles", display: "קהלת", alts: ["koheles", "kohelet", "ecclesiastes", "קהלת"] },
    { id: "esther", display: "אסתר", alts: ["esther", "ester", "אסתר"] },
    { id: "daniel", display: "דניאל", alts: ["daniel", "דניאל"] },
    { id: "ezra_nechemia", display: "עזרא-נחמיה", alts: ["ezra", "nechemia", "nechemya", "ezra nechemia", "ezra-nechemia", "עזרא", "נחמיה", "עזרא ונחמיה"] },
    { id: "divrei_hayamim", display: "דברי הימים", alts: ["divrei hayamim", "chronicles", "דברי הימים"] }
];
// 5 Columns for the 5 Books
const COLUMN_SIZES = [5, 8, 11];
const TITLES = ["תורה", "נביאים", "כתובים"];

let correctAnswers = new Set();
let timeRemaining = 3 * 60; // 6 minutes and 13 seconds
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
            if (parshaIndex < TANACH.length) {
                const data = TANACH[parshaIndex];

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
    const match = TANACH.find(p => p.alts.includes(userInput));

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
            scoreDisplay.textContent = `${correctAnswers.size} / ${TANACH.length}`;

            if (correctAnswers.size === TANACH.length) endGame(true);
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
    document.getElementById('score').textContent = `0 / ${TANACH.length}`;
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

        TANACH.forEach(p => {
            // Check if ID is in correctAnswers
            if (!correctAnswers.has(p.id)) {
                const slot = document.querySelector(`.answer-slot[data-name="${p.id}"]`);
                if (slot) slot.classList.add('missed');
            }
        });
    }
}

initGame();