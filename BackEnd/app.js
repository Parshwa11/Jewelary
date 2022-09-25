const express  = require("express");
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

const product = require("./Routes/productRoutes")

app.use("/api/v1",product)
module.exports = app
