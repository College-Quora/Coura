import React, { useState, useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ReactQuill from 'react-quill';
import { Link } from "react-router-dom";
//import PostAddIcon from '@mui/icons-material/PostAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {
  NotificationsOutlined,
  PeopleAltOutlined,
  Search,
  ExpandMore,
} from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Button, Input, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import "./css/QuoraHeader.css";
import { Modal } from "react-responsive-modal";

import "react-responsive-modal/styles.css";
import axios from 'axios'
import DropDownProfile from './DropDownProfile';

function QuoraHeader() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [isCreateBlogModalOpen, setIsCreateBlogModalOpen] = useState(false);
 
  const [blogContent, setBlogContent] = useState('');
  const [inputUrl, setInputUrl] = useState("");
  const [inputUrlBlog, setInputUrlBlog] = useState("");
  const [question, setQuestion] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const loggedIn = window.localStorage.getItem("loggedIn");
  const Close = <CloseIcon />;

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalType('');
  };

  const handleAddQuestionClick = () => {
    setIsModalOpen(true);
    setModalType('question');
  };

  const handleCreateBlogClick = () => {
    setIsModalOpen(true);
    setModalType('blog');
  };


  const handleSubmit = async () => {
    if(question !== "" ){

      const config = {
        headers:{
          "Content-Type": "application/json",
        }
      }

      const body = {
        questionName: question,
        questionUrl: inputUrl,
        userId: window.localStorage.getItem("userId")
      }
      await axios.post('/api/questions', body, config).then((res) =>{
        console.log(res.data);
        alert(res.data.message);
        setIsModalOpen(false);
        window.location.href = "/feed";
      }).catch((err) =>{
        console.log(err);
        alert('Error in adding question!')
      })
    }
  }

  const handleSubmitBlog = async () => {
    if(blogContent !== "" ){

      const config = {
        headers:{
          "Content-Type": "application/json",
        }
      }

      const body = {
        blogName: blogContent,
        blogUrl: inputUrlBlog,
        userId: window.localStorage.getItem("userId")
      }
      await axios.post('/api/blogs', body, config).then((res) =>{
        console.log(res.data);
        alert(res.data.message);
        setIsModalOpen(false);
        window.location.href = "/blogFeed";
      }).catch((err) =>{
        console.log(err);
        alert('Error in adding blog!')
      })
    }
  }

  return (
    <div className="qHeader">
      <div className="qHeader-content">
        <div className="qHeader__logo">
          <img
            src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
            alt="logo"
          />
        </div>
        <div className="qHeader__icons">
          <Link to = "/feed"><div className="qHeader__icon">
            <HomeIcon />
          </div></Link>
          <Link to="/blogFeed"><div className="qHeader__icon">
            <ListAltIcon />
          </div></Link>
          
          <div className="qHeader__icon">
            <HistoryEduIcon/>
          </div>
          <div className="qHeader__icon">
            <PeopleAltOutlined />
          </div>
          <div className="qHeader__icon">
            <NotificationsOutlined />
          </div>
        </div>
        <div className="qHeader__input">
          <Search />
          <input type="text" placeholder="Search questions" style={{background:'rgb(243, 218, 235)',color:'blueviolet',fontWeight:'bold'}}/>
        </div>
        <div className="qHeader__Rem">
        { loggedIn ? <div onClick = {()=>setOpenProfile((prev) => (!prev))}>
            <Avatar/>
            {openProfile && <DropDownProfile/>}
        </div> : <Link to="/login">
          <Button> Login </Button>
        </Link> }
        </div>


    

      <Button onClick ={()=> {
          if(window.localStorage.getItem("token") == null) alert("Please login to add question/ blog!");
          else setIsModalOpen(true);
        }} style={{ color: 'darkblue', fontSize: '15px', fontWeight: 'bold' }}>
        Add Question / Blog
      </Button>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Add Question/ Blog</DialogTitle>
        <DialogContent>
      
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddQuestionModalOpen(true)}>Add Question</Button>
          
          <Button onClick={() => setIsCreateBlogModalOpen(true)}>Create Blog</Button>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isAddQuestionModalOpen} onClose={() => setIsAddQuestionModalOpen(false)}
      >
        <DialogTitle>Add New Question</DialogTitle>
        <DialogContent style={{ marginTop: '-15px', width: '600px', height: '570px',marginDown: '30px' }}>
        
          <div className="modal__info">
          <Avatar  className="avatar" />
          <div className="modal__scope">
          <PeopleAltOutlined />
                <p>Public</p>
                <ExpandMore/>
          </div>
          </div>
          <div className="modal__Field">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type=" text"
                placeholder="Start your question with 'What', 'How', 'Why', etc. "
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  style={{
                    margin: "5px 0",
                    border: "1px solid lightgray",
                    padding: "10px",
                    outline: "2px solid #000",
                  }}
                  placeholder="Optional: include a link that gives context"
                />
                {inputUrl !== "" && (
                  <img
                    style={{
                      height: "40vh",
                      objectFit: "contain",
                    }}
                    src={inputUrl}
                    alt="displayimage"
                  />
                )}
              </div>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick ={() => setIsAddQuestionModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} type='submit' className='add'>
              Add Your Question
            </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isCreateBlogModalOpen} onClose={() => setIsCreateBlogModalOpen(false)}>
        <DialogTitle>Create Blog</DialogTitle>
        <DialogContent style={{ marginTop: '10px', width: '600px', height: '570px',marginDown: '30px' }}>
        <div className="modal__Field">
              <Input
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                type=" text"
                placeholder="Say Something....... "
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <input
                  type="text"
                  value={inputUrlBlog}
                  onChange={(e) => setInputUrlBlog(e.target.value)}
                  style={{
                    margin: "5px 0",
                    border: "1px solid lightgray",
                    padding: "10px",
                    outline: "2px solid #000",
                  }}
                  placeholder="Optional: include a link that gives context"
                />
                {inputUrlBlog !== "" && (
                  <img
                    style={{
                      height: "40vh",
                      objectFit: "contain",
                    }}
                    src={inputUrlBlog}
                    alt="displayimage"
                  />
                )}
              </div>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateBlogModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmitBlog} type='submit' className='add'>Create</Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  )
}

export default QuoraHeader