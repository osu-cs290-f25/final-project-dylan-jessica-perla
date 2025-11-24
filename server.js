var express = require("express")
var app = express()
app.use(express.static("static/"))

app.get("/", function (req, res, next) {
    res.status(200).sendFile(__dirname + "/static/game.html")
})

app.get("*splat", function (req, res, next) {
    res.status(404).sendFile(__dirname + "/static/404.html")
})

app.listen(8000, function () {
    console.log("== Server is listening on port 8000.")
})