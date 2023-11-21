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
import LoginFirst from "../../popUp/LoginFirst";

const PostContainer = (props) => {
  let likesCount;
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isLoginFirstOpen, setIsLoginFirstOpen] = useState(false);
  const isUserPosts = props.isUser;
 const isGuest = props.isGuest;
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

  const modalComment = (val) => {
    setIsCommentOpen(val);
  };

  const modalLoginFirst = (val) => {
    setIsLoginFirstOpen(val);
  };

  return (
    <div className="PostContainer">
      <Comment postId={props.id} isOpen={isCommentOpen} modalV={modalComment} />
      <LoginFirst isOpen={isLoginFirstOpen} modalV={modalLoginFirst} />
      <div className="PosterDetails">
        <img className="PosterImage" src={props.image} alt="userImage" />
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
          {isGuest?<div><button onClick={()=> setIsLoginFirstOpen(true)}><FaRegComment size="30px" /></button></div>:<button title="Comment" onClick={() => setIsCommentOpen(true)}>
            <FaRegComment size="30px" />
          </button>}
          
        </div>
        {isUserPosts ? (
          <div>
            <button>Delete Post</button>
            <button>Update Post</button>
          </div>
        ) : (
          <div className="Repost">
            {isGuest?<div><button onClick={()=> setIsLoginFirstOpen(true)}><BiRepost size="30px" /></button></div>:<button title="Repost">
              <BiRepost size="30px" />
            </button>}
            
          </div>
        )}
        <div className="Like">
          {isGuest ?<div><button onClick={()=> setIsLoginFirstOpen(true)}><FiHeart size="30px" /></button></div>:<div>
          {isLike ? (
            <FcLike size="30px" />
          ) : (
            <button title="Like" onClick={handleLike}>
              <FiHeart size="30px" />
            </button>
          )}{" "}
          <span>{likes} likes</span>{" "}
            </div>}
     
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
