require('express-async-errors')
require('dotenv').config()
require('./database/db')

const express = require('express')
const morgan = require('morgan')

const userRouter = require('./routes/userRoute')
const postRouter = require('./routes/postRoute')
const commentRouter = require('./routes/commentRoute')
const reviewRouter = require('./routes/reviewRoute')

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(morgan('dev'))

app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/comment', commentRouter)
app.use('/review', reviewRouter)

app.use((err, req, res , next) => {
    console.log("Error:" + err);
    const statusCode = err.statusCode || 500
    res.status(statusCode).send({
        status: statusCode,
        message: err?.message || "Error in Connection",
        errors: err?.errors || []
    })
})

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})