const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    blogName: String,
    blogUrl: String,
    createdAt:{
        type: Date,
        default: Date.now()
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments"
    }
})

module.exports = mongoose.model('Blogs', BlogSchema)