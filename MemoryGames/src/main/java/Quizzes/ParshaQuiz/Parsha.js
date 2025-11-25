// --- 1. Data Setup ---
// The 54 Parshas in order
const PARSHAS = [
    // --- BEREISHIS ---
    { id: "bereishis", display: "בראשית", alts: ["bereishis", "bereshit", "genesis", "בראשית"] },
    { id: "noach", display: "נח", alts: ["noach", "noah", "נח"] },
    { id: "lech lecha", display: "לך לך", alts: ["lech lecha", "lechlecha", "lech-lecha", "לך לך"] },
    { id: "vayeira", display: "וירא", alts: ["vayeira", "vayera", "וירא"] },
    { id: "chayei sarah", display: "חיי שרה", alts: ["chayei sarah", "chayeisarah", "chaye sara", "חיי שרה"] },
    { id: "toldos", display: "תולדות", alts: ["toldos", "toldot", "תולדות"] },
    { id: "vayetzei", display: "ויצא", alts: ["vayetzei", "vayetze", "vayeczei", "ויצא"] },
    { id: "vayishlach", display: "וישלח", alts: ["vayishlach", "vayishlah", "וישלח"] },
    { id: "vayeshev", display: "וישב", alts: ["vayeshev", "וישב"] },
    { id: "miketz", display: "מקץ", alts: ["miketz", "mikeitz", "מקץ"] },
    { id: "vayigash", display: "ויגש", alts: ["vayigash", "ויגש"] },
    { id: "vayechi", display: "ויחי", alts: ["vayechi", "vayechi", "ויחי"] },

    // --- SHEMOS ---
    { id: "shemos", display: "שמות", alts: ["shemos", "shemot", "exodus", "שמות"] },
    { id: "vaera", display: "וארא", alts: ["vaera", "va'era", "va-era", "וארא"] },
    { id: "bo", display: "בא", alts: ["bo", "בא"] },
    { id: "beshalach", display: "בשלח", alts: ["beshalach", "beshalah", "בשלח"] },
    { id: "yisro", display: "יתרו", alts: ["yisro", "yitro", "יתרו"] },
    { id: "mishpatim", display: "משפטים", alts: ["mishpatim", "משפטים"] },
    { id: "terumah", display: "תרומה", alts: ["terumah", "trumah", "תרומה"] },
    { id: "tetzaveh", display: "תצוה", alts: ["tetzaveh", "tetzave", "tetsaveh", "תצוה"] },
    { id: "ki tisa", display: "כי תשא", alts: ["ki tisa", "kitisa", "ki-tisa", "כי תשא"] },
    { id: "vayakhel", display: "ויקהל", alts: ["vayakhel", "vayakhhel", "ויקהל"] },
    { id: "pekudei", display: "פקודי", alts: ["pekudei", "pekudey", "פקודי"] },

    // --- VAYIKRA ---
    { id: "vayikra", display: "ויקרא", alts: ["vayikra", "leviticus", "ויקרא"] },
    { id: "tzav", display: "צו", alts: ["tzav", "zav", "צו"] },
    { id: "shemini", display: "שמיני", alts: ["shemini", "shmini", "שמיני"] },
    { id: "tazria", display: "תזריע", alts: ["tazria", "תזריע"] },
    { id: "metzora", display: "מצורע", alts: ["metzora", "metsora", "מצורע"] },
    { id: "acharei mos", display: "אחרי מות", alts: ["acharei mos", "acharei mot", "acharei", "אחרי מות"] },
    { id: "kedoshim", display: "קדושים", alts: ["kedoshim", "kdoshim", "קדושים"] },
    { id: "emor", display: "אמור", alts: ["emor", "אמור"] },
    { id: "behar", display: "בהר", alts: ["behar", "bahar", "בהר"] },
    { id: "bechukosai", display: "בחוקותי", alts: ["bechukosai", "bechukotai", "bechukosay", "בחוקותי"] },

    // --- BAMIDBAR ---
    { id: "bamidbar", display: "במדבר", alts: ["bamidbar", "numbers", "במדבר"] },
    { id: "nasso", display: "נשא", alts: ["nasso", "naso", "נשא"] },
    { id: "behaaloscha", display: "בהעלותך", alts: ["behaaloscha", "behaalotecha", "behaalotcha", "beha'aloscha", "בהעלותך"] },
    { id: "shlach", display: "שלח", alts: ["shlach", "shelach", "shlach lecha", "שלח"] },
    { id: "korach", display: "קרח", alts: ["korach", "korah", "קרח"] },
    { id: "chukas", display: "חוקת", alts: ["chukas", "chukat", "hukat", "חוקת"] },
    { id: "balak", display: "בלק", alts: ["balak", "בלק"] },
    { id: "pinchas", display: "פינחס", alts: ["pinchas", "pinhas", "פינחס"] },
    { id: "mattos", display: "מטות", alts: ["mattos", "matot", "מטות"] },
    { id: "masei", display: "מסעי", alts: ["masei", "massei", "מסעי"] },

    // --- DEVARIM ---
    { id: "devarim", display: "דברים", alts: ["devarim", "deuteronomy", "דברים"] },
    { id: "vaeschanan", display: "ואתחנן", alts: ["vaeschanan", "vaetchanan", "va'etchanan", "ואתחנן"] },
    { id: "eikev", display: "עקב", alts: ["eikev", "ekev", "עקב"] },
    { id: "reeh", display: "ראה", alts: ["reeh", "re'eh", "re-eh", "ראה"] },
    { id: "shoftim", display: "שופטים", alts: ["shoftim", "shofetim", "שופטים"] },
    { id: "ki teitzei", display: "כי תצא", alts: ["ki teitzei", "ki tetzai", "ki tetze", "כי תצא"] },
    { id: "ki tavo", display: "כי תבוא", alts: ["ki tavo", "ki tavo", "ki-tavo", "כי תבוא"] },
    { id: "nitzavim", display: "נצבים", alts: ["nitzavim", "nitsavim", "נצבים"] },
    { id: "vayelech", display: "וילך", alts: ["vayelech", "vayeilech", "וילך"] },
    { id: "haazinu", display: "האזינו", alts: ["haazinu", "ha'azinu", "האזינו"] },
    { id: "vezos haberachah", display: "וזאת הברכה", alts: ["vezos haberachah", "vezot haberacha", "v'zot haberacha", "vezos", "vezot", "וזאת הברכה"] }
];
// 5 Columns for the 5 Books
const COLUMN_SIZES = [12, 11, 10, 10, 11];
const TITLES = ["בראשית", "שמות", "ויקרא", "במדבר", "דברים"];

let correctAnswers = new Set();
let timeRemaining = 6 * 60 + 13; // 6 minutes and 13 seconds
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
            if (parshaIndex < PARSHAS.length) {
                const data = PARSHAS[parshaIndex];

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
    const match = PARSHAS.find(p => p.alts.includes(userInput));

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
            scoreDisplay.textContent = `${correctAnswers.size} / ${PARSHAS.length}`;

            if (correctAnswers.size === PARSHAS.length) endGame(true);
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
    document.getElementById('score').textContent = `0 / ${PARSHAS.length}`;
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

        PARSHAS.forEach(p => {
            // Check if ID is in correctAnswers
            if (!correctAnswers.has(p.id)) {
                const slot = document.querySelector(`.answer-slot[data-name="${p.id}"]`);
                if (slot) slot.classList.add('missed');
            }
        });
    }
}

initGame();