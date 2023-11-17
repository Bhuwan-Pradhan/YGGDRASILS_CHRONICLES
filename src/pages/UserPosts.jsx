import React, { useEffect, useState } from "react";
import PostContainer from '../components/core/Post/PostContainer';

import { getUserPost } from "../services/post"
import {  useSelector } from "react-redux";
import '../css/pages/HomePage.css'



const UserPosts = () => {
  const isUser=true;
  const [postData, setPostData] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const { token } = useSelector((state) => state.auth);

 

  const getAllData = async () => {
    try {
      const getPost = await getUserPost(userId,token);


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
      <span className="user"><img src={user.image} alt="" />
     
     
    </span>
      </div>
      
        {postData?.data.map((post) => (
          <PostContainer id={post._id} image={post.user.image} name={post.author} title={post.title} body={post.body}  isLike={post.likes.includes(userId)}  likes={post.likes.length} comments = {post.comments.length}  isUser={isUser} userId={userId}/>
 
        ))}
        
    </div>
    
  )
}

export default UserPosts; 