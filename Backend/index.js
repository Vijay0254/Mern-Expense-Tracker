const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDb = require('./db/connectDb')
const connectCloudinary = require('./utils/connectCloudinary')

const authRouter = require("./router/authRouter")
const incomeRouter = require("./router/incomeRouter")
const expenseRouter = require("./router/expenseRouter")
const dashboardRouter = require("./router/dashboardRouter")

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/auth", authRouter)
app.use("/api/income", incomeRouter)
app.use("/api/expense", expenseRouter)
app.use("/api/dashboard", dashboardRouter)

app.listen(PORT, (err) =>{
    err ? console.log(`Error in Running Server - ${err.message}`) : console.log(`Server is Running Successfully`)
    connectDb()
    connectCloudinary()
})