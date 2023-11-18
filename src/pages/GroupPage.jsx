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
   

      {groupData?.data.map((group) => (
      <GroupContainer id={group._id} name={group.name} admin={group.adminOrOwner} followers={group.followersOrMembers}/>

      ))}
    </div>
  );
};

export default GroupPage;
