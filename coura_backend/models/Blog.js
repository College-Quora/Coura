const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    blogName: String,
    blogUrl: String,
    blogUpvotes: Number,
    blogDownvotes: Number,
    
    createdAt:{
        type: Date,
        default: Date.now()
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments"
    },
    blogUserId: mongoose.Schema.Types.ObjectId,
})

module.exports = mongoose.model('Blogs', BlogSchema)