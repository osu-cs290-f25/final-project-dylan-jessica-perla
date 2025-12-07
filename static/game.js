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

function gameOver(){
    playing = false;
    modal.style.display = "block";
    finalScore.textContent = `Your final score is: ${playerScore} pts`;

}

actionButtons.forEach(button =>{
    button.addEventListener("click", () => playerInput(button.id));
});

closeButton.addEventListener("click", ()=>{
    modal.style.display = "none";
});

gameStart();
