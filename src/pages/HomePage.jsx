import React, { useEffect, useState } from "react";
import PostContainer from "../components/core/Post/PostContainer";

import { getAllPost } from "../services/post";
import "../css/pages/HomePage.css";


import NewPost from "../components/core/Post/NewPost";
import TitleImage from "../assets/images/TitleText.png";
import { Link } from "react-router-dom";
import NewGroup from "../components/popUp/NewGroup";

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
      <div className="LeftWala">
        <div className="UserDetails">
          <img src={user.image} alt="" />
          <div style={{ color: "wheat" }}>
            <Link to="/userPosts">
              {user.firstName} {user.lastName}
            </Link>
          </div>
          <div className="Stats">
          <p>Following : 22</p>
          <p>Followers : 2000</p>
          </div>
        </div>
        <div className="Links">
          <div><Link to="/userPosts">
              Home
            </Link></div>
          <div>My Posts</div>
          <div>Groups</div>
          <div>Profile</div>
          <div>Filler</div>
        </div>
        <div className="Logout">
        <p>Logout</p>
        </div>
      </div>
      <div className="RightWala">
        <div className="NavBar">
          <img src={TitleImage} />
        </div>
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
