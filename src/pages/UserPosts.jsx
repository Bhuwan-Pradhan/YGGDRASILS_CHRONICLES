import React, { useEffect, useState } from "react";
import PostContainer from '../components/common/PostContainer';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { getUserPost } from "../services/post"
import {  useSelector } from "react-redux";
import '../css/pages/HomePage.css'
import DrawerBox from "../components/common/DrawerBox";
import { GiTireIronCross } from "react-icons/gi";


const UserPosts = () => {
  const isUser=true;
  const [postData, setPostData] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const { token } = useSelector((state) => state.auth);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const getAllData = async () => {
    try {
      const getPost = await getUserPost(userId,token);


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
      Yggdrasil's Chronicles
      <span className="user"><img src={user.image} alt="" />
      <div>
      <Button  onClick={toggleDrawer}>{user.firstName} {user.lastName}</Button>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        {/* Drawer content goes here */}
        <div style={{ width: 250, display: 'flex'}}>
          <DrawerBox User={user}/>
          <Button  onClick={toggleDrawer}><GiTireIronCross size={20} /></Button>
        </div>
      </Drawer>
    </div>
    </span>
      </div>
      
        {postData?.data.map((post) => (
          <PostContainer id={post._id} image={post.user.image} name={post.author} title={post.title} body={post.body}  isLike={post.likes.includes(userId)}  likes={post.likes.length} comments = {post.comments.length}  isUser={isUser} userId={userId}/>
 
        ))}
        
    </div>
    
  )
}

export default UserPosts; 