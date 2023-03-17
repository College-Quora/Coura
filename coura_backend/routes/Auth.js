const express = require("express");
const router = express.Router();

const userDB = require('../models/User');
const tokenDB = require('../models/Token');
const sendEmail = require('../utils/SendEmail');
const crypto = require("crypto");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "abgjhagsj21e67781@!E#!@E#!@bjkadb@!E21bfwedvdfvfvmpmpsdqww@@13&*()Sdk"; // any random string

router.post('/register', async (req, res) => {

    try{
        let user = await userDB.findOne({email: req.body.email});
        if(user){
            return res.status(400).send({
                status: false,
                message: "Email already taken!"
            })
        }

        if((req.body.email).endsWith(".com")) {
            return res.status(400).send({
                status: false,
                message: "Please enter your institute email address!"
            })
        }

        const encryptedPassword = await bcrypt.hash(req.body.password,10);

        user = await userDB.create({
            name: req.body.name,
            email: req.body.email,
            collegeName: req.body.collegeName,
            password: encryptedPassword,
        });

        const token = await tokenDB.create({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		});
		const url = `http://localhost:3000/auth/${user._id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

        res.status(400).send({
                status: true,
                message: "An Email has been sent to your account, please verify!",
                data:token
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

            if(!user.verified){
                let token = await tokenDB.findOne({ userId: user._id });
                if (!token) {
                    token = await tokenDB.create({
                        userId: user._id,
                        token: crypto.randomBytes(32).toString("hex"),
                    });
                    const url = `${process.env.BASE_URL}auth/${user._id}/verify/${token.token}`;
                    await sendEmail(user.email, "Verify Email", url);
                }

                return res.status(400)
                    .send({status:true, message: "An Email has been sent to your account, please verify!" });
            }
            else{

            const loginToken = jwt.sign({email: user.email}, JWT_SECRET, {expiresIn: 86400});

            if(res.status(201)){
                return res.status(200).send({
                status: true,
                message: "Logged in successfully!",
                data: loginToken
            })
            }
            else{
                return res.status(400).send({
                    status: false,
                    message: "Error!"
                })
            }
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


router.get("/:id/verify/:token", async (req, res) => {
	try {
		const user = await userDB.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({status:false, message: "Invalid Linkk" });

		const token = await tokenDB.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({status:false, message: "Invalid Link" });

		await userDB.updateOne({ _id: user._id }, { $set: { verified: true}});
		await tokenDB.deleteOne({_id : token._id});

		res.status(200).send({status: true, message: "Email verified successfully" });
	} catch (err) {
		res.status(500).send({
            status: false,
            message: "Error while email verification!"
        })
	}
});

module.exports = router;