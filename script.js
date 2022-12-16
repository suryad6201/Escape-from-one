"use strict";

//Selecting Elements;
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const namePlayer0 = document.querySelector("#name--0");
const namePlayer1 = document.querySelector("#name--1");

//Modal Window
const modalWindow = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModal = document.querySelector(".close-modal");

//Button Elements
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const instruction = document.querySelector(".btn--instruction");

//Audio Elements
const victory = document.querySelector("#victory");
const newGame = document.querySelector("#newGame");
const diceAudio = document.querySelector("#diceAudio");
const holdAudio = document.querySelector("#holdAudio");
const switchAudio = document.querySelector("#switchAudio");
const instructionAudio = document.querySelector("#instructionAudio");

let player0 =
  prompt(`Note: Sorry! Game is not responsive..Please play in PC or Laptop for better experience. 

'Player 1', Please enter your name:`); //Getting the player names
let player1 =
  prompt(`Note: Sorry! Game is not responsive..Please play in PC or Laptop for better experience.

'Player 2', Please enter your name:`);

//Display Player name if nothing entered in player prompt.
player0 = player0 === "" ? "Player 1" : player0;
player1 = player1 === "" ? "Player 2" : player1;

let currentScore, activePlayer, scores, playable, players;

//Initiating Function
const initiate = function () {
  players = [player0, player1]; //Storing the player names to players
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playable = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  namePlayer0.textContent = player0;
  namePlayer1.textContent = player1;
};
initiate();

//Instruction Modal Window
const hideModal = function () {
  //Function to hide Modal Window
  modalWindow.classList.add("hidden");
  overlay.classList.add("hidden");
};
const showModal = function () {
  //Function to show Modal Window
  modalWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//To show instruction modal window when instruction btn is pressed
instruction.addEventListener("click", function () {
  instructionAudio.play();
  showModal();
});

//To close the modal window on button click, overlay click and Escape Key down
closeModal.addEventListener("click", hideModal);
overlay.addEventListener("click", hideModal);
document.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Escape") {
    if (!modalWindow.classList.contains("hidden")) {
      hideModal();
    }
  }
});

//Function to Switch Player
const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//To roll the dice when roll dice btn is clicked.
btnRoll.addEventListener("click", function () {
  if (playable) {
    let dice = Math.floor(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${dice}.png`;

    if (dice != 1) {
      //Execute if dice is not equal to 1(add dice score to currentScore)
      diceAudio.pause();
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      diceAudio.play();
    } else {
      //Switch player if dice is 1
      switchAudio.play(); //audio plays while player is switched
      switchPlayer();
    }
  }
});

//To hold the currentScore
btnHold.addEventListener("click", function () {
  if (playable) {
    holdAudio.play(); //audio plays while hold is clicked

    //Adding current point to score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Declaring the winning condition
    if (scores[activePlayer] >= 100) {
      diceEl.src = `images/escape.png`;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      document.querySelector(
        `#name--${activePlayer}`
      ).textContent = `${players[activePlayer]} Escaped!`;

      holdAudio.pause();
      victory.play(); //audio plays on victory.

      playable = false;
    } else {
      switchPlayer(); //switch Player if not won(<100).
    }
  }
});

//Resetting the game

btnNew.addEventListener("click", function () {
  newGame.play(); //audio plays on newgame
  victory.pause();
});

btnNew.addEventListener("click", initiate); //Resetting game when new game is clicked
