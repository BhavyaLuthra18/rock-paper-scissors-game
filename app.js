//DOM

// Prevent animation on load

setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

//Dom
const btnRules = document.querySelector(".rules-btn");

const btnClose = document.querySelector(".close-btn");

const modalRules = document.querySelector(".modal");

const choiceButtons = document.querySelectorAll(".choice-btn");

const gameDiv = document.querySelector(".game");

const resultsDiv = document.querySelector(".results");

const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");

const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score__number");

/* ---Sounds--- */

let scoreMinus = new Audio((src = "Sounds/bad.mp3"));
let scorePlus = new Audio((src = "Sounds/good.mp3"));
let scoreminus = new Audio((src = "Sounds/bad.mp3"));
let clickSound = new Audio((src = "Sounds/click.mp3"));
let drawSound = new Audio((src = "Sounds/draw.mp3"));
let loseSound = new Audio((src = "Sounds/loser.mp3"));
let winSound = new Audio((src = "Sounds/win.mp3"));

/*----Choices ------*/

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];


//variables
let score = 0;

//Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice; // dataset = dataChoice
    // userChoice => CHOICES.name  === datachoice
    const userChoice = CHOICES.find((choice) => choice.name === choiceName);
    choose(userChoice);
  });
});

// processing the userChoice
function choose(userChoice) {
  clickSound.play();
  const aichoice = aiChoose();
  results = [userChoice, aichoice];

  displayResults(results);
  displayWinner(results);
}
//Ai choice
function aiChoose() {
  const random = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[random];
  clickSound.play();
}
//Display Results
function displayResults(results) {
  resultDivs.forEach((resultsDiv, idx) => {
    setTimeout(() => {
      resultsDiv.innerHTML = `<div class="choice ${results[idx].name}"><img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}"/>
</div>

`;
    }, idx * 1000);
  });
  // To hide the gameDiv and show the results
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

// Displaying winner
function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse()); // reverse the order where ai choose cfirst then user choose
    if (userWins) {
      resultText.innerText = "you win";
      resultDivs[0].classList.toggle("winner");
      winSound.play();
      keepScore(1);
      scorePlus.play();
    } else if (aiWins) {
      resultText.innerText = "you lose";
      resultDivs[1].classList.toggle("winner");
      loseSound.play();
      keepScore(-1);
      scoreMinus.play();
    } else {
      resultText.innerText = "draw";
      drawSound.play();
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore(point) {
  score += point;
  scoreNumber.innerText = score;
}

// play Again

playAgainBtn.addEventListener("click", () => {
  clickSound.play();
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultsDiv) => {
    resultsDiv.innerHTML = "";
    resultsDiv.classList.remove("winner");
  });

  resultText.innerHTML = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

//Show hide rules
btnRules.addEventListener("click", () => {
  clickSound.play();
  modalRules.classList.toggle("show-modal");
});

btnClose.addEventListener("click", () => {
  clickSound.play();
  modalRules.classList.toggle("show-modal");
});
