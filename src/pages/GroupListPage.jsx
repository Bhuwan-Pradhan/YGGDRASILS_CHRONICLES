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
import NewGroup from "../components/core/Group/NewGroup";
import { IoMdAdd } from "react-icons/io";
import { IoMdMailUnread } from "react-icons/io";
import UserList from "../components/common/UserList";
import Invitations from "../components/core/Group/Invitations";
import { useSelector } from "react-redux";


const GroupPage = (props) => {
  const [isNewGrOpen, setIsNewGrOpen] = useState(false);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [groupData, setGroupData] = useState();
  const { user } = useSelector((state) => state.auth);

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

  const modalNewGr = (val) => {
    setIsNewGrOpen(val);
  };

  const modalInvitation = (val) => {
    setIsInvitationOpen(val);
  };

  return (
    <div className="HomePageDiv">
      <NewGroup isOpen={isNewGrOpen} modalV={modalNewGr} />
      <Invitations isOpen={isInvitationOpen} modalV={modalInvitation} id={user._id}/>
      <div className="floating-button-container">
      <button
        className="floating-button"
        title="Crete new group"
        onClick={() => setIsNewGrOpen(true)}
      >
        <IoMdAdd size={"40px"}/>
      </button>
      <p>New Group</p>
      </div>
      <div className="floating-invitation-container">
      <button
        className="floating-invitation-button"
        title="Group Invitations"
        onClick={() => setIsInvitationOpen(true)}
      >
        <IoMdMailUnread />
      </button>
      <p>Invitations</p>
      </div>
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
              isMember={group.followersOrMembers.includes(user._id)}
              isModerator={group.moderator.includes(user._id)}
              isOwner={group.adminOrOwner === user._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
