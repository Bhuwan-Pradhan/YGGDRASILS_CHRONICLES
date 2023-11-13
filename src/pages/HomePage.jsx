import React, { useEffect, useState } from "react";
import PostContainer from '../components/common/PostContainer';

import { getAllPost } from "../services/post"
import '../css/pages/HomePage.css'


const HomePage = () => {
  const [postData, setPostData] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user._id;
  console.log(user._id);

  const getAllData = async () => {
    try {
      const getPost = await getAllPost();


      setPostData(getPost);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);
  console.log(postData);



  return (
    <div className="HomePageDiv">
      <div className="NavBar">
      Yggdrasil's Chronicles
      </div>
      
        {postData?.data.map((post) => (
          <PostContainer id={post._id} image={post.user.image} name={post.author} title={post.title} body={post.body} isLike={post.likes.includes(id)}  likes={post.likes.length} comments = {post.comments}/>
 
        ))}
        
    </div>
    
  )
}

export default HomePage; 