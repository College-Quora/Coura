import React, { useState } from "react";

import { Avatar } from "@mui/material";
import './css/Post.css';
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  Comment,
  //RepeatOneOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactTimeAgo from 'react-time-ago'
import axios from 'axios';
import ReactHtmlParser from 'html-react-parser';

function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round"/>
    </div>
  )
}

function Post({post}) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const Close = <CloseIcon />;

  const handleQuill = (value) => {
    setComment(value);
  }

  const toggleComments = () => {
    setShowComments((prevState) => !prevState);
  };

  const handleSubmit = async() =>{
    if(post?._id && comment !== "" ){

      const config = {
        headers:{
          "Content-Type": "application/json",
        }
      }

      const body = {
        comment: comment,
        blogId: post?._id
      }
      await axios.post('/api/comments', body, config).then((res) =>{
        console.log(res.data);
        alert(res.data.message);
        setIsModalOpen(false);
        window.location.href = "/";
      }).catch((err) =>{
        console.log(err);
        alert('Error in adding comment!')
      })
    }
  }

  return (
    <div className='post'>
      <div className='post__info'>
        <Avatar />
        <h3  style={{marginLeft:'10px'}}>Anonymous</h3>
        <small> <LastSeen date={post?.createdAt}/></small>
      </div>
      <div className='post__body'>
        <div className='post__question'>
          <p style={{fontSize:'23px', color:'#F94A29'}}>{post?.blogName}</p>
          <button onClick={() => setIsModalOpen(true)} className='post__btnAnswer'>Comment</button>
          <Modal
          open={isModalOpen} 
          closeIcon={Close}  
          onClose={()=> setIsModalOpen(false)}
          closeOnEsc
          center
          closeOnOverlayClick={false}
          styles={{
            overlay: {
              height: "auto",
            },
          }}
          >
            <div  className="modal__question">
              <h1>{post?.blogName}</h1>
              <p> Posted By {""}<span  className="name">Anonymous</span> on <span>{new Date(post?.createdAt).toLocaleString()}</span></p>
            </div>

            <div className="modal__answer">
              <ReactQuill value = {comment} onChange={handleQuill} placeholder="Enter Your comment"/>
            </div>
            <div className="modal__buttons">
            <button  className='cancle' onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>

            <button  type='submit' className='add' onClick={handleSubmit}>
              Add Your Comment
            </button>
            </div>
          </Modal >
        </div>
        {
          post?.blogUrl && <img src = {post?.blogUrl} alt = 'url'/>
        }
      </div>
      <div className="post__footer">
        <div className="post__footerAction">
          <ArrowUpwardOutlined />
          <ArrowDownwardOutlined />
        </div>
        <Comment className="iconHover" />
        <div className="post__footerLeft">
          <ShareOutlined className="iconHover" />
        </div>
      </div>
      <p
        style={{
          color: "black",
          fontSize: "15px",
          fontWeight: "bold",
          margin: "10px 0",
          cursor: "pointer",
        }}
        onClick={toggleComments}
      >
          {post?.allComments.length} Comment(s)
      </p>
      {showComments && (
  <div>
    {post?.allComments
      ?.slice(1)
      .map((comment, index) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: '10px 5px',
            borderTop: '1px solid lightgray',
          }}
          className='post-answer-container'
          key={index}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#888',
            }}
            className='post-answered'
          >
            <Avatar />

            <div
              style={{
                margin: '0px 10px',
              }}
              className='post-info'
            >
              <p style={{ fontSize: '18px', color: 'black' }}>Anonymous</p>
              <span><LastSeen date={comment?.createdAt} /></span>
            </div>
          </div>
          <div
            className='post-answer'
            style={{ color: '#790252', fontSize: '20px', fontWeight: 'bold' }}
          >
            {ReactHtmlParser(comment?.comment)}
          </div>
        </div>
      ))}
  </div>
)}



      <div style={{
        margin: "5px 0px 0px 0px",
        padding: "5px 0px 0px 20px",
        borderTop: "1px solid lightgray",
      }} className='post__answer'>


    {
        post?.allComments?.map((ans, index) => (
          index == 0 ? (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "10px 5px",
          borderTop: "1px solid lightgray",
        }}
        className="post-answer-container"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#888",
          }}
          className="post-answered"
        >
          <Avatar />

          <div
            style={{
              margin: "0px 10px",
            }}
            className="post-info"
          >
            <p style={{ fontSize: "18px", color: "black" }}>Anonymous</p>
            <span>
              <LastSeen date={ans?.createdAt} />
            </span>
          </div>
        </div>
        <div
          className="post-answer"
          style={{ color: "#790252", fontSize: "20px", fontWeight: "bold" }}
        >
          {ReactHtmlParser(ans?.comment)}  </div>
      </div>
  
  ) : null
  ))
}

          
        
      </div>
    </div>
  )
}

export default Post;
