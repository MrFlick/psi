const express = require('express')
const app = express()
const port = 3000

const api = require("./routes/api")

app.use(express.static('public'))
app.use(express.static('react-build'))

app.use("/api", api)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))