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
