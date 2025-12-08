var express = require("express")
var fs = require("fs")
var highscores = require("./highscores.json")

var app = express()
var port = process.env.PORT || 8000

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.static("static"))

app.get("/", function (req, res, next) {
    res.status(200).render("game", {
        highscores: highscores
    })
})

app.post("/addScore", function (req, res, next) {
    if (req.body && req.body.name && req.body.score) {
        highscores[req.body.name] = {
            name: req.body.name,
            score: req.body.score
        }
        fs.writeFileSync(
            "./highscores.json",
            JSON.stringify(highscores, null, 2)
        )
        res.status(200).send("Received a score.")
    } else {
        res.status(400).send("Need a request body with `name` and `score`.")
    }
})

app.get("*splat", function (req, res, next) {
    res.status(404).render("404", {
        page: req.url
    })
})

app.listen(port, function () {
    console.log("== Server listening on port", port)
})