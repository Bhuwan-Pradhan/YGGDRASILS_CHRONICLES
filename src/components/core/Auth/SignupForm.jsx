import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../slices/authSlice";
import { signUp } from "../../../services/authApi";

import ReactModal from "react-modal";
import "../../../css/components/AuthForms.css"

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { userName, firstName, lastName, email, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = {
      ...formData,
    };
    
    dispatch(setSignupData(signupData));
    dispatch(
      signUp(userName, firstName, lastName, email, password, confirmPassword, navigate)
    );

    // Reset
    setFormData({
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button className="AuthPopupButton" onClick={() => setIsOpen(true)}>
        Signup
      </button>
      <ReactModal
        className="AuthPopupContainer"
        isOpen={isOpen}
        contentLabel="Signup Modal"
        onRequestClose={() => setIsOpen(false)}
      >
        <div className="AuthPopup">
        <div className="AuthHeader">
          <p className="AuthTitle">Signup</p>
          <button className="AuthCloseButton" onClick={() => setIsOpen(false)}>
            &times;
          </button>
        </div>
          <form className="SignupContainer" onSubmit={handleOnSubmit}>
                <label>
                  <p>
                    userName <sup>*</sup>
                  </p>
                  <input
                    className="AuthInput"
                    required
                    type="text"
                    name="userName"
                    placeholder="Enter unique userName"
                    value={userName}
                    onChange={handleOnChange}
                  />
                </label>
                <span className="NameSpan">
                  <label>
                    <p>
                      First Name <sup>*</sup>
                    </p>
                    <input
                      className="AuthInput"
                      required
                      type="text"
                      name="firstName"
                      value={firstName}
                      placeholder="Enter first name"
                      onChange={handleOnChange}
                    />
                  </label>
                  <label>
                    <p>
                      Last Name <sup>*</sup>
                    </p>
                    <input
                      className="AuthInput"
                      required
                      type="text"
                      name="lastName"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={handleOnChange}
                    />
                  </label>
                </span>
                <label>
                  <p>
                    Email Address <sup>*</sup>
                  </p>
                  <input
                    className="AuthInput"
                    required
                    type="text"
                    name="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={handleOnChange}
                  />
                </label>
                <div>
                  <label>
                    <p>
                      Create Password <sup>*</sup>
                    </p>
                    <div className="PasswordDiv">
                      <input
                        className="AuthInput"
                        required
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={handleOnChange}
                      />
                    </div>
                  </label>
                  <label>
                    <p>
                      Confirm Password <sup>*</sup>
                    </p>
                    <div className="PasswordDiv">
                      <input
                        className="AuthInput"
                        required
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleOnChange}
                      />
                    </div>
                  </label>
                </div>
                <button className="SubmitButton" type="submit">
                  Create Account
                </button>
              </form>
        </div>
      </ReactModal>
    </div>
  );
};

export default SignupForm;
