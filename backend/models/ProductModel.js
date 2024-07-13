const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// ProductSchema.pre((next)=>{
//     this.updatedAt = Date.now();
//     next();
// })

const Product = mongoose.model('products', productSchema)

module.exports = Product;