import React, { useState } from "react";

import HomeIcon from '@mui/icons-material/Home';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {
  NotificationsOutlined,
  PeopleAltOutlined,
  Search,
  ExpandMore,
} from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Button, Input} from "@mui/material";
import "./css/QuoraHeader.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import axios from 'axios'

function QuoraHeaderFeed() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const Close = <CloseIcon />;

  const handleSubmit = async () => {
    if(question !== "" ){

      const config = {
        headers:{
          "Content-Type": "application/json",
        }
      }

      const body = {
        questionName: question,
        questionUrl: inputUrl
      }
      await axios.post('/api/questions', body, config).then((res) =>{
        console.log(res.data);
        alert(res.data.message);
        setIsModalOpen(false);
        window.location.href = "/";
      }).catch((err) =>{
        console.log(err);
        alert('Error in adding question!')
      })
    }
  }

  const handleClick = () => {
    window.location.href = `/?component=blog`;
    window.location.reload();
  };

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
          <div className="qHeader__icon">
            <HomeIcon />
          </div>
          <div className="qHeader__icon">
            <ListAltIcon />
          </div>
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
        <Avatar />
        </div>

        <div className="qHeader__icon">
          <Button onClick= {handleClick}>
            <PostAddIcon style= {{height: '30px', width: '30px'}}/>
          </Button>  
          </div>

        <Button onClick ={()=> setIsModalOpen(true)} style={{color:'darkblue', fontSize:'15px',fontWeight:'bold'}}>Add Question</Button>
        <Modal open={isModalOpen} closeIcon={Close}  onClose={()=> setIsModalOpen(false)}
        closeOnEsc
        center
        closeOnOverlayClick={false}
        styles={{
          overlay: {
            height: "auto",
          },
        }}
        >


          <div className="modal__title">
          <h5>Add Question</h5>
          <h5>Share Link</h5>
          </div>
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
                  placeholder="Optional: inclue a link that gives context"
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
          <div className='modal__buttons'>
            <button  className='cancel' onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>

            <button onClick={handleSubmit} type='submit' className='add'>
              Add Your Question
            </button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default QuoraHeaderFeed