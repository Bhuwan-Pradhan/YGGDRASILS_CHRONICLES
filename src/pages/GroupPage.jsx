import React, { useEffect, useState } from "react";


import { getAllGroup } from "../services/group";


import NewPost from "../components/core/Post/NewPost";
import TitleImage from "../assets/images/TitleText.png"
import { Link } from "react-router-dom";
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
      <div className="NavBar">
        <span className="user">
          <img src={user.image} alt="" />
          <div style={{ color: 'wheat' }}>
            <Link to="/userPosts">

              {user.firstName} {user.lastName}
            </Link>

          </div>
        </span>
        <span className="TitleImage"><img src={TitleImage} /></span>
        <NewPost />
      </div>

      {groupData?.data.map((group) => (
      <GroupContainer id={group._id} name={group.name} admin={group.admin} followers={group.followers}/>

      ))}
    </div>
  );
};

export default GroupPage;
