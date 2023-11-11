import React, { useEffect, useState } from "react";
import PostContainer from '../components/common/PostContainer';

import { getAllPost } from "../services/post"

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
    <div>
      <h1>welcome to homepage</h1>

      <h2>All Post</h2>

   
        {postData?.data.map((post) => (
          <PostContainer image={post.user.image} name={post.author} title={post.title} body={post.body}/>
 
        ))}
   
    </div>
  )
}

export default HomePage; 