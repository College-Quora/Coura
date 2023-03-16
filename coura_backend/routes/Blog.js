const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const blogDB = require('../models/Blog');
const userDB = require('../models/User');
const commentDB = require('../models/Comment');

router.post('/', async (req, res) => {
    try{
        await blogDB.create({
            blogName: req.body.blogName,
            blogUrl: req.body.blogUrl,
            createdAt: Date.now(),
            blogUserId: req.body.userId
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


router.put('/:id', async(req, res) =>{
    try{
        const blogId = req.params.id;
        await blogDB.updateOne(
                { _id: blogId},
                { $set: { blogName: req.body.blogName, blogUrl : req.body.blogUrl} }
        ).then(() =>{
            res.status(200).send({
                status: true,
                message: "Blog updated successfully!"
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
        const blogId = req.params.id;
        await blogDB.deleteOne(
                { _id: blogId} 
        ).then(async() =>{
            await commentDB.deleteMany({blogId: blogId}).then(()=>{
                res.status(200).send({
                status: true,
                message: "Blog deleted successfully!"
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
        await blogDB.aggregate([
            {
                $lookup:{
                    from: "comments",
                    localField: "_id",
                    foreignField: "blogId",
                    as : "allComments"
                }
            }
        ]).exec().then((data) => {
            res.status(200).send(data)
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


router.get('/:id', async(req, res) => {
    
    try{
        const userId = req.params.id;
        await userDB.findOne({_id: userId}).then(async()=>{

            blogDB.aggregate([
                {
                    $match:{
                        blogUserId: new mongoose.Types.ObjectId(userId)
                    }
                },
                {
                    $lookup:{
                        from: "comments",
                        localField: "_id",
                        foreignField: "blogId",
                        as : "allComments"
                }
                }
                
            ]).then((data)=>{
                res.status(200).send({
                    status: true,
                    message: "Blogs fetched successfully!",
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
            message: "Error while getting blogs!"
        })
    }
})


module.exports = router;