import React, { useEffect, useState } from "react";
import PostContainer from '../components/common/PostContainer';

import { getAllPost } from "../services/post"

const HomePage = () => {
    const [postData, setPostData] = useState();
  
    const getAllData = async () => {
      try {
        const getPost = await getAllPost ();
  
        
        setPostData(getPost);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getAllData();
    },[]);
    console.log(postData);

    const inlineStyle ={
      width: '100px',
      height: '100px', 
      borderRadius: '50%', 
      objectFit: 'cover'
      
    }
    const inlineContainerStyle ={
      backgroundColor: '#9999ff',
      borderWidth: '2px',
      borderStyle: 'dotted',
      borderColor: '#000',
      borderRadius: '20px',
      margin: '20px',
      padding: '20px'
    }
 return(
    <div>
        <h1>welcome to homepage</h1>

        <h2>All Post</h2>
        {postData?.data.map((post) => (
          <PostContainer image={post.user.image} name={post.auther} title={post.title} body={post.body}/>
 
        ))}
   
    </div>
 )
}

export default HomePage; 