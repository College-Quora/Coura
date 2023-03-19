import React, { useEffect, useState } from "react";
import { Avatar, Input } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import './css/Post.css';
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  Comment,
  //RepeatOneOutlined,
  ShareOutlined,
  PeopleAltOutlined,
  ExpandMore,

} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";
import ReactHtmlParser from "html-react-parser";



const displayVoteMessage = (choice) => {
  var message = "";
  if (choice === 0) message = "not voted";
  else if (choice === 1) message = "you upvoted";
  else if (choice === -1) message = "you downvoted";
  return message;
};

function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
    </div>
  );
}

function Post({ post, choice }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [upVotes, setUpVotes] = useState(post?.quesUpvotes);
  const [downVotes, setDownVotes] = useState(post?.quesDownvotes);
  const [message, setMessage] = useState(displayVoteMessage(choice));
  const [showAnswers, setShowAnswers] = useState(false);
  const [isEditAnsModalOpen, setIsEditAnsModalOpen] = useState(false);
  const [isEditQuesModalOpen, setIsEditQuesModalOpen] = useState(false);
  const [answerId, setAnswerId] = useState("");
  const [question, setQuestion] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [alreadyAnswered, setAlreadyAnswered] = useState(false);
  const userId = window.localStorage.getItem("userId");

  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  
  const Close = <CloseIcon />;

  useEffect(() =>{
    for(let i=0; i < post?.answeredByUsers?.length;i++){
        if(userId == null)break;
        if((post?.answeredByUsers)[i] === userId) {setAlreadyAnswered(true); break;}
    }
  }, []);


  const handleQuill = (value) => {
    setAnswer(value);
  };

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const handleSubmit = async () => {
    if (post?._id && answer !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        answer: answer,
        questionId: post?._id,
        userId: userId,
      };
      await axios
        .post("/api/answers", body, config)
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          window.location.href = "/feed";
        })
        .catch((err) => {
          console.log(err);
          alert("Error in adding answer!");
        });
        setIsModalOpen(false);
    }
  };

  const upVote = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      postId: post._id,
      userId: window.localStorage.getItem("userId"),
    };

    if (post?._id) {
      await axios
        .post("/api/questions/upvotes", body, config)
        .then((res) => {
          console.log(res);
          setDownVotes(res.data.downvotes);
          setUpVotes(res.data.upvotes);
          setMessage(displayVoteMessage(res.data.choice));
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          alert("Error in upvoting");
        });
    }
    if (upvoted) {
      setUpvoted(false);
    } else {
      setUpvoted(true);
      setDownvoted(false);
    }
   
  };

  const downVote = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      postId: post._id,
      userId: window.localStorage.getItem("userId"),
    };

    if (post?._id) {
      await axios
        .post("/api/questions/downvotes", body, config)
        .then((res) => {
          console.log(res);
          setDownVotes(res.data.downvotes);
          setUpVotes(res.data.upvotes);
          setMessage(displayVoteMessage(res.data.choice));
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          alert("Error in downvoting");
        });
    }
    if (downvoted) {
      setDownvoted(false);
    } else {
      setDownvoted(true);
      setUpvoted(false);
    }
   
  };

  const handleEditAns = async(ansId) =>{
      const config = {
          headers:{
            "Content-Type": "application/json",
          }
        }

      const body = {
        answer: answer
      }

      await axios.put('/api/answers/' + ansId, body, config).then((res) =>{
        console.log(res.data);
        alert(res.data.message);
        window.location.href = "/feed";
      }).catch((err) =>{
        console.log(err);
        alert('Error in updating answer!')
      })
    
      setIsEditAnsModalOpen(false);
  }

  const handleEditQues = async() =>{
      const config = {
          headers:{
            "Content-Type": "application/json",
          }
        }

      const body = {
        questionName: question,
        questionUrl: inputUrl
      }

      await axios.put('/api/questions/' + post?._id, body, config).then((res) =>{
        console.log(res.data);
        alert(res.data.message);
        window.location.href = "/feed";
      }).catch((err) =>{
        console.log(err);
        alert('Error in updating question!')
      })
    
      setIsEditQuesModalOpen(false);
  }

  const handleDeleteAns = async(ansId) =>{

      await axios.delete('/api/answers/' + ansId + '/' + post?._id + '/' + userId).then((res) =>{
        console.log(res.data);
        alert(res.data.message);
        window.location.href = "/feed";
      }).catch((err) =>{
        console.log(err);
        alert('Error in deleting answer!')
      })
    
  }

  const handleDeleteQues = async() =>{
    
      await axios.delete('/api/questions/' + post?._id).then((res) =>{
        console.log(res.data);
        alert(res.data.message);
        window.location.href = "/feed";
      }).catch((err) =>{
        console.log(err);
        alert('Error in deleting question!')
      })
    
  }

  return (
    <div className="post">
     
      <div className="post__info">
     
        <Avatar />
        <h3 style={{ marginLeft: "10px", color: "black" }}>Anonymous</h3>
        <small>
          {" "}
          <LastSeen date={post?.createdAt} />
        </small>
      </div>
      <div className="post__body">
     
        <div className="post__question">
          <p
            style={{
              fontSize: "23px",
              color: "black",
              fontFamily: "Playfair Display, serif",
              fontStyle: "italic",
            }}
          >
            {post?.questionName}
          </p>
          <div className='post__btnContainer'>

          <button onClick={() => {
            if(window.localStorage.getItem("token") == null) alert("Please login to edit question!");
            else { setQuestion(post?.questionName); setInputUrl(post?.questionUrl); setIsEditQuesModalOpen(true); }
          }} disabled={(post?.quesUserId === userId || userId === null) ? false : true} className='post__btnAnswer'><FontAwesomeIcon icon={faPencilAlt} /></button>

          <button onClick={() => {
            if(window.localStorage.getItem("token") == null) alert("Please login to delete question!");
            else {handleDeleteQues()};
          }} disabled={(post?.quesUserId === userId || userId === null) ? false : true} className='post__btnAnswer'><FontAwesomeIcon icon={faTrashAlt} /></button>
          
          <button onClick={() => {
            if(window.localStorage.getItem("token") == null) alert("Please login to add answer!");
            else setIsModalOpen(true);
          }} disabled= {alreadyAnswered} className='post___btnAnswer'>Answer</button>

          </div>
    

          <Modal
            open={isModalOpen}
            closeIcon={Close}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            <div className="modal__question">
              <h1>{post?.questionName}</h1>
              <p>
                asked by {""}
                <span className="name">Anonymous</span> on{" "}
                <span>{new Date(post?.createdAt).toLocaleString()}</span>
              </p>
            </div>

            <div className="modal__answer">
              <ReactQuill
                value={answer}
                onChange={handleQuill}
                placeholder="Enter Your answer"
              />
            </div>
            <div className="modal__buttons">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>

              <button type="submit" className="add" onClick={handleSubmit}>
                Add Your Answer
              </button>
            </div>
          </Modal>
        </div>
        {post?.questionUrl && <img src={post?.questionUrl} alt="url" />}
      </div>
      <div className="post__footer">
        <div className="post__footerAction">
          <ArrowUpwardOutlined onClick={() => {
            if(window.localStorage.getItem("token") == null) alert("Please login to upvote question!");
            else { upVote() }
          }} 
          style={{ 
            color:
              message==="you upvoted" ? "green" : "black"
           }} 
          />
          <p> {upVotes} </p>
          <ArrowDownwardOutlined onClick={() => {
            if(window.localStorage.getItem("token") == null) alert("Please login to downvote question!");
            else { downVote() }
          }}  
          style={{ 
            color:
              message==="you downvoted" ? "red" : "black"
           }} 
          />
          <p> {downVotes} </p>
        </div>
        {/* <div>{message}</div> */}
        
      </div>
      <p
        onClick={toggleAnswers}
        style={{
          color: "black",
          fontSize: "15px",
          fontWeight: "bold",
          margin: "10px 0",
          cursor: "pointer",
        }}
      >
        {post?.allAnswers.length} Answer(s)
      </p>

      {showAnswers && (
        <div className="modal__answers">
          {post?.allAnswers?.map((ans) => (
            <>
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
                    <p style={{ fontSize: "18px", color: "rgb(1, 26, 80)" }}>
                      Anonymous
                    </p>
                    <span>
                      <LastSeen date={ans?.createdAt} />
                    </span>
                  </div>
                </div>
                <div
                  className="post-answer"
                  style={{
                    color: "#1da1f2",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {ReactHtmlParser(ans?.answer)}
                </div>
                <div>

                <div className="ansbtns" style={{ display: "flex", alignItems: "center" }}>
  <button
    onClick={() => {
      if (window.localStorage.getItem("token") == null)
        alert("Please login to edit answer!");
      else {
        setAnswer(ans?.answer);
        setAnswerId(ans?._id);
        setIsEditAnsModalOpen(true);
      }
    }}
    disabled={ans?.ansUserId === userId || userId === null ? false : true}
    className="post__btnAnswer"
    style={{ marginRight: "10px" ,fontSize:"15px"}}
  >
    <FontAwesomeIcon icon={faPencilAlt} />
  </button>

  <button
    onClick={() => {
      if (window.localStorage.getItem("token") == null)
        alert("Please login to delete answer!");
      else {
        handleDeleteAns(ans?._id);
      }
    }}
    disabled={ans?.ansUserId === userId || userId === null ? false : true}
    className="post__btnAnswer"
    style={{ marginRight: "10px" ,fontSize:"15px"}}
  >
    <FontAwesomeIcon icon={faTrashAlt} />
  </button>

  <button className="post__btnAnswer" style={{ fontSize: "0.1em", marginRight: "10px" }}>
    <ThumbUpIcon />
  </button>
</div>
            
            </div>
              </div>
            </>
          ))}
        </div>
      )}

      { !showAnswers && (<div
        style={{
          margin: "5px 0px 0px 0px",
          padding: "5px 0px 0px 20px",
          borderTop: "1px solid lightgray",
        }}
        className="post__answer"
      >
        {post?.allAnswers?.map((ans, index) =>
          index === 0 ? (
            <div
              key={ans.id}
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
                style={{
                  color: "#1da1f2",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {ReactHtmlParser(ans?.answer)}
              </div>
              <div>
              <div className="ansbtns" style={{ display: "flex", alignItems: "center" }}>
  <button
    onClick={() => {
      if (window.localStorage.getItem("token") == null)
        alert("Please login to edit answer!");
      else {
        setAnswer(ans?.answer);
        setAnswerId(ans?._id);
        setIsEditAnsModalOpen(true);
      }
    }}
    disabled={ans?.ansUserId === userId || userId === null ? false : true}
    className="post__btnAnswer"
    style={{ marginRight: "10px" ,fontSize:"15px"}}
  >
    <FontAwesomeIcon icon={faPencilAlt} />
  </button>

  <button
    onClick={() => {
      if (window.localStorage.getItem("token") == null)
        alert("Please login to delete answer!");
      else {
        handleDeleteAns(ans?._id);
      }
    }}
    disabled={ans?.ansUserId === userId || userId === null ? false : true}
    className="post__btnAnswer"
    style={{ marginRight: "10px" ,fontSize:"15px"}}
  >
    <FontAwesomeIcon icon={faTrashAlt} />
  </button>

  <button className="post__btnAnswer" style={{ fontSize: "0.1em", marginRight: "10px" }}>
    <ThumbUpIcon />
  </button>
</div>

              </div>
            </div>
          ) : null
        )}
      </div>)}

          <Modal
          open={isEditAnsModalOpen} 
          closeIcon={Close}  
          onClose={()=>{setAnswer(""); setAnswerId(""); setIsEditAnsModalOpen(false);}}
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
            <button  className='cancle' onClick={() => {setAnswer(""); setAnswerId(""); setIsEditAnsModalOpen(false);}}>
              Cancel
            </button>

            <button  type='submit' className='add' onClick={()=> (answerId !== "" ? handleEditAns(answerId): null)} >
              Update Your Answer
            </button>
            </div>
          </Modal >


          <Modal open={isEditQuesModalOpen} 
          closeIcon={Close}  
          onClose={()=>setIsEditQuesModalOpen(false)}
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
          <h5>Update Question</h5>
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
          <div className='modal__buttons'>
            <button  className='cancel' onClick={() => setIsEditQuesModalOpen(false)}>
              Cancel
            </button>

            <button onClick={handleEditQues} type='submit' className='add'>
              Update Your Question
            </button>
          </div>
        </Modal>

    </div>
  );
}

export default Post;
