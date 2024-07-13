const express = require('express')

const productRouter = express.Router();

const Product = require('../models/ProductModel.js');

productRouter.get('/', async (req, res)=>{
    try{
        const product = await Product.find() //.populate('user items.product')
        res.send(product)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

productRouter.get('/:id', async(req, res)=>{
    try{
        const product = await Product.findById(req.params.id)//.populate(' user items.product')
        if(!product){
            return res.status(404).json({error:'Product not found'});
        }
        res.json(product)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

productRouter.post('/add', async (req, res)=>{
    try{
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    }catch(err){
        res.status(400).json({error:err.message})
    }
})

productRouter.put('/:id', async (req, res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body,{new:true});
        if(!product) return res.status(404).json({error:'Product not found'});
        res.json(product);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

productRouter.delete('/:id', async (req, res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) return res.status(404).json({error:"Product not found"});
        res.json(product);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

module.exports = productRouter;