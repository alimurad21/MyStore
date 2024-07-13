const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username:{type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    role: String
})

const User = mongoose.model('Users', UserSchema);

module.exports = User;