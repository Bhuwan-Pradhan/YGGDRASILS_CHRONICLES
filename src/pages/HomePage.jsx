import React, { useEffect, useState } from "react";
import PostContainer from "../components/core/Post/PostContainer";

import { getAllPost } from "../services/post";
import "../css/pages/HomePage.css";


import NewPost from "../components/core/Post/NewPost";

import { Link } from "react-router-dom";
import NewGroup from "../components/core/Group/NewGroup";
import SideBar from "../components/common/SideBar";
import NavBar from "../components/common/NavBar";

const HomePage = () => {
  
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
<SideBar />

      <div className="RightWala">
        <NavBar />
        <div className="MainContentDiv">
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
      </div>
    </div>
  );
};

export default HomePage;
