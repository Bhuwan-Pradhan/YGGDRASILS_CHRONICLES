
import "../../../css/components/GroupContainer.css"
import { IoMdAdd } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { useState } from "react";
import AddInGroup from "../../popUp/AddInGroup"
import { useNavigate } from "react-router-dom";


const GroupContainer = (props) => {

 const navigate = useNavigate();
 const [ isAddOpen, setIsAddOpen]= useState(false);
 const [ isForMember, setIsForMember]= useState(false);

  const modalAddIn = (val) => {
    setIsAddOpen(val);
  };

  return (
    <div className="GroupContainer">
      <AddInGroup id ={props.id} modalV={modalAddIn} isOpen={isAddOpen} isMember={isForMember}  members={props.followers} moderators={props.moderators}/>
    <div className='GroupInfo'>
      <h1>{props.name}</h1>
      <p>Created By : {props.admin.firstName} {props.admin.lastName}</p>
      <button>{props.followers.length} Members</button>
      <button onClick={()=> {setIsAddOpen(true);  setIsForMember(true);}}>Add Member</button>
      <button onClick={()=>{setIsAddOpen(true); setIsForMember(false);}}>Add Moderator</button>
      <button onClick={()=> navigate("/selectGroup", {state: {id: props.id}})}>Click Me</button>
    </div>
    <div className='JoinGroup'>
      <button>
        <IoMdAdd size={"40px"}/>
        <p>Join</p>
        {/* <IoMdCheckmark size={"40px"}/>
        <p>Joined</p> */}
      </button>
      
    </div>
    </div>
  );
};

export default GroupContainer;