class ParshaQuiz {
    constructor(options = {}) {
        this.boardId = options.boardId || 'game-board';
        this.timerId = options.timerId || 'timer';
        this.controlBtnId = options.controlBtnId || 'control-btn';
        this.inputId = options.inputId || 'answer-input';
        this.messageId = options.messageId || 'message';
        this.scoreId = options.scoreId || 'score';
        this.defaultTimeSeconds = options.defaultTimeSeconds || (6 * 60) + 13;

        this.books = [
            {
                title: "בראשית (Bereishis)",
                parshiyos: [
                    { id: "bereishis", display: "בראשית", alts: ["bereishis", "bereshit", "bereisheet", "in the beginning", "בראשית"] },
                    { id: "noach", display: "נח", alts: ["noach", "noah", "נח"] },
                    { id: "lech_lecha", display: "לך לך", alts: ["lech lecha", "lech lecha", "go forth", "לך לך"] },
                    { id: "vayeira", display: "וירא", alts: ["vayeira", "vayera", "and he appeared", "וירא"] },
                    { id: "chayei_sarah", display: "חיי שרה", alts: ["chayei sarah", "chayei sara", "life of sarah", "חיי שרה"] },
                    { id: "toldos", display: "תולדות", alts: ["toldos", "toldot", "generations", "תולדות", "תולדת"] },
                    { id: "vayetzei", display: "ויצא", alts: ["vayetzei", "vayetze", "and he went out", "ויצא"] },
                    { id: "vayishlach", display: "וישלח", alts: ["vayishlach", "vayishlah", "and he sent", "וישלח"] },
                    { id: "vayeshev", display: "וישב", alts: ["vayeshev", "and he settled", "וישב"] },
                    { id: "mikeitz", display: "מקץ", alts: ["mikeitz", "miketz", "at the end", "מקץ"] },
                    { id: "vayigash", display: "ויגש", alts: ["vayigash", "and he approached", "ויגש"] },
                    { id: "vayechi", display: "ויחי", alts: ["vayechi", "vayehi", "and he lived", "ויחי"] }
                ]
            },
            {
                title: "שמות (Shemos)",
                parshiyos: [
                    { id: "shemos", display: "שמות", alts: ["shemos", "shemot", "names", "שמות"] },
                    { id: "vaera", display: "וארא", alts: ["vaera", "and i appeared", "וארא"] },
                    { id: "bo", display: "בא", alts: ["bo", "come", "בא"] },
                    { id: "beshalach", display: "בשלח", alts: ["beshalach", "beshalah", "when he sent out", "בשלח"] },
                    { id: "yisro", display: "יתרו", alts: ["yisro", "yitro", "jethro", "יתרו"] },
                    { id: "mishpatim_parsha", display: "משפטים", alts: ["mishpatim", "laws", "judgments", "משפטים"] },
                    { id: "terumah", display: "תרומה", alts: ["terumah", "trumah", "offering", "donation", "תרומה"] },
                    { id: "tetzaveh", display: "תצוה", alts: ["tetzaveh", "tetzave", "you shall command", "תצוה"] },
                    { id: "ki_sisa", display: "כי תשא", alts: ["ki sisa", "ki tisa", "when you take", "כי תשא"] },
                    { id: "vayakhel", display: "ויקהל", alts: ["vayakhel", "and he assembled", "ויקהל"] },
                    { id: "pekudei", display: "פקודי", alts: ["pekudei", "pekude", "accounts", "פקודי"] }
                ]
            },
            {
                title: "ויקרא (Vayikra)",
                parshiyos: [
                    { id: "vayikra", display: "ויקרא", alts: ["vayikra", "and he called", "leviticus", "ויקרא"] },
                    { id: "tzav", display: "צו", alts: ["tzav", "zav", "command", "צו"] },
                    { id: "shemini", display: "שמיני", alts: ["shemini", "shmini", "eighth", "שמיני"] },
                    { id: "tazria", display: "תזריע", alts: ["tazria", "she conceives", "תזריע"] },
                    { id: "metzora", display: "מצורע", alts: ["metzora", "metzora", "leper", "מצורע", "מצרע"] },
                    { id: "acharei_mos", display: "אחרי מות", alts: ["acharei mos", "acharei mot", "after the death", "אחרי מות", "אחרי מות"] },
                    { id: "kedoshim", display: "קדושים", alts: ["kedoshim", "kdoshim", "holy ones", "קדושים"] },
                    { id: "emor", display: "אמור", alts: ["emor", "speak", "say", "אמור"] },
                    { id: "behar", display: "בהר", alts: ["behar", "on the mount", "בהר"] },
                    { id: "bechukosai", display: "בחוקותי", alts: ["bechukosai", "bechukotai", "in my statutes", "בחוקותי", "בחקותי"] }
                ]
            },
            {
                title: "במדבר (Bamidbar)",
                parshiyos: [
                    { id: "bamidbar", display: "במדבר", alts: ["bamidbar", "in the wilderness", "numbers", "במדבר"] },
                    { id: "nasso", display: "נשא", alts: ["nasso", "naso", "elevate", "lift up", "נשא"] },
                    { id: "behaaloscha", display: "בהעלותך", alts: ["behaaloscha", "behaalotcha", "when you raise", "בהעלותך"] },
                    { id: "shelach", display: "שלח", alts: ["shelach", "shlach", "send", "שלח"] },
                    { id: "korach", display: "קורח", alts: ["korach", "korah", "קורח", "קרח"] },
                    { id: "chukas", display: "חוקת", alts: ["chukas", "chukot", "chukkat", "statute", "חוקת", "חקת"] },
                    { id: "balak", display: "בלק", alts: ["balak", "balak", "בלק"] },
                    { id: "pinchas_parsha", display: "פינחס", alts: ["pinchas", "phineas", "פינחס", "פנחס"] },
                    { id: "matos", display: "מטות", alts: ["matos", "matot", "tribes", "מטות"] },
                    { id: "masei", display: "מסעי", alts: ["masei", "mase", "journeys", "stages", "מסעי"] }
                ]
            },
            {
                title: "דברים (Devarim)",
                parshiyos: [
                    { id: "devarim", display: "דברים", alts: ["devarim", "dvarim", "words", "deuteronomy", "דברים"] },
                    { id: "vaeschanan", display: "ואתחנן", alts: ["vaeschanan", "vaetchanan", "and i pleaded", "ואתחנן"] },
                    { id: "eikev", display: "עקב", alts: ["eikev", "ekev", "because", "as a consequence", "עקב"] },
                    { id: "reeh", display: "ראה", alts: ["reeh", "re'eh", "re'e", "see", "behold", "ראה"] },
                    { id: "shoftim_parsha", display: "שופטים", alts: ["shoftim", "judges", "שופטים"] },
                    { id: "ki_seitzei", display: "כי תצא", alts: ["ki seitzei", "ki tetze", "when you go out", "כי תצא"] },
                    { id: "ki_savo", display: "כי תבוא", alts: ["ki savo", "ki tavo", "when you enter", "כי תבוא"] },
                    { id: "nitzavim", display: "ניצבים", alts: ["nitzavim", "nitzavim", "standing", "ניצבים", "נצבים"] },
                    { id: "vayeilech", display: "וילך", alts: ["vayeilech", "vayelech", "and he went", "וילך"] },
                    { id: "haazinu", display: "האזינו", alts: ["haazinu", "listen", "give ear", "האזינו"] },
                    { id: "vezos_haberachah", display: "וזאת הברכה", alts: ["vezos haberachah", "vezot haberacha", "and this is the blessing", "וזאת הברכה"] }
                ]
            }
        ];

        this.allParshiyos = this.books.flatMap(b => b.parshiyos);
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

    matchesParsha(parsha, rawInput) {
        const normalized = this.normalizeInput(rawInput);
        if (!normalized) return false;
        return parsha.alts.some(alt => this.normalizeInput(alt) === normalized);
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
        this.scoreDisplay.textContent = `0 / ${this.allParshiyos.length}`;

        this.books.forEach(book => {
            const columnDiv = document.createElement('div');
            columnDiv.className = 'seder-column';

            const title = document.createElement('div');
            title.className = 'seder-title';
            title.textContent = book.title;
            columnDiv.appendChild(title);

            book.parshiyos.forEach(item => {
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

            const match = this.allParshiyos.find(p => this.matchesParsha(p, this.inputField.value));
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
                this.scoreDisplay.textContent = `${this.correctAnswers.size} / ${this.allParshiyos.length}`;

                if (this.correctAnswers.size === this.allParshiyos.length) {
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
        this.scoreDisplay.textContent = `0 / ${this.allParshiyos.length}`;
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
            this.messageBox.textContent = "MAZEL TOV! You named all 54 Parshiyos!";
            this.messageBox.style.color = "#15803d";
            this.timerEl.style.color = "#15803d";
        } else {
            this.messageBox.textContent = this.timeRemaining <= 0 ? "Time's up!" : "Round ended — missed items shown in red.";
            this.messageBox.style.color = "#dc2626";

            this.allParshiyos.forEach(item => {
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
    const quiz = new ParshaQuiz();
    quiz.initGame();
});