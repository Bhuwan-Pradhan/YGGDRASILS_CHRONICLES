import { toast } from "react-hot-toast";
import React, { useState } from 'react';
import axios from 'axios';
import { groupEndpoints } from "../../utils/api";
import ReactModal from "react-modal";
import { addMember, addModerator } from '../../services/group';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';




const SearchUser = (props) => {
    const {SEARCH_MEMBER_API,}= groupEndpoints;
    const [isOpen, setIsOpen] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const groupId = props.id;

        const [query, setQuery] = useState('');
        const [users, setUsers] = useState([]);
      
       
        const handleSearch = async (e) => {
          e.preventDefault();
          try {
            
            const response = await axios.get(`${SEARCH_MEMBER_API}?query=${query}`);
           
            setUsers(response.data.users);
          } catch (error) {
            console.error(error);
          }
        };

        const handleModerator = async (userId) => {
          try {
            await dispatch(addModerator(groupId, userId, token, navigate));
            setIsOpen(false); // Close the modal after adding the moderator
          } catch (error) {
            console.log("Error adding moderator:", error);
          }
        };
        const handleMember = async (userId) => {
          try {
            await dispatch(addMember(groupId, userId, token, navigate));
            setIsOpen(false); // Close the modal after adding the moderator
          } catch (error) {
            console.log("Error adding moderator:", error);
          }
        };

    return (
        <div >
             <button onClick={()=>setIsOpen(true)}>search user</button>
       <ReactModal
       
       style={{content:{ width:'50%', height: '50%', margin: 'auto'}}}
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={() => setIsOpen(false)}
      >
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
  
        <div style={{display: 'flex', flexDirection: 'column'}}>
          {users.length===0?<p>No users</p>: <div>{users.map((user) => (
          <div>
           <h2>{user.firstName}</h2>
           <button onClick={() => handleModerator(user._id)}>add moderator</button>
           <button onClick={() => handleMember(user._id)}>add member</button>
           </div>
          ))}</div>}
       
        </div>
        
         </ ReactModal>
        </div>
    );
  };
  
  export default SearchUser;
  