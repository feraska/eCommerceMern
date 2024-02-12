const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
//Register
router.post("/register",async(req,res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        req.body.password = hashedPassword
        const newUser = new User(req.body)
        const savedUser = await newUser.save()
        return res.status(200).json(savedUser)
    } catch(err) {
        return res.status(500).json(err)
    }
})
//Login
router.post("/login",async(req,res) => {
   try {
    const user = await User.findOne(
        {
        username:req.body.username
    })
   
    if(!user) {
        return res.status(400).json("user name not found")
    }
   
    const originalPassword = await bcrypt.compare(req.body.password,user.password)
    
    if(!originalPassword) {
        return res.status(400).json("the password is wrong")
    }
    const accessToken = jwt.sign(
        {
        id:user._id,
        isAdmin: user.isAdmin,
         },
        process.env.JWT_SEC,
        {
        expiresIn:'3d'
        })
    const {password,...others} = user._doc
    return res.status(200).json({...others,accessToken})
   } catch(err) {
    
    return res.status(500).json(err)
   }
})
module.exports = router