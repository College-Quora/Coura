import React, { useEffect, useState } from "react";
import QuoraBox from "./QuoraBox";
import "./css/Feed.css";
import Post from "./Post";
import axios from "axios";
import SortIcon from '@mui/icons-material/Sort';

function Feed({searchKey}) {
  const [posts, setPosts] = useState([]);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/questions")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      userId: window.localStorage.getItem("userId"),
    };

    axios
      .post("/api/questions/votes", body, config)
      .then((res) => {
        console.log(res.data.votes);
        setVotes(res.data.votes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const voteById = (id) => {
    if (votes[id]) return votes[id];
    else return 0;
  };

  return (
    <div className="feed">
      <QuoraBox />
      {
        posts.map((post, index) => (
        (post.questionName.toLowerCase().includes(searchKey.toLowerCase())) === true ? 
        <Post key={index} post={post} choice={voteById(post._id)} /> :null))

      }
      
    </div>
  );
}

export default Feed;
