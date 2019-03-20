const express = require('express')
const app = express()
const port = 3000

app.set("views", "./server/views");
app.set("view engine", "pug");

var Sequelize = require("sequelize")
var sequelize = new Sequelize("sqlite:db/data.sqlite3", {
    operatorsAliases: false,
    define: {
        underscore: true,
        timestamps: false
    }
});

const api = require("./routes/api")(sequelize)
const user = require("./routes/user")

app.use(express.static('public'))
app.use(express.static('react-build'))
app.use("/api", api)
app.use("/", user)


sequelize.sync().then(function() {
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})