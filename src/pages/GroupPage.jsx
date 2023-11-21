import React, { useEffect, useState } from "react";
import "../css/pages/ProfilePage.css";
import "../css/pages/HomePage.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import TitleImage from "../assets/images/TitleText.png";
import { getAllGroup } from "../services/group";
import GroupContainer from "../components/core/Group/GroupContainer";
import SideBar from "../components/common/SideBar";
import NavBar from "../components/common/NavBar";

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
 <SideBar />
      <div className="RightWala">
     <NavBar />
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
