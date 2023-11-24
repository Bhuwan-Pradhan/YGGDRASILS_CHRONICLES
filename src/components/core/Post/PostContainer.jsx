import { useState } from "react";
import "../../../css/components/PostContainer.css";
import Comment from "./Comment";
import { likePost, dislikePost, repost } from "../../../services/post";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import LoginFirst from "../../core/Auth/LoginFirst";
import { deletePost } from "../../../services/post";
import { IoMdPerson } from "react-icons/io";
import UpdatePost from "./UpdatePost";



const PostContainer = (props) => {
  let likesCount;
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isLoginFirstOpen, setIsLoginFirstOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
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

    setLikes(likes + 1);
    dispatch(likePost(token, props.id));
  };
  const handleDisLike = () => {
    setIsLike(false);

    setLikes(likes - 1);
    dispatch(dislikePost(token, props.id));
  };

  const handleDelete = () => {
    dispatch(deletePost(token, props.id));
  };

  const handleRepost = () => {
    dispatch(repost(token, props.id));
  };

  const modalComment = (val) => {
    setIsCommentOpen(val);
  };

  const modalLoginFirst = (val) => {
    setIsLoginFirstOpen(val);
  };

  const modalUpdate = (val) => {
    setIsUpdateOpen(val);
  };

  return (
    <div className="PostContainer">
      <Comment postId={props.id} isOpen={isCommentOpen} modalV={modalComment} />
      <LoginFirst isOpen={isLoginFirstOpen} modalV={modalLoginFirst} />
      <UpdatePost isOpen={isUpdateOpen} modalV={modalUpdate} body={props.body} id={props.id} title={props.title} media={props.media}/>
      {props.repost && (
    <div className="RepostDetails">
      Reposted by <Link to="/profile" state={{ userProfile: props.repost }}>
      {props.repost.firstName} {props.repost.lastName}
        </Link>
    </div>
  )}
     
      
      <div className="PosterDetails">
        <img className="PosterImage" src={props.image} alt="userImage" />
        {/* <button onClick={navigate('/profile', { state: {user: props.user}})}>{props.name}</button> */}
        <Link to="/profile" state={{ userProfile: props.user }}>
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
          <button id="TaggedUsersList" title="Tagged Users"><IoMdPerson size={"20px"}/></button>
        </div>
      </div>
      <div className="UserInteractionsData">
        <span>12 Comments</span>
        <span>6 Reposts</span>
        <span>{likes} Likes</span>
      </div>
      <div className="UserInteractions">
        <div className="Comment">
          {isGuest ? (
            <div>
              <button onClick={() => setIsLoginFirstOpen(true)}>
                <FaRegComment size="25px" />
              </button>
            </div>
          ) : (
            <button title="Comment" onClick={() => setIsCommentOpen(true)}>
              <FaRegComment size="25px" />
            </button>
          )}
        </div>
        {isUserPosts ? (
          <div>
            <button title="Delete" onClick={handleDelete}>
              Delete Post
            </button>
            <button onClick={()=>setIsUpdateOpen(true)}>Update Post</button>
          </div>
        ) : (
          <div className="Repost">
            {isGuest ? (
              <div>
                <button onClick={() => setIsLoginFirstOpen(true)}>
                  <BiRepost size="30px" />
                </button>
              </div>
            ) : (
              <button title="Repost" onClick={handleRepost}>
                <BiRepost size="30px" />
              </button>
            )}
          </div>
        )}
        <div className="Like">
          {isGuest ? (
            <div>
              <button onClick={() => setIsLoginFirstOpen(true)}>
                <FiHeart size="25px" />
              </button>
            </div>
          ) : (
            <div>
              {isLike ? (
                <button title="DisLike" onClick={handleDisLike}>
                <FcLike size="25px" />
              </button>
              ) : (
                <button title="Like" onClick={handleLike}>
                  <FiHeart size="25px" />
                </button>
              )}{" "}
              {/* <span>{likes} likes</span>{" "} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
