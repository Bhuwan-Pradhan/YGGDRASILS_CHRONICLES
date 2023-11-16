import { useState, useEffect } from "react";
import { commentPost, getComment } from "../../services/post";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";

import "../../css/components/Comment.css"

const Comment = (props) => {
  const post = props.postId;
  console.log(post);
  const [isOpen, setIsOpen] = useState(false);
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
    dispatch(commentPost(token, post, body, navigate));
  };

  const inlineStyle = {

    width: "50px",
    height: "50px",
    borderRadius: "50%",
    position: "relative",
    padding: "5px",
  };

  const getAllData = async () => {
    try {
      const getSingleComment = await getComment(post);

      setCommentData(getSingleComment);
      console.log(getSingleComment);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <button onClick={()=>setIsOpen(true)}>Comments</button>
       <ReactModal
        className="RM"
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={() => setIsOpen(false)}
      >
        <div className="PopupBox">
          <div className="PopupBoxHeader">
            <div>Comments</div>
            <button className="CloseButton" onClick={() => setIsOpen(false)}>
              &times;
            </button>
          </div>
      <div className="Container">
        <div>
          {commentData?.data.map((comment) => (
            <div>
              <div>
                <img src={comment.user.image} style={inlineStyle} alt="" />
                <span>
                  {comment.user.firstName} {comment.user.lastName}
                </span>
              </div>

              <h2>{comment.body}</h2>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleOnSubmit}>
        <div>
          <label>
            <p>Comment</p>
          </label>
          <input
            required
            type="text"
            name="body"
            placeholder="Enter your comment"
            value={body}
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Comment</button>
      </form>
      </div>
      </ReactModal>
    </div>
  );
};

export default Comment;