import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { login } from "../../../services/authApi";

const LoginForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }


  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit} >

        <label >
          <p >
            Email Address <sup >*</sup>
          </p>
          <input
            required
            type="text"
            name="email"

            placeholder="Enter email address"
            value={email}
            onChange={handleOnChange}

          />
        </label>
        <div >
          <label >
            <p >
              Create Password <sup >*</sup>
            </p>
            <input
              required
              type="text"
              name="password"

              placeholder="Enter Password"
              value={password}
              onChange={handleOnChange}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
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

export default LoginForm;