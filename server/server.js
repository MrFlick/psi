const express = require('express')
const app = express()
const port = 3000

app.set("views", "./server/views");
app.set("view engine", "pug");

var Sequelize = require("sequelize")
var sequelize = new Sequelize("sqlite:db/data.sqlite3", {
    operatorsAliases: true
});

const api = require("./routes/api")(sequelize)

app.use(express.static('public'))
app.use(express.static('react-build'))
app.use("/api", api)

app.get("/", function(req, res) {
	res.render("index");
});

sequelize.sync().then(function() {
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})