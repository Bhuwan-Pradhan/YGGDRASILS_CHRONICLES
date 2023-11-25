import React, { useEffect, useState } from "react";
import PostContainer from "../components/core/Post/PostContainer";

import { getAllPost } from "../services/post";
import "../css/pages/HomePage.css";
import { IoMdAdd } from "react-icons/io";

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
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);

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
  }, [postData]);
  const modalNewPost = (val) => {
    setIsNewPostOpen(val);
  };

  return (
    <div className="HomePageDiv">
        <NewPost  isOpen={isNewPostOpen} modalV={modalNewPost} />
<SideBar />
<div className="floating-button-container">
      <button
        className="floating-button"
        title="Crete new post"
        onClick={() => setIsNewPostOpen(true)}
      >
        <IoMdAdd size={"40px"}/>
      </button>
      <p>New Post</p>
      </div>
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
              repost={post.repost}
              media={post.media}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
