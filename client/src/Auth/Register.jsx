import React, { useState } from "react";
import axios from "axios"; 
import CountrySelect from "./CountrySelect"; 
import { useValue } from "../context/ContextProvider"; 
import { useNavigate } from "react-router-dom"; 

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    phoneNumber: "",
    country: "",
    gender: "",
  });


  
  const [err, setErr] = useState(null);
  const { dispatch } = useValue();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!inputs.name || !inputs.email || !inputs.password || !inputs.age ||  
        !inputs.phoneNumber || !inputs.country || !inputs.gender) {
      setErr("All fields are required.");
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', inputs);
        console.log(response.data); 
        setErr(null);
        alert("Registration successful!"); 
        dispatch({ type: "UPDATE_USER", payload: response.data.user });
        navigate("/rooms"); 
        
      } catch (error) {
        console.error('Error during registration:', error.response.data);
        setErr(error.response.data.message || 'Registration failed.'); 
      }
    }
  };

  return (
    <div className="register">
      <div >
        <div >
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              placeholder="Age"
              name="age"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              onChange={handleChange}
              required
            />
            <CountrySelect selectedCountry={inputs.country} onChange={handleChange} />

            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  required
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  required
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  onChange={handleChange}
                  required
                />
                Other
              </label>
            </div>
            
            {err && <p className="error">{err}</p>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
