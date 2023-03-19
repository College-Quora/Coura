// import React,{ useState } from 'react';
// import "./css/Profile.css";
// import ProfileFeed from './ProfileFeed';

// function Profile() {

//     const [currentList, setCurrentList] = useState('userQuestions');

//     const toggleList = (listName) => {
//         setCurrentList(listName);
//     }

//     const userName = window.localStorage.getItem("userName");
//     const userCollege = window.localStorage.getItem("userCollege");
//     const userEmail = window.localStorage.getItem("userEmail");

//     return (
//         <>
//         <div className="profile">
//         <div className="profileTop">
//             <div className="profileCover">
//             <div className="profileCoverBg" />
//             <img className="profileUserImg" src="https://toppng.com/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png" alt="profile user image"/>
            
//             </div>
//             <div className="profileInfo">
//                 <h4 className="profileInfoName">{userName}</h4>
//                 <h5 className="profileInfoEmail">{userEmail}</h5>
//                 <h5 className="profileInfoCollege">{userCollege}</h5>
//             </div>
//             </div>
//             <div className="profileBottom">
//             <div className="profileOptions">
//                 <h4 className="userQuestions" onClick={()=>toggleList('userQuestions')}>Questions</h4>
//                 <h4 className="userAnswers" onClick={()=>toggleList('userAnswers')}>Answers</h4>
//                 <h4 className="userBlogs" onClick={()=>toggleList('userBlogs')}>Blogs</h4>
//             </div>
//             <ProfileFeed currentList = {currentList}/>
//             </div>
//         </div>
        
//     </>
//     )
// }

// export default Profile

import React, { useState } from 'react';
import './css/Profile.css';
import ProfileFeed from './ProfileFeed';

function Profile() {
  const [activeOption, setActiveOption] = useState('userQuestions');

  const handleOptionClick = (optionName) => {
    setActiveOption(optionName);
  };

  const userName = window.localStorage.getItem('userName');
  const userCollege = window.localStorage.getItem('userCollege');
  const userEmail = window.localStorage.getItem('userEmail');

  return (
    <>
      <div className="profile">
        <div className="profileTop">
          <div className="profileCover">
            <div className="profileCoverBg" />
            <img
              className="profileUserImg"
              src="https://toppng.com/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png"
              alt="profile user image"
            />
          </div>
          <div className="profileInfo">
            <h4 className="profileInfoName">{userName}</h4>
            <h5 className="profileInfoEmail">{userEmail}</h5>
            <h5 className="profileInfoCollege">{userCollege}</h5>
          </div>
        </div>
        <div className="profileBottom">
          <div className="profileOptions">
            <h4
              className={`userQuestions ${
                activeOption === 'userQuestions' ? 'active' : ''
              }`}
              onClick={() => handleOptionClick('userQuestions')}
            >
              Questions
            </h4>
            <h4
              className={`userAnswers ${
                activeOption === 'userAnswers' ? 'active' : ''
              }`}
              onClick={() => handleOptionClick('userAnswers')}
            >
              Answers
            </h4>
            <h4
              className={`userBlogs ${
                activeOption === 'userBlogs' ? 'active' : ''
              }`}
              onClick={() => handleOptionClick('userBlogs')}
            >
              Blogs
            </h4>
          </div>
          <ProfileFeed currentList={activeOption} />
        </div>
      </div>
    </>
  );
}

export default Profile;
