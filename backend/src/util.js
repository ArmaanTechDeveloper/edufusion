const jwt = require('jsonwebtoken')
const { User } = require('./db/user.model')

function auth(req , res , next){
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token , process.env.JWT_SECRET , (err , decoded) => {
            if(err){
                return res.status(401).send({
                    message: "Unauthorized"
                })
            }
            else{
                req.user = decoded;
                next();
            }
        })
    }
    else{
        return res.status(401).send({
            message: "Unauthorized"
        })
    }
}
async function handleUploadProject(req , res , next){
    const {
        projectName , 
        projectLeadName , 
        description , 
        skills , 
        city,
    } = req.body;

    const userdetails = await User.findOne({
        _id: req.user.id
    })
    const arr = skills.split(",");
    if(userdetails){
        userdetails.projects.push({
            projectName,
            projectLeadName,
            description,
            city,
            status: "ongoing",
            members: [],
            skills: arr
        })
        await userdetails.save();
        return res.sendStatus(200);
    }

}

module.exports = {
    auth,
    handleUploadProject
}