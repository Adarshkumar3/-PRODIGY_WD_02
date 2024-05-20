const timeDisplay = document.querySelector('.time');
const millisecondsDisplay = document.querySelector('.milliseconds');
const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const resetBtn = document.querySelector('.reset-btn');
const lapBtn = document.querySelector('.lap-btn');
const lapsList = document.querySelector('.laps');

let startTime = null;
let elapsedTime = 0;
let intervalId = null;
let laps = [];

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(value, length = 2) {
  return String(value).padStart(length, '0');
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  intervalId = setInterval(updateTimer, 10);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  lapBtn.disabled = false;
}

function stopTimer() {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
  lapBtn.disabled = false;
}

function resetTimer() {
  clearInterval(intervalId);
  elapsedTime = 0;
  laps = [];
  lapsList.innerHTML = '';
  timeDisplay.textContent = '00:00:00';
  millisecondsDisplay.textContent = '.000';
  startBtn.disabled = false;
  stopBtn.disabled = true;
  lapBtn.disabled = true;
  resetBtn.disabled = true;
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
  millisecondsDisplay.textContent = `.${padZero(elapsedTime % 1000, 3)}`;
}

function lapTimer() {
  const lapTime = formatTime(elapsedTime);
  const milliseconds = padZero(elapsedTime % 1000, 3);
  laps.push(`${lapTime}.${milliseconds}`);
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${laps.length}: ${lapTime}.${milliseconds}`;
  lapsList.appendChild(lapItem);
  lapsList.scrollTop = lapsList.scrollHeight;
  resetBtn.disabled = false;
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);