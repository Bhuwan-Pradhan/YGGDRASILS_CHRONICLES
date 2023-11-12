
import '../../css/components/PostContainer.css';


import Like from '../core/Post/Like';

const PostContainer = (props) => {
   
   
 

 return(
  
             <div className="PostContainer" >
                <img className='UserImage' src={props.image} alt="userImage"/>
             <h2>{props.name}</h2>
             <h3>title:</h3> <h2>{props.title}</h2> 
             <h4>body: {props.body}</h4>
             <h3>Likes: {props.likes}</h3>
            {props.isLike ?<p>Liked</p>:<Like id={props.id}/>} 
             
         </div>
        
   
 
 )
}

export default PostContainer; 
import "../../css/components/PostContainer.css";

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
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/He1523a.jpg"/>
        </div>
      </div>
      <div className="UserInteractions">
         <div>Like</div>
         <div>Repost</div>
         <div>Comment</div>
      </div>
    </div>
  );
};

export default PostContainer;
