import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { newPost } from "../../../services/post";
import "../../../css/components/NewPost.css";

import ReactModal from "react-modal";
import SelectUser from "../../common/SelectUser";
import PreviewPost from "./PreviewPost";

const NewPost = (props) => {
  const [media, setMedia] = useState({ url: null, type: null });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

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
    console.log("Data received from child:", data);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (isPreview) {
      // If in preview mode, just close the preview
      setIsPreview(false);
    } else {
      // If not in preview mode, submit the post
      const formData = new FormData();
      formData.append("title", title);
      formData.append("displayFile", file);

      // Extracting the user ids from selectedUsers
      const tagUserIds = selectedUsers.map((user) => user.tagUserId);
      formData.append("tagUser", JSON.stringify(tagUserIds));

      dispatch(newPost(formData, token, navigate));
    }
  };

  const myStyle = {
    width: "100px",
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
    },
    content: {
      color: "black",
      backgroundColor: "white",
      width: "35%",
      height: "70%",
      margin: "auto",
      borderRadius: "10px",
    },
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Create New Post</button>
      <ReactModal
        className="RM"
        isOpen={isOpen}
        contentLabel="NewPost Modal"
        onRequestClose={() => setIsOpen(false)}
        style={myStyle}
      >
        <div>
          <div className="NewPostBoxHeader">
            <div>Comments</div>
            <button
              className="NewPostCloseButton"
              onClick={() => props.modalV(false)}
            >
              &times;
            </button>
          </div>
          <div className="NewPostContainer">
            <button onClick={() => setIsPreview(!isPreview)}>
              {isPreview ? "Back to Edit" : "Preview"}
            </button>
            {isPreview && <PreviewPost mediaProp={media}  title={title} />}
          </div>
          {!isPreview && (
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
                <div style={{ color: "black" }}>
                  <SelectUser usersData={handleOnClick} />
                </div>

                <button type="submit">Post</button>
              </div>
            </form>
          )}
        </div>
      </ReactModal>
    </div>
  );
};

export default NewPost;
