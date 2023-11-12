import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { newPost } from "../../../services/post"


const NewPost = () => {

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  })



  const { title, body } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }


  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(newPost(title, body, token, navigate))
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit} >

        <label >
          <p >
            title <sup >*</sup>
          </p>
          <input
            required
            type="text"
            name="title"

            placeholder="Enter post title"
            value={title}
            onChange={handleOnChange}

          />
        </label>
        <div >
          <label >
            <p >
              body <sup >*</sup>
            </p>
            <input
              required
              type="text"
              name="body"

              placeholder="Enter post body"
              value={body}
              onChange={handleOnChange}
            />
          </label>

        </div>
        <button
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default NewPost;