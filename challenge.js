"use strict";
// Selectors
const startBtn = document.querySelector("#start");
const powerBtn = document.querySelector("#on");
const strictBtn = document.querySelector("#strict");
const countScreen = document.querySelector("#turn");

const greenBtn = document.querySelector("#topleft");
const redBtn = document.querySelector("#topright");
const yellowBtn = document.querySelector("#bottomleft");
const blueBtn = document.querySelector("#bottomright");

let isOn = false;
let isStrict = false;
let step, compPattern, playerPattern, flashColors, currentLevel;
let compTurn = true;
let gameStarted = false;

// Listeners
startBtn.addEventListener("click", () => {
  if (isOn) {
    startGame();
  }
});

powerBtn.addEventListener("change", () => {
  if (powerBtn.checked) {
    isOn = true;
    countScreen.textContent = "-";
  } else {
    isOn = false;
    countScreen.textContent = "";
    clearInterval(flashColors);
    clearColor();
  }
  console.log(isOn);
});

strictBtn.addEventListener("change", () => {
  if (strictBtn.checked) {
    isStrict = true;
  } else {
    isStrict = false;
  }
});

greenBtn.addEventListener("click", () => {
  if (!compTurn) flash(greenBtn);
});
redBtn.addEventListener("click", () => {
  if (!compTurn) flash(redBtn);
});
yellowBtn.addEventListener("click", () => {
  if (!compTurn) flash(yellowBtn);
});
blueBtn.addEventListener("click", () => {
  if (!compTurn) flash(blueBtn);
});

function flash(color) {
  if (isOn && gameStarted) {
    if (color.id == "topleft") {
      greenBtn.style.backgroundColor = "lightgreen";
      let audio = document.getElementById("clip1");
      audio.play();
      if (!compTurn) playerPattern.push(1);
    }
    if (color.id == "topright") {
      redBtn.style.backgroundColor = "tomato";
      let audio = document.getElementById("clip2");
      audio.play();
      if (!compTurn) playerPattern.push(2);
    }
    if (color.id == "bottomleft") {
      yellowBtn.style.backgroundColor = "#ffff8e";
      let audio = document.getElementById("clip3");
      audio.play();
      if (!compTurn) playerPattern.push(3);
    }
    if (color.id == "bottomright") {
      blueBtn.style.backgroundColor = "lightblue";
      let audio = document.getElementById("clip4");
      audio.play();
      if (!compTurn) playerPattern.push(4);
    }
    setTimeout(() => {
      clearColor();
    }, 200);
  }
}

function clearColor() {
  greenBtn.style.backgroundColor = "darkgreen";
  redBtn.style.backgroundColor = "darkred";
  yellowBtn.style.backgroundColor = "#b3b300";
  blueBtn.style.backgroundColor = "darkblue";
}

function startGame() {
  gameStarted = true;
  compTurn = true;
  currentLevel = 1;
  countScreen.textContent = currentLevel;
  step = 0;
  compPattern = [];
  playerPattern = [];
  for (let i = 0; i < 20; i++) {
    compPattern.push(Math.trunc(Math.random() * 4) + 1);
  }

  flashColors = setInterval(runPattern(), 800);
}

function runPattern() {
  if (compTurn) {
    if (compPattern[step] === 1) flash(greenBtn);
    if (compPattern[step] === 2) flash(redBtn);
    if (compPattern[step] === 3) flash(yellowBtn);
    if (compPattern[step] === 4) flash(blueBtn);
    step++;
  }
  if (step === currentLevel) {
    setTimeout(() => {
      compTurn = false;
    }, 300);
  }

  console.log(compTurn);
}

// function checkPlayerStep() {
//   if(player)
// }
