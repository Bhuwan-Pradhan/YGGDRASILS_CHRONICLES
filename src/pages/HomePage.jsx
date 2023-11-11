import React, { useEffect, useState } from "react";
import PostContainer from '../components/common/PostContainer';

import { getAllPost } from "../services/post"
import '../css/pages/HomePage.css'

const HomePage = () => {
  const [postData, setPostData] = useState();

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
          <PostContainer image={post.user.image} name={post.author} title={post.title} body={post.body}/>
 
        ))}
   
    </div>
  )
}

export default HomePage; 