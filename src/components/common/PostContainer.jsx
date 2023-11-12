
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