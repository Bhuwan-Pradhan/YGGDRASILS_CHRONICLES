import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactModal from "react-modal";
import { groupEndpoints } from '../../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import "../../../css/components/UserList.css"
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { acceptJoin, declineJoin } from '../../../services/group';



const JoinRequests = (props) => {
  const { GET_GROUP_BY_ID_API } = groupEndpoints;
  const groupId = props.id;
  const [usersData, setUsersData] = useState(null);
 const dispatch = useDispatch();
 const { token } = useSelector((state) => state.auth);

  const getUsers = async () => {
    try {
      const response = await axios.post(GET_GROUP_BY_ID_API,{id: groupId});
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
            {usersData?.joinRequests?.map((user) => (
                <div className="ListUserItem" key={user._id}>
                  
                  <div className='ListUserImage'>
                    <img src={user.image} alt="" />
                  </div>
                  <div className='ListUserDetail'>
                    <div id='ListUserFullName'>{user.firstName} {user.lastName}</div>
                    <div>@username</div>
                  </div>
                  <div className='RequestResponse'>
                    <button id='AcceptInvite' title='Accept'><IoMdCheckmark size={"30px"} onClick={()=> dispatch(acceptJoin(groupId,user._id,token))} /></button>
                    <button id='DeclineInvite' title='Decline'><IoMdClose size={"30px"}  onClick={()=> dispatch(declineJoin(groupId,user._id, token))}/></button>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </ReactModal>
    </div>
  );
};

export default JoinRequests;
