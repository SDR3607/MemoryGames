class MishnehTorahBooksQuiz {
    constructor(options = {}) {
        this.boardId = options.boardId || 'game-board';
        this.timerId = options.timerId || 'timer';
        this.controlBtnId = options.controlBtnId || 'control-btn';
        this.inputId = options.inputId || 'answer-input';
        this.messageId = options.messageId || 'message';
        this.scoreId = options.scoreId || 'score';
        this.defaultTimeSeconds = options.defaultTimeSeconds || 2 * 60;

        this.books = [
            { id: "madda", display: "ספר המדע", alts: ["madda", "mada", "hamadda", "sefer madda", "sefer hamadda", "knowledge", "book of knowledge", "מדע", "המדע", "ספר המדע"] },
            { id: "ahavah", display: "ספר אהבה", alts: ["ahavah", "ahava", "sefer ahavah", "sefer ahava", "love", "book of love", "אהבה", "ספר אהבה"] },
            { id: "zmanim", display: "ספר זמנים", alts: ["zmanim", "zemanim", "sefer zmanim", "sefer zemanim", "seasons", "times", "book of seasons", "book of times", "זמנים", "ספר זמנים"] },
            { id: "nashim", display: "ספר נשים", alts: ["nashim", "sefer nashim", "women", "book of women", "נשים", "ספר נשים"] },
            { id: "kedushah", display: "ספר קדושה", alts: ["kedushah", "kedusha", "sefer kedushah", "sefer kedusha", "holiness", "book of holiness", "קדושה", "ספר קדושה"] },
            { id: "haflaah", display: "ספר הפלאה", alts: ["haflaah", "hafla'ah", "haflah", "sefer haflaah", "sefer hafla'ah", "separation", "vows", "book of separation", "הפלאה", "ספר הפלאה"] },
            { id: "zeraim", display: "ספר זרעים", alts: ["zeraim", "zera'im", "zraim", "sefer zeraim", "sefer zera'im", "seeds", "book of seeds", "זרעים", "ספר זרעים"] },
            { id: "avodah", display: "ספר עבודה", alts: ["avodah", "avoda", "sefer avodah", "sefer avoda", "service", "temple service", "book of temple service", "עבודה", "ספר עבודה"] },
            { id: "korbanos", display: "ספר קורבנות", alts: ["korbanos", "korbanot", "sefer korbanos", "sefer korbanot", "offerings", "sacrifices", "book of offerings", "קורבנות", "קרבנות", "ספר קורבנות", "ספר קרבנות"] },
            { id: "taharah", display: "ספר טהרה", alts: ["taharah", "tahara", "sefer taharah", "sefer tahara", "purity", "ritual purity", "book of purity", "טהרה", "ספר טהרה"] },
            { id: "nezikin", display: "ספר נזיקין", alts: ["nezikin", "nezikim", "sefer nezikin", "sefer nezikim", "damages", "torts", "book of damages", "נזיקין", "ספר נזיקין"] },
            { id: "kinyan", display: "ספר קניין", alts: ["kinyan", "sefer kinyan", "acquisition", "acquisitions", "book of acquisition", "קניין", "קנין", "ספר קניין", "ספר קנין"] },
            { id: "mishpatim", display: "ספר משפטים", alts: ["mishpatim", "sefer mishpatim", "judgments", "civil laws", "book of judgments", "משפטים", "ספר משפטים"] },
            { id: "shoftim", display: "ספר שופטים", alts: ["shoftim", "sefer shoftim", "judges", "book of judges", "שופטים", "ספר שופטים"] }
        ];

        this.columnSizes = [7, 7];
        this.titles = ["Books 1–7 • ספרים א–ז", "Books 8–14 • ספרים ח–יד"];

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

    matchesBook(book, rawInput) {
        const normalized = this.normalizeInput(rawInput);
        if (!normalized) return false;
        return book.alts.some(alt => this.normalizeInput(alt) === normalized);
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
        this.scoreDisplay.textContent = `0 / ${this.books.length}`;

        let bookIndex = 0;
        for (let i = 0; i < this.columnSizes.length; i++) {
            const columnDiv = document.createElement('div');
            columnDiv.className = 'seder-column';

            const title = document.createElement('div');
            title.className = 'seder-title';
            title.textContent = this.titles[i];
            columnDiv.appendChild(title);

            const size = this.columnSizes[i];
            for (let j = 0; j < size; j++) {
                if (bookIndex < this.books.length) {
                    const data = this.books[bookIndex];
                    const slot = document.createElement('div');
                    slot.className = 'tractate-slot';
                    slot.textContent = data.display;
                    slot.setAttribute('data-name', data.id);
                    columnDiv.appendChild(slot);
                    bookIndex++;
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

            const match = this.books.find(b => this.matchesBook(b, this.inputField.value));
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
                this.scoreDisplay.textContent = `${this.correctAnswers.size} / ${this.books.length}`;

                if (this.correctAnswers.size === this.books.length) {
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
        this.scoreDisplay.textContent = `0 / ${this.books.length}`;
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
            this.messageBox.textContent = "MAZEL TOV! All 14 books named!";
            this.messageBox.style.color = "#15803d";
            this.timerEl.style.color = "#15803d";
        } else {
            this.messageBox.textContent = this.timeRemaining <= 0 ? "Time's up!" : "Round ended — missed items shown in red.";
            this.messageBox.style.color = "#dc2626";

            this.books.forEach(b => {
                if (!this.correctAnswers.has(b.id)) {
                    const slot = this.boardEl.querySelector(`.tractate-slot[data-name="${b.id}"]`);
                    if (slot) {
                        slot.classList.add('missed');
                    }
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const quiz = new MishnehTorahBooksQuiz();
    quiz.initGame();
});