// --- 1. Data Setup (Copied from your Java Code) ---
const NEVIIM = [
    // --- MEN (Part 1) ---
    { id: "avraham", display: "אברהם", alts: ["avraham", "abraham", "אברהם"] },
    { id: "yitzchak", display: "יצחק", alts: ["yitzchak", "isaac", "יצחק"] },
    { id: "yaakov", display: "יעקב", alts: ["yaakov", "jacob", "יעקב"] },
    { id: "moshe", display: "משה", alts: ["moshe", "moses", "משה"] },
    { id: "aharon", display: "אהרן", alts: ["aharon", "aaron", "אהרן", "אהרון"] },
    { id: "yehoshua", display: "יהושע", alts: ["yehoshua", "joshua", "יהושע"] },
    { id: "pinchas", display: "פינחס", alts: ["pinchas", "phinehas", "פינחס", "פנחס"] },
    { id: "elkana", display: "אלקנה", alts: ["elkana", "elkanah", "אלקנה"] },
    { id: "eli", display: "עלי", alts: ["eli", "עלי"] },
    { id: "shmuel", display: "שמואל", alts: ["shmuel", "samuel", "שמואל"] },
    { id: "gad", display: "גד", alts: ["gad", "גד"] },
    { id: "nassan", display: "נתן", alts: ["nassan", "natan", "nathan", "נתן"] },

    // --- MEN (Part 2) ---
    { id: "david", display: "דוד", alts: ["david", "דוד"] },
    { id: "shlomo", display: "שלמה", alts: ["shlomo", "solomon", "שלמה"] },
    { id: "iddo", display: "עדו", alts: ["iddo", "עדו", "עידו"] },
    { id: "michayahu", display: "מיכיהו", alts: ["michayahu", "micha ben yimla", "מיכיהו"] },
    { id: "ovadia", display: "עובדיה", alts: ["ovadia", "ovadiah", "obadiah", "עובדיה"] },
    { id: "achiya", display: "אחיה", alts: ["achiya", "achiyah", "אחיה"] },
    { id: "yehu", display: "יהוא", alts: ["yehu", "jehu", "יהוא"] },
    { id: "azaria", display: "עזריה", alts: ["azaria", "azariah", "עזריה"] },
    { id: "chaziel", display: "חזיאל", alts: ["chaziel", "yachziel", "חזיאל", "יחזיאל"] },
    { id: "eliezer", display: "אליעזר", alts: ["eliezer", "אליעזר"] },
    { id: "hoshea", display: "הושע", alts: ["hoshea", "hosea", "הושע"] },
    { id: "amos", display: "עמוס", alts: ["amos", "עמוס"] },

    // --- MEN (Part 3) ---
    { id: "micha", display: "מיכה", alts: ["micha", "micah", "מיכה"] },
    { id: "amoz", display: "אמוץ", alts: ["amoz", "amotz", "אמוץ"] },
    { id: "eliyahu", display: "אליהו", alts: ["eliyahu", "elijah", "אליהו"] },
    { id: "elisha", display: "אלישע", alts: ["elisha", "אלישע"] },
    { id: "yona", display: "יונה", alts: ["yona", "jonah", "יונה"] },
    { id: "yeshaya", display: "ישעיהו", alts: ["yeshaya", "yeshayahu", "isaiah", "ישעיהו"] },
    { id: "yoel", display: "יואל", alts: ["yoel", "joel", "יואל"] },
    { id: "nachum", display: "נחום", alts: ["nachum", "nahum", "נחום"] },
    { id: "chabakuk", display: "חבקוק", alts: ["chabakuk", "habakkuk", "חבקוק"] },
    { id: "tzefanya", display: "צפניה", alts: ["tzefanya", "zephaniah", "צפניה"] },
    { id: "uria", display: "אוריה", alts: ["uria", "uriah", "אוריה"] },
    { id: "yirmiya", display: "ירמיהו", alts: ["yirmiya", "yirmiyahu", "jeremiah", "ירמיהו"] },

    // --- MEN (Part 4) ---
    { id: "yechezkel", display: "יחזקאל", alts: ["yechezkel", "ezekiel", "יחזקאל"] },
    { id: "shemaya", display: "שמעיה", alts: ["shemaya", "shemaiah", "שמעיה"] },
    { id: "baruch", display: "ברוך", alts: ["baruch", "ברוך"] },
    { id: "neria", display: "נריה", alts: ["neria", "neriah", "נריה"] },
    { id: "seraya", display: "שריה", alts: ["seraya", "seraiah", "שריה"] },
    { id: "machseya", display: "מחסיה", alts: ["machseya", "mahseiah", "מחסיה"] },
    { id: "chagai", display: "חגי", alts: ["chagai", "haggai", "חגי"] },
    { id: "zecharya", display: "זכריה", alts: ["zecharya", "zechariah", "זכריה"] },
    { id: "malachi", display: "מלאכי", alts: ["malachi", "מלאכי"] },
    { id: "mordechai", display: "מרדכי", alts: ["mordechai", "mordecai", "מרדכי"] },
    { id: "oded", display: "עודד", alts: ["oded", "עודד"] },
    { id: "chanani", display: "חנני", alts: ["chanani", "hanani", "חנני"] },

    // --- WOMEN (Prophetesses) ---
    { id: "sara", display: "שרה", alts: ["sara", "sarah", "שרה"] },
    { id: "miriam", display: "מרים", alts: ["miriam", "מרים"] },
    { id: "devora", display: "דבורה", alts: ["devora", "devorah", "deborah", "דבורה"] },
    { id: "chana", display: "חנה", alts: ["chana", "chanah", "hannah", "חנה"] },
    { id: "avigail", display: "אביגיל", alts: ["avigail", "abigail", "אביגיל"] },
    { id: "chulda", display: "חולדה", alts: ["chulda", "chuldah", "huldah", "חולדה"] },
    { id: "esther", display: "אסתר", alts: ["esther", "ester", "אסתר"] }
];
const COLUMN_SIZES = [12, 12, 12, 12, 7];
const TITLES = ["Men I", "Men II", "Men III", "Men IV", "Women"];

let correctAnswers = new Set();
let timeRemaining = (6 * 60) + 13; // 6 minutes 13 seconds
let timerInterval;
let gameActive = false;

// --- 2. Initialize the Game Board ---
function initGame() {
    const board = document.getElementById('game-board');
    let tractateIndex = 0;

    for (let i = 0; i < COLUMN_SIZES.length; i++) {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'seder-column';

        const title = document.createElement('div');
        title.className = 'seder-title';
        title.textContent = TITLES[i];
        columnDiv.appendChild(title);

        const size = COLUMN_SIZES[i];
        for (let j = 0; j < size; j++) {
            if (tractateIndex < NEVIIM.length) {
                // Get the object
                const data = NEVIIM[tractateIndex];

                const slot = document.createElement('div');
                slot.className = 'tractate-slot';

                // DISPLAY: Use the Hebrew Name
                slot.textContent = data.display;

                // ID: Use the safe "id" from the object (e.g., "brachos")
                slot.setAttribute('data-name', data.id);

                columnDiv.appendChild(slot);
                tractateIndex++;
            }
        }
        board.appendChild(columnDiv);
    }
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
const controlBtn = document.getElementById('control-btn');
const inputField = document.getElementById('answer-input');
const messageBox = document.getElementById('message');
const scoreDisplay = document.getElementById('score');

inputField.addEventListener('input', function() {
    if (!gameActive) return;

    // Normalize input: lowercase, trim whitespace
    const userInput = this.value.trim().toLowerCase();

    // Search the alts array of every object
    const match = NEVIIM.find(t => t.alts.includes(userInput));

    if (match) {
        // Use the safe ID to track answers
        if (correctAnswers.has(match.id)) {
            messageBox.textContent = "You already got that one!";
            messageBox.style.color = "orange";
        } else {
            // Add the ID to the correct set
            correctAnswers.add(match.id);

            // Reveal using the ID
            revealAnswer(match.id);

            this.value = "";
            messageBox.textContent = "Correct!";
            messageBox.style.color = "green";

            scoreDisplay.textContent = `${correctAnswers.size} / ${NEVIIM.length}`;

            if (correctAnswers.size === NEVIIM.length) {
                endGame(true);
            }
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

function startGame() {
    // 1. Reset Internal State
    gameActive = true;
    correctAnswers.clear();
    timeRemaining = (6 * 60) + 13;

    // 2. Reset Visuals
    document.getElementById('score').textContent = `0 / ${NEVIIM.length}`;
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

// --- 5. Helper Functions ---
function revealAnswer(id) {
    // Find slot by the safe ID
    const slot = document.querySelector(`.tractate-slot[data-name="${id}"]`);
    if (slot) {
        slot.classList.add('revealed');
    }
}

function endGame(won) {
    gameActive = false;
    clearInterval(timerInterval);
    inputField.disabled = true;

    controlBtn.textContent = "Play Again";
    controlBtn.classList.remove('give-up');

    if (won) {
        messageBox.textContent = "MAZEL TOV! You named them all!";
        messageBox.style.color = "green";
        document.getElementById('timer').style.color = "green";
    } else {
        messageBox.textContent = "Time's up!";
        messageBox.style.color = "red";

        NEVIIM.forEach(t => {
            if (!correctAnswers.has(t.id)) {
                // Find by ID
                const slot = document.querySelector(`.tractate-slot[data-name="${t.id}"]`);
                if (slot) {
                    slot.classList.add('missed');
                }
            }
        });
    }
}

// Start the game when the page loads
initGame();