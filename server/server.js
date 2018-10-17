const express = require('express')
const app = express()
const port = 3000
var Sequelize = require("sequelize")

var sequelize = new Sequelize("sqlite:db/data.sqlite3", {
    operatorsAliases: false
});

const api = require("./routes/api")(sequelize)

app.use(express.static('public'))
app.use(express.static('react-build'))
app.use("/api", api)

sequelize.sync().then(function() {
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})