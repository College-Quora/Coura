import React, { useState, useEffect } from 'react'
import QuoraHeader from './QuoraHeader'
import Feed from './Feed';
import Blog from './Blog';
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
        <div className="quora__content">
          <Sidebar/>
          {(() => {
            switch (currentList) {
              case 'blog':
                return <Blog />;
              default:
                return <Feed />;;
            }
          })()}
          <Widget />
        </div>
      </div>
    </div>
  )
}

export default Quora