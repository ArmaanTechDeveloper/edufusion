const express = require('express');
const jwt = require('jsonwebtoken')

const { User } = require('../db/user.model')

const loginRouter = express.Router();

loginRouter.post('/' , async (req , res) => {
    const {email , password} = req.body;
    try{    
        const userdetails = await User.findOne({
            email
        })
        if(userdetails){
            if(password == userdetails.password){
                const token = jwt.sign({
                    id: userdetails._id
                }, process.env.JWT_SECRET);
                
                return res.send({
                    token: token
                })
            }
            else{
                console.log('passwords do not match')
            }
        }
        else{
            console.log('user does not exist')
        }
    }
    catch(err){
        console.log(err)
    }
    res.sendStatus(200)
})

module.exports = loginRouter