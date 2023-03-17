import React, { useEffect, useState } from 'react';
import QuoraBox from './QuoraBox';
import './css/Feed.css';
import BlogPost from './BlogPost';
import axios from 'axios';

function Blog() {
    const [blogposts, setBlogPosts] = useState([])
    const [votes, setVotes] = useState([]);
    useEffect(() =>{
    axios.get('/api/blogs').then((res) =>{
      console.log(res.data);
      setBlogPosts(res.data.reverse());
    }).catch((err) =>{
      console.log(err);
    })
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
    <div className='blog'>
    <QuoraBox />
    {
        blogposts.map((post,index) => (<BlogPost key = {index} post = {post} choice = {voteById(post._id)} />))
    }
    </div>
  )
}

export default Blog