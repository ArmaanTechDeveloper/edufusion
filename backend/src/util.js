const jwt = require('jsonwebtoken')

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

module.exports = {
    auth
}