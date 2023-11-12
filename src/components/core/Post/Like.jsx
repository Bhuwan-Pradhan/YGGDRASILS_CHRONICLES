

import { likePost } from "../../../services/post"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Like = (props) => {
    const { token } = useSelector((state) => state.auth);
   
    const navigate = useNavigate()
    const dispatch = useDispatch()
   
    const handleLike=()=>{
        console.log(token);
        console.log(props.id);
        
        dispatch(likePost(token, props.id, navigate));
      }

 return(
  
         <div>
            <button onClick={handleLike}>Like</button>
         </div>
        
   
 
 )
}

export default Like; 