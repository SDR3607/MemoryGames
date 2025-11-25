const games = [
    { name: "Mishna Quiz", url: "../Quizzes/MishnaQuiz/Mishna.html" },
    { name: "Quiz 2: Coming Soon", url: "#" },
    { name: "Quiz 3: Coming Soon", url: "#" }
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