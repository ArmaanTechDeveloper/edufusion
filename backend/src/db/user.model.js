const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    college: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    github: {
        type: String
    },
    linkedin: {
        type: String
    },
    projects:[
        {
            projectName: {
                type: String ,
            },
            projectLeadName: {
                type: String ,
            },
            description: {
                type: String ,
            },
            skills: [String],
            city: {
                type: String,
            },
            status: {
                type: String,
            },
            members: [String]
        }
    ]
})

const User = mongoose.model('User' , userSchema)

module.exports = {
    User
}