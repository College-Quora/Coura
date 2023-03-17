import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function ForgotPassword(){
    const [email, setEmail] = useState('');

    const handleSendResetLink = async(e) => {
        e.preventDefault();
        if(email !== ""){

            const config = {
                headers:{
                "Content-Type": "application/json",
                }
            }
            const body = {
                email: email
            }
            await axios.post('/api/auth/forgotPassword', body, config).then(async(res) =>{
                console.log(res.data);
                alert(res.data.message);
            }).catch((err) =>{
                console.log(err);
                alert(err.response.data.message);
            })

            setEmail("");
        }
        else alert("Please enter your email!");
    }

    return (
        <div>
            <h2>Forgot Password</h2>
            <input value={email} onChange={(e) => setEmail(e.target.value.trim())}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <button className="link-btn" onClick={handleSendResetLink}>Send Reset Link</button>
        </div>
    )
}

export default ForgotPassword