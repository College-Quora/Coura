import React, { useState } from "react";
import { Avatar , Input } from "@mui/material";
import "./css/Post.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  Comment,
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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const displayVoteMessage = (choice) => {
  var message = "";
  if (choice == 0) message = "not voted";
  else if (choice == 1) message = "you upvoted";
  else if (choice == -1) message = "you downvoted";
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
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [upVotes, setUpVotes] = useState(post?.blogUpvotes);
  const [downVotes, setDownVotes] = useState(post?.blogDownvotes);
  const [message, setMessage] = useState(displayVoteMessage(choice));
  const [isEditBlogModalOpen, setIsEditBlogModalOpen] = useState(false);
  const [blog, setBlog] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const userId = window.localStorage.getItem("userId");
  
  const Close = <CloseIcon />;
  
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const handleQuill = (value) => {
    setComment(value);
  };

  const toggleComments = () => {
    setShowComments((prevState) => !prevState);
  };

  const handleSubmit = async () => {
    if (post?._id && comment !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        comment: comment,
        blogId: post?._id,
        userId: window.localStorage.getItem("userId")
      };
      await axios
        .post("/api/comments", body, config)
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          setIsModalOpen(false);
          window.location.href = "/blogFeed";
        })
        .catch((err) => {
          console.log(err);
          alert("Error in adding comment!");
        });
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
        .post("/api/blogs/upvotes", body, config)
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
    if(upvoted)
    {
      setUpvoted(false);
    }
    else
    {
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
        .post("/api/blogs/downvotes", body, config)
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

    if(downvoted)
    {
      setDownvoted(false);
    }
    else
    {
    setDownvoted(true);
    setUpvoted(false);
    }
  };

  const handleDeleteBlog = async() =>{
    
      await axios.delete('/api/blogs/' + post?._id).then((res) =>{
        console.log(res.data);
        alert(res.data.message);
        window.location.href = "/blogFeed";
      }).catch((err) =>{
        console.log(err);
        alert('Error in deleting blog!')
      })
    
  }

  const handleDeleteComment = async(commentId) =>{

      await axios.delete('/api/comments/' + commentId).then((res) =>{
        console.log(res.data);
        alert(res.data.message);
        window.location.href = "/blogFeed";
      }).catch((err) =>{
        console.log(err);
        alert('Error in deleting comment!')
      })
    
  }

  const handleEditBlog = async() =>{
      const config = {
          headers:{
            "Content-Type": "application/json",
          }
        }

      const body = {
        blogName: blog,
        blogUrl: inputUrl
      }

      await axios.put('/api/blogs/' + post?._id, body, config).then((res) =>{
        console.log(res.data);
        alert(res.data.message);
        window.location.href = "/blogFeed";
      }).catch((err) =>{
        console.log(err);
        alert('Error in updating blog!')
      })
    
      setIsEditBlogModalOpen(false);
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
            {post?.blogName}
          </p>
          
          <div className="post__btnContainer">
          <button onClick={() => {
            if(window.localStorage.getItem("token") == null) alert("Please login to edit blog!");
            else { setBlog(post?.blogName); setInputUrl(post?.blogUrl); setIsEditBlogModalOpen(true); }
          }} disabled={(post?.blogUserId === userId || userId === null) ? false : true} className='post__btnAnswer'><FontAwesomeIcon icon={faPencilAlt} /></button>

          <button onClick={() => {
            if(window.localStorage.getItem("token") == null) alert("Please login to delete question!");
            else {handleDeleteBlog()};
          }} disabled={(post?.blogUserId === userId || userId === null) ? false : true} className='post__btnAnswer'><FontAwesomeIcon icon={faTrashAlt} /></button>

          <button onClick={() => {
            if(window.localStorage.getItem("token") == null) alert("Please login to add comment!");
            else setIsModalOpen(true);
          }} className='post___btnAnswer'>Comment</button>
    
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
              <h1>{post?.blogName}</h1>
              <p>
                {" "}
                Posted By {""}
                <span className="name">Anonymous</span> on{" "}
                <span>{new Date(post?.createdAt).toLocaleString()}</span>
              </p>
            </div>

            <div className="modal__answer">
              <ReactQuill
                value={comment}
                onChange={handleQuill}
                placeholder="Enter Your comment"
              />
            </div>
            <div className="modal__buttons">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>

              <button type="submit" className="add" onClick={handleSubmit}>
                Add Your Comment
              </button>
            </div>
          </Modal>
        </div>
        {post?.blogUrl && <img src={post?.blogUrl} alt="url" />}
      </div>
      <div className="post__footer">
        <div className="post__footerAction">
         
            <ArrowUpwardOutlined onClick={() => {
              if(window.localStorage.getItem("token") == null) alert("Please login to upvote blog!");
              else { upVote() }
            }}
            style={{ 
              color:
                message==="you upvoted" ? "green" : "black"
             }} 
             />
            <p> {upVotes} </p> 
         
           
           
          <ArrowDownwardOutlined onClick={() => {
            if(window.localStorage.getItem("token") == null) alert("Please login to downvote blog!");
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
          {post?.allComments?.map((comment, index) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "10px 5px",
                borderTop: "1px solid lightgray",
              }}
              className="post-answer-container"
              key={index}
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
                    <LastSeen date={comment?.createdAt} />
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
                {ReactHtmlParser(comment?.comment)}
              </div>
                <div>
                  <div className="ansbtns"  style={{ display: "flex", alignItems: "center" }}>
              <button onClick={() => {
                if(window.localStorage.getItem("token") == null) alert("Please login to delete comment!");
                else {handleDeleteComment(comment?._id)};
              }} disabled={(comment?.commentUserId === userId || userId===null) ? false : true} className='post__btnAnswer'
             
              style={{ marginRight: "10px" ,fontSize:"15px"}}>
                <FontAwesomeIcon icon={faTrashAlt} /></button>
                <button className="post__btnAnswer" style={{ fontSize: "0.1em", marginRight: "10px" }}>
               <ThumbUpIcon />
                      </button>
              </div>
              </div>
            </div>
          ))}
        </div>
      )}

      { !showComments &&  (<div
        style={{
          margin: "5px 0px 0px 0px",
          padding: "5px 0px 0px 20px",
          borderTop: "1px solid lightgray",
        }}
        className="post__answer"
      >
        {post?.allComments?.map((comment, index) =>
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
                    <LastSeen date={comment?.createdAt} />
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
                {ReactHtmlParser(comment?.comment)}{" "}
              </div>

              <div>
              <div className="ansbtns"  style={{ display: "flex", alignItems: "center" }}>
              <button onClick={() => {
                if(window.localStorage.getItem("token") == null) alert("Please login to delete comment!");
                else {handleDeleteComment(comment?._id)};
              }} disabled={(comment?.commentUserId === userId || userId===null) ? false : true} className='post__btnAnswer'
             
    style={{ marginRight: "10px" ,fontSize:"15px"}}>
                <FontAwesomeIcon icon={faTrashAlt} /></button>
                <button className="post__btnAnswer" style={{ fontSize: "0.1em", marginRight: "10px" }}>
               <ThumbUpIcon />
                      </button>
              </div>
            </div>
            </div>
          ) : null
        )}
      </div>)}

            <Modal open={isEditBlogModalOpen} 
            closeIcon={Close}  
            onClose={()=>setIsEditBlogModalOpen(false)}
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
            <h5>Update Blog</h5>
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
                  value={blog}
                  onChange={(e) => setBlog(e.target.value)}
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
              <button  className='cancel' onClick={() => setIsEditBlogModalOpen(false)}>
                Cancel
              </button>

              <button onClick={handleEditBlog} type='submit' className='add'>
                Update Your Blog
              </button>
            </div>
          </Modal>

    </div>
  );
}

export default Post;
