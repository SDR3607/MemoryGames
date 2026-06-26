// --- 1. Data Setup (Copied from your Java Code) ---
const MELACHOS = [
    // --- ORDER OF BREAD (Field to Oven) ---
    { id: "zorea", display: "זורע", alts: ["zorea", "zore'a", "sowing", "planting", "זורע"] },
    { id: "choresh", display: "חורש", alts: ["choresh", "plowing", "חורש"] },
    { id: "kotzer", display: "קוצר", alts: ["kotzer", "reaping", "harvesting", "קוצר"] },
    { id: "meamer", display: "מעמר", alts: ["meamer", "me'amer", "gathering", "מעמר"] },
    { id: "dosh", display: "דש", alts: ["dosh", "threshing", "דש"] },
    { id: "zoreh", display: "זורה", alts: ["zoreh", "winnowing", "זורה"] },
    { id: "borer", display: "בורר", alts: ["borer", "sorting", "selecting", "בורר"] },
    { id: "tochen", display: "טוחן", alts: ["tochen", "grinding", "טוחן"] },
    { id: "meraked", display: "מרקד", alts: ["meraked", "sifting", "מרקד"] },
    { id: "lash", display: "לש", alts: ["lash", "kneading", "לש"] },
    { id: "ofeh", display: "אופה", alts: ["ofeh", "baking", "cooking", "mavashel", "אופה", "מבשל"] },

    // --- ORDER OF GARMENTS (Wool to Clothing) ---
    { id: "gozez", display: "גוזז", alts: ["gozez", "shearing", "גוזז"] },
    { id: "melaben", display: "מלבן", alts: ["melaben", "bleaching", "washing", "scouring", "מלבן"] },
    { id: "menapetz", display: "מנפץ", alts: ["menapetz", "combing", "beating", "מנפץ"] },
    { id: "tzovea", display: "צובע", alts: ["tzovea", "tzove'a", "dyeing", "צובע"] },
    { id: "toveh", display: "טווה", alts: ["toveh", "spinning", "טווה"] },
    { id: "meisach", display: "מיסך", alts: ["meisach", "warping", "stretching", "מיסך"] },
    { id: "oseh_nir", display: "עושה שני בתי נירין", alts: ["oseh batei nirin", "oseh nir", "harnessing", "עושה שני בתי נירין", "עושה בתי נירין"] },
    { id: "oreg", display: "אורג", alts: ["oreg", "weaving", "אורג"] },
    { id: "potzea", display: "פוצע", alts: ["potzea", "potze'a", "severing", "removing threads", "פוצע"] },
    { id: "kosher", display: "קושר", alts: ["kosher", "tying", "קושר"] },
    { id: "matir", display: "מתיר", alts: ["matir", "untying", "מתיר"] },
    { id: "tofer", display: "תופר", alts: ["tofer", "sewing", "תופר"] },
    { id: "korea", display: "קורע", alts: ["korea", "kore'a", "tearing", "קורע"] },

    // --- ORDER OF HIDES & WRITING (Trap to Book) ---
    { id: "tzad", display: "צד", alts: ["tzad", "trapping", "hunting", "צד"] },
    { id: "shochet", display: "שוחט", alts: ["shochet", "slaughtering", "שוחט"] },
    { id: "mafshit", display: "מפשיט", alts: ["mafshit", "flaying", "skinning", "מפשיט"] },
    { id: "meabed", display: "מעבד", alts: ["meabed", "me'abed", "tanning", "מעבד"] },
    { id: "memachek", display: "ממחק", alts: ["memachek", "smoothing", "scraping", "ממחק"] },
    { id: "mesartet", display: "משרטט", alts: ["mesartet", "scoring", "ruling", "משרטט"] },
    { id: "mechatech", display: "מחתך", alts: ["mechatech", "cutting", "מחתך"] },
    { id: "kotev", display: "כותב", alts: ["kotev", "writing", "כותב"] },
    { id: "mochek", display: "מוחק", alts: ["mochek", "erasing", "מוחק"] },

    // --- CONSTRUCTION & FINAL TOUCHES ---
    { id: "boneh", display: "בונה", alts: ["boneh", "building", "בונה"] },
    { id: "soser", display: "סותר", alts: ["soser", "soter", "demolishing", "destroying", "סותר"] },
    { id: "mavir", display: "מבעיר", alts: ["mavir", "mav'ir", "igniting", "kindling", "lighting", "מבעיר"] },
    { id: "mechabeh", display: "מכבה", alts: ["mechabeh", "extinguishing", "מכבה"] },
    { id: "makeh_bapatish", display: "מכה בפטיש", alts: ["makeh bapatish", "makeh b'patish", "striking the final blow", "finishing", "מכה בפטיש"] },
    { id: "hotzaah", display: "הוצאה", alts: ["hotzaah", "hotza'ah", "carrying", "transferring", "הוצאה", "מוציא מרשות לרשות"] }
];
const COLUMN_SIZES = [11, 13, 9, 6];
const TITLES = ["סידור דפת", "סידור דבגד", "סידור דעור", "בניין והוצאה"];

let correctAnswers = new Set();
let timeRemaining = 5 * 60; // 5 minutes
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
            if (tractateIndex < MELACHOS.length) {
                // Get the object
                const data = MELACHOS[tractateIndex];

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
    const match = MELACHOS.find(t => t.alts.includes(userInput));

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

            scoreDisplay.textContent = `${correctAnswers.size} / ${MELACHOS.length}`;

            if (correctAnswers.size === MELACHOS.length) {
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
    document.getElementById('score').textContent = `0 / ${MELACHOS.length}`;
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

        MELACHOS.forEach(t => {
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