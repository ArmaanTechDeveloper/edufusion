const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();

app.get('/' , (req , res) => {
    res.json({message: 'hello world'})
})

const startServer = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('connected to mongo db')
    app.listen(process.env.PORT , () => {
        console.log(`Listening on port http://localhost:${process.env.PORT}`)
    })
}
startServer()