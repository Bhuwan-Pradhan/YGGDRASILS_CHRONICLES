import NavBar from "../components/common/NavBar";
import SideBar from "../components/common/SideBar";
import "../css/pages/ProfilePage.css";
import { useLocation } from "react-router-dom";
import { follow, unfollow } from "../services/authApi";
import { useDispatch, useSelector } from "react-redux";

import UserList from "../components/common/UserList";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { endpoints } from '../utils/api';


const ProfilePage = () => {
  const { GET_USER_DETAILS_API } = endpoints;
  const location = useLocation();
  const dispatch = useDispatch();
  const { userProfile } = location.state;
  
  const { user } = useSelector((state) => state.auth);
   // Read values passed on state
  const followerCount= userProfile.followers.length;
  const followingCount= userProfile.following.length;
  const followCheck = userProfile.followers.includes(user._id);
 
  const { token } = useSelector((state) => state.auth);
  const [isFollow, setIsFollow] = useState(followCheck);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [follower, setFollower] = useState(followerCount);
  
  const [usersData, setUsersData] = useState(null);
  const [data, setData] = useState(null);
  const [title, setTitle] = useState();

  const [field, setField] = useState();

  const handleFollow = () => {
   
    setIsFollow(true);
    setFollower(followerCount + 1);
    dispatch(follow(token, userProfile._id));
  };
  const handleUnFollow = () => {
   
    setIsFollow(false);
    setFollower(followerCount - 1);
    
    dispatch(unfollow(token, userProfile._id));
  };


  const getUsers = async () => {
    try {
      const response = await axios.post(GET_USER_DETAILS_API,{userId: userProfile._id});
     
      setUsersData(response.data.data);
      
    } catch (error) {
      console.error(error);
    }
  };
  console.log(usersData)

  useEffect(() => {
    getUsers();
    
  }, [usersData]);

  const modalUsers = (val) => {
    setIsUsersOpen(val);
  };

  useEffect(()=>{
    setIsUsersOpen(false);
  }, [userProfile])

  return (
    <div className="HomePageDiv">
      <UserList isOpen={isUsersOpen} modalV={modalUsers} id={userProfile._id} data={data} title={title}/>
      <SideBar />
      <div className="RightWala">
        <NavBar />
        <div className="MainContentDiv">
          <div className="UserProfile">
            <div className="ProfileImage">
              <img src={userProfile.image} alt="" />
              <button>Edit Profile</button>
              {isFollow?<button onClick={handleUnFollow}>UNFollow</button>: <button onClick={handleFollow}>Follow</button>}
             
              
            </div>
            <div className="UserDetailsProfile">
              <h1>
                {userProfile.firstName} {userProfile.lastName}
              </h1>
              <h2>{userProfile.email}</h2>
              <button onClick={()=>{setIsUsersOpen(true); setData(usersData?.followers); setTitle("Followers")}}><p>Followers : {follower}</p></button>
              <button onClick={()=>{setIsUsersOpen(true); setData(usersData?.following); setTitle("Followings")}}><p>Following : {followingCount}</p></button>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
