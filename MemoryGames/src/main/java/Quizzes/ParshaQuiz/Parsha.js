// --- 1. Data Setup ---
// The 54 Parshas in order
const PARSHAS = [
    {display: "בראשית", alts: ["בראשית","bereishis", "bereshit", "breishis", "breshis"]},
    {display: "נח", alts: ["noach", "נח"]},
    {display: "לך לך", alts: ["lech lecha", "lechlecha", "lech-lecha", "לך לך"]},
    {display: "וירא", alts: ["vayeira", "vayera", "וירא"]},
    {display: "חיי שרה", alts: ["chayei sarah", "חיי שרה", "chayei sara", "chaye sara"]},
    {display: "תולדות", alts: ["toldos", "toldot", "תולדות"]},
    {display: "ויצא", alts: ["vayetzei", "vayetze", "ויצא"]},
    {display: "וישלח", alts: ["vayishlach", "וישלח"]},
    {display: "וישב", alts: ["vayeshev", "וישב"]},
    {display: "מקץ", alts: ["miketz", "mikeitz", "מקץ"]},
    {display: "ויגש", alts: ["vayigash", "ויגש"]},
    {display: "ויחי", alts: ["vayechi", "ויחי"]},

    { display: "שמות", alts: ["shemos", "shemot", "שמות"] },
    { display: "וארא", alts: ["vaera", "וארא"] },
    { display: "בא", alts: ["bo", "בא"] },
    { display: "בשלח", alts: ["beshalach", "בשלח"] },
    { display: "יתרו", alts: ["yisro", "yitro", "יתרו"] },
    { display: "משפטים", alts: ["mishpatim", "משפטים"] },
    { display: "תרומה", alts: ["terumah", "trumah", "תרומה"] },
    { display: "תצוה", alts: ["tetzaveh", "tetzave", "תצוה"] },
    { display: "כי תשא", alts: ["ki tisa", "כי תשא"] },
    { display: "ויקהל", alts: ["vayakhel", "ויקהל"] },
    { display: "פקודי", alts: ["pekudei", "pekudey", "פקודי"] },

    { display: "ויקרא", alts: ["vayikra", ""] },
    { display: "צו", alts: ["tzav", "צו"] },
    { display: "שמיני", alts: ["shemini", "שמיני"] },
    { display: "תזריע", alts: ["tazria", "תזריע"] },
    { display: "מצורע", alts: ["metzora", "מצורע"] },
    { display: "אחרי מות", alts: ["acharei mos", "acharei mot", "אחרי מות"] },
    { display: "קדושים", alts: ["kedoshim", "קדושים"] },
    { display: "אמור", alts: ["emor", "אמור"] },
    { display: "בהר", alts: ["behar", "בהר"] },
    { display: "בחוקתי", alts: ["bechukosai", "בחוקתי", "bechukotai"] },

    { display: "במדבר", alts: ["bamidbar", "במדבר"] },
    { display: "נשא", alts: ["nasso", "naso", "נשא"] },
    { display: "בהעלותך", alts: ["behaaloscha", "בהעלותך", "behaalotecha"] },
    { display: "שלח", alts: ["shlach", "shelach", "שלח"] },
    { display: "קרח", alts: ["korach", "קרח"] },
    { display: "חוקת", alts: ["chukas", "chukat", "חוקת"] },
    { display: "בלק", alts: ["balak", "בלק"] },
    { display: "פנחס", alts: ["pinchas", "פנחס"] },
    { display: "מטות", alts: ["mattos", "matot", "מטות"] },
    { display: "מעסי", alts: ["masei", "מעסי"] },

    { display: "דברים", alts: ["devarim", "דברים"] },
    { display: "ואתחנן", alts: ["vaeschanan", "vaetchanan", "ואתחנן"] },
    { display: "עקב", alts: ["eikev", "עקב"] },
    { display: "ראה", alts: ["reeh", "re'eh", "ראה"] },
    { display: "שופטים", alts: ["shoftim", "שופחים"] },
    { display: "כי תצא", alts: ["ki teitzei", "ki tetzai", "כי תצא"] },
    { display: "כי תבוא", alts: ["ki tavo", "כי תבוא"] },
    { display: "נצבים", alts: ["nitzavim", "נצבים"] },
    { display: "וילך", alts: ["vayelech", "וילך"] },
    { display: "האזינו", alts: ["haazinu", "האזינו"] },
    { display: "וזאת הברכה", alts: ["vezos haberachah", "vezot haberacha", "וזאת הברכה"] }
];

// 5 Columns for the 5 Books
const COLUMN_SIZES = [12, 11, 10, 10, 11];
const TITLES = ["בראשית", "שמות", "ויקרא", "במדבר", "דברים"];

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