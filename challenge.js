// "use strict";
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
let step, compPattern, playerPattern, flashSteps, currentLevel, isGoodAnswer;
let gameStarted = false;
let win = false;
let compTurn = true;
// Listeners
startBtn.addEventListener("click", () => {
  if (isOn || win) {
    startGame();
    clearColors();
  }
});

powerBtn.addEventListener("change", () => {
  if (powerBtn.checked) {
    isOn = true;
    countScreen.textContent = "-";
  } else {
    isOn = false;
    countScreen.textContent = "";
    clearInterval(flashSteps);
    clearColors();
  }
});

strictBtn.addEventListener("change", () => {
  if (strictBtn.checked) {
    isStrict = true;
  } else {
    isStrict = false;
  }
});

greenBtn.addEventListener("click", () => {
  if (isOn && !compTurn) {
    flash(greenBtn);
    playerPattern.push(1);
    console.log(`playerPattern.push(1), player pattern = ${playerPattern}`);
    checkPlayerStep();
  }
});
redBtn.addEventListener("click", () => {
  if (isOn && !compTurn) {
    flash(redBtn);
    playerPattern.push(2);
    console.log(`playerPattern.push(2), player pattern = ${playerPattern}`);
    checkPlayerStep();
  }
});
yellowBtn.addEventListener("click", () => {
  if (isOn && !compTurn) {
    flash(yellowBtn);
    playerPattern.push(3);
    console.log(`playerPattern.push(3), player pattern = ${playerPattern}`);
    checkPlayerStep();
  }
});
blueBtn.addEventListener("click", () => {
  if (isOn && !compTurn) {
    flash(blueBtn);
    playerPattern.push(4);
    console.log(`playerPattern.push(4), player pattern = ${playerPattern}`);
    checkPlayerStep();
  }
});

function flash(color) {
  if (gameStarted) {
    if (color.id == "topleft") {
      greenBtn.style.backgroundColor = "lightgreen";
      let audio = document.getElementById("clip1");
      audio.play();
      if (!win) clearColors();
    }
    if (color.id == "topright") {
      redBtn.style.backgroundColor = "tomato";
      let audio = document.getElementById("clip2");
      audio.play();
      if (!win) clearColors();
    }
    if (color.id == "bottomleft") {
      yellowBtn.style.backgroundColor = "#ffff8e";
      let audio = document.getElementById("clip3");
      audio.play();
      if (!win) clearColors();
    }
    if (color.id == "bottomright") {
      blueBtn.style.backgroundColor = "lightblue";
      let audio = document.getElementById("clip4");
      audio.play();
      if (!win) clearColors();
    }
  }
}

function clearColors() {
  setTimeout(() => {
    greenBtn.style.backgroundColor = "darkgreen";
    redBtn.style.backgroundColor = "darkred";
    yellowBtn.style.backgroundColor = "#b3b300";
    blueBtn.style.backgroundColor = "darkblue";
  }, 400);
}

function flashColors() {
  greenBtn.style.backgroundColor = "lightgreen";
  redBtn.style.backgroundColor = "tomato";
  yellowBtn.style.backgroundColor = "#ffff8e";
  blueBtn.style.backgroundColor = "lightblue";
}

function startGame() {
  isGoodAnswer = true;
  gameStarted = true;
  compTurn = true;
  flashSteps = 0;
  currentLevel = 1;
  countScreen.textContent = currentLevel;
  step = 0;
  compPattern = [];
  playerPattern = [];
  for (let i = 0; i < 20; i++) {
    compPattern.push(Math.trunc(Math.random() * 4) + 1);
  }

  flashSteps = setInterval(runPattern, 800);
}

function runPattern() {
  isOn = false;
  if (compTurn && gameStarted) {
    if (compPattern[step] === 1) flash(greenBtn);
    if (compPattern[step] === 2) flash(redBtn);
    if (compPattern[step] === 3) flash(yellowBtn);
    if (compPattern[step] === 4) flash(blueBtn);
    step++;
  }
  console.log(`step = ${step}, currentLevel = ${currentLevel}`);
  if (step === currentLevel) {
    isOn = true;
    compTurn = false;
    clearInterval(flashSteps);
  }
  console.log(`compTurn = ${compTurn}, isOn = ${isOn}`);
}

function checkPlayerStep() {
  if (
    playerPattern[playerPattern.length - 1] !=
    compPattern[playerPattern.length - 1]
  ) {
    console.log(
      `playerPattern[step - 1] != compPattern[step - 1] = ${
        playerPattern[step - 1] != compPattern[step - 1]
      }`
    );
    console.log(playerPattern[step - 1], compPattern[step - 1]);
    isGoodAnswer = false;
  }

  if (playerPattern.length === 3 && isGoodAnswer) {
    won();
  }

  if (!isGoodAnswer) {
    countScreen.textContent = "NO!";

    if (isStrict) {
      setTimeout(() => {
        startGame();
      }, 800);
    } else {
      flashColors();
      compTurn = true;
      playerPattern = [];
      isGoodAnswer = true;
      step = 0;
      clearInterval(flashSteps);
      setTimeout(() => {
        countScreen.textContent = currentLevel;
        clearColors();
        flashSteps = setInterval(runPattern(), 800);
      }, 1000);
    }
    // TODO
  }

  if (playerPattern.length === currentLevel && isGoodAnswer && !win) {
    step = 0;
    playerPattern = [];
    currentLevel++;
    countScreen.textContent = currentLevel;
    compTurn = true;
    flashSteps = setInterval(runPattern, 800);
  }
}

function won() {
  countScreen.textContent = "WON!";
  flashColors();
  win = true;
  isOn = false;
  gameStarted = false;
  clearInterval(flashSteps);
}
