const  mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items:{
        product:{type:mongoose.Schema.Types.ObjectId, ref:'Product', required:true},
        quantity:{type:Number, required:true},
        price:{type:Number, required:true}
    },
    total:{type:Number, required:true},
    status:{type:String, enum:['pending','completed', 'shipped', 'delivered', 'canceled', ], default:'pending'},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now}
})

// OrderSchema.pre('save', (next)=>{
//     this.updateAt = Date.now()
//     next();
// })

const Order = mongoose.model('Orders', OrderSchema);

module.exports = Order;