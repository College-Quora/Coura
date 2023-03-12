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
        <h5 style={{fontSize:'25px', color:'#2B3467', fontWeight:'bold'}}>What is your question or link?</h5>
      </div>
    </div>
  )
}

export default QuoraBox