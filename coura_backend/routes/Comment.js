const express = require("express");
const router = express.Router();

const commentDB = require('../models/Comment')

router.post('/', async(req, res) =>{
    try{
        await commentDB.create({
            comment: req.body.comment,
            blogId: req.body.blogId,
            createdAt: Date.now()
        }).then(() =>{
            res.status(201).send({
                status: true,
                message: "Comment added successfully!"
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
            message: "Error while adding comment!"
        })
    }
})

module.exports = router