const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const questionDB = require('../models/Question');
const answerDB = require('../models/Answer');
const userDB = require('../models/User');


router.post('/', async (req, res) => {

    try{
        await questionDB.create({
            questionName: req.body.questionName,
            questionUrl: req.body.questionUrl,
            createdAt: Date.now(),
            quesUserId: req.body.userId
        }).then(() =>{
            res.status(201).send({
                status: true,
                message: "Question added successfully!"
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
            message: "Error while adding question!"
        })
    }
})


router.put('/:id', async(req, res) =>{
    try{
        const quesId = req.params.id;
        await questionDB.updateOne(
                { _id: quesId},
                { $set: { questionName: req.body.questionName, questionUrl : req.body.questionUrl} }
        ).then(() =>{
            res.status(200).send({
                status: true,
                message: "Question updated successfully!"
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
            message: "Unexpected error!"
        })
    }
})


router.delete('/:id', async(req,res)=>{
    try{
        const quesId = req.params.id;
        await questionDB.deleteOne(
                { _id: quesId} 
        ).then(async() =>{
            await answerDB.deleteMany({questionId: quesId}).then(()=>{
                res.status(200).send({
                status: true,
                message: "Question deleted successfully!"
            })
            }).catch(() =>{
            res.status(400).send({
                status: false,
                message: "Bad request!"
            })
        })
            
        }).catch(() =>{
            res.status(400).send({
                status: false,
                message: "Bad request!"
            })
        })
    }
    catch(err){
        res.status(500).send({
            status: false,
            message: "Unexpected error!"
        })
    }
})


router.get('/', async (req, res) => {
    try{
        await questionDB.aggregate([
            {
                $lookup:{
                    from: "answers",
                    localField: "_id",
                    foreignField: "questionId",
                    as : "allAnswers"
                }
            }
        ]).exec().then((data) => {
            res.status(200).send(data)
        }).catch((err) =>{
            res.status(400).send({
                status: false,
                message: "Unable to get the question details!"
            })
        })
    }
    catch(err){
        res.status(500).send({
            status: false,
            message: "Unexpected error!"
        })
    }
})


router.get('/:id', async(req, res) => {
    
    try{
        const userId = req.params.id;
        await userDB.findOne({_id: userId}).then(async()=>{

            questionDB.aggregate([
                {
                    $match:{
                        quesUserId: new mongoose.Types.ObjectId(userId)
                    }
                },
                {
                    $lookup:{
                        from: "answers",
                        localField: "_id",
                        foreignField: "questionId",
                        as : "allAnswers"
                    }
                }
                
            ]).then((data)=>{
                res.status(200).send({
                    status: true,
                    message: "Questions fetched successfully!",
                    data:data
                })
            }).catch(() =>{
                res.status(400).send({
                    status: false,
                    message: "Bad request!"
                })
            })
            
            
        }).catch(() =>{
            return res.status(400).send({
                status: false,
                message: "User not found!"
            })
        })
        
    }
    catch(err){
        res.status(500).send({
            status: false,
            message: "Error while getting questions!"
        })
    }
})


module.exports = router;