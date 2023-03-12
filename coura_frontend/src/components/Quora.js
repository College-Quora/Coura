import React from 'react'
import QuoraHeaderFeed from './QuoraHeaderFeed'
import Feed from './Feed';
import Sidebar from './Sidebar'
import Widget from './Widget'
import "./css/Quora.css";
//import QuoraHeaderBlog from './QuoraHeaderBlog';
//import Blog from './Blog';

function Quora() {
  //const { componentA, componentB } = props;

  return (
    <div className='quora'>
      <QuoraHeaderFeed />
      <div className="quora__contents">
        <div className="quora__content">
          <Sidebar/>
           <Feed />
          <Widget />
        </div>
      </div>
    </div>
  )
}

export default Quora