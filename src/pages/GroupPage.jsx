import React, { useEffect, useState } from "react";
import "../css/pages/ProfilePage.css";
import "../css/pages/HomePage.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import TitleImage from "../assets/images/TitleText.png";
import { getAllGroup } from "../services/group";
import GroupContainer from "../components/core/Group/GroupContainer";

const GroupPage = () => {
  const isUser = false;
  const [groupData, setGroupData] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;




  const getAllData = async () => {
    try {
      const getGroup = await getAllGroup();

      setGroupData(getGroup);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

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
          <div>Home</div>
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
          {groupData?.data.map((group) => (
            <GroupContainer
              id={group._id}
              name={group.name}
              admin={group.adminOrOwner}
              followers={group.followersOrMembers}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
