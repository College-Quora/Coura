import React, { useState } from "react";
import axios from 'axios';

function Register({onPageSwitch}) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [collegeName, setCollegeName] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(email !== "" && pass !== "" && name !== "" && collegeName !== ""){

            const config = {
                headers:{
                "Content-Type": "application/json",
                }
            }

            const body = {
                name: name,
                email: email,
                collegeName: collegeName,
                password: pass
            }
            await axios.post('/api/auth/register', body, config).then((res) =>{
                console.log(res.data);
                alert(res.data.message);
                onPageSwitch('login');
            }).catch((err) =>{
                console.log(err);
                alert(err.response.data.message);
            })
        }
        else alert("Please fill all the fields!");
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value.trim())} id="name" placeholder="Full Name" />
            
            <label htmlFor="name">College Name</label>
            <input value={collegeName} name="collegeName" onChange={(e) => setCollegeName(e.target.value.trim())} id="name" placeholder="College Name" />
            
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value.trim())}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value.trim())} type="password" placeholder="********" id="password" name="password" />
            
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => onPageSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}

export default Register