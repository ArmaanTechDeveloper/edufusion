const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const signupRouter = require('./auth/signup')
const loginRouter = require('./auth/login')
const detailsRouter = require('./details/details')

const {auth , handleUploadProject} = require('./util')

const app = express();

app.use(express.json());

app.get('/' , (req , res) => {
    res.json({message: 'hello world'})
})

app.use('/auth/signup' , signupRouter)
app.use('/auth/login' , loginRouter)
app.use('/details' , auth , detailsRouter)
app.post('/upload-project', auth , handleUploadProject)

app.get('/me' , auth , (req , res) => {
    console.log(req.user);
    return res.json({ message : 'You are logged in' })
})

const startServer = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('connected to mongo db')
    app.listen(process.env.PORT , () => {
        console.log(`Listening on port http://localhost:${process.env.PORT}`)
    })
}
startServer()