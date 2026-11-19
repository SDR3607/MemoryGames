class TanachQuiz {
    constructor(options = {}) {
        this.boardId = options.boardId || 'game-board';
        this.timerId = options.timerId || 'timer';
        this.controlBtnId = options.controlBtnId || 'control-btn';
        this.inputId = options.inputId || 'answer-input';
        this.messageId = options.messageId || 'message';
        this.scoreId = options.scoreId || 'score';
        this.defaultTimeSeconds = options.defaultTimeSeconds || 3 * 60;

        this.sections = [
            {
                title: "תורה (Torah)",
                books: [
                    { id: "bereishis", display: "בראשית", alts: ["bereishis", "bereshit", "genesis", "בראשית"] },
                    { id: "shemos", display: "שמות", alts: ["shemos", "shemot", "exodus", "שמות"] },
                    { id: "vayikra", display: "ויקרא", alts: ["vayikra", "leviticus", "ויקרא"] },
                    { id: "bamidbar", display: "במדבר", alts: ["bamidbar", "numbers", "במדבר"] },
                    { id: "devarim", display: "דברים", alts: ["devarim", "deuteronomy", "דברים"] }
                ]
            },
            {
                title: "נביאים (Neviim)",
                books: [
                    { id: "yehoshua", display: "יהושע", alts: ["yehoshua", "joshua", "יהושע"] },
                    { id: "shoftim", display: "שופטים", alts: ["shoftim", "judges", "שופטים"] },
                    { id: "shmuel", display: "שמואל", alts: ["shmuel", "samuel", "1 and 2 samuel", "שמואל"] },
                    { id: "melachim", display: "מלכים", alts: ["melachim", "melachim", "kings", "1 and 2 kings", "מלכים"] },
                    { id: "yeshayahu", display: "ישעיהו", alts: ["yeshayahu", "yeshayah", "isaiah", "ישעיהו", "ישעיה"] },
                    { id: "yirmiyahu", display: "ירמיהו", alts: ["yirmiyahu", "yirmiyah", "jeremiah", "ירמיהו", "ירמיה"] },
                    { id: "yechezkel", display: "יחזקאל", alts: ["yechezkel", "yehezkel", "ezekiel", "יחזקאל"] },
                    { id: "trei_asar", display: "תרי עשר", alts: ["trei asar", "trei asar", "twelve minor prophets", "minor prophets", "תרי עשר", "תריסר"] }
                ]
            },
            {
                title: "כתובים (Kesuvim)",
                books: [
                    { id: "tehillim", display: "תהילים", alts: ["tehillim", "tehilim", "psalms", "תהילים", "תהלים"] },
                    { id: "mishlei", display: "משלי", alts: ["mishlei", "proverbs", "משלי"] },
                    { id: "iyov", display: "איוב", alts: ["iyov", "job", "איוב"] },
                    { id: "shir_hashirim", display: "שיר השירים", alts: ["shir hashirim", "song of songs", "song of solomon", "שיר השירים"] },
                    { id: "rus", display: "רות", alts: ["rus", "rut", "ruth", "רות"] },
                    { id: "eichah", display: "איכה", alts: ["eichah", "eicha", "lamentations", "איכה"] },
                    { id: "koheles", display: "קהלת", alts: ["koheles", "kohelet", "ecclesiastes", "קהלת"] },
                    { id: "esther", display: "אסתר", alts: ["esther", "ester", "אסתר"] },
                    { id: "daniel", display: "דניאל", alts: ["daniel", "דניאל"] },
                    { id: "ezra_nechemyah", display: "עזרא ונחמיה", alts: ["ezra", "nechemyah", "nehemiah", "ezra nehemiah", "עזרא", "נחמיה", "עזרא ונחמיה"] },
                    { id: "divrei_hayamim", display: "דברי הימים", alts: ["divrei hayamim", "chronicles", "1 and 2 chronicles", "דברי הימים"] }
                ]
            }
        ];

        this.allBooks = this.sections.flatMap(s => s.books);
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
        this.scoreDisplay.textContent = `0 / ${this.allBooks.length}`;

        this.sections.forEach(section => {
            const columnDiv = document.createElement('div');
            columnDiv.className = 'seder-column';

            const title = document.createElement('div');
            title.className = 'seder-title';
            title.textContent = section.title;
            columnDiv.appendChild(title);

            section.books.forEach(item => {
                const slot = document.createElement('div');
                slot.className = 'tractate-slot';
                slot.textContent = item.display;
                slot.setAttribute('data-name', item.id);
                columnDiv.appendChild(slot);
            });

            this.boardEl.appendChild(columnDiv);
        });

        this.bindEvents();
    }

    bindEvents() {
        if (this._eventsBound) return;
        this._eventsBound = true;

        this.inputField.addEventListener('input', () => {
            if (!this.gameActive) return;

            const match = this.allBooks.find(b => this.matchesBook(b, this.inputField.value));
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
                this.scoreDisplay.textContent = `${this.correctAnswers.size} / ${this.allBooks.length}`;

                if (this.correctAnswers.size === this.allBooks.length) {
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
        this.scoreDisplay.textContent = `0 / ${this.allBooks.length}`;
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
            this.messageBox.textContent = "MAZEL TOV! You named all 24 books of Tanach!";
            this.messageBox.style.color = "#15803d";
            this.timerEl.style.color = "#15803d";
        } else {
            this.messageBox.textContent = this.timeRemaining <= 0 ? "Time's up!" : "Round ended — missed items shown in red.";
            this.messageBox.style.color = "#dc2626";

            this.allBooks.forEach(item => {
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
    const quiz = new TanachQuiz();
    quiz.initGame();
});