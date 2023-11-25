import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactModal from "react-modal";
import { endpoints } from '../../../utils/api';
import { useDispatch } from 'react-redux';
import "../../../css/components/UserList.css"
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { acceptInvite,declineInvite } from '../../../services/group';


const Invitations = (props) => {
  const { GET_USER_DETAILS_API } = endpoints;
  const userId = props.id;
  const [usersData, setUsersData] = useState(null);
 const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      const response = await axios.post(GET_USER_DETAILS_API,{userId: userId});
      const {data} = response.data;
      setUsersData(data);
      
    } catch (error) {
      console.error(error);
    }
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


  useEffect(() => {
    getUsers();
  }, [usersData]);


  
  

  return (
    <div>
          <ReactModal
        isOpen={props.isOpen}
        contentLabel="Comment Modal"
        onRequestClose={() => props.modalV(false)}
        style={myStyle}
      >
        <div className="Comment">
          <div className="CommentBoxHeader">
            <div>Users</div>
            <button className="CloseButton" onClick={() => props.modalV(false)}>
              &times;
            </button>
          </div>
          <div className="ListUserContainer">
            {usersData?.invitations?.map((group) => (
                <div className="ListUserItem" key={group._id}>
                    <h3>{group.name}</h3>
                  {/* <div className='ListUserImage'>
                    <img src={group.image} alt="" />
                  </div> */}
                  {/* <div className='ListUserDetail'>
                    <div id='ListUserFullName'>{user.firstName} {user.lastName}</div>
                    <div>@username</div>
                  </div> */}
                  <div className='RequestResponse'>
                    <button id='AcceptInvite' title='Accept'><IoMdCheckmark size={"30px"} onClick={()=> dispatch(acceptInvite(group._id,userId))} /></button>
                    <button id='DeclineInvite' title='Decline'><IoMdClose size={"30px"}  onClick={()=> dispatch(declineInvite(group._id, userId))}/></button>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </ReactModal>
    </div>
  );
};

export default Invitations;
