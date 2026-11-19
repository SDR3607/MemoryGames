class TreiAsarQuiz {
    constructor(options = {}) {
        this.boardId = options.boardId || 'game-board';
        this.timerId = options.timerId || 'timer';
        this.controlBtnId = options.controlBtnId || 'control-btn';
        this.inputId = options.inputId || 'answer-input';
        this.messageId = options.messageId || 'message';
        this.scoreId = options.scoreId || 'score';
        this.defaultTimeSeconds = options.defaultTimeSeconds || 3 * 60;

        this.columns = [
            {
                title: "נביאים א–ו (Prophets 1–6)",
                prophets: [
                    { id: "hoshea", display: "הושע", alts: ["hoshea", "hosea", "הושע"] },
                    { id: "yoel", display: "יואל", alts: ["yoel", "joel", "יואל"] },
                    { id: "amos", display: "עמוס", alts: ["amos", "עמוס"] },
                    { id: "ovadyah", display: "עובדיה", alts: ["ovadyah", "ovadyahu", "obadiah", "עובדיה"] },
                    { id: "yonah", display: "יונה", alts: ["yonah", "yona", "jonah", "יונה"] },
                    { id: "michah", display: "מיכה", alts: ["michah", "micah", "מיכה"] }
                ]
            },
            {
                title: "נביאים ז–יב (Prophets 7–12)",
                prophets: [
                    { id: "nachum", display: "נחום", alts: ["nachum", "nahum", "נחום"] },
                    { id: "chavakuk", display: "חבקוק", alts: ["chavakuk", "habakkuk", "חבקוק"] },
                    { id: "tzefanyah", display: "צפניה", alts: ["tzefanyah", "tzefanyahu", "zephaniah", "צפניה"] },
                    { id: "chaggai", display: "חגי", alts: ["chaggai", "haggai", "חגי"] },
                    { id: "zecharyah", display: "זכריה", alts: ["zecharyah", "zecharyahu", "zechariah", "זכריה"] },
                    { id: "malachi", display: "מלאכי", alts: ["malachi", "malachi", "מלאכי"] }
                ]
            }
        ];

        this.allProphets = this.columns.flatMap(c => c.prophets);
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

    matchesProphet(prophet, rawInput) {
        const normalized = this.normalizeInput(rawInput);
        if (!normalized) return false;
        return prophet.alts.some(alt => this.normalizeInput(alt) === normalized);
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
        this.scoreDisplay.textContent = `0 / ${this.allProphets.length}`;

        this.columns.forEach(col => {
            const columnDiv = document.createElement('div');
            columnDiv.className = 'seder-column';

            const title = document.createElement('div');
            title.className = 'seder-title';
            title.textContent = col.title;
            columnDiv.appendChild(title);

            col.prophets.forEach(item => {
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

            const match = this.allProphets.find(p => this.matchesProphet(p, this.inputField.value));
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
                this.scoreDisplay.textContent = `${this.correctAnswers.size} / ${this.allProphets.length}`;

                if (this.correctAnswers.size === this.allProphets.length) {
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
        this.scoreDisplay.textContent = `0 / ${this.allProphets.length}`;
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
            this.messageBox.textContent = "MAZEL TOV! You named all 12 Trei Asar prophets!";
            this.messageBox.style.color = "#15803d";
            this.timerEl.style.color = "#15803d";
        } else {
            this.messageBox.textContent = this.timeRemaining <= 0 ? "Time's up!" : "Round ended — missed items shown in red.";
            this.messageBox.style.color = "#dc2626";

            this.allProphets.forEach(item => {
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
    const quiz = new TreiAsarQuiz();
    quiz.initGame();
});