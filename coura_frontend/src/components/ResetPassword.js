import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
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
		// <div>
		// 	{validUrl ? ( 
		// 	<div>
		// 	<h2>Reset Password</h2>
        //     <input value={pass} onChange={(e) => setPass(e.target.value.trim())} type="password" placeholder="********" id="password" name="password" />

        //     <button className="link-btn" onClick={handleResetPassword}>Submit</button>
			
		// 	</div>
		// 	) : (<h1>404 Not Found</h1>)}
		// </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#F0F8FF" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#fff", padding: "50px", borderRadius: "10px", boxShadow: "3px 4px 4px rgba(0, 0, 0, 0.25)" }}>
          {validUrl ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <h2 style={{ color: "#1E90FF", marginBottom: "35px", fontSize: "50px" }}>Reset Password</h2>
              <label htmlFor="password" style={{ color: "#1E90FF", display: "block", marginBottom: "10px", fontSize: "20px" }}>Enter The New Password:</label>
              <input value={pass} onChange={(e) => setPass(e.target.value.trim())} type="password" placeholder="********" id="password" name="password" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #1E90FF", marginBottom: "20px" }} />
              <label htmlFor="confirmpassword" style={{ color: "#1E90FF", display: "block", marginBottom: "10px", fontSize: "20px" }}>Confirm New Password:</label>
              <input value={pass} onChange={(e) => setPass(e.target.value.trim())} type="password" placeholder="********" id="password" name="password" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #1E90FF", marginBottom: "20px" }} />
      
              <button className="link-btn" onClick={handleResetPassword} style={{ backgroundColor: "#1E90FF", color: "#fff", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer", marginLeft: "15px" }}>Submit</button>
            </div>
          ) : (
            <h1 style={{ color: "#1E90FF" }}>404 Not Found</h1>
          )}
        </div>
        <img src="https://cdn-icons-png.flaticon.com/512/6434/6434880.png" alt="illustration" style={{ marginLeft: "50px", height: "50vh" }} />
      </div>
      

	)
};

export default ResetPassword;