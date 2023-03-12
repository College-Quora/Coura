import React from "react";
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
                <li> Profile </li>
                <li onClick={handleLogout}>Logout</li>
            </ul>
        </div>
    );
}

export default DropDownProfile