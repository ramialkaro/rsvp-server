// will create register route
const router = require('express').Router()
// validation 
const {check, validationResult} = require('express-validator')
// bcrypt password before send it to database
const bcrypt = require('bcrypt')
// json.token
const jwt = require('jsonwebtoken')

// user model
const User = require('../models/User')

// check mean, you check the req.body if it's ok
// then we will make validation for that...
router.post('/',
[
    check('name','Please provdie a name').not().isEmpty(),                          // check name isn't empty
    check('email','Please provide a valid email').isEmail(),                        // check email is valid 
    check('password','Please provide 6 character long password').isLength({min:6})    // check length of password
], 
async(req, res)=>{
    //validations
    const errors =  validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    
    //information will get from form
    const  {name, email, password} = req.body

    // check if we have already that user otherwise it will create it
    try{
        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({msg:'user already exists'})
        }
        // if the user is new not already exists
        user  = new User({
            name, 
            email,
            password
        })

        // after create user.. now we should bcrypt it
        // generate salt then added to hashed password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)


        // now we can save user to db
        await user.save()

        // jwt
        const payload ={
            user:{
                id: user.id
            }
        }
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        },  (err,token)=>{
            if(err) throw err
            res.send({token})
        })
    }catch (err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})


module.exports = router