import React, { useEffect, useState } from "react";
import { useParams, Link} from "react-router-dom";
import axios from "axios";

function EmailVerified() {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(async() => {
		
        await axios.get('/api/auth/' + param.id  + '/verify/' + param.token).then((res)=>{
                console.log(res.data);
                setValidUrl(true);
            }).catch ((err)=>{
                console.log(err);
				setValidUrl(false);
			}) 
	}, [param]);

	return (
		<div>
			{validUrl ? ( 
			<div>
			<h1>Email verified successfully</h1>
			
			</div>
			) : (<h1>404 Not Found</h1>)}
		</div>
	)
};

export default EmailVerified;