import React, { useState } from "react";

import { Avatar } from "@mui/material";
import './css/Post.css';
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  ChatBubbleOutlined,
  MoreHorizOutlined,
  RepeatOneOutlined,
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
  const [answer, setAnswer] = useState("");
  const Close = <CloseIcon />;

  const handleQuill = (value) => {
    setAnswer(value);
  }

  const handleSubmit = async() =>{
    if(post?._id && answer != "" ){

      const config = {
        headers:{
          "Content-Type": "application/json",
        }
      }

      const body = {
        answer: answer,
        questionId: post?._id
      }
      await axios.post('/api/answers', body, config).then((res) =>{
        console.log(res.data);
        alert(res.data.message);
        setIsModalOpen(false);
        window.location.href = "/";
      }).catch((err) =>{
        console.log(err);
        alert('Error in adding answer!')
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
          <p style={{fontSize:'23px', color:'#F94A29'}}>{post?.questionName}</p>
          <button onClick={() => setIsModalOpen(true)} className='post__btnAnswer'>Answer</button>
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
              <h1>{post?.questionName}</h1>
              <p>asked by {""}<span  className="name">Anonymous</span> on <span>{new Date(post?.createdAt).toLocaleString()}</span></p>
            </div>

            <div className="modal__answer">
              <ReactQuill value = {answer} onChange={handleQuill} placeholder="Enter Your answer"/>
            </div>
            <div className="modal__buttons">
            <button  className='cancle' onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>

            <button  type='submit' className='add' onClick={handleSubmit}>
              Add Your Answer
            </button>
            </div>
          </Modal >
        </div>
        {
          post?.questionUrl && <img src = {post?.questionUrl} alt = 'url'/>
        }
      </div>
      <div className="post__footer">
        <div className="post__footerAction">
          <ArrowUpwardOutlined />
          <ArrowDownwardOutlined />
        </div>
        <RepeatOneOutlined />
        <ChatBubbleOutlined className="iconHover" />
        <div className="post__footerLeft">
          <ShareOutlined className="iconHover" />
          <MoreHorizOutlined className="iconHover" />
        </div>
      </div>
      <p style={{
        color: "black",
        fontSize: "15px",
        fontWeight: "bold",
        margin: "10px 0",
      }}> {post?.allAnswers.length} Answer(s)</p>

      <div style={{
        margin: "5px 0px 0px 0px",
        padding: "5px 0px 0px 20px",
        borderTop: "1px solid lightgray",
      }} className='post__answer'>

        
          {
            post?.allAnswers?.map((ans) =>(<>
              <div style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "10px 5px",
                borderTop: "1px solid lightgray",
              }} className='post-answer-container'>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#888",
                }} className='post-answered'>
                <Avatar />

                <div style={{
                  margin: "0px 10px",
                  }} className='post-info'>
                  <p style={{fontSize:'18px', color:'black'}}>Anonymous</p>
                  <span><LastSeen date={ans?.createdAt}/></span>
                </div>
              </div>
              <div className='post-answer' style={{color:'#790252',fontSize:'20px',fontWeight:'bold'}}>{ReactHtmlParser(ans?.answer)}</div>
              </div>
            </>))
          }

          
        
      </div>
    </div>
  )
}

export default Post;
