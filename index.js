const express = require('express')
require('express-async-errors')
const morgan = require('morgan')
require('dotenv').config()
const app = express()

//database 
require('./database/db')

//routes
const userRouter = require('./routes/userRoute')
const postRouter = require('./routes/postRoute')
const commentRouter = require('./routes/commentRoute')
const reviewRouter = require('./routes/reviewRoute')

//port
const port = process.env.PORT

//middleware
app.use(express.json())
app.use(morgan('dev'))

//routers
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