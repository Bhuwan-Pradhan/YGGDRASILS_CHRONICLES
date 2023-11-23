import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";


import { newGroup } from "../../services/group";

const NewGroup = (props) => {

  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
  });

  const { name } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.modalV(false);
    dispatch(newGroup(formData, token, navigate));
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


  return (
    <div>
     
       <ReactModal
       
        isOpen={props.isOpen}
        contentLabel="Example Modal"
        onRequestClose={() => props.modalV(false)}
        style={myStyle}
      >
        <div className="PopupBox">
          <div className="PopupBoxHeader">
            <div>New Group</div>
            <button className="CloseButton" onClick={() => props.modalV(false)}>
              &times;
            </button>
          </div>
      <div className="Container">


      <form onSubmit={handleOnSubmit}>
        <div>
          <label>
            <p>Group Name</p>
          </label>
          <input
            required
            type="text"
            name="name"
            placeholder="Enter Group Name"
            value={name}
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
      </div>
      </div>
      </ ReactModal>
    </div>
  );
};

export default NewGroup;
