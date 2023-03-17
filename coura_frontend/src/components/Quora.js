import React, { useState, useEffect } from 'react'
import QuoraHeader from './QuoraHeader'
import Feed from './Feed';
import Blog from './Blog';
import Profile from './Profile';
import Sidebar from './Sidebar'
import Widget from './Widget'
import "./css/Quora.css";
import { Route, Routes, Navigate } from "react-router-dom";

function Quora() {

  
  return (
    <div className='quora'>

      <QuoraHeader/>
      <div className="quora__contents">
        
        <Routes>
          <Route path="/" exact element={<div className="quora__content"> <Sidebar/> <Feed /> <Widget /> </div>} />
          <Route path="/feed" exact element={<div className="quora__content"> <Sidebar/> <Feed /> <Widget /> </div>} />
          <Route path="/blogFeed" exact element={<div className="quora__content"> <Sidebar/> <Blog /> <Widget /> </div>} />
          <Route path="/profile" exact element={<div className="quora__content"><Profile /></div>} />
        </Routes>
          
        
      </div>
    </div>
  )
}

export default Quora