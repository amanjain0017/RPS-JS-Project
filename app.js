//DOM elements being used in code
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const rulesBtn = document.getElementById("rulesBtn");
const cancelBtn = document.getElementById("cancelBtn");
const nextBtn = document.querySelector(".next-button");
const playAgainBtn = document.querySelectorAll(".playAgainBtn");
const rulesPopup = document.getElementById("rulesPopup");
const choices = document.querySelectorAll(".choices .choice");

const gameContainer = document.querySelector(".game-container");
const hurrayContainer = document.querySelector(".hurray-container");
const gameOutcomeContainer = document.querySelector(".game-outcome-container");
const headingContainer = document.querySelector(".heading-container");

const gameMessage = document.querySelector(".game-mssg");
const playerPickContainer = document.querySelector(".player-choice .choice");
const pcPickContainer = document.querySelector(".computer-choice .choice");
const playerPickImg = document.querySelector(".player-choice .choice img");
const pcPickImg = document.querySelector(".computer-choice .choice img");

// game variables
let playerScore = 0;
let computerScore = 0;

const gameOptions = ["rock", "paper", "scissors"];

//Intialize Game
const startGame = () => {
  getScores();
  updateScoreBoard();
  attachEventListenrs();
  hideAllContainers();
  headingContainer.classList.remove("hidden");
  gameContainer.classList.remove("hidden");
  removeNextButton();
};

//Local Storage Logic
const saveScores = () => {
  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("computerScore", computerScore);
};

const getScores = () => {
  playerScore = parseInt(localStorage.getItem("playerScore")) || 0;
  computerScore = parseInt(localStorage.getItem("computerScore")) || 0;
};

const updateScoreBoard = () => {
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
};

//Game Logic
const hideAllContainers = () => {
  gameContainer.classList.add("hidden");
  hurrayContainer.classList.add("hidden");
  gameOutcomeContainer.classList.add("hidden");
  headingContainer.classList.add("hidden");

  removeNextButton();
};

const getComputerChoice = () => {
  const randomIndex = Math.floor(Math.random() * gameOptions.length);
  return gameOptions[randomIndex];
};

const findWinner = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) {
    return "tie";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "player";
  } else {
    return "computer";
  }
};

const playRound = (playerChoice) => {
  const computerChoice = getComputerChoice();
  const winner = findWinner(playerChoice, computerChoice);

  displayChoiceAndResult(playerChoice, computerChoice);

  playerPickContainer.classList.remove("winner-effect");
  pcPickContainer.classList.remove("winner-effect");

  if (winner === "player") {
    playerScore++;
    gameMessage.innerHTML = "YOU WIN <br>AGAINST PC";
    setupNextButton();
    playerPickContainer.classList.add("winner-effect");
  } else if (winner === "computer") {
    computerScore++;
    gameMessage.innerHTML = "YOU LOSE <br>AGAINST PC";
    removeNextButton();
    pcPickContainer.classList.add("winner-effect");
  } else {
    gameMessage.textContent = "TIE UP";
    removeNextButton();
  }

  saveScores();
  updateScoreBoard();
};

const displayChoiceAndResult = (playerChoice, computerChoice) => {
  hideAllContainers();
  gameOutcomeContainer.classList.remove("hidden");
  headingContainer.classList.remove("hidden");

  //updating images and classes of plaer and pc
  playerPickContainer.className = `choice ${playerChoice}`;
  pcPickContainer.className = `choice ${computerChoice}`;

  playerPickImg.src = `./assets/${playerChoice}.png`;
  pcPickImg.src = `./assets/${computerChoice}.png`;
};

const resetGame = () => {
  hideAllContainers();
  headingContainer.classList.remove("hidden");
  gameContainer.classList.remove("hidden");
  removeNextButton();
};

// --- Next Button (for player win scenario) ---
function setupNextButton() {
  nextBtn.classList.remove("hidden"); // Show the pre-existing next button
}

function removeNextButton() {
  nextBtn.classList.add("hidden"); // Hide the pre-existing next button
}

//Event Listeners
const attachEventListenrs = () => {
  rulesBtn.addEventListener("click", () => {
    rulesPopup.classList.remove("hidden");
  });

  cancelBtn.addEventListener("click", () => {
    rulesPopup.classList.add("hidden");
  });

  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      const playerChoice = e.currentTarget.classList[1];
      playRound(playerChoice);
    });
  });

  nextBtn.addEventListener("click", () => {
    hideAllContainers();
    hurrayContainer.classList.remove("hidden");
    removeNextButton();
  });

  playAgainBtn.forEach((button) => {
    button.addEventListener("click", resetGame);
  });
};

//Start Game First Time
startGame();
