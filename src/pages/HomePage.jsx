import React, { useEffect, useState } from "react";
import PostContainer from "../components/common/PostContainer";

import { getAllPost } from "../services/post";
import "../css/pages/HomePage.css";


import { useNavigate , Link} from "react-router-dom";
import TitleImage from "../assets/images/TitleText.png"

const HomePage = () => {
  const isUser = false;
  const [postData, setPostData] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

 
  const navigate = useNavigate();


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
            <Link to="/userPost">
           
              {user.firstName} {user.lastName}
              </Link>
          
          </div>
        </span>
        <span className="TitleImage"><img src ={TitleImage}/></span>
        <button onClick={()=>navigate("/newPost")}> New Post</button>
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

export default HomePage;
