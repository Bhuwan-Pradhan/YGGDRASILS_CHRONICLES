import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../slices/authSlice";
import { signUp } from "../../../services/authApi";


const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
  
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData));
    dispatch(
      signUp(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        navigate
      )
    );


    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    
  }

    return (
      <div>
        <form onSubmit={handleOnSubmit} >
          <div >
            <label>
              <p>
                First Name <sup >*</sup>
              </p>
              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                placeholder="Enter first name"
                onChange={handleOnChange}
              />
            </label>
            <label>
              <p >
                Last Name <sup >*</sup>
              </p>
              <input
                required
                type="text"
                name="lastName"
                
                placeholder="Enter last name"
                value={lastName}
                onChange={handleOnChange}
       
              />
            </label>
          </div>
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
                type={showPassword ? "text" : "password"}
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
            <label >
              <p >
                Confirm Password <sup >*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
             
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleOnChange}
              />
                  <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
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
            Create Account
          </button>
        </form>
      </div>
    )
  }
  
  export default SignupForm;