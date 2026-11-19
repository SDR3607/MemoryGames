class MelachosQuiz {
    constructor(options = {}) {
        this.boardId = options.boardId || 'game-board';
        this.timerId = options.timerId || 'timer';
        this.controlBtnId = options.controlBtnId || 'control-btn';
        this.inputId = options.inputId || 'answer-input';
        this.messageId = options.messageId || 'message';
        this.scoreId = options.scoreId || 'score';
        this.defaultTimeSeconds = options.defaultTimeSeconds || (6 * 60) + 13;

        this.melachos = [
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

        this.columnSizes = [11, 13, 9, 6];
        this.titles = ["סידור דפת", "סידור דבגד", "סידור דעור", "בניין והוצאה"];

        this.correctAnswers = new Set();
        this.timeRemaining = this.defaultTimeSeconds;
        this.timerInterval = null;
        this.gameActive = false;

        this.boardEl = document.getElementById(this.boardId);
        this.timerEl = document.getElementById(this.timerId);
        this.controlBtn = document.getElementById(this.controlBtnId);
        this.inputField = document.getElementById(this.inputId);
        this.messageBox = document.getElementById(this.messageId);
        this.scoreDisplay = document.getElementById(this.scoreId);
    }

    normalizeInput(value) {
        return value
            .trim()
            .toLowerCase()
            .replace(/['’`´׳״-]/g, "")
            .replace(/\s+/g, " ");
    }

    matchesMelacha(melacha, rawInput) {
        const normalized = this.normalizeInput(rawInput);
        if (!normalized) return false;
        return melacha.alts.some(alt => this.normalizeInput(alt) === normalized);
    }

    formatTime(secondsTotal) {
        const minutes = Math.floor(secondsTotal / 60);
        const seconds = secondsTotal % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    initGame() {
        if (!this.boardEl) return;
        this.boardEl.innerHTML = "";
        this.timerEl.textContent = this.formatTime(this.timeRemaining);
        this.scoreDisplay.textContent = `0 / ${this.melachos.length}`;

        let melachaIndex = 0;
        for (let i = 0; i < this.columnSizes.length; i++) {
            const columnDiv = document.createElement('div');
            columnDiv.className = 'seder-column';

            const title = document.createElement('div');
            title.className = 'seder-title';
            title.textContent = this.titles[i];
            columnDiv.appendChild(title);

            const size = this.columnSizes[i];
            for (let j = 0; j < size; j++) {
                if (melachaIndex < this.melachos.length) {
                    const data = this.melachos[melachaIndex];
                    const slot = document.createElement('div');
                    slot.className = 'tractate-slot';
                    slot.textContent = data.display;
                    slot.setAttribute('data-name', data.id);
                    columnDiv.appendChild(slot);
                    melachaIndex++;
                }
            }
            this.boardEl.appendChild(columnDiv);
        }

        this.bindEvents();
    }

    bindEvents() {
        if (this._eventsBound) return;
        this._eventsBound = true;

        this.inputField.addEventListener('input', () => {
            if (!this.gameActive) return;

            const match = this.melachos.find(m => this.matchesMelacha(m, this.inputField.value));
            if (!match) return;

            if (this.correctAnswers.has(match.id)) {
                this.messageBox.textContent = "Already found that one!";
                this.messageBox.style.color = "#d97706";
            } else {
                this.correctAnswers.add(match.id);
                this.revealAnswer(match.id);
                this.inputField.value = "";
                this.messageBox.textContent = `Nice! Found ${match.display}.`;
                this.messageBox.style.color = "#15803d";
                this.scoreDisplay.textContent = `${this.correctAnswers.size} / ${this.melachos.length}`;

                if (this.correctAnswers.size === this.melachos.length) {
                    this.endGame(true);
                }
            }
        });

        this.controlBtn.addEventListener('click', () => {
            if (this.gameActive) {
                this.endGame(false);
            } else {
                this.startGame();
            }
        });
    }

    startTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            if (!this.gameActive) return;
            this.timeRemaining--;
            this.timerEl.textContent = this.formatTime(Math.max(0, this.timeRemaining));

            if (this.timeRemaining <= 0) {
                this.endGame(false);
            }
        }, 1000);
    }

    startGame() {
        this.gameActive = true;
        this.correctAnswers.clear();
        this.timeRemaining = this.defaultTimeSeconds;

        this.timerEl.style.color = "";
        this.timerEl.textContent = this.formatTime(this.timeRemaining);
        this.scoreDisplay.textContent = `0 / ${this.melachos.length}`;
        this.messageBox.textContent = "Clock is ticking — start typing!";
        this.messageBox.style.color = "#334155";
        this.inputField.value = "";
        this.inputField.disabled = false;
        this.inputField.focus();

        this.controlBtn.textContent = "Give Up";
        this.controlBtn.classList.add('give-up');

        document.querySelectorAll('.tractate-slot').forEach(slot => {
            slot.classList.remove('revealed', 'missed');
        });

        this.startTimer();
    }

    revealAnswer(id) {
        const slot = this.boardEl.querySelector(`.tractate-slot[data-name="${id}"]`);
        if (slot) {
            slot.classList.add('revealed');
        }
    }

    endGame(won) {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        this.inputField.disabled = true;

        this.controlBtn.textContent = "Play Again";
        this.controlBtn.classList.remove('give-up');

        if (won) {
            this.messageBox.textContent = "MAZEL TOV! You named all 39 Melachos!";
            this.messageBox.style.color = "#15803d";
            this.timerEl.style.color = "#15803d";
        } else {
            this.messageBox.textContent = this.timeRemaining <= 0 ? "Time's up!" : "Round ended — missed items shown in red.";
            this.messageBox.style.color = "#dc2626";

            this.melachos.forEach(item => {
                if (!this.correctAnswers.has(item.id)) {
                    const slot = this.boardEl.querySelector(`.tractate-slot[data-name="${item.id}"]`);
                    if (slot) {
                        slot.classList.add('missed');
                    }
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const quiz = new MelachosQuiz();
    quiz.initGame();
});