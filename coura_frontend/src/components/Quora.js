import React, { useState, useEffect } from 'react'
import QuoraHeader from './QuoraHeader'
import Feed from './Feed';
import Blog from './Blog';
import Profile from './Profile';
import Sidebar from './Sidebar'
import Widget from './Widget'
import "./css/Quora.css";

function Quora({onPageSwitch}) {

  const [currentList, setCurrentList] = useState('feed');

  const toggleList = (listName) => {
    setCurrentList(listName);
  }

  
  return (
    <div className='quora'>
      <QuoraHeader onPageSwitch = {onPageSwitch} onListSwitch={toggleList}/>
      <div className="quora__contents">
        
          
          {(() => {
            switch (currentList) {
              case 'blog':
                return <div className="quora__content"> <Sidebar/> <Blog /> <Widget /> </div>;
              case 'profile':
                return <div className="quora__content"><Profile /></div>;
              default:
                return <div className="quora__content"> <Sidebar/> <Feed /> <Widget /> </div>;
            }
          })()}
          
        
      </div>
    </div>
  )
}

export default Quora