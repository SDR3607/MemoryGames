class MishnehTorahHalachosQuiz {
    constructor(options = {}) {
        this.boardId = options.boardId || 'game-board';
        this.timerId = options.timerId || 'timer';
        this.controlBtnId = options.controlBtnId || 'control-btn';
        this.inputId = options.inputId || 'answer-input';
        this.messageId = options.messageId || 'message';
        this.scoreId = options.scoreId || 'score';
        this.filterId = options.filterId || 'book-filter';
        this.defaultTimeSeconds = options.defaultTimeSeconds || 15 * 60;

        this.booksData = [
            {
                id: "madda",
                display: "ספר המדע (Sefer Madda)",
                halachos: [
                    { id: "yesodei_hatorah", display: "הלכות יסודי התורה", alts: ["yesodei hatorah", "yesodei ha torah", "hilchos yesodei hatorah", "hilchot yesodei hatorah", "foundations of the torah", "basic principles of the torah", "יסודי התורה", "הלכות יסודי התורה"] },
                    { id: "deos", display: "הלכות דעות", alts: ["deos", "deot", "de'os", "de'ot", "hilchos deos", "hilchot deot", "human dispositions", "character traits", "dispositions", "דעות", "הלכות דעות"] },
                    { id: "talmud_torah", display: "הלכות תלמוד תורה", alts: ["talmud torah", "hilchos talmud torah", "hilchot talmud torah", "torah study", "study of torah", "תלמוד תורה", "הלכות תלמוד תורה"] },
                    { id: "avodah_zarah", display: "הלכות עבודה זרה", alts: ["avodah zarah", "avoda zara", "avodat kochavim", "hilchos avodah zarah", "hilchot avodah zarah", "idolatry", "foreign worship", "עבודה זרה", "עבודת כוכבים", "הלכות עבודה זרה"] },
                    { id: "teshuvah", display: "הלכות תשובה", alts: ["teshuvah", "teshuva", "hilchos teshuvah", "hilchot teshuva", "repentance", "תשובה", "הלכות תשובה"] }
                ]
            },
            {
                id: "ahavah",
                display: "ספר אהבה (Sefer Ahavah)",
                halachos: [
                    { id: "krias_shema", display: "הלכות קריאת שמע", alts: ["krias shema", "kriat shema", "kri'as shema", "hilchos krias shema", "hilchot kriat shema", "reading the shema", "reciting shema", "קריאת שמע", "הלכות קריאת שמע"] },
                    { id: "tefillah", display: "הלכות תפילה וברכת כהנים", alts: ["tefillah", "tefilah", "birkat kohanim", "birkas kohanim", "hilchos tefillah", "hilchot tefilah ubirkat kohanim", "prayer", "prayer and priestly blessing", "תפילה", "תפילה וברכת כהנים", "הלכות תפילה וברכת כהנים"] },
                    { id: "tefillin_mezuzah_sefer_torah", display: "הלכות תפילין ומזוזה וספר תורה", alts: ["tefillin", "tefilin", "mezuzah", "mezuza", "sefer torah", "hilchos tefillin", "hilchot tefillin umezuzah", "phylacteries", "mezuzah and torah scroll", "תפילין", "מזוזה", "ספר תורה", "הלכות תפילין ומזוזה וספר תורה"] },
                    { id: "tzitzis", display: "הלכות ציצית", alts: ["tzitzis", "tzitzit", "hilchos tzitzis", "hilchot tzitzit", "fringes", "tzitzit fringes", "ציצית", "הלכות ציצית"] },
                    { id: "berachos", display: "הלכות ברכות", alts: ["berachos", "berachot", "brachos", "brachot", "hilchos berachos", "hilchot berachot", "blessings", "ברכות", "הלכות ברכות"] },
                    { id: "milah", display: "הלכות מילה", alts: ["milah", "mila", "hilchos milah", "hilchot mila", "circumcision", "brit milah", "מילה", "הלכות מילה"] },
                    { id: "seder_tefillah", display: "סדר תפילת כל השנה", alts: ["seder tefillah", "seder tefilah", "seder tefillas kol hashanah", "order of prayers", "daily prayers", "סדר תפילת כל השנה", "תפילת כל השנה"] }
                ]
            },
            {
                id: "zmanim",
                display: "ספר זמנים (Sefer Zmanim)",
                halachos: [
                    { id: "shabbos", display: "הלכות שבת", alts: ["shabbos", "shabbat", "hilchos shabbos", "hilchot shabbat", "sabbath", "שבת", "הלכות שבת"] },
                    { id: "eruvin", display: "הלכות עירובין", alts: ["eruvin", "eiruvin", "eruv", "hilchos eruvin", "hilchot eruvin", "eruv laws", "עירובין", "הלכות עירובין"] },
                    { id: "shvisas_asor", display: "הלכות שביתת עשור", alts: ["shvisas asor", "shevitat asor", "hilchos shvisas asor", "hilchot shevitat asor", "yom kippur", "day of atonement", "שביתת עשור", "הלכות שביתת עשור"] },
                    { id: "shvisas_yom_tov", display: "הלכות שביתת יום טוב", alts: ["shvisas yom tov", "shevitat yom tov", "hilchos shvisas yom tov", "hilchot shevitat yom tov", "festivals", "holidays", "yom tov", "שביתת יום טוב", "הלכות שביתת יום טוב"] },
                    { id: "chametz_umatzah", display: "הלכות חמץ ומצה", alts: ["chametz umatzah", "chametz u matzah", "chametz umatza", "hilchos chametz umatzah", "hilchot chametz umatza", "passover", "pesach", "leaven and matzah", "חמץ ומצה", "הלכות חמץ ומצה"] },
                    { id: "shofar_lulav_sukkah", display: "הלכות שופר ולולב וסוכה", alts: ["shofar lulav sukkah", "shofar sukkah lulav", "hilchos shofar lulav vsukkah", "hilchot shofar sukkah velulav", "shofar lulav and sukkah", "rosh hashanah and sukkot", "שופר ולולב וסוכה", "הלכות שופר ולולב וסוכה"] },
                    { id: "shekalim", display: "הלכות שקלים", alts: ["shekalim", "shkalim", "hilchos shekalim", "hilchot shekalim", "shekel", "shekel dues", "שקלים", "הלכות שקלים"] },
                    { id: "kiddush_hachodesh", display: "הלכות קידוש החודש", alts: ["kiddush hachodesh", "kidush hachodesh", "hilchos kiddush hachodesh", "hilchot kiddush hachodesh", "sanctification of the new month", "jewish calendar", "קידוש החודש", "הלכות קידוש החודש"] },
                    { id: "taaniyos", display: "הלכות תעניות", alts: ["taaniyos", "taaniyot", "ta'aniyos", "ta'aniyot", "hilchos taaniyos", "hilchot taaniyot", "fasts", "fast days", "תעניות", "הלכות תעניות"] },
                    { id: "megillah_vchanukah", display: "הלכות מגילה וחנוכה", alts: ["megillah vchanukah", "megillah chanukah", "megilah hanukkah", "chanukah umegillah", "hilchos megillah vchanukah", "hilchot megilah vechanukah", "megillah and chanukah", "purim and chanukah", "מגילה וחנוכה", "הלכות מגילה וחנוכה"] }
                ]
            },
            {
                id: "nashim",
                display: "ספר נשים (Sefer Nashim)",
                halachos: [
                    { id: "ishus", display: "הלכות אישות", alts: ["ishus", "ishut", "hilchos ishus", "hilchot ishut", "marriage", "אישות", "הלכות אישות"] },
                    { id: "geirushin", display: "הלכות גירושין", alts: ["geirushin", "gerushin", "hilchos geirushin", "hilchot gerushin", "divorce", "גירושין", "הלכות גירושין"] },
                    { id: "yibum_vchalitzah", display: "הלכות ייבום וחליצה", alts: ["yibum vchalitzah", "yibum chalitzah", "yibbum vachalitzah", "hilchos yibum vchalitzah", "hilchot yibbum vachalitzah", "levirate marriage", "levirate marriage and chalitzah", "ייבום וחליצה", "הלכות ייבום וחליצה"] },
                    { id: "naarah_besulah", display: "הלכות נערה בתולה", alts: ["naarah besulah", "naarah betulah", "na'arah besulah", "hilchos naarah besulah", "hilchot naarah betulah", "virgin maiden", "נערה בתולה", "הלכות נערה בתולה"] },
                    { id: "sotah", display: "הלכות סוטה", alts: ["sotah", "sota", "hilchos sotah", "hilchot sota", "suspected adulteress", "סוטה", "הלכות סוטה"] }
                ]
            },
            {
                id: "kedushah",
                display: "ספר קדושה (Sefer Kedushah)",
                halachos: [
                    { id: "issurei_biah", display: "הלכות איסורי ביאה", alts: ["issurei biah", "isuri biah", "issurei bi'ah", "hilchos issurei biah", "hilchot isurei biah", "forbidden relations", "איסורי ביאה", "הלכות איסורי ביאה"] },
            { id: "maachalos_asuros", display: "הלכות מאכלות אסורות", alts: ["maachalos asuros", "maakhalot assurot", "ma'achalos asuros", "hilchos maachalos asuros", "hilchot maakhalot assurot", "forbidden foods", "kashrut", "dietary laws", "מאכלות אסורות", "הלכות מאכלות אסורות"] },
            { id: "shechitah", display: "הלכות שחיטה", alts: ["shechitah", "shechita", "shechitot", "hilchos shechitah", "hilchot shechita", "ritual slaughter", "slaughter", "שחיטה", "הלכות שחיטה"] }
        ]
    },
        {
            id: "haflaah",
                display: "ספר הפלאה (Sefer Hafla'ah)",
            halachos: [
            { id: "shevuos", display: "הלכות שבועות", alts: ["shevuos", "shevuot", "shevu'os", "hilchos shevuos", "hilchot shevuot", "oaths", "שבועות", "הלכות שבועות"] },
            { id: "nedarim", display: "הלכות נדרים", alts: ["nedarim", "hilchos nedarim", "hilchot nedarim", "vows", "נדרים", "הלכות נדרים"] },
            { id: "neziros", display: "הלכות נזירות", alts: ["neziros", "nezirut", "hilchos neziros", "hilchot nezirut", "nazarite", "nazariteship", "נזירות", "הלכות נזירות"] },
            { id: "arachin_vcharamim", display: "הלכות ערכין וחרמין", alts: ["arachin vcharamim", "arachin charamim", "erachin vacharamim", "hilchos arachin vcharamim", "hilchot erachin vacharamim", "valuations and devoted property", "appraisals and devoted property", "ערכין וחרמין", "הלכות ערכין וחרמין"] }
        ]
        },
        {
            id: "zeraim",
                display: "ספר זרעים (Sefer Zeraim)",
            halachos: [
            { id: "kilayim", display: "הלכות כלאיים", alts: ["kilayim", "kil'ayim", "hilchos kilayim", "hilchot kilayim", "mixed species", "diverse species", "כלאיים", "הלכות כלאיים"] },
            { id: "matnos_aniyim", display: "הלכות מתנות עניים", alts: ["matnos aniyim", "matnot aniyim", "hilchos matnos aniyim", "hilchot matnot aniyim", "gifts to the poor", "poor gifts", "מתנות עניים", "הלכות מתנות עניים"] },
            { id: "terumos", display: "הלכות תרומות", alts: ["terumos", "terumot", "trumos", "hilchos terumos", "hilchot terumot", "heave offerings", "terumah", "תרומות", "הלכות תרומות"] },
            { id: "maasros", display: "הלכות מעשרות", alts: ["maasros", "ma'asros", "maaserot", "hilchos maasros", "hilchot maaserot", "tithes", "מעשרות", "הלכות מעשרות"] },
            { id: "maaser_sheini_veta_revai", display: "הלכות מעשר שני ונטע רבעי", alts: ["maaser sheini", "ma'aser sheini", "neta revai", "neta reva'i", "hilchos maaser sheini", "hilchot maaser sheni veneta revai", "second tithe", "second tithe and fourth year fruit", "מעשר שני ונטע רבעי", "מעשר שני", "הלכות מעשר שני ונטע רבעי"] },
            { id: "bikkurim", display: "הלכות ביכורים", alts: ["bikkurim", "bikurim", "hilchos bikkurim", "hilchot bikurim", "first fruits", "ביכורים", "הלכות ביכורים"] },
            { id: "shemittah_vyovel", display: "הלכות שמיטה ויובל", alts: ["shemittah vyovel", "shemittah yovel", "shemitah veyovel", "hilchos shemittah vyovel", "hilchot shemitah veyovel", "sabbatical and jubilee", "sabbatical and jubilee years", "shmita and yovel", "שמיטה ויובל", "הלכות שמיטה ויובל"] }
        ]
        },
        {
            id: "avodah",
                display: "ספר עבודה (Sefer Avodah)",
            halachos: [
            { id: "beis_habechirah", display: "הלכות בית הבחירה", alts: ["beis habechirah", "beit habechirah", "beis ha bechirah", "hilchos beis habechirah", "hilchot beit habechirah", "chosen temple", "the temple", "בית הבחירה", "הלכות בית הבחירה"] },
            { id: "klei_hamikdash", display: "הלכות כלי המקדש", alts: ["klei hamikdash", "kelei hamikdash", "hilchos klei hamikdash", "hilchot klei hamikdash", "vessels of the sanctuary", "temple vessels", "כלי המקדש", "הלכות כלי המקדש"] },
            { id: "bias_hamikdash", display: "הלכות ביאת המקדש", alts: ["bias hamikdash", "biat hamikdash", "bi'as hamikdash", "hilchos bias hamikdash", "hilchot biat hamikdash", "entering the sanctuary", "entry into the sanctuary", "ביאת המקדש", "הלכות ביאת המקדש"] },
            { id: "issurei_hamizbeach", display: "הלכות איסורי המזבח", alts: ["issurei hamizbeach", "isurei hamizbeach", "hilchos issurei hamizbeach", "hilchot isurei hamizbeach", "things forbidden on the altar", "altar prohibitions", "איסורי המזבח", "הלכות איסורי המזבח"] },
            { id: "maaseh_hakorbanos", display: "הלכות מעשה הקרבנות", alts: ["maaseh hakorbanos", "maaseh hakorbanot", "ma'aseh hakorbanos", "hilchos maaseh hakorbanos", "hilchot maaseh hakorbanot", "sacrificial procedure", "procedure of offerings", "מעשה הקרבנות", "הלכות מעשה הקרבנות"] },
            { id: "temidim_umusafim", display: "הלכות תמידים ומוספין", alts: ["temidim umusafim", "temidim musafim", "tamid umusaf", "hilchos temidim umusafim", "hilchot temidim umusafim", "daily and additional offerings", "tamid and musaf", "תמידים ומוספין", "הלכות תמידים ומוספין"] },
            { id: "pesulei_hamukdashin", display: "הלכות פסולי המוקדשין", alts: ["pesulei hamukdashin", "pesulei hamukdashim", "hilchos pesulei hamukdashin", "hilchot pesulei hamukdashim", "disqualified consecrated offerings", "invalid offerings", "פסולי המוקדשין", "הלכות פסולי המוקדשין"] },
            { id: "avodas_yom_hakippurim", display: "הלכות עבודת יום הכיפורים", alts: ["avodas yom hakippurim", "avodat yom hakippurim", "hilchos avodas yom hakippurim", "hilchot avodat yom hakippurim", "yom kippur service", "yom kippur temple service", "עבודת יום הכיפורים", "הלכות עבודת יום הכיפורים"] },
            { id: "meilah", display: "הלכות מעילה", alts: ["meilah", "me'ilah", "hilchos meilah", "hilchot meilah", "trespass", "sacrilege", "misuse of sacred property", "מעילה", "הלכות מעילה"] }
        ]
        },
        {
            id: "korbanos",
                display: "ספר קורבנות (Sefer Korbanos)",
            halachos: [
            { id: "korban_pesach", display: "הלכות קרבן פסח", alts: ["korban pesach", "korban pesah", "hilchos korban pesach", "hilchot korban pesach", "paschal offering", "passover offering", "קרבן פסח", "קורבן פסח", "הלכות קרבן פסח"] },
            { id: "chagigah", display: "הלכות חגיגה", alts: ["chagigah", "chagiga", "hagigah", "hilchos chagigah", "hilchot chagigah", "festival offering", "חגיגה", "הלכות חגיגה"] },
            { id: "bechoros", display: "הלכות בכורות", alts: ["bechoros", "bechorot", "hilchos bechoros", "hilchot bechorot", "firstlings", "firstborn animals", "בכורות", "הלכות בכורות"] },
            { id: "shegagos", display: "הלכות שגגות", alts: ["shegagos", "shegagot", "hilchos shegagos", "hilchot shegagot", "unintentional transgressions", "inadvertent sins", "שגגות", "הלכות שגגות"] },
            { id: "mechussarei_kapparah", display: "הלכות מחוסרי כפרה", alts: ["mechussarei kapparah", "mechussarei kaparah", "mechusrei kaparah", "hilchos mechussarei kapparah", "hilchot mechusrei kaparah", "incomplete atonement", "offerings for incomplete atonement", "מחוסרי כפרה", "הלכות מחוסרי כפרה"] },
            { id: "temurah", display: "הלכות תמורה", alts: ["temurah", "temura", "hilchos temurah", "hilchot temura", "substitution", "substitution of offerings", "תמורה", "הלכות תמורה"] }
        ]
        },
        {
            id: "taharah",
                display: "ספר טהרה (Sefer Taharah)",
            halachos: [
            { id: "tumas_meis", display: "הלכות טומאת מת", alts: ["tumas meis", "tumat met", "tum'as meis", "hilchos tumas meis", "hilchot tumat met", "corpse defilement", "corpse impurity", "טומאת מת", "הלכות טומאת מת"] },
            { id: "parah_adumah", display: "הלכות פרה אדומה", alts: ["parah adumah", "para aduma", "hilchos parah adumah", "hilchot parah aduma", "red heifer", "פרה אדומה", "הלכות פרה אדומה"] },
            { id: "tumas_tzaraas", display: "הלכות טומאת צרעת", alts: ["tumas tzaraas", "tumat tzaraat", "tumat zaraat", "hilchos tumas tzaraas", "hilchot tumat tzaraat", "tzaraat", "tzara'at", "leprosy defilement", "טומאת צרעת", "הלכות טומאת צרעת"] },
            { id: "metamei_mishkav_umoshav", display: "הלכות מטמאי משכב ומושב", alts: ["metamei mishkav umoshav", "metamei mishkav umoshav", "hilchos metamei mishkav umoshav", "defilement of bed or seat", "defilement of couch and seat", "מטמאי משכב ומושב", "הלכות מטמאי משכב ומושב"] },
            { id: "shear_avos_hatumos", display: "הלכות שאר אבות הטומאות", alts: ["shear avos hatumos", "shear avot hatumot", "she'ar avos hatumos", "hilchos shear avos hatumos", "other primary sources of defilement", "שאר אבות הטומאות", "הלכות שאר אבות הטומאות"] },
            { id: "tumas_ochalin", display: "הלכות טומאת אוכלין", alts: ["tumas ochalin", "tumat ochalin", "tum'as ochalin", "hilchos tumas ochalin", "hilchot tumat ochalin", "defilement of foods", "food impurity", "טומאת אוכלין", "הלכות טומאת אוכלין"] },
            { id: "keilim", display: "הלכות כלים", alts: ["keilim", "kelim", "hilchos keilim", "hilchot kelim", "vessels", "utensils", "כלים", "הלכות כלים"] },
            { id: "mikvaos", display: "הלכות מקוואות", alts: ["mikvaos", "mikvaot", "mikva'os", "mikveh", "mikvah", "hilchos mikvaos", "hilchot mikvaot", "immersion pools", "ritual baths", "מקוואות", "מקוות", "הלכות מקוואות"] }
        ]
        },
        {
            id: "nezikin",
                display: "ספר נזיקין (Sefer Nezikin)",
            halachos: [
            { id: "nizkei_mamon", display: "הלכות נזקי ממון", alts: ["nizkei mamon", "nizkei mammon", "hilchos nizkei mamon", "hilchot nizkei mammon", "property damages", "damages to property", "נזקי ממון", "הלכות נזקי ממון"] },
            { id: "geneivah", display: "הלכות גניבה", alts: ["geneivah", "geneiva", "gneiva", "hilchos geneivah", "hilchot geneiva", "theft", "גניבה", "הלכות גניבה"] },
            { id: "gezeilah_vaaveidah", display: "הלכות גזילה ואבידה", alts: ["gezeilah vaaveidah", "gezeilah aveidah", "gezel vaaveidah", "hilchos gezeilah vaaveidah", "hilchot gezel vaaveidah", "robbery and lost property", "robbery and lost items", "גזילה ואבידה", "גזלה ואבדה", "הלכות גזילה ואבידה"] },
            { id: "chovel_umazik", display: "הלכות חובל ומזיק", alts: ["chovel umazik", "chovel umezik", "hilchos chovel umazik", "hilchot chovel umezik", "bodily injury and property damage", "wounding and damaging", "חובל ומזיק", "הלכות חובל ומזיק"] },
            { id: "rotzeach_ushmiras_nefesh", display: "הלכות רוצח ושמירת נפש", alts: ["rotzeach ushmiras nefesh", "rotzeach shmiras nefesh", "rotzeach ushmirat nefesh", "hilchos rotzeach ushmiras nefesh", "hilchot rotzeach ushmirat nefesh", "murder and preservation of life", "murder and guarding life", "רוצח ושמירת נפש", "הלכות רוצח ושמירת נפש"] }
        ]
        },
        {
            id: "kinyan",
                display: "ספר קניין (Sefer Kinyan)",
            halachos: [
            { id: "mechirah", display: "הלכות מכירה", alts: ["mechirah", "mechira", "mechirat", "hilchos mechirah", "hilchot mechira", "sales", "buying and selling", "מכירה", "הלכות מכירה"] },
            { id: "zechiyah_umatanah", display: "הלכות זכייה ומתנה", alts: ["zechiyah umatanah", "zechiyah matanah", "zechiya umatana", "hilchos zechiyah umatanah", "hilchot zechiya umatana", "acquiring ownerless property and gifts", "ownerless property and gifts", "זכייה ומתנה", "זכיה ומתנה", "הלכות זכייה ומתנה"] },
            { id: "shecheinim", display: "הלכות שכנים", alts: ["shecheinim", "shechenim", "shcheinim", "hilchos shecheinim", "hilchot shechenim", "neighbors", "שכנים", "הלכות שכנים"] },
            { id: "shluchin_vshutafin", display: "הלכות שלוחין ושותפין", alts: ["shluchin vshutafin", "shluchin shutafin", "shluchin veshutafin", "hilchos shluchin vshutafin", "hilchot shluchin veshutafin", "agents and partners", "agency and partnership", "שלוחין ושותפין", "הלכות שלוחין ושותפין"] },
            { id: "avadim", display: "הלכות עבדים", alts: ["avadim", "hilchos avadim", "hilchot avadim", "slaves", "servants", "עבדים", "הלכות עבדים"] }
        ]
        },
        {
            id: "mishpatim",
                display: "ספר משפטים (Sefer Mishpatim)",
            halachos: [
            { id: "sechirus", display: "הלכות שכירות", alts: ["sechirus", "sechirut", "hilchos sechirus", "hilchot sechirut", "hiring", "leasing", "rental", "שכירות", "הלכות שכירות"] },
            { id: "sheilah_upikadon", display: "הלכות שאלה ופיקדון", alts: ["sheilah upikadon", "sheilah pikadon", "she'ilah upikadon", "hilchos sheilah upikadon", "hilchot sheilah upikadon", "borrowing and deposit", "loans and bailments", "שאלה ופיקדון", "הלכות שאלה ופיקדון"] },
            { id: "malveh_vloveh", display: "הלכות מלווה ולווה", alts: ["malveh vloveh", "malveh loveh", "malveh veloveh", "hilchos malveh vloveh", "hilchot malveh veloveh", "creditor and debtor", "lender and borrower", "מלווה ולווה", "מלוה ולוה", "הלכות מלווה ולווה"] },
            { id: "toen_vnitan", display: "הלכות טוען ונטען", alts: ["toen vnitan", "toen nitan", "to'en venitan", "hilchos toen vnitan", "hilchot toen venitan", "plaintiff and defendant", "claims and pleas", "טוען ונטען", "הלכות טוען ונטען"] },
            { id: "nachalos", display: "הלכות נחלות", alts: ["nachalos", "nachalot", "hilchos nachalos", "hilchot nachalot", "inheritances", "inheritance", "נחלות", "הלכות נחלות"] }
        ]
        },
        {
            id: "shoftim",
                display: "ספר שופטים (Sefer Shoftim)",
            halachos: [
            { id: "sanhedrin", display: "הלכות סנהדרין והעונשין המסורין להם", alts: ["sanhedrin", "hilchos sanhedrin", "hilchot sanhedrin", "sanhedrin and penalties", "courts and penalties", "סנהדרין", "הלכות סנהדרין", "הלכות סנהדרין והעונשין המסורין להם"] },
            { id: "edus", display: "הלכות עדות", alts: ["edus", "edut", "hilchos edus", "hilchot edut", "testimony", "witnesses", "עדות", "הלכות עדות"] },
            { id: "mamrim", display: "הלכות ממרים", alts: ["mamrim", "hilchos mamrim", "hilchot mamrim", "rebels", "rebellious elders", "ממרים", "הלכות ממרים"] },
            { id: "avel", display: "הלכות אבל", alts: ["avel", "hilchos avel", "hilchot avel", "mourning", "אבל", "הלכות אבל"] },
            { id: "melachim_umilchamos", display: "הלכות מלכים ומלחמות", alts: ["melachim umilchamos", "melachim milchamos", "melachim umilchamot", "hilchos melachim umilchamos", "hilchot melachim umilchamot", "kings and wars", "laws of kings and wars", "מלכים ומלחמות", "הלכות מלכים ומלחמות"] }
        ]
        }
    ];

        this.selectedBookId = "all";
        this.activeHalachos = [];
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
        this.filterSelect = document.getElementById(this.filterId);
    }

    normalizeInput(value) {
        return value
            .trim()
            .toLowerCase()
            .replace(/['’`´׳״-]/g, "")
            .replace(/\s+/g, " ");
    }

    matchesHalachah(item, rawInput) {
        const normalized = this.normalizeInput(rawInput);
        if (!normalized) return false;
        return item.alts.some(alt => this.normalizeInput(alt) === normalized);
    }

    formatTime(secondsTotal) {
        const minutes = Math.floor(secondsTotal / 60);
        const seconds = secondsTotal % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    populateBookFilter() {
        if (!this.filterSelect) return;
        this.filterSelect.innerHTML = "";

        const allOption = document.createElement('option');
        allOption.value = "all";
        allOption.textContent = "All 14 Books (Full Mishneh Torah)";
        this.filterSelect.appendChild(allOption);

        this.booksData.forEach(book => {
            const option = document.createElement('option');
            option.value = book.id;
            option.textContent = `${book.display} (${book.halachos.length})`;
            this.filterSelect.appendChild(option);
        });
    }

    getBooksForSelection() {
        if (this.selectedBookId === "all") {
            return this.booksData;
        }
        return this.booksData.filter(b => b.id === this.selectedBookId);
    }

    initGame() {
        this.populateBookFilter();
        this.renderBoard();
        this.bindEvents();
    }

    renderBoard() {
        if (!this.boardEl) return;
        clearInterval(this.timerInterval);
        this.gameActive = false;
        this.correctAnswers.clear();
        this.timeRemaining = this.defaultTimeSeconds;

        const booksToShow = this.getBooksForSelection();
        this.activeHalachos = booksToShow.flatMap(book => book.halachos);

        this.boardEl.innerHTML = "";
        this.timerEl.style.color = "";
        this.timerEl.textContent = this.formatTime(this.timeRemaining);
        this.scoreDisplay.textContent = `0 / ${this.activeHalachos.length}`;
        this.inputField.value = "";
        this.inputField.disabled = true;
        this.controlBtn.textContent = "Start Game";
        this.controlBtn.classList.remove('give-up');
        this.messageBox.textContent = "Press Start to Begin!";
        this.messageBox.style.color = "#475569";

        booksToShow.forEach(book => {
            const columnDiv = document.createElement('div');
            columnDiv.className = 'seder-column';

            const title = document.createElement('div');
            title.className = 'seder-title';
            title.textContent = book.display;
            columnDiv.appendChild(title);

            book.halachos.forEach(item => {
                const slot = document.createElement('div');
                slot.className = 'tractate-slot';
                slot.textContent = item.display;
                slot.setAttribute('data-name', item.id);
                columnDiv.appendChild(slot);
            });

            this.boardEl.appendChild(columnDiv);
        });
    }

    bindEvents() {
        if (this._eventsBound) return;
        this._eventsBound = true;

        if (this.filterSelect) {
            this.filterSelect.addEventListener('change', (e) => {
                this.selectedBookId = e.target.value;
                this.renderBoard();
            });
        }

        this.inputField.addEventListener('input', () => {
            if (!this.gameActive) return;

            const match = this.activeHalachos.find(h => this.matchesHalachah(h, this.inputField.value));
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
                this.scoreDisplay.textContent = `${this.correctAnswers.size} / ${this.activeHalachos.length}`;

                if (this.correctAnswers.size === this.activeHalachos.length) {
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
        this.scoreDisplay.textContent = `0 / ${this.activeHalachos.length}`;
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
            this.messageBox.textContent = "MAZEL TOV! You named them all!";
            this.messageBox.style.color = "#15803d";
            this.timerEl.style.color = "#15803d";
        } else {
            this.messageBox.textContent = this.timeRemaining <= 0 ? "Time's up!" : "Round ended — missed items shown in red.";
            this.messageBox.style.color = "#dc2626";

            this.activeHalachos.forEach(item => {
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
    const quiz = new MishnehTorahHalachosQuiz();
    quiz.initGame();
});