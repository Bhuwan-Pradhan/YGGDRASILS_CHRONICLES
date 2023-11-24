
import "../../../css/components/GroupContainer.css"
import { IoMdAdd } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { useState } from "react";
import AddInGroup from "./AddInGroup"
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { requestToJoinGroup } from "../../../services/group";



const GroupContainer = (props) => {

 const dispatch = useDispatch();
 const navigate = useNavigate();
 const { token } = useSelector((state) => state.auth);
 const [ isAddOpen, setIsAddOpen]= useState(false);
 const [ isForMember, setIsForMember]= useState(false);
 const groupId = props.id;

  const modalAddIn = (val) => {
    setIsAddOpen(val);
  };

  const handleRequest = async() =>{
   dispatch(requestToJoinGroup(groupId, token));
  }

  return (
    <div className="GroupContainer">
      <AddInGroup id ={props.id} modalV={modalAddIn} isOpen={isAddOpen} isMember={isForMember}  members={props.followers} moderators={props.moderators}/>
    <div className='GroupInfo'>
      <h1>{props.name}</h1>
      <p>Created By : {props.admin.firstName} {props.admin.lastName}</p>
      <button>{props.followers.length} Members</button>
      <button onClick={()=> {setIsAddOpen(true);  setIsForMember(true);}}>Add Member</button>
      <button onClick={()=>{setIsAddOpen(true); setIsForMember(false);}}>Add Moderator</button>
    </div>
    <div className='JoinGroup'>
      <button title="Request to join group" onClick={handleRequest}>
        <IoMdAdd size={"40px"}/>
        <p>Join</p>
        {/* <IoMdCheckmark size={"40px"}/>
        <p>Joined</p> */}
      </button>
    </div>
    <div className="ViewGroup">
      <button title="View Group" onClick={()=> navigate("/selectGroup", {state: {id: props.id}})}><IoIosArrowForward size={"50px"}/></button>
    </div>
    </div>
  );
};

export default GroupContainer;
