window.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#number__input");
  const checkButton = document.querySelector(".check");
  const statusMessage = document.querySelector(".status");
  const scoreDisplay = document.querySelector(".score");
  const highScoreDisplay = document.querySelector(".highscore");
  const reloadPageButton = document.querySelector(".reload__game");

  function refreshPage() {
    window.location.reload();
  }

  let randomNumber = generateRandomNumber();
  let score = 20;
  let highScore = 0;

  function generateRandomNumber() {
    return Math.floor(Math.random() * 20);
  }

  function updateScore(updatedScore) {
    score = updatedScore;
    scoreDisplay.textContent = updatedScore;
  }

  function updateHighScore(highScore) {
    highScore = score;
    highScoreDisplay.textContent = highScore;
  }

  function endGame(score) {
    if (score <= 0) {
      score = 0;
      statusMessage.textContent = "You lost the game";
      scoreDisplay.textContent = 0;
      input.disabled = true;
      checkButton.disabled = true;
    }
  }

  function guessNumber() {
    let inputValue = parseInt(input.value);
    if (isNaN(inputValue) || inputValue === "") {
      statusMessage.textContent = "Please enter a  number";
      return;
    }
    if (inputValue == randomNumber) {
      statusMessage.textContent = "Correct Number, You win";
      document.body.style.backgroundColor = "green";
      updateHighScore(highScore);
    } else {
      statusMessage.textContent =
        inputValue < randomNumber ? "Too Low Number" : "Too High Number";
      updateScore(score - 1);
      endGame(score);
    }
  }

  checkButton.addEventListener("click", guessNumber);
  reloadPageButton.addEventListener("click", refreshPage);
});
