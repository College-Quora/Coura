import React, { useEffect, useState } from 'react';
import QuoraBox from './QuoraBox';
import './css/Feed.css';
import BlogPost from './BlogPost';
import axios from 'axios';

function Blog() {
    const [blogposts, setBlogPosts] = useState([])
    useEffect(() =>{
    axios.get('/api/blogs').then((res) =>{
      console.log(res.data);
      setBlogPosts(res.data.reverse());
    }).catch((err) =>{
      console.log(err);
    })
  }, []);

  return (
    <div className='blog'>
    <QuoraBox />
    {
        blogposts.map((post,index) => (<BlogPost key = {index} post = {post} />))
    }
    </div>
  )
}

export default Blog