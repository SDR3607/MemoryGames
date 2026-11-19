class NameTheNeviimQuiz {
    constructor(options = {}) {
        this.boardId = options.boardId || 'game-board';
        this.timerId = options.timerId || 'timer';
        this.controlBtnId = options.controlBtnId || 'control-btn';
        this.inputId = options.inputId || 'answer-input';
        this.messageId = options.messageId || 'message';
        this.scoreId = options.scoreId || 'score';
        this.defaultTimeSeconds = options.defaultTimeSeconds || (6 * 60) + 13;

        // Traditional 48 prophets + 7 prophetesses = 55 Neviim (Megillah 14a)
        this.groups = [
            {
                title: "נביאים א–כח (Neviim 1–28)",
                items: [
                    { id: "sarah", display: "שרה", alts: ["sarah", "sara", "שרה"] },
                    { id: "miriam", display: "מרים", alts: ["miriam", "מרים"] },
                    { id: "devorah", display: "דבורה", alts: ["devorah", "debora", "deborah", "דבורה"] },
                    { id: "channah", display: "חנה", alts: ["channah", "chana", "hannah", "hana", "חנה"] },
                    { id: "avigail", display: "אביגיל", alts: ["avigail", "abigail", "אביגיל"] },
                    { id: "chuldah", display: "חולדה", alts: ["chuldah", "chulda", "huldah", "חולדה"] },
                    { id: "esther", display: "אסתר", alts: ["esther", "ester", "אסתר"] },
                    { id: "moshe", display: "משה", alts: ["moshe", "moses", "משה"] },
                    { id: "yehoshua", display: "יהושע", alts: ["yehoshua", "joshua", "יהושע"] },
                    { id: "pinchas", display: "פינחס", alts: ["pinchas", "pinchas", "phinehas", "phineas", "פינחס", "פנחס"] },
                    { id: "eli", display: "עלי", alts: ["eli", "עלי"] },
                    { id: "shmuel", display: "שמואל", alts: ["shmuel", "samuel", "שמואל"] },
                    { id: "david", display: "דוד", alts: ["david", "dovid", "דוד"] },
                    { id: "shlomo", display: "שלמה", alts: ["shlomo", "solomon", "שלמה"] },
                    { id: "achiyah", display: "אחיה השילוני", alts: ["achiyah", "ahijah", "achiyah hashiloni", "אחיה", "אחיה השילוני"] },
                    { id: "yehoash_navi", display: "יהואש", alts: ["yehoash", "joash", "יהואש"] },
                    { id: "eliyahu", display: "אליהו", alts: ["eliyahu", "elijah", "אליהו"] },
                    { id: "elisha", display: "אלישע", alts: ["elisha", "אלישע"] },
                    { id: "michah_navi", display: "מיכה", alts: ["michah", "micah", "מיכה"] },
                    { id: "amos", display: "עמוס", alts: ["amos", "עמוס"] },
                    { id: "hoshea", display: "הושע", alts: ["hoshea", "hosea", "הושע"] },
                    { id: "yeshayah", display: "ישעיה", alts: ["yeshayah", "yeshayahu", "isaiah", "ישעיה", "ישעיהו"] },
                    { id: "yirmiyah", display: "ירמיה", alts: ["yirmiyah", "yirmiyahu", "jeremiah", "ירמיה", "ירמיהו"] },
                    { id: "yechezkel", display: "יחזקאל", alts: ["yechezkel", "yehezkel", "ezekiel", "יחזקאל"] },
                    { id: "ovadyah", display: "עובדיה", alts: ["ovadyah", "ovadyahu", "obadiah", "עובדיה"] },
                    { id: "yoel", display: "יואל", alts: ["yoel", "joel", "יואל"] },
                    { id: "yonah", display: "יונה", alts: ["yonah", "yona", "jonah", "יונה"] },
                    { id: "nachum", display: "נחום", alts: ["nachum", "nahum", "נחום"] }
                ]
            },
            {
                title: "נביאים כט–נה (Neviim 29–55)",
                items: [
                    { id: "chavakuk", display: "חבקוק", alts: ["chavakuk", "habakkuk", "חבקוק"] },
                    { id: "tzefanyah", display: "צפניה", alts: ["tzefanyah", "tzefanyahu", "zephaniah", "צפניה"] },
                    { id: "chaggai", display: "חגי", alts: ["chaggai", "haggai", "חגי"] },
                    { id: "zecharyah", display: "זכריה", alts: ["zecharyah", "zecharyahu", "zechariah", "זכריה"] },
                    { id: "malachi", display: "מלאכי", alts: ["malachi", "malachi", "מלאכי"] },
                    { id: "mordechai", display: "מרדכי", alts: ["mordechai", "mordecai", "מרדכי"] },
                    { id: "danield", display: "דניאל", alts: ["daniel", "דניאל"] },
                    { id: "baruch_ben_neriyah", display: "ברוך בן נריה", alts: ["baruch", "baruch ben neriyah", "ברוך", "ברוך בן נריה"] },
                    { id: "serayah", display: "שריה", alts: ["serayah", "seraiah", "שריה"] },
                    { id: "machseiyah", display: "מעשיה", alts: ["machseiyah", "maaseiah", "מעשיה"] },
                    { id: "ido", display: "עידו", alts: ["ido", "iddo", "עידו"] },
                    { id: "odded", display: "עודד", alts: ["odded", "oded", "עודד"] },
                    { id: "uriyah", display: "אוריה", alts: ["uriyah", "uriah", "אוריה"] },
                    { id: "yehoshafat_navi", display: "יהושפט", alts: ["yehoshafat", "jehoshaphat", "יהושפט"] },
                    { id: "azaryah_ben_oded", display: "עזריה בן עודד", alts: ["azaryah", "azariah", "azaryah ben oded", "עזריה", "עזריה בן עודד"] },
                    { id: "yachaziel", display: "יחזיאל", alts: ["yachaziel", "jahaziel", "יחזיאל"] },
                    { id: "eliezer_ben_dodavahu", display: "אליעזר בן דודו", alts: ["eliezer", "eliezer ben dodavahu", "אליעזר", "אליעזר בן דודו"] },
                    { id: "yehu_ben_chanani", display: "יהוא בן חנני", alts: ["yehu", "jehu", "yehu ben chanani", "יהוא", "יהוא בן חנני"] },
                    { id: "zechariah_ben_yehoyada", display: "זכריה בן יהוידע", alts: ["zechariah ben yehoyada", "zecharyah ben yehoyada", "זכריה בן יהוידע"] },
                    { id: "nathan", display: "נתן", alts: ["nathan", "nosson", "נתן"] },
                    { id: "gad", display: "גד", alts: ["gad", "גד"] },
                    { id: "shemayah", display: "שמעיה", alts: ["shemayah", "shemaiah", "שמעיה"] },
                    { id: "michayhu_ben_yimlah", display: "מיכיהו בן ימלה", alts: ["michayhu", "micaiah", "michayhu ben yimlah", "מיכיהו", "מיכיהו בן ימלה"] },
                    { id: "chizkiyah", display: "חזקיה", alts: ["chizkiyah", "chizkiyahu", "hezekiah", "חזקיה", "חזקיהו"] },
                    { id: "zichri", display: "זכרי", alts: ["zichri", "zichri", "זכרי"] },
                    { id: "hanani", display: "חנני", alts: ["hanani", "chanani", "חנני"] },
                    { id: "havakuk_alt", display: "נחום / חבקוק (השלמה)", alts: [] }
                ]
            }
        ];

        // Clean exact 55 list without extra placeholder slot
        this.groups[1].items.pop();

        this.allItems = this.groups.flatMap(g => g.items);
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

    matchesItem(item, rawInput) {
        const normalized = this.normalizeInput(rawInput);
        if (!normalized) return false;
        return item.alts.some(alt => this.normalizeInput(alt) === normalized);
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
        this.scoreDisplay.textContent = `0 / ${this.allItems.length}`;

        this.groups.forEach(group => {
            const columnDiv = document.createElement('div');
            columnDiv.className = 'seder-column';

            const title = document.createElement('div');
            title.className = 'seder-title';
            title.textContent = group.title;
            columnDiv.appendChild(title);

            group.items.forEach(item => {
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

            const match = this.allItems.find(item => this.matchesItem(item, this.inputField.value));
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
                this.scoreDisplay.textContent = `${this.correctAnswers.size} / ${this.allItems.length}`;

                if (this.correctAnswers.size === this.allItems.length) {
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
        this.scoreDisplay.textContent = `0 / ${this.allItems.length}`;
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
            this.messageBox.textContent = "MAZEL TOV! You named all 55 Neviim!";
            this.messageBox.style.color = "#15803d";
            this.timerEl.style.color = "#15803d";
        } else {
            this.messageBox.textContent = this.timeRemaining <= 0 ? "Time's up!" : "Round ended — missed items shown in red.";
            this.messageBox.style.color = "#dc2626";

            this.allItems.forEach(item => {
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
    const quiz = new NameTheNeviimQuiz();
    quiz.initGame();
});