// Test for add score feature.
function saveHighscore() {
    console.log("== saveHighscore() started.")

    var testName = "user4"
    var testScore = "4"
    var reqURL = "addScore"

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
        if (res.status === 200) {
            var highscoreHTML = window.templates.highscore({
                name: testName,
                score: testScore
            })
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
saveHighscore()