
import React, { useState, useEffect } from "react";
import { commentPost, getComment } from "../../services/post";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import "../../css/components/Comment.css";

const Comment = (props) => {
  const post = props.postId;
  const { token } = useSelector((state) => state.auth);
  const [commentData, setCommentData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    body: "",
  });

  const { body } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.modalV(false);
    dispatch(commentPost(token, post, body, navigate));
  };

  const getAllData = async () => {
    try {
      const getSingleComment = await getComment(post);
      setCommentData(getSingleComment);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

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
        contentLabel="Comment Modal"
        onRequestClose={() => props.modalV(false)}
        style={myStyle}
      >
        <div>
          <div className="CommentBoxHeader">
            <div>Comments</div>
            <button className="CloseButton" onClick={() => props.modalV(false)}>
              &times;
            </button>
          </div>
          <div className="CommentContainer">
            {commentData?.data.map((comment) => (
              <div className="CommentItem" key={comment.id}>
                <div className="UserInfo">
                  <img src={comment.user.image} alt="" />
                  <span>
                    {comment.user.firstName} {comment.user.lastName}
                  </span>
                </div>
                <div className="CommentBody">{comment.body}</div>
              </div>
            ))}
          </div>

          <div className="NewComment">
          <form onSubmit={handleOnSubmit}>
            <div className="inputContainer">
              <input
                required
                type="text"
                name="body"
                placeholder="Enter your comment"
                value={body}
                onChange={handleOnChange}
              />
            <button className="PostComment" title="Post your comment?" type="submit">Comment</button>
            </div>
          </form>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default Comment;
