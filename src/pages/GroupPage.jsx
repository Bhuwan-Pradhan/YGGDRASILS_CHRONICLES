import React, { useEffect, useState } from "react";
import PostContainer from "../components/common/PostContainer";

import { getAllPost } from "../services/post";
import "../css/pages/HomePage.css";

import NewPost from "../components/core/Post/NewPost";
import TitleImage from "../assets/images/TitleText.png"
import { Link } from "react-router-dom";

const GroupPage = () => {
  const isUser = false;
  const [postData, setPostData] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

 
 

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
        <span className="user">
          <img src={user.image} alt="" />
          <div style={{color: 'wheat'}}>
            <Link to="/userPosts">
           
              {user.firstName} {user.lastName}
              </Link>
          
          </div>
        </span>
        <span className="TitleImage"><img src ={TitleImage}/></span>
        <NewPost />
      </div>

      {postData?.data.map((post) => (
        <PostContainer
          id={post._id}
          image={post.user.image}
          name={post.author}
          title={post.title}
          body={post.body}
          isLike={post.likes.includes(userId)}
          likes={post.likes.length}
          comments={post.comments.length}
          isUser={isUser}
          user={post.user}
        />
      ))}
    </div>
  );
};

export default GroupPage;
