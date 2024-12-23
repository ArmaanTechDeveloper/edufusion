const express = require('express');
const { User } = require('../db/user.model')

const signupRouter = express.Router();

signupRouter.post('/' , async (req , res) => {
    const {email , password , name} = req.body;
    try{
        await User.create({
            email,
            password,
            name
        })
        console.log('user created')
    }
    catch(err){
        console.log(err)
    }
    res.sendStatus(200)
})

module.exports = signupRouter