import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { newPost } from "../../../services/post";
import "../../../css/components/NewPost.css";

import ReactModal from "react-modal";
import SelectUser from "../../common/SelectUser";

const PreviewPost = (props) => {
    const media=props.mediaProp;
    

 
  
    const renderPreview = () => {
      if (media.type.startsWith('image/')) {
        return <img src={media.url} alt="Image Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />;
      } else if (media.type.startsWith('video/')) {
        return <video controls src={media.url} style={{ maxWidth: '100%', maxHeight: '200px' }} />;
      } else if (media.type.startsWith('audio/')) {
        return <audio controls src={media.url} />;
      } else {
        return <p>Unsupported media type</p>;
      }
    };
  
    return (
      <div style={{width: '100%'}}>
      
        {media.url && renderPreview()}
      </div>
    );
  };

export default PreviewPost;
