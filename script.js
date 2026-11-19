const display = document.getElementById('display');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');

let elapsed = 0;
let startedAt = 0;
let intervalId = null;

function formatTime(milliseconds) {
  const centiseconds = Math.floor(milliseconds / 10);
  const hours = Math.floor(centiseconds / 360000);
  const minutes = Math.floor((centiseconds % 360000) / 6000);
  const seconds = Math.floor((centiseconds % 6000) / 100);
  const fraction = centiseconds % 100;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':') + `.${String(fraction).padStart(2, '0')}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsed + (intervalId ? performance.now() - startedAt : 0));
}

startButton.addEventListener('click', () => {
  if (intervalId) return;

  startedAt = performance.now();
  intervalId = setInterval(updateDisplay, 10);
  startButton.disabled = true;
  pauseButton.disabled = false;
});

pauseButton.addEventListener('click', () => {
  if (!intervalId) return;

  elapsed += performance.now() - startedAt;
  clearInterval(intervalId);
  intervalId = null;
  updateDisplay();
  startButton.disabled = false;
  pauseButton.disabled = true;
});

resetButton.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  elapsed = 0;
  updateDisplay();
  startButton.disabled = false;
  pauseButton.disabled = true;
});
