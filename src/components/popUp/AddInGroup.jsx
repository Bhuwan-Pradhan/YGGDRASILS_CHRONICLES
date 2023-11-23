import { toast } from "react-hot-toast";
import React, { useState } from 'react';
import axios from 'axios';
import { groupEndpoints } from "../../utils/api";
import ReactModal from "react-modal";
import { addMember, addModerator } from '../../services/group';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import SelectUser from '../common/SelectUser';



const AddInGroup = (props) => {
    
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const groupId = props.id;
    const isMember = props.isMember;
    const alreadyJoinedMembers = props.members;
    const alreadyJoinedModerators = props.moderators;
       


        const handleModerator = async () => {
          const userIds = selectedUsers.map((user) => user.userId);
          const newModerator = userIds.filter(userId => !alreadyJoinedModerators.includes(userId));
          const newJoin = newModerator.length;
          if (newModerator.length > 0) {
            const formData = new FormData();
        
            formData.append("groupId", groupId);  
            formData.append('moderators', JSON.stringify(newModerator));
           
            dispatch(addModerator(formData, token, newJoin));
          } else {
            // Notify the user that all selected users are already members
            toast.error('All selected users are already moderators.');
          }
        };
        const handleMember = async () => {
          const userIds = selectedUsers.map((user) => user.userId);
          const newMembers = userIds.filter(userId => !alreadyJoinedMembers.includes(userId));
          const newJoin = newMembers.length;
          if (newMembers.length > 0) {
            const formData = new FormData();
        
            formData.append("groupId", groupId);  
            formData.append('members', JSON.stringify(newMembers));
           
            dispatch(addMember(formData, token, newJoin));
          } else {
            // Notify the user that all selected users are already members
            toast.error('All selected users are already members.');
          }
        };

        const handleOnClick = (data) => {
          setSelectedUsers(data);
          console.log("Data received from child:", data);
          console.log("already :", alreadyJoinedMembers);
        };
      

        const myStyle = {
            width:'100px',
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
            },
             content: {
              color: 'black',
              backgroundColor: 'white',
              width: "35%",
              height: "70%",
              margin: "auto",
              borderRadius: "10px",
            },
          };

          if(isMember){
            return (
              <div >
                  
             <ReactModal
             
             isOpen={props.isOpen}
             contentLabel="Example Modal"
             onRequestClose={() => props.modalV(false)}
             style={myStyle}
            >
                     <div className="LoginFirstBoxHeader">
                  <div>Add Member</div>
                  <button className="CloseButton" onClick={() => props.modalV(false)}>
                    &times;
                  </button>
      
                  <div>
                  <div className="Add member">
                    <SelectUser usersData={handleOnClick} />
                    <button onClick={handleMember}>Add As Member</button>
              </div>
                  </div>
                </div>
               </ ReactModal>
              </div>
          );
          }
          else{
            return (
              <div >
                  
             <ReactModal
             
             isOpen={props.isOpen}
             contentLabel="Example Modal"
             onRequestClose={() => props.modalV(false)}
             style={myStyle}
            >
                     <div className="LoginFirstBoxHeader">
                  <div>Add Moderator</div>
                  <button className="CloseButton" onClick={() => props.modalV(false)}>
                    &times;
                  </button>
      
                  <div>
                  <div className="Add Moderator">
                    <SelectUser usersData={handleOnClick} />
                    <button onClick={handleModerator}>Add As Moderator</button>
              </div>
                  </div>
                </div>
               </ ReactModal>
              </div>
          );
          }

  };
  
  export default AddInGroup;
  