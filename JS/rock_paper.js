// MODAL
const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modalContent");
const btnOpenModal = document.querySelector("#openModal");
const xCloseModal = document.querySelector("#closeModal");

btnOpenModal.addEventListener("click", () => {
  modal.style.display = "block";
  modalContent.style.top = 0;
})

xCloseModal.addEventListener("click", () => {
  modal.style.display = "none";
})

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
})
//Generales
const allChoices = ["rock", "paper", "scissors", "lizard", "spock"];
const startPage = document.querySelector("#startPage");
const arrChoices = startPage.querySelectorAll("div");
const resultPage = document.querySelector("#resultPage");
const containerScore = document.querySelectorAll(".score")[0];
const score = document.querySelector("#score");
const userIcon = resultPage.querySelector("#userIcon")
const houseIcon = resultPage.querySelector("#houseIcon")
const messageWhoWin = document.querySelector("#whoWin");
const playAgainButton = document.querySelector("#playAgain");
//Sonidos

const audioUserChoice = document.querySelector("[data-sound=user-choice]");
const audioYouWin = document.querySelector("[data-sound=you-win]");
const audioYouLose = document.querySelector("[data-sound=you-lose]");
const audioDraw = document.querySelector("[data-sound=draw]");
//Iniciar_Juego
const handleClick = (event) => {
  audioUserChoice.play();
  document.body.classList.toggle("result")
  userIcon.classList.remove("rock", "paper", "scissors", "lizard", "spock");
  houseIcon.classList.remove("rock", "paper", "scissors", "lizard", "spock");
  playAgainButton.style.display = "none";
  messageWhoWin.style.display = "none";
  houseIcon.style.display = "none";

  const userPlayerChoice = event.target.dataset.choice;
  const housePlayerIndex = Math.floor(Math.random() * 5);
  const housePlayerChoice = allChoices[housePlayerIndex];

  startPage.style.display = "none";
  resultPage.style.display = "block";
  userIcon.classList.toggle(userPlayerChoice);
  scoreTotal = 0;
  // Resultados
  whoWin = () => {
    scoreTotal = parseInt(score.innerHTML);
    let showScoreTotal = () => {
      setTimeout(() => {
        score.innerHTML = scoreTotal;
        let bgScore = scoreTotal < 0 ? "hsl(0, 100%, 50%)" : scoreTotal == 0 ? "hsl(0, 0%, 100%)" : "rgb(183, 241, 183)";
        containerScore.style.backgroundColor = bgScore;
      }, 1000);
    };
    // Juego activo
    if (userPlayerChoice == housePlayerChoice) {
      messageWhoWin.innerHTML = "<div id=\"draw-message\">Draw!<div>";
      setTimeout(() => { audioDraw.play() }, 1000);
    } else if (
      userPlayerChoice == "scissors" && (housePlayerChoice == "spock" || housePlayerChoice == "rock") ||

      userPlayerChoice == "spock" && (housePlayerChoice == "paper" || housePlayerChoice == "lizard") ||

      userPlayerChoice == "paper" && (housePlayerChoice == "scissors" || housePlayerChoice == "lizard") ||

      userPlayerChoice == "lizard" && (housePlayerChoice == "scissors" || housePlayerChoice == "rock") ||

      userPlayerChoice == "rock" && (housePlayerChoice == "spock" || housePlayerChoice == "paper")
    ) {
      messageWhoWin.innerHTML = "<div id=\"you-lose-message\">You lose... </div>";
      scoreTotal = scoreTotal - 1;
      setTimeout(() => { audioYouLose.play() }, 1000);
      showScoreTotal();
    } else {
      messageWhoWin.innerHTML = "<div id=\"you-win-message\">You win!</div>";
      scoreTotal = scoreTotal + 1;
      setTimeout(() => { audioYouWin.play() }, 1000);
      showScoreTotal();
    };
  };

  setTimeout(() => {
    whoWin();
  }, 1000);

  setTimeout(() => {
    houseIcon.style.display = "block";
    houseIcon.classList.add(housePlayerChoice);
    setTimeout(() => {
      messageWhoWin.style.display = "block";
      playAgainButton.style.display = "block";
    }, 1000);
  }, 1000);
};

for (let el of arrChoices) {
  el.addEventListener("click", handleClick);
  el.addEventListener("keypress", handleClick);
};

playAgainButton.addEventListener("click", () => {
  document.body.classList.remove("result");
  startPage.style.display = "block";
  resultPage.style.display = "none";
});




