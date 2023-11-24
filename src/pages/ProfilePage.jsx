import NavBar from "../components/common/NavBar";
import SideBar from "../components/common/SideBar";
import "../css/pages/ProfilePage.css";
import { useLocation } from "react-router-dom";
import { follow, unfollow } from "../services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";



const ProfilePage = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const dispatch = useDispatch();
  const { userProfile } = location.state;
  
  const { user } = useSelector((state) => state.auth);
   // Read values passed on state
  const followerCount= userProfile.followers.length;
  const followingCount= userProfile.following.length;
  const followCheck = userProfile.followers.includes(user._id);
  console.log(followCheck)
  const { token } = useSelector((state) => state.auth);
  const [isFollow, setIsFollow] = useState(followCheck);
  const [follower, setFollower] = useState(followerCount);
  

  const handleFollow = () => {
   
    setIsFollow(true);
    setFollower(followingCount + 1);
    dispatch(follow(token, userProfile._id));
  };
  const handleUnFollow = () => {
   
    setIsFollow(false);
    setFollower(followingCount - 1);
    
    dispatch(unfollow(token, userProfile._id));
  };



  return (
    <div className="HomePageDiv">
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
              <p>Following : {followingCount}</p>
              <p>Followers : {followerCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
