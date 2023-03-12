const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    comment: String,
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogs",
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Comments', CommentSchema)