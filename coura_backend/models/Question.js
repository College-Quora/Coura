const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    questionName: String,
    questionUrl: String,
    quesUpvotes: Number,
    quesDownvotes: Number,
    
    createdAt:{
        type: Date,
        default: Date.now()
    },
    answers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "answers"
    },
    quesUserId: mongoose.Schema.Types.ObjectId,
    answeredByUsers:[{
        type: mongoose.Schema.Types.ObjectId,
    }]
})

module.exports = mongoose.model('Questions', QuestionSchema)