document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#minesweeper');
    const resetButton = document.querySelector('#reset-button');
    const width = 10;
    const height = 10;
    const minesCount = 20;
    let cells = [];
    let isGameOver = false;

    function createBoard() {
        const minesArray = Array(minesCount).fill('mine');
        const emptyArray = Array(width * height - minesCount).fill('empty');
        const gameArray = emptyArray.concat(minesArray);
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

        for (let i = 0; i < width * height; i++) {
            const cell = document.createElement('div');
            cell.setAttribute('id', i);
            cell.classList.add('cell');
            cell.classList.add(shuffledArray[i]);
            grid.appendChild(cell);
            cells.push(cell);

            cell.addEventListener('click', () => {
                if (isGameOver) return;
                if (cell.classList.contains('revealed')) return;
                if (cell.classList.contains('mine')) {
                    gameOver();
                } else {
                    revealCell(cell);
                }
            });

            cell.oncontextmenu = function (e) {
                e.preventDefault();
                if (isGameOver) return;
                if (!cell.classList.contains('revealed')) {
                    cell.classList.toggle('flag');
                }
            };
        }

        for (let i = 0; i < cells.length; i++) {
            let total = 0;
            const isLeftEdge = (i % width === 0);
            const isRightEdge = (i % width === width - 1);

            if (cells[i].classList.contains('empty')) {
                if (i > 0 && !isLeftEdge && cells[i - 1].classList.contains('mine')) total++;
                if (i > 9 && !isRightEdge && cells[i + 1 - width].classList.contains('mine')) total++;
                if (i > 10 && cells[i - width].classList.contains('mine')) total++;
                if (i > 11 && !isLeftEdge && cells[i - 1 - width].classList.contains('mine')) total++;
                if (i < 98 && !isRightEdge && cells[i + 1].classList.contains('mine')) total++;
                if (i < 90 && !isLeftEdge && cells[i - 1 + width].classList.contains('mine')) total++;
                if (i < 88 && !isRightEdge && cells[i + 1 + width].classList.contains('mine')) total++;
                if (i < 89 && cells[i + width].classList.contains('mine')) total++;
                cells[i].setAttribute('data', total);
            }
        }
    }

    function revealCell(cell) {
        const currentId = cell.id;
        if (cell.classList.contains('revealed')) return;
        cell.classList.add('revealed');
        const total = cell.getAttribute('data');
        if (total != 0) {
            cell.innerHTML = total;
            return;
        }
        const isLeftEdge = (currentId % width === 0);
        const isRightEdge = (currentId % width === width - 1);

        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = cells[parseInt(currentId) - 1].id;
                const newCell = document.getElementById(newId);
                revealCell(newCell);
            }
            if (currentId > 9 && !isRightEdge) {
                const newId = cells[parseInt(currentId) + 1 - width].id;
                const newCell = document.getElementById(newId);
                revealCell(newCell);
            }
            if (currentId > 10) {
                const newId = cells[parseInt(currentId - width)].id;
                const newCell = document.getElementById(newId);
                revealCell(newCell);
            }
            if (currentId > 11 && !isLeftEdge) {
                const newId = cells[parseInt(currentId) - 1 - width].id;
                const newCell = document.getElementById(newId);
                revealCell(newCell);
            }
            if (currentId < 98 && !isRightEdge) {
                const newId = cells[parseInt(currentId) + 1].id;
                const newCell = document.getElementById(newId);
                revealCell(newCell);
            }
            if (currentId < 90 && !isLeftEdge) {
                const newId = cells[parseInt(currentId) - 1 + width].id;
                const newCell = document.getElementById(newId);
                revealCell(newCell);
            }
            if (currentId < 88 && !isRightEdge) {
                const newId = cells[parseInt(currentId) + 1 + width].id;
                const newCell = document.getElementById(newId);
                revealCell(newCell);
            }
            if (currentId < 89) {
                const newId = cells[parseInt(currentId) + width].id;
                const newCell = document.getElementById(newId);
                revealCell(newCell);
            }
        }, 10);
    }

    function gameOver() {
        isGameOver = true;
        cells.forEach(cell => {
            if (cell.classList.contains('mine')) {
                cell.classList.add('revealed');
                cell.innerHTML = '💣';
            }
        });
    }

    resetButton.addEventListener('click', () => {
        grid.innerHTML = '';
        cells = [];
        isGameOver = false;
        createBoard();
    });

    createBoard();
});
