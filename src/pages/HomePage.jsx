import React, { useEffect, useState } from "react";
import PostContainer from "../components/common/PostContainer";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { getAllPost } from "../services/post";
import "../css/pages/HomePage.css";
import DrawerBox from "../components/common/DrawerBox";
import { GiTireIronCross } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import TitleImage from "../assets/images/TitleText.png"

const HomePage = () => {
  const isUser = false;
  const [postData, setPostData] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

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
          <div>
            <Button onClick={toggleDrawer}>
              {user.firstName} {user.lastName}
            </Button>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
              {/* Drawer content goes here */}
              <div style={{ width: 250, display: "flex" }}>
                <DrawerBox User={user} />
                <Button onClick={toggleDrawer}>
                  <GiTireIronCross size={20} />
                </Button>
              </div>
            </Drawer>
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
