
import {  useState, useEffect } from "react"
import { commentPost, getComment, } from "../../../services/post"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate} from "react-router-dom"


const Comment = (props) => {
    
    const post = props.postId;
    console.log(post);
    const { token } = useSelector((state) => state.auth);
    const [commentData, setCommentData] = useState();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        body: "",
    })
    


    const { body } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

   
    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(commentPost(token, post, body, navigate))
    }


    

  
    const getAllData = async () => {
      try {
        const getSingleComment = await getComment(post);
  
  
        setCommentData(getSingleComment);
        console.log(getSingleComment);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getAllData();
    }, []);

    return (
        <div>
           
            <form onSubmit={handleOnSubmit} >
          

                <div>
                    <label>
                        <p>
                            Comment
                        </p>
                        </label>
                        <input
                            required type="text" name="body" placeholder="Enter your comment" value={body} onChange={handleOnChange}
                        />
                    

                </div>
                <button
                    type="submit"
                >
                    Comment
                </button>
            </form>
            <div className="Container">
            <div>
           
           {commentData?.data.map((comment) => (
        <h2>{comment.body}</h2>
 
        ))}
        </div>
            </div>
        </div>
    )
}

export default Comment; 