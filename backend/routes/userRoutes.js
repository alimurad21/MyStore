const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');

userRouter.post('/register', async (req, res)=>{
    const {username,email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:'User Already exists'})
        }

        user = new User(req.body);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {id:user.id}
        }
        jwt.sign(payload, process.env.jwtSecret, {expiresIn:3600},
            (err, token)=>{
                if(err) throw err;
                res.json({token});
            });
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

userRouter.post('/login',async (req, res)=>{
    let {email, password} = req.body;
    try{
        let user = await User.findOne({email})
        //Check if user Exists
        if(!user){
            return res.status(400).json({message:'Invalid Credential'})
        }
        //Validating Password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credential"})
        }
        //Generating JWT
        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload, process.env.jwtSecret, {expiresIn:3600},
            (err, token)=>{
                if(err) throw err;
                res.json({token})
            }
        )

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = userRouter;