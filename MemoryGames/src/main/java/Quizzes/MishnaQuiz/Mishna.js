class MishnaQuiz {
    constructor(options = {}) {
        this.boardId = options.boardId || 'game-board';
        this.timerId = options.timerId || 'timer';
        this.controlBtnId = options.controlBtnId || 'control-btn';
        this.inputId = options.inputId || 'answer-input';
        this.messageId = options.messageId || 'message';
        this.scoreId = options.scoreId || 'score';
        this.defaultTimeSeconds = options.defaultTimeSeconds || (6 * 60) + 13;

        this.sedarim = [
            {
                title: "זרעים (Zeraim)",
                tractates: [
                    { id: "brachos", display: "ברכות", alts: ["brachos", "berachos", "berachot", "brachot", "blessings", "ברכות"] },
                    { id: "peah", display: "פאה", alts: ["peah", "pe'ah", "corner", "corners", "פאה"] },
                    { id: "demai", display: "דמאי", alts: ["demai", "dmai", "doubtful produce", "דמאי"] },
                    { id: "kilayim", display: "כלאיים", alts: ["kilayim", "kil'ayim", "mixed species", "diverse kinds", "כלאיים"] },
                    { id: "sheviis", display: "שביעית", alts: ["sheviis", "shevi'is", "sheviit", "shviit", "seventh year", "sabbatical year", "שביעית"] },
                    { id: "terumos", display: "תרומות", alts: ["terumos", "terumot", "trumos", "heave offerings", "תרומות"] },
                    { id: "maasros", display: "מעשרות", alts: ["maasros", "ma'asros", "maaserot", "tithes", "מעשרות"] },
                    { id: "maaser_sheni", display: "מעשר שני", alts: ["maaser sheni", "ma'aser sheni", "second tithe", "מעשר שני"] },
                    { id: "challah", display: "חלה", alts: ["challah", "chala", "dough offering", "חלה"] },
                    { id: "orlah", display: "ערלה", alts: ["orlah", "orla", "uncircumcised fruit", "forbidden fruit", "ערלה"] },
                    { id: "bikkurim", display: "ביכורים", alts: ["bikkurim", "bikurim", "first fruits", "ביכורים"] }
                ]
            },
            {
                title: "מועד (Moed)",
                tractates: [
                    { id: "shabbos", display: "שבת", alts: ["shabbos", "shabbat", "sabbath", "שבת"] },
                    { id: "eruvin", display: "עירובין", alts: ["eruvin", "eiruvin", "blending", "עירובין"] },
                    { id: "pesachim", display: "פסחים", alts: ["pesachim", "psachim", "passover", "pesach", "פסחים"] },
                    { id: "shekalim", display: "שקלים", alts: ["shekalim", "shkalim", "shekels", "שקלים"] },
                    { id: "yoma", display: "יומא", alts: ["yoma", "kippurim", "yom kippur", "day of atonement", "יומא", "כיפורים"] },
                    { id: "sukkah", display: "סוכה", alts: ["sukkah", "sukka", "succah", "booths", "tabernacles", "סוכה"] },
                    { id: "beitzah", display: "ביצה", alts: ["beitzah", "beitza", "yom tov", "egg", "festival", "ביצה", "יום טוב"] },
                    { id: "rosh_hashanah", display: "ראש השנה", alts: ["rosh hashanah", "rosh hashana", "new year", "ראש השנה"] },
                    { id: "taanis", display: "תענית", alts: ["taanis", "ta'anis", "taanit", "fasts", "fasting", "תענית"] },
                    { id: "megillah", display: "מגילה", alts: ["megillah", "megila", "scroll", "purim scroll", "מגילה"] },
                    { id: "moed_katan", display: "מועד קטן", alts: ["moed katan", "moed kattan", "minor festival", "chol hamoed", "מועד קטן"] },
                    { id: "chagigah", display: "חגיגה", alts: ["chagigah", "chagiga", "hagigah", "festival offering", "חגיגה"] }
                ]
            },
            {
                title: "נשים (Nashim)",
                tractates: [
                    { id: "yevamos", display: "יבמות", alts: ["yevamos", "yevamot", "sisters in law", "levirate marriage", "יבמות"] },
                    { id: "kesubos", display: "כתובות", alts: ["kesubos", "kesubot", "ketubot", "ketubos", "marriage contracts", "marriage contract", "כתובות"] },
                    { id: "nedarim", display: "נדרים", alts: ["nedarim", "vows", "נדרים"] },
                    { id: "nazir", display: "נזיר", alts: ["nazir", "nazarite", "נזיר"] },
                    { id: "sotah", display: "סוטה", alts: ["sotah", "sota", "wayward wife", "suspected adulteress", "סוטה"] },
                    { id: "gittin", display: "גיטין", alts: ["gittin", "gitin", "bills of divorce", "divorce", "גיטין"] },
                    { id: "kiddushin", display: "קידושין", alts: ["kiddushin", "kidushin", "betrothals", "betrothal", "קידושין"] }
                ]
            },
            {
                title: "נזיקין (Nezikin)",
                tractates: [
                    { id: "bava_kamma", display: "בבא קמא", alts: ["bava kamma", "bava kama", "baba kamma", "first gate", "בבא קמא"] },
                    { id: "bava_metzia", display: "בבא מציעא", alts: ["bava metzia", "bava metziah", "baba metzia", "middle gate", "בבא מציעא"] },
                    { id: "bava_basra", display: "בבא בתרא", alts: ["bava basra", "bava batra", "baba batra", "last gate", "בבא בתרא"] },
                    { id: "sanhedrin", display: "סנהדרין", alts: ["sanhedrin", "courts", "high court", "סנהדרין"] },
                    { id: "makkos", display: "מכות", alts: ["makkos", "makkot", "lashes", "stripes", "מכות"] },
                    { id: "shevuos", display: "שבועות", alts: ["shevuos", "shevuot", "oaths", "שבועות"] },
                    { id: "eduyos", display: "עדויות", alts: ["eduyos", "eduyot", "testimonies", "testimony", "עדויות"] },
                    { id: "avodah_zarah", display: "עבודה זרה", alts: ["avodah zarah", "avoda zara", "idolatry", "foreign worship", "עבודה זרה"] },
                    { id: "avos", display: "אבות", alts: ["avos", "avot", "pirkei avos", "pirkei avot", "ethics of the fathers", "chapters of the fathers", "אבות", "פרקי אבות"] },
                    { id: "horayos", display: "הוריות", alts: ["horayos", "horayot", "rulings", "erroneous rulings", "הוריות"] }
                ]
            },
            {
                title: "קדשים (Kodshim)",
                tractates: [
                    { id: "zevachim", display: "זבחים", alts: ["zevachim", "zvachim", "animal sacrifices", "sacrifices", "זבחים"] },
                    { id: "menachos", display: "מנחות", alts: ["menachos", "menachot", "meal offerings", "minchah offerings", "מנחות"] },
                    { id: "chullin", display: "חולין", alts: ["chullin", "chulin", "hullin", "unsanctified animals", "non consecrated slaughter", "חולין"] },
                    { id: "bechoros", display: "בכורות", alts: ["bechoros", "bechorot", "firstlings", "firstborn", "בכורות"] },
                    { id: "arachin", display: "ערכין", alts: ["arachin", "erachin", "valuations", "appraisals", "ערכין"] },
                    { id: "temurah", display: "תמורה", alts: ["temurah", "temura", "substitution", "substitutions", "תמורה"] },
                    { id: "kerisos", display: "כריתות", alts: ["kerisos", "keritot", "cuttings off", "excisions", "כריתות"] },
                    { id: "meilah", display: "מעילה", alts: ["meilah", "me'ilah", "trespass", "sacrilege", "מעילה"] },
                    { id: "tamid", display: "תמיד", alts: ["tamid", "daily offering", "continual offering", "תמיד"] },
                    { id: "middos", display: "מידות", alts: ["middos", "middot", "measurements", "temple measurements", "מידות"] },
                    { id: "kinnim", display: "קינים", alts: ["kinnim", "kinim", "bird offerings", "nests", "קינים"] }
                ]
            },
            {
                title: "טהרות (Taharos)",
                tractates: [
                    { id: "keilim", display: "כלים", alts: ["keilim", "kelim", "vessels", "utensils", "כלים"] },
                    { id: "ohalos", display: "אהלות", alts: ["ohalos", "ohalot", "tents", "corpse tents", "אהלות"] },
                    { id: "negaim", display: "נגעים", alts: ["negaim", "plagues", "tzaraat plagues", "נגעים"] },
                    { id: "parah", display: "פרה", alts: ["parah", "para", "red heifer", "cow", "פרה"] },
                    { id: "taharos", display: "טהרות", alts: ["taharos", "taharot", "purities", "ritual purities", "טהרות"] },
                    { id: "mikvaos", display: "מקוואות", alts: ["mikvaos", "mikvaot", "immersion pools", "ritual baths", "מקוואות", "מקוות"] },
                    { id: "niddah", display: "נידה", alts: ["niddah", "nida", "menstruant", "menstrual impurity", "נידה", "נדה"] },
                    { id: "machshirin", display: "מכשירין", alts: ["machshirin", "machshirim", "preparations", "predisposers", "מכשירין"] },
                    { id: "zavim", display: "זבים", alts: ["zavim", "discharges", "those with discharges", "זבים"] },
                    { id: "tevul_yom", display: "טבול יום", alts: ["tevul yom", "immersed that day", "one who immersed during the day", "טבול יום"] },
                    { id: "yadayim", display: "ידיים", alts: ["yadayim", "yadaim", "hands", "washing of hands", "ידיים", "ידים"] },
                    { id: "oktzin", display: "עוקצין", alts: ["oktzin", "oktzim", "stalks", "stems", "עוקצין"] }
                ]
            }
        ];

        this.allTractates = this.sedarim.flatMap(s => s.tractates);
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

    matchesTractate(tractate, rawInput) {
        const normalized = this.normalizeInput(rawInput);
        if (!normalized) return false;
        return tractate.alts.some(alt => this.normalizeInput(alt) === normalized);
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
        this.scoreDisplay.textContent = `0 / ${this.allTractates.length}`;

        this.sedarim.forEach(seder => {
            const columnDiv = document.createElement('div');
            columnDiv.className = 'seder-column';

            const title = document.createElement('div');
            title.className = 'seder-title';
            title.textContent = seder.title;
            columnDiv.appendChild(title);

            seder.tractates.forEach(item => {
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

            const match = this.allTractates.find(t => this.matchesTractate(t, this.inputField.value));
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
                this.scoreDisplay.textContent = `${this.correctAnswers.size} / ${this.allTractates.length}`;

                if (this.correctAnswers.size === this.allTractates.length) {
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
        this.scoreDisplay.textContent = `0 / ${this.allTractates.length}`;
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
            this.messageBox.textContent = "MAZEL TOV! You named all 63 Masechtos!";
            this.messageBox.style.color = "#15803d";
            this.timerEl.style.color = "#15803d";
        } else {
            this.messageBox.textContent = this.timeRemaining <= 0 ? "Time's up!" : "Round ended — missed items shown in red.";
            this.messageBox.style.color = "#dc2626";

            this.allTractates.forEach(item => {
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
    const quiz = new MishnaQuiz();
    quiz.initGame();
});