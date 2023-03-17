import React, { useEffect, useState } from "react";
import { useParams, Link} from "react-router-dom";
import axios from "axios";

function ResetPassword() {
	const [validUrl, setValidUrl] = useState(true);
    const [pass, setPass] = useState('');
	const param = useParams();

	useEffect(async() => {
		
        await axios.get('/api/auth/' + param.id  + '/verify-reset-password-link/' + param.token).then((res)=>{
                console.log(res.data);
                setValidUrl(true);
            }).catch ((err)=>{
                console.log(err);
				setValidUrl(false);
			}) 
	}, [param]);

    const handleResetPassword = async(e) => {
        e.preventDefault();
        if(pass !== ""){

            const config = {
                headers:{
                "Content-Type": "application/json",
                }
            }
            const body = {
                password: pass
            }
            await axios.post('/api/auth/' + param.id  + '/reset-password/' + param.token, body, config).then(async(res) =>{
                console.log(res.data);
                alert(res.data.message);
                window.location.href = "/login";
            }).catch((err) =>{
                console.log(err);
                alert(err.response.data.message);
            })
        }
        else alert("Please enter new password!");
    }

	return (
		<div>
			{validUrl ? ( 
			<div>
			<h2>Reset Password</h2>
            <input value={pass} onChange={(e) => setPass(e.target.value.trim())} type="password" placeholder="********" id="password" name="password" />

            <button className="link-btn" onClick={handleResetPassword}>Submit</button>
			
			</div>
			) : (<h1>404 Not Found</h1>)}
		</div>
	)
};

export default ResetPassword;