// Test for add score feature.
function saveHighscore() {
    console.log("== saveHighscore() started.")

    var testName = "user5"
    var testScore = "5"
    var reqURL = "/addScore"

    fetch(reqURL, {
        method: "POST",
        body: JSON.stringify({
            name: testName,
            score: testScore
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
                    name: testName,
                    score: testScore
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

    console.log("== saveHighscore() finished.")
}

console.log("== game.js loaded.")
window.addEventListener("DOMContentLoaded", saveHighscore)