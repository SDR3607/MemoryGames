const games = [
    { name: "Melachos Quiz", meta: "39 Categories • Hebrew & English", url: "../Quizzes/MelachosQuiz/Melachos.html" },
    { name: "Mishna Quiz", meta: "63 Tractates • 6 Sedarim", url: "../Quizzes/MishnaQuiz/Mishna.html" },
    { name: "Mishneh Torah Books Quiz", meta: "14 Sefarim • Rambam", url: "../Quizzes/MishnehTorahBooksQuiz/MishnehTorahBooks.html" },
    { name: "Mishneh Torah Halachos Quiz", meta: "All Halachos by Sefer • Rambam", url: "../Quizzes/MishnehTorahHalachosQuiz/MishnehTorahHalachos.html" },
    { name: "Name the Neviim Quiz", meta: "55 Prophets • Tanach", url: "../Quizzes/NameTheNeviimQuiz/NameTheNeviim.html" },
    { name: "Parsha Quiz", meta: "54 Weekly Portions • Torah", url: "../Quizzes/ParshaQuiz/Parsha.html" },
    { name: "Tanach Quiz", meta: "24 Books • Torah, Neviim, Kesuvim", url: "../Quizzes/TanachQuiz/Tanach.html" },
    { name: "Trei Asar Quiz", meta: "12 Minor Prophets • Tanach", url: "../Quizzes/TreiAsarQuiz/TreiAsar.html" }
];

const gameListContainer = document.getElementById('game-list');

games.forEach((game, index) => {
    const cardLink = document.createElement('a');
    cardLink.href = game.url;
    cardLink.classList.add('game-btn');

    const num = document.createElement('span');
    num.classList.add('game-num');
    num.textContent = String(index + 1).padStart(2, '0');

    const textWrap = document.createElement('span');
    textWrap.classList.add('game-text');

    const title = document.createElement('span');
    title.classList.add('game-title');
    title.textContent = game.name;

    const meta = document.createElement('span');
    meta.classList.add('game-meta');
    meta.textContent = game.meta;

    textWrap.appendChild(title);
    textWrap.appendChild(meta);

    const arrow = document.createElement('span');
    arrow.classList.add('game-arrow');
    arrow.textContent = "→";

    cardLink.appendChild(num);
    cardLink.appendChild(textWrap);
    cardLink.appendChild(arrow);

    gameListContainer.appendChild(cardLink);
});