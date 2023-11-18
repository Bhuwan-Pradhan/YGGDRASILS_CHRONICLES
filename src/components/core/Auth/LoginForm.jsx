import { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import { login } from "../../../services/authApi";

import "../../../css/components/AuthForms.css"

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button className="PopupButton" onClick={() => setIsOpen(true)}>
        Login
      </button>
      <ReactModal
        className="PopupContainer"
        isOpen={isOpen}
        contentLabel="Login Modal"
        onRequestClose={() => setIsOpen(false)}
      >
        <div className="Popup">
          <button className="CloseButton" onClick={() => setIsOpen(false)}>
            &times;
          </button>
          <form className="LoginContainer" onSubmit={handleOnSubmit}>
                <p className="Title">Login</p>
                <label>
                  <p>
                    Email Address <sup>*</sup>
                  </p>
                  <input
                    className="Input"
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
                      Enter Password <sup>*</sup>
                    </p>
                    <div className="PasswordDiv">
                      <input
                        className="Input"
                        required
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={handleOnChange}
                      />
                    </div>
                  </label>
                </div>
                <button className="SubmitButton" type="submit">
                  Login
                </button>
              </form>
        </div>
      </ReactModal>
    </div>
  );
};

export default LoginForm;
