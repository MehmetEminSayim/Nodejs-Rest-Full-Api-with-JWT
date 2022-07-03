const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
    if(req.header("Authorization")){
        const headerToken = req.header("Authorization").split(" ")[1];
        const authorization = req.header("Authorization");
    
        if(!authorization){
            console.log("eminsdf");
            res.status(401).send("Access denied.No token provided")
            return;
        }else{
            jwt.verify(headerToken,process.env.JWT_CODE,(err,decoded)=>{
                if(err){
                    res.status(401).send("Invalid token")
                    return;
                }
                req.userID = decoded._id
                next();
            })
        }
    }else{
        res.status(401).send("Access denied.No token provided")
        return;
    }
    
    
    
    
}

module.exports = verifyToken;