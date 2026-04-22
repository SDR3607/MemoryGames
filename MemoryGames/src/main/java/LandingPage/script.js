const games = [
    { name: "Mishna Quiz", url: "../Quizzes/MishnaQuiz/Mishna.html" },
    { name: "Name the Neviim Quiz", url: "../Quizzes/NameTheNeviimQuiz/NameTheNeviim.html" },
    { name: "Parsha Quiz", url: "../Quizzes/ParshaQuiz/Parsha.html" },
    { name: "Tanach Quiz", url: "../Quizzes/TanachQuiz/Tanach.html" },
    { name: "Trei Asar Quiz", url: "../Quizzes/TreiAsarQuiz/TreiAsar.html" },
];

// 2. Select the HTML container where we want to put the buttons
const gameListContainer = document.getElementById('game-list');

// 3. Loop through the games array and create a button for each
games.forEach(game => {
    // Create an anchor tag (link) meant to look like a button
    const button = document.createElement('a');

    // Set the text and the link
    button.textContent = game.name;
    button.href = game.url;

    // Add the CSS class for styling
    button.classList.add('game-btn');

    // Add the new button to the page
    gameListContainer.appendChild(button);
});