const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    collegeName: String,
    password: String
})

module.exports = mongoose.model('Users', UserSchema)