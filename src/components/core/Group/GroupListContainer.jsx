import { toast } from "react-hot-toast";
import "../../../css/components/GroupContainer.css"
import { IoMdAdd } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { requestToJoinGroup } from "../../../services/group";



const GroupContainer = (props) => {
  

 const dispatch = useDispatch();
 const navigate = useNavigate();
 const { token } = useSelector((state) => state.auth);
 

 const groupId = props.id;



  const handleRequest = async() =>{
   dispatch(requestToJoinGroup(groupId, token));
  }

  return (
    <div className="GroupContainer">
     
    <div className='GroupInfo'>
      <h1>{props.name}</h1>
      <p>Created By : {props.admin.firstName} {props.admin.lastName}</p>
      <div>
        <div>{props.followers.length} Members</div>
    
      </div>
    </div>
    <div className='JoinGroup'>
      {props.isMember || props.isModerator?(<div><IoMdCheckmark size={"40px"}/>
        <p>Joined</p></div>): (<button title="Request to join group" onClick={handleRequest}>
        <IoMdAdd size={"40px"}/>
        <p>Join</p>
       
      </button>)}
     
    </div>
    <div className="ViewGroup">
      {props.isMember || props.isModerator?(<button title="View Group" onClick={()=> navigate("/selectGroup", {state: {id: props.id , followers: props.followers, moderators: props.moderators}})}><IoIosArrowForward size={"50px"}/></button>):(<div></div>)}
      
    </div>
    </div>
  );
};

export default GroupContainer;
