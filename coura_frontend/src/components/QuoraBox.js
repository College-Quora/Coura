import React from 'react'
import { Avatar } from "@mui/material";
import './css/QuoraBox.css'

function QuoraBox() {
  return (
    <div className="quoraBox">
      <div className="quoraBox__info">
        <Avatar/>
      </div>
      <div className="quoraBox__quora">
        <h5 style={{fontSize:'25px', color:'blueviolet', fontWeight:'bold', fontStyle:'italic'}}>What is your question or link?</h5>
      </div>
    </div>
  )
}

export default QuoraBox