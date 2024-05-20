const words = ['cat', 'dog', 'house', 'plane', 'flower'];
let currentWord = '';
let timer;
let timeLeft = 20;

const wordElement = document.getElementById('word');
const timerElement = document.getElementById('timer');
const feedbackContainer = document.getElementById('feedback-container');
const tryAgainButton = document.getElementById('try-again');
const historyList = document.getElementById('history-list');
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.width = 400;
canvas.height = 400;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

function startDrawing(e) {
    drawing = true;
    draw(e);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function startGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    wordElement.textContent = currentWord;
    timeLeft = 20;
    timerElement.textContent = `Time left: ${timeLeft}s`;
    feedbackContainer.style.display = 'none';
    tryAgainButton.style.display = 'none';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft === 0) {
        clearInterval(timer);
        feedbackContainer.style.display = 'block';
        tryAgainButton.style.display = 'block';
    }
}

document.getElementById('thumbs-up').addEventListener('click', () => {
    addToHistory(currentWord, '👍');
    startGame();
});

document.getElementById('thumbs-down').addEventListener('click', () => {
    addToHistory(currentWord, '👎');
    startGame();
});

tryAgainButton.addEventListener('click', startGame);

function addToHistory(word, feedback) {
    const listItem = document.createElement('li');
    listItem.textContent = `${word} ${feedback}`;
    historyList.appendChild(listItem);
}

startGame();const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
document.getElementById('clearButton').addEventListener('click', clearCanvas);

function startDrawing(e) {
    drawing = true;
    draw(e);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}