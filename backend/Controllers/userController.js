const express = require('express');
const userRouter = express.Router();
const User = require('../models/userModel.js');

userRouter.get('/login', (req, res) => {
    User.find({}).then(user => {
        if(user.password === req.body.password){
            return res.json(user);
        }
        res.status(404).json({error:'Invalid Password'})
    });
});

userRouter.get('/login/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).json({error:'User not found'})
        res.json(user)
    }
    catch(err) {
        res.status(500).json({error:err.message})
    };
});

userRouter.post('/register', async (req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({error:err.message});
    };
});

userRouter.delete('/:id', (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(204).end();
    })
    .catch(error => next(error));
});

userRouter.put('/:id', (req, res, next) => {
    const body = req.body;
    const user = {
        'username': body.username,
        'email': body.email,
        'password': body.password
    };

    User.findByIdAndUpdate(req.params.id, user, { new: true })
    .then(updatedUser => {
        res.json(updatedUser);
    })
    .catch(error => next(error));
});

module.exports = userRouter;
