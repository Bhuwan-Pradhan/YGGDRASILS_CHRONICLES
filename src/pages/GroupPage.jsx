import React, { useEffect, useState } from "react";
import PostContainer from "../components/core/Post/PostContainer";

import { getUserPost } from "../services/post";
import { useSelector } from "react-redux";
// import "../css/pages/HomePage.css";
import "../css/pages/GroupPage.css";
import { IoMdAdd } from "react-icons/io";
import JoinRequests from "../components/core/Group/JoinRequests";

import SideBar from "../components/common/SideBar";
import NavBar from "../components/common/NavBar";
import { useLocation } from "react-router-dom";
import { getGroupPost } from "../services/group";
import NewPost from "../components/core/Post/NewPost";
import AddInGroup from "../components/core/Group/AddInGroup";


const GroupPage = (props) => {
  const location = useLocation();
  const {id, followers,name, moderators} = location.state;
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [isJoinReqOpen, setIsJoinReqOpen] = useState(false);
  const [postData, setPostData] = useState();
   
 const [ isAddOpen, setIsAddOpen]= useState(false);
 const [ isForMember, setIsForMember]= useState(false);
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;

  const getAllData = async () => {
    try {
      const getPost = await getGroupPost(id);

      setPostData(getPost);
    } catch (error) {
      console.log(error);
    }
  };
  const modalAddIn = (val) => {
    setIsAddOpen(val);
  };
  useEffect(() => {
    getAllData();
  }, []);

  const modalNewPost = (val) => {
    setIsNewPostOpen(val);
  };

  const modalJoinReq = (val) => {
    setIsJoinReqOpen(val);
  };

  return (
    <div className="HomePageDiv">
      <NewPost id={id} isOpen={isNewPostOpen} modalV={modalNewPost} />
      <AddInGroup id ={id} modalV={modalAddIn} isOpen={isAddOpen} isMemberTitle={isForMember}  members={followers} moderators={moderators}/>
    <JoinRequests id={id}  isOpen={isJoinReqOpen} modalV={modalJoinReq} />
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
      <SideBar />
      <div className="RightWala">
        <NavBar />
        <div className="GroupDetails">
          <div className="GroupName">
          {name}
          <button>{followers.length} Members</button>
          </div>
          <div className="GroupControls">
          <button onClick={()=> {setIsAddOpen(true);  setIsForMember(true);}}>Add Member</button>
          <button onClick={()=>{setIsAddOpen(true); setIsForMember(false);}}>Add Moderator</button>
          <button onClick={()=> setIsJoinReqOpen(true)}>Approve Requests</button>
          </div>
        </div>
        <div className="GroupInsideDiv">
        {/* <div className="MainContentDiv"> */}
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
