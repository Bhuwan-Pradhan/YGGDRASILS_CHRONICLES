import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactModal from "react-modal";
import { endpoints } from '../../utils/api';

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
          <div className="CommentContainer">
            <div className="CommentsList">
            {usersData?.map((user) => (
                <div className="UserItem" key={user.id}>
                  <div className="UserInfo">
                  <img src={user.image} alt="" />
                  <span>@username</span>
                  
                    <span>{user.firstName} {user.lastName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </ReactModal>
    </div>
  );
};

export default UserList;
