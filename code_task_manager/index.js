const express = require("express")
const app = express()
require("dotenv").config();
const morgan = require("morgan")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 5000
const expressJwt = require("express-jwt")

app.use(morgan("dev"))
app.use(express.json())

mongoose.connect(
    "mongodb://localhost:27017/ctm_db",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) throw err
        console.log("Connected to the database")
    }
)

app.use("/auth", require("./routes/auth"))
app.use("/api", expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use("/api/tasks", require("./routes/tasks"))
app.use("/api/auth", require("./routes/apiAuth"))
app.use("/api/data", require("./routes/data"))


app.use((err, req, res, next) => {
    console.error(err)
    if (err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({ message: err.message })
})

app.listen(PORT, () => {
    console.log(`[+] Starting server on port ${PORT}`)
})
