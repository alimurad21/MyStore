const mongoose = require('mongoose')

// mongoose.set('StrictQuery', true)
const connectToMongoDB = async (url)=>{
    try{
        let db = await mongoose.connect(url)
        console.log('Host name  is '+db.connection.host)
    }catch(error){
        console.log(error)
    }
}

module.exports = connectToMongoDB