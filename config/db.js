const mongoose = require('mongoose')

require('dotenv/config')

MONGODB_URI = process.env.MONGODB_URI

const connect = async()=>{
    try{
        await mongoose.connect(MONGODB_URI)
        console.log('DB connected successfully');
    }catch(error){
        console.log(error);
    }
}

module.exports = connect