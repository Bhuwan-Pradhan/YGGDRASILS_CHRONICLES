import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { newPost } from "../../../services/post";
import "../../../css/components/NewPost.css";

import ReactModal from "react-modal";
import SelectUser from "../../common/SelectUser";
import PreviewPost from "./PreviewPost";

const NewPost = () => {
  const [media, setMedia] = useState({ url: null, type: null });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setMedia({ url: reader.result, type: selectedFile.type });
      };

      reader.readAsDataURL(selectedFile);
    }
    setFile(selectedFile);
  };

  const handleOnClick = (data) => {
    setSelectedUsers(data);
    console.log('Data received from child:', data);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("displayFile", file);

    // Extracting the user ids from selectedUsers
    const tagUserIds = selectedUsers.map((user) => user.tagUserId);
    formData.append("tagUser", JSON.stringify(tagUserIds));

    dispatch(newPost(formData, token, navigate));
  };

  return (
    <div className="CreatePostPopup">
      <button onClick={() => setIsOpen(true)}>Create New Post</button>
      <ReactModal
        className="RM"
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={() => setIsOpen(false)}
      >
        <div className="PopupBox">
          <button className="CloseButton" onClick={() => setIsOpen(false)}>
            &times;
          </button>
          <div className="PopupboxBody"></div>
          <form onSubmit={handleOnSubmit}>
            <div className="file-upload-container">
              <label>
                <div className="Title">Post Title</div>
                <input
                  required
                  type="text"
                  name="title"
                  placeholder="Enter post title"
                  value={title}
                  onChange={handleOnChange}
                />
              </label>

              <label htmlFor="file-upload" className="custom-file-upload">
                <div className="Title">Upload Media</div>
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                />
                <FiUpload />
              </label>
              <div style={{ color: 'black' }}>
                <SelectUser usersData={(data)=>setSelectedUsers(data)} />
              </div>

              <button type="submit">Post</button>
            </div>
          </form>
        </div>
        <PreviewPost mediaProp={media} />
      </ReactModal>
    </div>
  );
};

export default NewPost;
