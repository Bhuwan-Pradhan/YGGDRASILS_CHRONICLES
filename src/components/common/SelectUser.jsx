import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { endpoints } from '../../utils/api';

const SelectUser = ({ usersData }) => {
  const { SEARCH_MEMBER_API } = endpoints;
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(SEARCH_MEMBER_API);
      const formattedUsers = response.data.users.map((user) => ({
        value: user._id,
        tagUserId: user._id,
        userId: user._id,
        label: `${user.firstName} ${user.lastName}`,
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const sendData = () => {
    usersData(selectedUsers);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    sendData(); // Automatically send user data when selectedUsers changes
  }, [selectedUsers]);

  return (
    <div>
      <Select
        isMulti
        options={users}
        value={selectedUsers}
        onChange={(selectedOptions) => setSelectedUsers(selectedOptions)}
        placeholder="Select users"
      />
      {/* <button onClick={sendData}>Select</button> */}
    </div>
  );
};

export default SelectUser;
