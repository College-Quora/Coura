const express = require("express");
const router = express.Router();

const userDB = require('../models/User');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "abgjhagsj21e67781@!E#!@E#!@bjkadb@!E21bfwedvdfvfvmpmpsdqww@@13&*()Sdk"; // any random string

router.post('/register', async (req, res) => {

    try{
        const user = await userDB.findOne({email: req.body.email});
        if(user){
            return res.status(400).send({
                status: false,
                message: "Email already taken!"
            })
        }

        const encryptedPassword = await bcrypt.hash(req.body.password,10);

        await userDB.create({
            name: req.body.name,
            email: req.body.email,
            collegeName: req.body.collegeName,
            password: encryptedPassword,
            votes: {},
        }).then(() =>{
            res.status(201).send({
                status: true,
                message: "Registration Successful!"
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
            message: "Error while registration!"
        })
    }
})


router.post('/login', async (req, res) => {

    try{
        const user = await userDB.findOne({email: req.body.email});
        if(!user){
            return res.status(400).send({
                status: false,
                message: "User not found!"
            })
        }

        if(await bcrypt.compare(req.body.password, user.password)){

            const token = jwt.sign({email: user.email}, JWT_SECRET, {expiresIn: 86400});

            if(res.status(201)){
                return res.status(200).send({
                status: true,
                message: "Logged in successfully!",
                data: token
            })
            }
            else{
                return res.status(400).send({
                    status: false,
                    message: "Error!"
                })
            }

        }
        res.status(400).send({
                status: false,
                message: "Incorrect email or password!"
        })
    }
    catch(err){
        res.status(500).send({
            status: false,
            message: "Error while signing in!"
        })
    }
})


router.post('/userData', async (req, res) => {

    try{
        const user = jwt.verify(req.body.token, JWT_SECRET, (err, res) =>{
            if(err) return "token expired!";
            return res;
        });

        if(user == "token expired!"){
            return res.status(400).send({
                status: false,
                message: "token expired!"
            })
        }

        const userEmail = user.email;
        userDB.findOne({ email: userEmail}).then((data) => {
            res.status(200).send({
                status: true,
                message: "User data fetched!",
                data: data
            })
        }).catch((err) => {
            res.status(400).send({
                status: false,
                message: "Bad request!"
            })
        })
    }
    catch(err){
        res.status(500).send({
            status: false,
            message: "Error while getting user data!"
        })
    }
})


module.exports = router;