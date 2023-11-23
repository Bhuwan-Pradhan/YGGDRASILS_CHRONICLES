import React, { useEffect, useState } from "react";
import PostContainer from "../components/core/Post/PostContainer";

import { getUserPost } from "../services/post"
import {  useSelector } from "react-redux";
import "../css/pages/HomePage.css";



import SideBar from "../components/common/SideBar";
import NavBar from "../components/common/NavBar";
import { useLocation } from "react-router-dom";
import { getGroupPost } from "../services/group";
import NewPost from "../components/popUp/NewPost";

const GroupPage = () => {
  const location = useLocation();
  const group = location.state;
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [postData, setPostData] = useState();
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;

  const getAllData = async () => {
    try {
      const getPost = await getGroupPost(group);

      setPostData(getPost);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const modalNewPost=(val)=>{
    setIsNewPostOpen(val);
  };


  return (
    <div className="HomePageDiv">
       <NewPost id={group.id} isOpen={isNewPostOpen} modalV={modalNewPost}/>
       <button className="floating-button" onClick={() => setIsNewPostOpen(true)}>
  <p>New Group</p>
    </button>
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
              
              userId={userId}
             
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
