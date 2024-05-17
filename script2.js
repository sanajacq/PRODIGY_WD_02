let timer;
let startTime;
let running = false;

const display = document.querySelector('.display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startStop() {
    if (running) {
        clearInterval(timer);
        running = false;
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now() - (pausedTime || 0);
        timer = setInterval(updateDisplay, 100);
        running = true;
        startStopButton.textContent = 'Pause';
    }
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsDisplay = Math.floor((milliseconds % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${millisecondsDisplay.toString().padStart(2, '0')}`;
}

let pausedTime = 0;

function reset() {
    clearInterval(timer);
    display.textContent = '00:00:00';
    running = false;
    startStopButton.textContent = 'Start';
    pausedTime = 0;
    lapsList.innerHTML = '';
}

function lap() {
    const lapTime = Date.now() - startTime - pausedTime;
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(lapTime);
    lapsList.prepend(lapItem);
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
