const express = require('express')
const router = express.Router()
const {User, Account} = require('../db')
const {authMiddleware} = require('../middleware')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config')
const {signupBody, signinBody, updateBody} = require('../zodSchema')


router.post('/signup', async (req, res) =>{
    try{
        const {success, data, error} = signupBody.safeParse(req.body);
        if(!success){
            return res.status(411).json({message: error})
        }
        const {firstName, lastName, username, password} = data;
        //check if user with username exists
        const userExists = await User.findOne({username : username})
        if(userExists){
            return res.status(409).json({message : "username already taken"})
        }
        const user = new User({
            firstName,
            lastName,
            username,
            password
        })
        await user.save();
        const userId = user._id;

        //genrate a random balance in the account for this user
        await Account.create({
            userId,
            balance : Math.random() * 10000 + 1
        })

        //create a jwt
        let token = jwt.sign({userId}, JWT_SECRET)
        return res.status(200).json({message : "User created successfully", token});
    }
    catch(err){
        return res.status(500).send('Server Error');
    }
})  

router.post('/signin', async (req, res) => {
      try{
        const {success, data, error} = signinBody.safeParse(req.body);
        if(!success){
            return res.status(411).json({message: error})
        }
        const {username, password} = data;
        //check if user with username exists
        const userExists = await User.findOne({username : username, password : password})
        if(!userExists){
            return res.status(411).json({message : "Error while logging in"})
        }
        const userId = userExists._id;
        //create a jwt
        let token = jwt.sign({userId}, JWT_SECRET)
        return res.status(200).json({message : "Logged in successfully", token});
    }
    catch(err){
        return res.status(500).send('Server Error');
    }
})

//update user info
router.put('/',authMiddleware, async (req, res) =>{
    try{
        const {success, data} = updateBody.safeParse(req.body);
        if(!success){
            return res.status(411).send("Error while updating info")
        }
        const userId = req.userId;
        const newUser = await User.findOneAndUpdate(
            { _id : userId},
            { $set : data}
        )
        return res.status(200).json({message : "Updated successfully"})
    }catch(err){
        res.status(411).json({message : err})
    }
})

router.get('/bulk', async (req, res) => {
    try{
        const filter = req.query.filter || '';     // param can be firstname or lastname,
        const users = await User.find({
            $or: [
                { firstName: {$regex : filter, $options : 'i'} },
                { lastName: {$regex : filter, $options : 'i'}  }
            ]
        }, 'firstName lastName _id')

        return res.status(200).json({users : users})    
    }catch(err){
        return res.send(err)
    }
})
module.exports = router