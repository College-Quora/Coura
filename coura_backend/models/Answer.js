const mongoose = require('mongoose')

const AnswerSchema = new mongoose.Schema({
    answer: String,
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    userId: mongoose.Schema.Types.ObjectId,
})

module.exports = mongoose.model('Answers', AnswerSchema)