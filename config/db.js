require('dotenv').config()

const mongoose = require('mongoose')

// use variable URL, that hold connect to MongoDB
const url = process.env.URL


// connection to DB

const connectDB = async ()=>{
    try{
        await mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true})
        console.log('Connect to MongoDB')
    }catch(err){
        console.error(err.message)
        process.exit(1)
    }
}
module.exports = connectDB