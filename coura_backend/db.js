const mongoose  = require('mongoose')

const url = "mongodb+srv://testuser:testuser@practicemongo.wgswd6c.mongodb.net/CouraDatabase?retryWrites=true&w=majority"

module.exports.connect = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log('MongoDB connected successfully!')
    }).catch((error) => console.log("Error: ", error))
}