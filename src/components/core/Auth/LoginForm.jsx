import React, { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
   
    email: '',
    password: '',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to your API to create a new user
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // User was successfully created
        // You can redirect to a login page or display a success message
        console.log('User logged in successfully');
      } else {
        // Handle registration error
        const data = await response.json();
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };




  
    return (
      <div>
        <form onSubmit={handleSubmit} >

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