import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactModal from "react-modal";
import { endpoints } from '../../utils/api';

import "../../css/components/UserList.css"
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const UserList = (props) => {
  const { SEARCH_MEMBER_API } = endpoints;
  
  const [usersData, setUsersData] = useState();

  const getUsers = async () => {
    try {
      const response = await axios.get(SEARCH_MEMBER_API);
   
      setUsersData(response.data.users);
      
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
  }, []);

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
            {usersData?.map((user) => (
                <div className="ListUserItem" key={user.id}>
                  <div className='ListUserImage'>
                    <img src={user.image} alt="" />
                  </div>
                  <div className='ListUserDetail'>
                    <div id='ListUserFullName'>{user.firstName} {user.lastName}</div>
                    <div>@username</div>
                  </div>
                  <div className='RequestResponse'>
                    <button id='AcceptInvite' title='Accept'><IoMdCheckmark size={"30px"} /></button>
                    <button id='DeclineInvite' title='Decline'><IoMdClose size={"30px"} /></button>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </ReactModal>
    </div>
  );
};

export default UserList;
