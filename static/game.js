console.log("Test game.js.")
var actionButtons = document.querySelectorAll(".acction-button");
var scoreDisplay = document.querySelectorAll(".score-container");
var modal = document.getElementsById(".game-over-modal");
var closeButton = document.querySelector(".close-button");
var playerName = document.getElementById(".player-name");

let sequence = [];
let playerSequence = [];
let playerScore = 0;
let playing = false;

