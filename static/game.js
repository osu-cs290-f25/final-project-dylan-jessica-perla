console.log("Test game.js.")
var actionButtons = document.querySelectorAll(".action-button");
var scoreDisplay = document.querySelector(".score-container");
var modal = document.getElementById("game-over-modal");
var closeButton = document.querySelector(".close-button");
var playerName = document.getElementById("player-name");
var finalScore = modal.querySelector("p");


let sequence = [];
let playerSequence = [];
let playerScore = 0;
let playing = false;
let playerHighscores = [];

modal.style.display = "none";

function gameStart(){
    sequence = [];
    playerSequence = [];
    playerScore = 0;
    playing = true;
    updateScore();
    round();

}

function round(){
    var colors = ["red", "orange", "yellow", "green", "blue", "purple"];
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    playerSequence = [];

    let delay = 0;

    sequence.forEach(color=>{
        setTimeout(()=>{
            var button = document.getElementById(color);
            button.style.filter = "brightness(2)";
            button.style.boxShadow = "0 0 15px white";
            setTimeout(()=>{
                button.style.filter = "";
                button.style.boxShadow = "";
            }, 800);
        }, delay);
        delay += 1000;
    });
}

function playerInput(color){
    if (!playing){
        return;
    }

    playerSequence.push(color);
    var index = playerSequence.length - 1;

    if(playerSequence[index] != sequence[index]){
        gameOver();
        return;
    }

    if(playerSequence.length == sequence.length){
        playerScore++;
        updateScore();
        setTimeout(round, 1000);
    }
}

function updateScore(){
    scoreDisplay.textContent = `Score: ${playerScore} pts`;
}

function highscoreUpdate() {
    console.log("== highscoreUpdate() started.")

    var reqURL = "/addScore"
    fetch(reqURL, {
        method: "POST",
        body: JSON.stringify({
            name: playerName.value,
            score: playerScore.toString()
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (res) {
        console.log("== then() after fetch() started.")
        if (res.status === 200) {
            console.log("== Status === 200.")
            console.log("== window.templates.highscore:", window.templates.highscore)
            var highscoreHTML = window.templates.highscore({
                highscore: {
                    name: playerName.value,
                    score: playerScore.toString()
                }
            })
            console.log("== highscoreHTML successfully created.")
            console.log("== highscoreHTML:", highscoreHTML)
            var highscoreContainer = document.querySelector(".highscore-container")
            highscoreContainer.insertAdjacentHTML("beforeend", highscoreHTML)
        } else {
            alert("An error occurred while saving the score. (1)")
        }
    }).catch(function (err) {
        alert("An error occurred while saving the score. (2)")
    })

    console.log("== highscoreUpdate() finished.")
}

function gameOver(){
    playing = false;
    modal.style.display = "block";
    finalScore.textContent = `Your final score is: ${playerScore} pts`;

    let name = playerName.value.trim() || "No-name"; // Changed from "playerNam" to "playerName"

    playerHighscores.push({name: name, score: playerScore});
    playerHighscores.sort((firstScore, secondScore)=>secondScore.score - firstScore.score);
    playerHighscores = playerHighscores.slice(0, 10);

    console.log("== Line right before highscoreUpdate() call.")

    // highscoreUpdate(); <-- Tries to update before the user has typed anything in.
}

actionButtons.forEach(button =>{
    button.addEventListener("click", () => playerInput(button.id));
});

closeButton.addEventListener("click", ()=>{
    modal.style.display = "none";
    highscoreUpdate() // Moved here to update after the user is done typing.
});

gameStart();