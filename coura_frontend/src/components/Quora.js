import React, { useState, useEffect } from 'react'
import QuoraHeader from './QuoraHeader'
import Feed from './Feed';
import Blog from './Blog';
import Profile from './Profile';
import Sidebar from './Sidebar'
import "./css/Quora.css";
import { Route, Routes } from "react-router-dom";

function Quora() {

  const token= window.localStorage.getItem("token");
  const [searchKey, setSearchKey] = useState("");

  return (
    <div className='quora'>

      <QuoraHeader searchKey = {searchKey} setSearchKey={setSearchKey}/>
      <div className="quora__contents">
        
        <Routes>
          <Route path="/" exact element={<div className="quora__content"> <Sidebar/> <Feed searchKey = {searchKey}/> </div>} />
          <Route path="/feed" exact element={<div className="quora__content"> <Sidebar/> <Feed searchKey = {searchKey}/>  </div>} />
          <Route path="/blogFeed" exact element={<div className="quora__content"> <Sidebar/> <Blog searchKey = {searchKey}/> </div>} />
          { token && <Route path="/profile" exact element={<div className="quora__content"><Profile /></div>} />}
        </Routes>
          
        
      </div>
    </div>
  )
}

export default Quora