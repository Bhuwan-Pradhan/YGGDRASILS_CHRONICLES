import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactModal from "react-modal";
import { endpoints } from '../../utils/api';
import { Link } from 'react-router-dom';
import "../../css/components/UserList.css"
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const UserList = (props) => {

 const data=props.data;


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
            <div>{props.title}</div>
            <button className="CloseButton" onClick={() => props.modalV(false)}>
              &times;
            </button>
          </div>
          <div className="ListUserContainer">
            {data?.map((user) => (
                <div className="ListUserItem" key={user.id}>
                  <div className='ListUserImage'>
                    <img src={user.image} alt="" />
                  </div>
                  <div className='ListUserDetail'>
                  <Link to="/profile" state={{ userProfile: user }}>
                  <div id='ListUserFullName'>{user.firstName} {user.lastName}</div>
        </Link>
                    
                    <div>@{user.userName}</div>
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
