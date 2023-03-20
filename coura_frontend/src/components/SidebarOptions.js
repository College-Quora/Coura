import "./css/SidebarOptions.css";
import React from 'react';


function SidebarOptions() {
  return (
    <div className="sidebarOptions">
      <div className="sidebarOption">
        <img src="https://icon-library.com/images/college-icon/college-icon-15.jpg" alt="Loading" className="placementicon" />
        <p className="optionText" style={{color: 'black',fontWeight: 'bold'}}>Placements<br/>Reviews</p>

        <img src="https://cdn-icons-png.flaticon.com/512/4658/4658825.png" alt="Loading" className="feedbackicon" />
        <p className="optionText" style={{color:'black',fontWeight: 'bold' }}>Course<br/>Feedback</p>

        <img src="https://static.thenounproject.com/png/472944-200.png" alt="Loading" className="reviewicon" />
        <p className="optionText" style={{color:'black',fontWeight: 'bold'}}>Hostel<br/>Review</p>

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrEZswAlWjn9gJlAbuYFBN5m55qoRJFAdiBA&usqp=CAU" alt="Loading" className="infrastructureicon" />
        <p className="optionText" style={{color:'black',fontWeight: 'bold'}}>College<br/>Infrastructure</p>

        <img src="https://cdn-icons-png.flaticon.com/512/8/8178.png" alt="Loading" className="locationicon" />
        <p className="optionText" style={{color:'black',fontWeight: 'bold'}}>College<br/>Location</p>

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReZqfQ5Bo5wCxrzuw9sfqp7ITA_jS214Smgw&usqp=CAU" alt="Loading" className="sporticon" />
        <p className="optionText" style={{color:'black',fontWeight: 'bold'}}>Sports<br/>Facilities</p>

        <img src="https://cdn-icons-png.flaticon.com/512/6926/6926264.png" alt="Loading" className="scholarshipicon" />
        <p className="optionText" style={{color: 'black',fontWeight: 'bold'}}>Various<br/>Scholarships</p>

        <img src="https://static.vecteezy.com/system/resources/previews/004/572/118/original/economy-line-icon-logo-illustration-free-vector.jpg" alt="Loading" className="feeicon" />
        <p className="optionText" style={{color:'black',fontWeight: 'bold'}}>Fee<br/>Structure</p>
      </div>
    </div>
  );
}

export default SidebarOptions;
