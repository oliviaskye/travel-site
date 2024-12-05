import React, { useState } from "react";
import axios from "axios"; 
import CountrySelect from "../../Auth/CountrySelect"; 
import { useValue } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom"; 


const UpdateProfile = async () => {
  const user = await axios.get(`http://localhost:5000/api/auth/users/674466bb3165367fa268eb8c`);
  const [inputs, setInputs] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
    age: user.age,
    phoneNumber: user.phoneNumber,
    country: user.country,
    gender: user.gender,
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
    } 
    else {
      try {
        const response = await axios.put('http://localhost:5000/api/auth/users/674466bb3165367fa268eb8c', inputs);
        console.log(response.data);
        setErr(null);
        alert("Profile updated successfully!");
        dispatch({ type: "UPDATE_USER", payload: response.data.user });
        navigate("/UserProfile");
      } 
      catch (error) {
        console.error('Error updating profile:', error.response.data);
        setErr(error.response.data.message || 'Update failed.');
      }
    }
  };

  return (
    <div>
      <div >
        <div className="container">
          <h1>Update Profile</h1>
          <form>
            <label>name</label><br/>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              required
            /><br/>
            <label>email</label><br/>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            /><br/>
            <label>password</label><br/>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            /><br/>
            <label>age</label><br/>
            <input
              type="number"
              placeholder="Age"
              name="age"
              onChange={handleChange}
              required
            /><br/>
            <label>phone number</label><br/>
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              onChange={handleChange}
              required
            /><br/>
            <label>country</label><br/>
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
            <button onClick={handleClick}>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
