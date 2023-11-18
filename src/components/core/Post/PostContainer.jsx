import { useState } from "react";
import "../../../css/components/PostContainer.css";
import Comment from "../../popUp/Comment";
import { likePost } from "../../../services/post";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";

const PostContainer = (props) => {
  let likesCount;
  const [isOpen, setIsOpen] = useState(false);
  const isUserPosts = props.isUser;

  if (props.likes === 0) {
    likesCount = 0;
  } else {
    likesCount = props.likes;
  }

  const [likes, setLikes] = useState(likesCount);
  const [isLike, setIsLike] = useState(props.isLike);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  
    const handleLike = () => {

      setIsLike(true);

      setLikes(likesCount + 1);
      dispatch(likePost(token, props.id));
    };

    const modalV = (val) => {
      setIsOpen(val);
    };

    return (
      <div className="PostContainer">
        <Comment postId={props.id} isOpen={isOpen} modalV={modalV} />
        <div className="UserDetails">
          <img className="UserImage" src={props.image} alt="userImage" />
          {/* <button onClick={navigate('/profile', { state: {user: props.user}})}>{props.name}</button> */}
          <Link to="/profile" state={{ user: props.user }}>
            {props.name}
          </Link>
        </div>
        <div className="PostDetails">
          <div className="PostTitle">{props.title}</div>

          <div className="PostMedia">
            {props.body.includes("image") ? (
              <img src={props.body} alt="" />
            ) : (
              <video controls width="500" height="200">
                <source src={props.body} />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
        <div className="UserInteractions">
          <div className="Comment">
            <button title="Comment" onClick={() => setIsOpen(true)}>
              <FaRegComment size="30px" />
            </button>
          </div>
          {isUserPosts ? (
            <div>
              <button>Delete Post</button>
              <button>Update Post</button>
            </div>
          ) : (
            <div className="Repost">
              <button title="Repost">
                <BiRepost size="30px" />
              </button>
            </div>
          )}
          <div className="Like">
            {isLike ? (
              <FcLike size="30px" />
            ) : (
              <button title="Like" onClick={handleLike}>
                <FiHeart size="30px" />
              </button>
            )}{" "}
            <span>{likes} likes</span>{" "}
          </div>
        </div>
      </div>
    );
  };

  export default PostContainer;
