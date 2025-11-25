var express = require("express")
var highscores = require("./highscores.json")

var app = express()
var port = process.env.PORT || 8000

app.set("view engine", "ejs")
app.use(express.static("static"))

app.get("/", function (req, res, next) {
    res.status(200).render("game", {
        scores: highscores
    })
})

app.get("*splat", function (req, res, next) {
    res.status(404).render("404", {
        page: req.url
    })
})

app.listen(port, function () {
    console.log("== Server is listening on port " + port + ".")
})