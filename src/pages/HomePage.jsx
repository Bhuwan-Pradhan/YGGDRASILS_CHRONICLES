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
    <div>
      <h1>welcome to homepage</h1>

      <h2>All Post</h2>


 

    <div className="HomePageDiv">
      <div className="NavBar">
      Yggdrasil's Chronicles
      </div>
      
        {postData?.data.map((post) => (
          <PostContainer id={post._id} image={post.user.image} name={post.author} title={post.title} body={post.body} isLike={post.likes.includes('654f64c805bd87b97932f8f2')}  likes={post.likes.length}/>
 
        ))}
   
    </div>
    </div>
  )
}

export default HomePage; 