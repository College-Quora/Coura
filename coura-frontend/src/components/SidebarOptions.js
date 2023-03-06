// import React from 'react'
// import { Add } from '@mui/icons-material';
 import "./css/SidebarOptions.css";

// function SidebarOptions() {
//   return (
//     <div className="sidebarOptions">
//       <div className="sidebarOption">
//         <img
//           src="https://qphs.fs.quoracdn.net/main-thumb-t-930-100-cbbsbwijdhpyzlpipejvqpiijhhoaday.jpeg"
//           alt=""
//         />
//         <p>History</p>
//       </div>

//       <div className="sidebarOption">
//         <img
//           src="https://qphs.fs.quoracdn.net/main-thumb-t-858-100-VnZbEVtOIGkEHXlnYId9slumV59IPgkA.jpeg"
//           alt=""
//         />

//         <p>Business</p>
//       </div>
//       <div className="sidebarOption">
//         <img
//           src="https://qphs.fs.quoracdn.net/main-thumb-t-1913-100-B8JrwaVauFzsaTSqXDqoWLCXzQb2mTE9.jpeg"
//           alt=""
//         />
//         <p>Psychology</p>
//       </div>

//       <div className="sidebarOption">
//         <img
//           src="https://qphs.fs.quoracdn.net/main-thumb-t-877-100-e7jKHEQr0HExAIA9rlsyHlV6HJyRruEo.jpeg"
//           alt=""
//         />
//         <p>Cooking</p>
//       </div>

//       <div className="sidebarOption">
//         <img
//           src="https://qphs.fs.quoracdn.net/main-thumb-t-801-100-Sf8h894FXbQZQit0TeqDrrqS6xw6dwCQ.jpeg"
//           alt=""
//         />
//         <p>Music</p>
//       </div>

//       <div className="sidebarOption">
//         <img
//           src="https://qphs.fs.quoracdn.net/main-thumb-t-931-100-c8WCPwZ9qPsh5zLGQ5wHh1ddxtc9Cch7.jpeg"
//           alt=""
//         />
//         <p>Science</p>
//       </div>

//       <div className="sidebarOption">
//         <img
//           src="https://qphs.fs.quoracdn.net/main-thumb-t-1140-100-24q3tiv4WhPssc5TGwf0mvCM5aiqGVXW.jpeg"
//           alt=""
//         />
//         <p>Health</p>
//       </div>

//       <div className="sidebarOption">
//         <img
//           src="https://qphs.fs.quoracdn.net/main-thumb-t-843-100-W7FzODceTO2aQmp8D7E4rKZ8YgSv21eR.jpeg"
//           alt=""
//         />
//         <p>Movies</p>
//       </div>

//       <div className="sidebarOption">
//         <img
//           src="https://qphs.fs.quoracdn.net/main-thumb-t-2177-100-JiR07D1TQSfeQzRvWXomVaY4Poj2f8Yb.jpeg"
//           alt=""
//         />
//         <p>Technology</p>
//       </div>

//       <div className="sidebarOption">
//         <img
//           src="https://qphs.fs.quoracdn.net/main-thumb-t-996-100-bfZBQjeEenKKl8fcNY4tVv0FyArtB0Mb.jpeg"
//           alt=""
//         />
//         <p>Education</p>
//       </div>
//       <div className="sidebarOption">
//         <Add />
//         <p className="text">Discover Spaces</p>
//       </div>
//     </div>
//   )
// }

// export default SidebarOptions

import React from 'react';


function SidebarOptions() {
  return (
    <div className="sidebarOptions">
      <div className="sidebarOption">
        <img src="https://icon-library.com/images/college-icon/college-icon-15.jpg" alt="Loading" className="placementicon" />
        <p className="optionText" style={{color: '#4C4B16',fontWeight: 'bold'}}>Placements<br/>Reviews</p>

        <img src="https://cdn-icons-png.flaticon.com/512/4658/4658825.png" alt="Loading" className="feedbackicon" />
        <p className="optionText" style={{color:'#FF7000',fontWeight: 'bold' }}>Course<br/>Feedback</p>

        <img src="https://static.thenounproject.com/png/472944-200.png" alt="Loading" className="reviewicon" />
        <p className="optionText" style={{color: '#FFB100',fontWeight: 'bold'}}>Hostel<br/>Review</p>

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrEZswAlWjn9gJlAbuYFBN5m55qoRJFAdiBA&usqp=CAU" alt="Loading" className="infrastructureicon" />
        <p className="optionText" style={{color: '#54B435',fontWeight: 'bold'}}>College<br/>Infrastructure</p>

        <img src="https://cdn-icons-png.flaticon.com/512/8/8178.png" alt="Loading" className="locationicon" />
        <p className="optionText" style={{color:'#B3005E',fontWeight: 'bold'}}>College<br/>Location</p>

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReZqfQ5Bo5wCxrzuw9sfqp7ITA_jS214Smgw&usqp=CAU" alt="Loading" className="sporticon" />
        <p className="optionText" style={{color: '#FF0303',fontWeight: 'bold'}}>Sports<br/>Facilities</p>

        <img src="https://cdn-icons-png.flaticon.com/512/6926/6926264.png" alt="Loading" className="scholarshipicon" />
        <p className="optionText" style={{color: '#3C2A21',fontWeight: 'bold'}}>Various<br/>Scholarships</p>

        <img src="https://static.vecteezy.com/system/resources/previews/004/572/118/original/economy-line-icon-logo-illustration-free-vector.jpg" alt="Loading" className="feeicon" />
        <p className="optionText" style={{color:'#EF5B0C',fontWeight: 'bold'}}>Fee<br/>Structure</p>
      </div>
    </div>
  );
}

export default SidebarOptions;
