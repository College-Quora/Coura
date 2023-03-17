const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    collegeName: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false},
    votes: { type: Map, unique: true, of: Number },
})

module.exports = mongoose.model('Users', UserSchema)