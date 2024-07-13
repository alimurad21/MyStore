const express = require('express');
const orderRouter = express.Router();

const Order = require('../models/OrderModel.js');

orderRouter.get('/', async (req, res)=>{
    try{
        const orders = await Order.find({}).populate('user items.product');
        res.json(orders)
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

orderRouter.get('/:id', async (req, res)=>{
    try{
        const order = await Order.findById(req.params.id).populate('user items.product');
        if(!order) return res.status(404).json({error:'Order not found'});
        res.json(order);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

orderRouter.post('/', async (req, res) => {
    try{
        const order = new Order(req.body);
        order.save();
        res.json(order);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

orderRouter.put('/:id', async (req, res) => {
    try{
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!order) return res.status(404).json({error:"Order not found"})
        res.json(order);
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

orderRouter.delete('/:id', async (req, res)=>{
    try{
        const order = await Order.findByIdAndDelete(req.params.id);
        if(!order) return res.status(404).json({error:"Order not found"})
        res.json(order);
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

module.exports = orderRouter;