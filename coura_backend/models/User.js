const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    collegeName: String,
    password: String,
    votes: { type: Map, unique: true, of: Number },
})

module.exports = mongoose.model('Users', UserSchema)