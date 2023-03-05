const express = require("express")
const cors = require("cors")
const app = express()
const configureDatabase = require("./config/database")
const router = require("./config/routes")

app.use(cors())
app.use(express.json())
app.use(router)

const port = 3050
app.listen(port,() => 
{
    console.log("server running on port",port)
})
configureDatabase()
