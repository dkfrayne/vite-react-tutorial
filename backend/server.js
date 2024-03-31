require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// check request for a JSON body and attach it to the request object
// allows access to req.body
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to DB & listening on port ${process.env.PORT}!`)
        })
    })
    .catch(console.log)

