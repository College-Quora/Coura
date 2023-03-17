import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import './css/Register.css';
import { color } from "@mui/system";

function Register() {
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
            }).catch((err) =>{
                console.log(err);
                alert(err.response.data.message);
            })
            setEmail("");
            setPass("");
            setName("");
            setCollegeName("");
        }
        else alert("Please fill all the fields!");
    }

    return (
        <div className="loginContainer">
        <div className="authFormContainer">
        <h1>Register</h1>
    <form className="registerForm" onSubmit={handleSubmit}>
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
    <Link to="/login">
    <button className="linkBtn">Already have an account? Login here.</button></Link>
</div>

<div class="mainContainer">
<div class="textContainer">
    <h1>Welcome to COURA!</h1>
    <p style={{color:'blue'}}>Your college story matters - sign up and make your voice heard anonymously!</p>
  </div>
  
  <div class="imageContainer">
    <img src="https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/ra2mrnpdibc7vvae8bom/the-ugliest-college-campus-ever?fimg-ssr-default" alt="Example Image"/>
  </div>
  <Link to="/"><button className="linkBtnHome">Back To Home</button></Link>
</div>


    </div>


    
        
    )
}

export default Register