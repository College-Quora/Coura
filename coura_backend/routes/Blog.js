const express = require("express");
const router = express.Router();

const blogDB = require('../models/Blog')

router.post('/', async (req, res) => {
    try{
        await blogDB.create({
            blogName: req.body.blogName,
            blogUrl: req.body.blogUrl,
            createdAt: Date.now()
        }).then(() =>{
            res.status(201).send({
                status: true,
                message: "Blog added successfully!"
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
            message: "Error while adding blog!"
        })
    }
})

router.get('/', async (req, res) => {
    try{
        await blogDB.aggregate([
            {
                $lookup:{
                    from: "comments",
                    localField: "_id",
                    foreignField: "blogId",
                    as : "allComments"
                }
            }
        ]).exec().then((doc) => {
            res.status(200).send(doc)
        }).catch((err) =>{
            res.status(400).send({
                status: false,
                message: "Unable to get the blog details!"
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

module.exports = router;