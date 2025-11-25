// --- 1. Data Setup (Copied from your Java Code) ---
const TRACTATES = [
    // --- ZERAIM ---
    { id: "brachos", display: "ברכות", alts: ["brachos", "berachot", "brakhot", "ברכות"] },
    { id: "peah", display: "פאה", alts: ["peah", "pea", "פאה"] },
    { id: "demai", display: "דמאי", alts: ["demai", "dmai", "דמאי"] },
    { id: "kilayim", display: "כלאיים", alts: ["kilayim", "kilaim", "כלאיים", "כלאים"] },
    { id: "sheviis", display: "שביעית", alts: ["sheviis", "sheviit", "shviis", "שביעית"] },
    { id: "terumos", display: "תרומות", alts: ["terumos", "terumot", "trumos", "תרומות"] },
    { id: "maaseros", display: "מעשרות", alts: ["maaseros", "maaserot", "maasrot", "מעשרות"] },
    { id: "maaser sheni", display: "מעשר שני", alts: ["maaser sheni", "maaser sheni", "מעשר שני"] },
    { id: "challah", display: "חלה", alts: ["challah", "chala", "halla", "חלה"] },
    { id: "orlah", display: "ערלה", alts: ["orlah", "orla", "ערלה"] },
    { id: "bikkurim", display: "ביכורים", alts: ["bikkurim", "bikurim", "ביכורים"] },

    // --- MOED ---
    { id: "shabbos", display: "שבת", alts: ["shabbos", "shabbat", "shabbes", "שבת"] },
    { id: "eruvin", display: "עירובין", alts: ["eruvin", "eiruvin", "עירובין"] },
    { id: "pesachim", display: "פסחים", alts: ["pesachim", "pesahim", "פסחים"] },
    { id: "shekalim", display: "שקלים", alts: ["shekalim", "shkalim", "שקלים"] },
    { id: "yoma", display: "יומא", alts: ["yoma", "yuma", "יומא"] },
    { id: "sukkah", display: "סוכה", alts: ["sukkah", "sukka", "sucah", "סוכה"] },
    { id: "beitzah", display: "ביצה", alts: ["beitzah", "beitza", "betsa", "ביצה"] },
    { id: "rosh hashanah", display: "ראש השנה", alts: ["rosh hashanah", "rosh hashana", "ראש השנה"] },
    { id: "taanis", display: "תענית", alts: ["taanis", "taanit", "תענית"] },
    { id: "megillah", display: "מגילה", alts: ["megillah", "megila", "מגילה"] },
    { id: "moed katan", display: "מועד קטן", alts: ["moed katan", "moed katan", "מועד קטן"] },
    { id: "chagigah", display: "חגיגה", alts: ["chagigah", "chagiga", "hagigah", "חגיגה"] },

    // --- NASHIM ---
    { id: "yevamos", display: "יבמות", alts: ["yevamos", "yevamot", "יבמות"] },
    { id: "kesubos", display: "כתובות", alts: ["kesubos", "ketubot", "kesuvos", "כתובות"] },
    { id: "nedarim", display: "נדרים", alts: ["nedarim", "נדרים"] },
    { id: "nazir", display: "נזיר", alts: ["nazir", "נזיר"] },
    { id: "sotah", display: "סוטה", alts: ["sotah", "sota", "סוטה"] },
    { id: "gittin", display: "גיטין", alts: ["gittin", "gitin", "גיטין"] },
    { id: "kiddushin", display: "קידושין", alts: ["kiddushin", "kidushin", "קידושין"] },

    // --- NEZIKIN ---
    { id: "bava kama", display: "בבא קמא", alts: ["bava kama", "bava kamma", "bk", "בבא קמא"] },
    { id: "bava metzia", display: "בבא מציעא", alts: ["bava metzia", "bava metzia", "bm", "בבא מציעא"] },
    { id: "bava basra", display: "בבא בתרא", alts: ["bava basra", "bava batra", "bb", "בבא בתרא"] },
    { id: "sanhedrin", display: "סנהדרין", alts: ["sanhedrin", "sanhedrin", "סנהדרין"] },
    { id: "makkos", display: "מכות", alts: ["makkos", "makot", "makkot", "מכות"] },
    { id: "shevuos", display: "שבועות", alts: ["shevuos", "shevuot", "shvuos", "שבועות"] },
    { id: "eduyos", display: "עדיות", alts: ["eduyos", "eduyot", "ediyot", "עדיות"] },
    { id: "avodah zarah", display: "עבודה זרה", alts: ["avodah zarah", "avoda zara", "az", "עבודה זרה"] },
    { id: "avos", display: "אבות", alts: ["avos", "avot", "pirkei avos", "אבות"] },
    { id: "horayos", display: "הוריות", alts: ["horayos", "horayot", "הוריות"] },

    // --- KODSHIM ---
    { id: "zevachim", display: "זבחים", alts: ["zevachim", "zevahim", "זבחים"] },
    { id: "menachos", display: "מנחות", alts: ["menachos", "menachot", "menahot", "מנחות"] },
    { id: "chullin", display: "חולין", alts: ["chullin", "chulin", "חולין"] },
    { id: "bechoros", display: "בכורות", alts: ["bechoros", "bechorot", "bekhorot", "בכורות"] },
    { id: "arachin", display: "ערכין", alts: ["arachin", "arakhin", "ערכין"] },
    { id: "temurah", display: "תמורה", alts: ["temurah", "temura", "תמורה"] },
    { id: "kerisos", display: "כריתות", alts: ["kerisos", "keritot", "kritos", "כריתות"] },
    { id: "meilah", display: "מעילה", alts: ["meilah", "meila", "מעילה"] },
    { id: "tamid", display: "תמיד", alts: ["tamid", "תמיד"] },
    { id: "middos", display: "מידות", alts: ["middos", "midot", "middot", "מידות"] },
    { id: "kinim", display: "קינים", alts: ["kinim", "kinnim", "קינים"] },

    // --- TAHAROS ---
    { id: "keilim", display: "כלים", alts: ["keilim", "kelim", "כלים"] },
    { id: "oholos", display: "אוהלות", alts: ["oholos", "oholot", "ahilot", "אוהלות"] },
    { id: "negaim", display: "נגעים", alts: ["negaim", "nega'im", "נגעים"] },
    { id: "parah", display: "פרה", alts: ["parah", "para", "פרה"] },
    { id: "tohoros", display: "טהרות", alts: ["tohoros", "tohorot", "taharos", "טהרות"] },
    { id: "mikvaos", display: "מקואות", alts: ["mikvaos", "mikvaot", "mikvaos", "מקואות"] },
    { id: "niddah", display: "נידה", alts: ["niddah", "nida", "nidda", "נידה"] },
    { id: "machshirin", display: "מכשירין", alts: ["machshirin", "makhshirin", "מכשירין"] },
    { id: "zavim", display: "זבים", alts: ["zavim", "זבים"] },
    { id: "tevul yom", display: "טבול יום", alts: ["tevul yom", "tvul yom", "טבול יום"] },
    { id: "yadayim", display: "ידיים", alts: ["yadayim", "yadaim", "ידיים"] },
    { id: "uktzim", display: "עוקצים", alts: ["uktzim", "uktsim", "oktzim", "עוקצים"] }
];
const COLUMN_SIZES = [11, 12, 7, 10, 11, 12];
const TITLES = ["זרעים", "מעוד", "נשים", "נזיקין", "קדשים", "טהרות"];

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
            if (tractateIndex < TRACTATES.length) {
                // Get the object
                const data = TRACTATES[tractateIndex];

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
    const match = TRACTATES.find(t => t.alts.includes(userInput));

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

            scoreDisplay.textContent = `${correctAnswers.size} / ${TRACTATES.length}`;

            if (correctAnswers.size === TRACTATES.length) {
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
    document.getElementById('score').textContent = `0 / ${TRACTATES.length}`;
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

        TRACTATES.forEach(t => {
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