const express = require("express");
const router = express.Router();

const answerDB = require('../models/Answer')

router.post('/', async(req, res) =>{
    try{
        await answerDB.create({
            answer: req.body.answer,
            questionId: req.body.questionId,
            createdAt: Date.now(),
            ansUserId: req.body.userId
        }).then(() =>{
            res.status(201).send({
                status: true,
                message: "Answer added successfully!"
            })
        }).catch((err) =>{
            res.status(400).send({
                status: false,
                message: "Bad request!"
            })
        })
    }
    catch(err){
        res.status(500).send({
            status: false,
            message: "Error while adding answer!"
        })
    }
})

module.exports = router