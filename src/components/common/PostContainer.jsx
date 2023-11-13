
import '../../css/components/PostContainer.css';


import Like from '../core/Post/Like';
import Comment from '../core/Post/Comment';







const PostContainer = (props) => {

 
 



  return (
    <div className="PostContainer">
      <div className="UserDetails">
        <img className="UserImage" src={props.image} alt="userImage" />
        <p>{props.name}</p>
      </div>
      <div className="PostDetails">
        <div className="PostTitle">{props.title}</div>
        <div className="PostBody">{props.body}</div>
        <div className="PostMedia">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/He1523a.jpg" alt="postImage"/>
        </div>
        
       
      </div>
      <div className="UserInteractions">
        {props.isLike ?<div>Likes: you and {props.likes-1} others</div>:<div><Like id={props.id}/></div>}
         
         <div>Repost</div>
         <div> <Comment postId={props.id}/></div>
      </div>
    </div>
  );
};

export default PostContainer;
