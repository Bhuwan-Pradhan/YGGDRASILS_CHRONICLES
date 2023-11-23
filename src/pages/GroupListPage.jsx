import React, { useEffect, useState } from "react";
import "../css/pages/ProfilePage.css";
import "../css/pages/HomePage.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import TitleImage from "../assets/images/TitleText.png";
import { getAllGroup } from "../services/group";
import GroupContainer from "../components/core/Group/GroupListContainer";
import SideBar from "../components/common/SideBar";
import NavBar from "../components/common/NavBar";
import NewGroup from "../components/popUp/NewGroup";

const GroupPage = (props) => {
  
  const [isNewGrOpen, setIsNewGrOpen] = useState(false);
  const [groupData, setGroupData] = useState();
 
 




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
  }, [groupData]);


  const modalNewGr=(val)=>{
    setIsNewGrOpen(val);
  };

  return (
    <div className="HomePageDiv">
       <NewGroup isOpen={isNewGrOpen} modalV={modalNewGr}/>
       <button className="floating-button" onClick={() => setIsNewGrOpen(true)}>
  +
    </button>
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
              moderators={group.moderator}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
