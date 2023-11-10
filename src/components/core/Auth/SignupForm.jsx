import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to your API to create a new user
    try {
      const response = await fetch('http://localhost:4000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // User was successfully created
        // You can redirect to a login page or display a success message
        console.log('User registered successfully');
      } else {
        // Handle registration error
        const data = await response.json();
        console.error('Registration failed:', data.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }

    navigate("/");
  };

    return (
      <div>
        <form onSubmit={handleSubmit} >
          <div >
            <label>
              <p>
                First Name <sup >*</sup>
              </p>
              <input
                required
                type="text"
                name="firstName"
              
                placeholder="Enter first name"
                onChange={handleChange}
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
                onChange={handleChange}
       
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
              onChange={handleChange}
            
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
                onChange={handleChange}
              />
         
            </label>
            <label >
              <p >
                Confirm Password <sup >*</sup>
              </p>
              <input
                required
                type="text"
                name="confirmPassword"
             
                placeholder="Confirm Password"
                onChange={handleChange}
              />
       
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