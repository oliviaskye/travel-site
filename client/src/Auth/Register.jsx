import React, { useState } from "react";
import axios from "axios";
import { useValue } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import CountrySelect from "./CountrySelect";


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
        navigate("/");
      } catch (error) {
        console.error('Error during registration:', error.response.data);
        setErr(error.response.data.message || 'Registration failed.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2 className="auth-title">Register</h2>
        <form>
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
          <label>Age</label>
          <input
            type="number"
            placeholder="Age"
            name="age"
            onChange={handleChange}
            required
          />
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            onChange={handleChange}
            required
          />
          <label>Country</label>
          <CountrySelect selectedCountry={inputs.country} onChange={handleChange} />
          <label>Gender</label>
          <div>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
              required
            />
            Male
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
              required
            />
            Female
            <input
              type="radio"
              name="gender"
              value="Other"
              onChange={handleChange}
              required
            />
            Other
          </div>
          {err && <p className="auth-error">{err}</p>}
          <button onClick={handleClick}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
