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
        <div>

          <PostContainer id={post._id} image={post.user.image} name={post.author} title={post.title} body={post.body} isLike={post.likes.includes('654f64c805bd87b97932f8f2')}  likes={post.likes.length}/>
        </div>
      ))}

    </div>
  )
}

export default HomePage; 