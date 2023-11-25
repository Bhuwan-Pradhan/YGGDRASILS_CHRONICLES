import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactModal from "react-modal";
import { postEndpoints } from '../../../utils/api';
import { Link } from 'react-router-dom';
import "../../../css/components/UserList.css"
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const TagUsers = (props) => {
  const { GET_TAG_USER_DETAILS_API } = postEndpoints;
  const postId = props.id;
  const [postData, setPostData] = useState(null);
 

  const getUsers = async () => {
    try {
      const response = await axios.post(GET_TAG_USER_DETAILS_API,{postId: postId});
      const {data} = response.data;
      setPostData(data);
      
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
      width: "30%",
      height: "70%",
      margin: "auto",
      borderRadius: "10px",
    },
  };


  useEffect(() => {
    getUsers();
  }, [postData]);


  
  

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
            <div>Tagged Users</div>
            <button className="CloseButton" onClick={() => props.modalV(false)}>
              &times;
            </button>
          </div>
          <div className="ListUserContainer">
            {postData?.tagUser?.map((user) => (
                <div className="ListUserItem" key={user.id}>
                  <div className='ListUserImage'>
                    <img src={user.image} alt="" />
                  </div>
                  <div className='ListUserDetail'>
                  <Link to="/profile" state={{ userProfile: user }}>
                  <div id='ListUserFullName'>{user.firstName} {user.lastName}</div>
        </Link>
                   
                    <div>@username</div>
                  </div>
               
                </div>
              ))}
          </div>

        </div>
      </ReactModal>
    </div>
  );
};

export default TagUsers;
