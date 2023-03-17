import React from "react";
import { Link } from "react-router-dom";
import "./css/DropDownProfile.css";

function DropDownProfile(){

    const handleLogout = async(e)=>{
        console.log('logout')
        window.localStorage.clear();
        window.location.href = "/";
    }

    return(
        <div className='flex flex-col dropDownProfile'>
            <ul className='flex flex-col gap-4'>
                <Link to="/profile"> <li> Profile </li></Link>
                <li onClick={handleLogout}>Logout</li>
            </ul>
        </div>
    );
}

export default DropDownProfile