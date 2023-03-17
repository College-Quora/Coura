import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function Login(){
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(email !== "" && pass !== ""){

            const config = {
                headers:{
                "Content-Type": "application/json",
                }
            }

            const body = {
                email: email,
                password: pass
            }
            await axios.post('/api/auth/login', body, config).then(async(res) =>{
                console.log(res.data);
                alert(res.data.message);
                window.localStorage.setItem("token", res.data.data);
                window.localStorage.setItem("loggedIn", true);

                const body = {
                    token: window.localStorage.getItem("token") 
                }

                await axios.post('/api/auth/userData', body, config).then((result) =>{
                    console.log(result.data);
                    window.localStorage.setItem("userId", result.data.data._id);
                    window.localStorage.setItem("userName", result.data.data.name);
                    window.localStorage.setItem("userEmail", result.data.data.email);
                    window.localStorage.setItem("userCollege", result.data.data.collegeName);
                
                }).catch((err) =>{
                    console.log(err);
                })

                window.location.href = "/";
            }).catch((err) =>{
                console.log(err);
                alert(err.response.data.message);
            })
        }
        else alert("Please fill all the fields!");
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value.trim())}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value.trim())} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <Link to="/signup">
                <button className="link-btn">Don't have an account? Register here.</button>
            </Link>
            
        </div>
    )
}

export default Login