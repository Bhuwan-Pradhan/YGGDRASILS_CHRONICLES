import React, { useEffect, useState } from "react";


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
             <div className="Container" style={inlineContainerStyle}>
                <img style={inlineStyle} src={post.user.image} alt="userImage"/>
             <h2>{post.auther}</h2>
             <h3>title: {post.title}</h3>
             <h4>body: {post.body}</h4>
             
         </div>
        ))}
   
    </div>
 )
}

export default HomePage; 