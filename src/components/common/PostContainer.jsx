
import '../../css/components/PostContainer.css';



const PostContainer = (props) => {
   

 return(
  
             <div className="PostContainer" >
                <img className='UserImage' src={props.image} alt="userImage"/>
             <h2>{props.name}</h2>
             <h3>title:</h3> <h2>{props.title}</h2> 
             <h4>body: {props.body}</h4>
             
         </div>
        
   
 
 )
}

export default PostContainer; 