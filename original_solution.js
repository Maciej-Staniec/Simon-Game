// Variables
let order = [];
let playerOrder = [];
let flash, turn, good, compTurn, intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

// Selectors
const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

// Event listeners
strictButton.addEventListener("change", () => {
  if (strictButton.checked) {
    strict = true;
  } else {
    strict = false;
  }
});

onButton.addEventListener("change", () => {
  // if the game is switched on
  if (onButton.checked) {
    on = true;
    turnCounter.textContent = "-";
    // If the game is switched off
  } else {
    on = false;
    turnCounter.textContent = "";
    // We want to clear any flashing buttons when playing or winning the game
    clearColor();
    // This will stop the computer from flashing colours, because it is going to stop running gameTurn function
    clearInterval(intervalId);
  }
});

startButton.addEventListener("click", () => {
  if (on || win) {
    clearColor();
    play();
  }
});

topLeft.addEventListener("click", () => {
  // We want the player to click the button ONLY if the game is on.
  if (on) {
    // As this is topLeft button, when the player clicks it, we want to push a value of 1 to the player order.
    playerOrder.push(1);
    // Let's check if the player was right with a check() function.
    check();
    // Whether the player was right or wrong, we still want to light up this button.
    one();
    // Let's check if the player hasn't won yet.
    if (!win) {
      // If the player has't won, we want to clear the button after 300 miliseconds
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

topRight.addEventListener("click", () => {
  // We want the player to click the button ONLY if the game is on.
  if (on) {
    // As this is topLeft button, when the player clicks it, we want to push a value of 1 to the player order.
    playerOrder.push(2);
    // Let's check if the player was right with a check() function.
    check();
    // Whether the player was right or wrong, we still want to light up this button.
    two();
    // Let's check if the player hasn't won yet.
    if (!win) {
      // If the player has't won, we want to clear the button after 300 miliseconds
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomLeft.addEventListener("click", () => {
  // We want the player to click the button ONLY if the game is on.
  if (on) {
    // As this is topLeft button, when the player clicks it, we want to push a value of 1 to the player order.
    playerOrder.push(3);
    // Let's check if the player was right with a check() function.
    check();
    // Whether the player was right or wrong, we still want to light up this button.
    three();
    // Let's check if the player hasn't won yet.
    if (!win) {
      // If the player has't won, we want to clear the button after 300 miliseconds
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomRight.addEventListener("click", () => {
  // We want the player to click the button ONLY if the game is on.
  if (on) {
    // As this is topLeft button, when the player clicks it, we want to push a value of 1 to the player order.
    playerOrder.push(4);
    // Let's check if the player was right with a check() function.
    check();
    // Whether the player was right or wrong, we still want to light up this button.
    four();
    // Let's check if the player hasn't won yet.
    if (!win) {
      // If the player has't won, we want to clear the button after 300 miliseconds
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

// Functions

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  // The turn and turnCounter variables increment each time a player wins the game level.
  turn = 1;
  turnCounter.textContent = 1;
  good = true;
  // Create the game pattern
  for (let i = 0; i < 20; i++) {
    order.push(Math.trunc(Math.random() * 4) + 1);
  }
  compTurn = true;

  // Start flashing the pattern of the particular turn
  // gameTurn is going to flash colors.
  // setInterval is going to run gameTurn function every 800 miliseconds.
  // We need this, as we want the computer to flash each new step in the pattern.
  // It will flash steps until the intervalId is cleared. The intervalId will clear after all light are flashed.
  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  // As this is the computer turn to flash the pattern, we want to set the 'on' variable to false, so the player can't click any buttons during computer flashing buttons.
  on = false;

  // if the number of computer flashes are equal to the current game level, it means that the computer turn is over. If the computer turn is over, we're going to:
  if (flash == turn) {
    // once the flash equals to the actual game level, we want to stop executing the setInterval function, which was set on the intervalId variable, by clearing it with the clearInterval() function.
    clearInterval(intervalId);
    // set computer turn to false, as the computer has finished flashing buttons
    compTurn = false;
    // clear the color of the highlighted button
    clearColor();
    // Set on to true, so the player can now start pressing buttons.
    on = true;
  }

  // If the computer turn isn't over then
  if (compTurn) {
    // clear the color of the highlighted button
    clearColor();
    // setTime out is going to run a function only once, after a specified amount of time.
    // Once the compTurn() function gets called in the play() function, let's flash a button after 200 miliseconds
    setTimeout(() => {
      // the flash is a variable, which increments each time the computer flashes a button

      // if the randomly chosen number is 1, then we want to flash the topleft button
      if (order[flash] === 1) one();
      // if the randomly chosen number is 2, then we want to flash the topright button
      if (order[flash] === 2) two();
      // if the randomly chosen number is 3, then we want to flash the bottomleft button
      if (order[flash] === 3) three();
      // if the randomly chosen number is 4, then we want to flash the bottomright button
      if (order[flash] === 4) four();
      // Once the flash is performed, we've got to increment the 'flash', so it stop flashing once it equals the 'turn' variable. Otherwise it will flash the same button over and over again, because order[flash] value stays the same.
      flash++;
    }, 200);
  }
}

function one() {
  // if the noise is true, the button should play the sound
  if (noise) {
    // let's select clip1 audio file, which we embedded to the header of the html index file
    let audio = document.getElementById("clip1");
    // play audio file
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
}
function two() {
  // if the noise is true, the button should play the sound
  if (noise) {
    // let's select clip2 audio file, which we embedded to the header of the html index file
    let audio = document.getElementById("clip2");
    // play audio file
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}

function three() {
  // if the noise is true, the button should play the sound
  if (noise) {
    // let's select clip3 audio file, which we embedded to the header of the html index file
    let audio = document.getElementById("clip3");
    // play audio file
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "#ffff8e";
}

function four() {
  // if the noise is true, the button should play the sound
  if (noise) {
    // let's select clip4 audio file, which we embedded to the header of the html index file
    let audio = document.getElementById("clip4");
    // play audio file
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightblue";
}

function clearColor() {
  // to avoid using conditional statement to check which button got highlighted, the easiest and shortest way to do this is change all button colors to their original state.
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "#b3b300";
  bottomRight.style.backgroundColor = "darkblue";
}

// When the player presses a wrong button, all buttons will flash.
function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "#ffff8e";
  bottomRight.style.backgroundColor = "lightblue";
}

function check() {
  // Check if the current button clicked by the player is different from the button indicated by the game. To do this, we have to pass in an index of the current playerOrder array lenght - 1 (because arrays index starts from 0, unlike the length which starts from 1). If it's different, then the game is over.
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  // check if the player has won the game by checking if the playerOrder lenght equals to 20 and whether the good equals to true (to check if the player got the last click right too)
  if (playerOrder.length === 20 && good) {
    winGame();
  }
  // if the player pressed the wrong button
  if (!good) {
    // Flash all buttons
    flashColor();
    // Set turn counter to 'NO!'
    turnCounter.textContent = "NO!";
    // Once we display 'NO!', let's display back the current game level
    setTimeout(() => {
      //Because we changed the background color with flashColor(), we want to set it back to its original state
      clearColor();
      // Now, if we use strict mode, we want to start the game over. Don't worry about the previous turnCounter.textContent = turn statement. Everything will happen in a few miliseconds, so we won't see it. Instead, it will restart the game.
      if (strict) {
        play();
        // If we don't use a strict mode, let's repeat that round.
      } else {
        // Let the computer show the previous game pattern once again.
        // The turn goes back to the computer
        compTurn = true;
        // The game level remains the same.
        turnCounter.textContent = turn;
        // The computer has to start pattern indication from the beginning
        flash = 0;
        // Because the player clicked a wrong button, we want to clear their existing input, so that they input the game pattern from the scratch.
        playerOrder = [];
        // Let's set the good variable back to true, so the player can pick up from where they left off.
        good = true;
        // Start over flashing the pattern of the particular turn
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);
    // Once the player pressed a wrong button, we don't want to play the sound. We want to play the sound only if the player pressed the right button.
    noise = false;
  }
  // The last if statement will check whether the player finished pressing the pattern without making a mistake, but he hasn't won the game yet
  if (turn == playerOrder.length && good && !win) {
    // Let's move to the next turn (next game Level)
    console.log("all good");
    turn++;
    // Let's clear the existing pattern from the playerOrder array, which was indicated previously by the player trying to press buttons in the right order. We want to start the pattern from the beginning each time the player advances to the next level.
    playerOrder = [];
    // The turn goes back to the computer
    compTurn = true;
    // The computer pattern flashing has to start from the beginning
    flash = 0;
    // The "turn" gets incremented, and we've got to update the turnCounter element value.
    turnCounter.textContent = turn;
    // Start flashing the pattern of the next turn
    intervalId = setInterval(gameTurn, 800);
  }
}

function winGame() {
  flashColor();
  turnCounter.textContent = "WIN!";
  // In order to prevent user from clicking buttons, we've got to set the 'on' value to false.
  on = false;
  win = true;
}
