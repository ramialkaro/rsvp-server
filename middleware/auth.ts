// middleware for auth

require('dotenv').config()

const jwt = require('jsonwebtoken')


// auth middleware

const auth = (req, res, next)=>{
    const token = req.header('auth-token') //give any value
    if(!token){
        return res.status(401).json({msg:'No token, access denied '})
    }
    //if there is token
    try{
        const decoded = jwt.verify(token, process.env.SECRET)
        req.user = decoded.user
        next() 
    }catch (err){
        res.status(401).json({msg:'Invalid token'})
    } 
}

module.exports = auth

// benifited to produc our auth router