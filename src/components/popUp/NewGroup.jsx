import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";

import "../../css/components/Comment.css"
import { newGroup } from "../../services/group";

const NewGroup = () => {

  const [isOpen, setIsOpen] = useState(false);
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
    dispatch(newGroup(formData, token, navigate));
  };



  return (
    <div>
      <button onClick={()=>setIsOpen(true)}>New Group</button>
       <ReactModal
        className="RM"
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={() => setIsOpen(false)}
      >
        <div className="PopupBox">
          <div className="PopupBoxHeader">
            <div>New Group</div>
            <button className="CloseButton" onClick={() => setIsOpen(false)}>
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
