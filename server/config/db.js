const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
          await mongoose.connect(process.env.MONGO_URI);
          console.log(`Connected to Mongodb Database ${mongoose.connection.host}`)
    }catch(err){
        console.log(`MONGO Connect Error ${err}`);
    }
}

module.exports = connectDB;
