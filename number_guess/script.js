document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game');
    const newGameButton = document.getElementById('new-game');
    let secretNumber = generateSecretNumber();

    function generateSecretNumber() {
        return Array.from({ length: 5 }, () => Math.floor(Math.random() * 10));
    }

    function createGuessRow() {
        const row = document.createElement('div');
        row.classList.add('guess-row');

        for (let i = 0; i < 5; i++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.max = 9;
            input.min = 0;
            row.appendChild(input);
        }

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', () => checkGuess(row));
        row.appendChild(submitButton);

        gameContainer.appendChild(row);
    }

    function checkGuess(row) {
        const inputs = row.querySelectorAll('input');
        let correctCount = 0;

        inputs.forEach((input, index) => {
            const value = parseInt(input.value, 10);
            if (value === secretNumber[index]) {
                input.classList.add('correct');
                input.classList.remove('incorrect');
                correctCount++;
            } else {
                input.classList.add('incorrect');
                input.classList.remove('correct');
            }
        });

        if (correctCount === 5) {
            alert('Congratulations! You guessed the number!');
        } else {
            createGuessRow();
        }
    }

    newGameButton.addEventListener('click', () => {
        gameContainer.innerHTML = '';
        secretNumber = generateSecretNumber();
        createGuessRow();
    });

    createGuessRow();
});