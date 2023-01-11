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

function startGame() {}
