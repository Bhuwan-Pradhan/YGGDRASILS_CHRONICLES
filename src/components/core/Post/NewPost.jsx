import {useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { newPost } from "../../../services/post";
import '../../../css/components/NewPost.css'

const NewPost = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  
  const [file, setFile] = useState(null)
 




  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };




 
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
   
    setFile(selectedFile);
   
  }


  
  const handleOnSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('title', title);
    formData.append('displayFile', file);
    console.log("formdata", formData)
    dispatch(newPost(formData, token));
  };

  return (
    <div className="CreatePostPopup">
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
        
        <button type="submit">Post</button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
