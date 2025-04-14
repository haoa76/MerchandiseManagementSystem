const jwt=require('jsonwebtoken');
const {jwtSecret}=require('../config');

function validIsLogin(req,res,next){
    const authToken=req.headers['authorization'];
    jwt.verify(authToken,jwtSecret,(err,decode)=>{
        if(err){
            res.send({code:'102',message:'未授权请登录'})
        }else{
            req.authData=decode;
            next();
        }
    })
}

module.exports=[validIsLogin]