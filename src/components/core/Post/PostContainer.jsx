import { useState } from "react"
import '../../../css/components/PostContainer.css';
import { FcLike } from "react-icons/fc";
import { FiHeart } from "react-icons/fi";
import Comment from "../../popUp/Comment";
import { likePost } from "../../../services/post"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"






const PostContainer = (props) => {
  let likesCount;
  const [isOpen, setIsOpen] = useState(false);
  const isUserPosts = props.isUser;

  if (props.likes === 0) {
    likesCount = 0;
  }
  else {
    likesCount = props.likes - 1;
  }

  const [likes, setLikes] = useState(likesCount);
  const [isLike, setIsLike] = useState(props.isLike);
  const { token } = useSelector((state) => state.auth);


  const dispatch = useDispatch()

  const handleLike = () => {

    setIsLike(true);

    setLikes(likesCount + 1);
    dispatch(likePost(token, props.id));

  }




  return (
    <div className="PostContainer">
      <Comment postId={props.id} isOpen={isOpen} />
      <div className="UserDetails">
        <img className="UserImage" src={props.image} alt="userImage" />
        {/* <button onClick={navigate('/profile', { state: {user: props.user}})}>{props.name}</button> */}
        <Link to="/profile" state={{ user: props.user }}>{props.name}</Link>
      </div>
      <div className="PostDetails">
        <div className="PostTitle">{props.title}</div>

        <div className="PostMedia">
          {props.body.includes('image') ? <img src={props.body} alt="" /> : <video controls width="500" height="200">
            <source src={props.body} />
            Your browser does not support the video tag.
          </video>}


        </div>


      </div>
      <div className="UserInteractions">
        {isLike ? <div><FcLike size="30px" /><span>you and {likes} others</span> </div> : <div><button onClick={handleLike}><FiHeart size="30px" /></button> <span>{likes} likes</span></div>}


        <div> <button onClick={() => setIsOpen(true)}>Comment</button></div>
        {isUserPosts ? <div><button>Delete Post</button><button>Update Post</button></div> : <div><button> Repost </button></div>}

      </div>
    </div>
  );
};

export default PostContainer;
