import React, { useState, useEffect } from "react";
import axios from "axios"; 
import CountrySelect from "../Auth/CountrySelect"; 
import { useNavigate } from "react-router-dom";



const UpdateProfile = () => {
  const [user, setUser] = useState([]);
  const [inputs, setInputs] = useState([]); 
  const [error, setError] = useState(null);
  const [confirmation, setConfirmation] = useState({
      confirmPassword: "",
    })
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:5000/api/auth/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user data');
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleConfirm = (e) => {
    setConfirmation((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!inputs.name || !inputs.email || !inputs.password ||  
        !inputs.phoneNumber || !inputs.country ) {
      alert("All fields are required.");
    } 
    else {
      if (inputs.password !== confirmation.confirmPassword) {
        alert("Passwords don't match.");
      } else {
        try {
          const userId = localStorage.getItem("userId");
          const response = await axios.put(`http://localhost:5000/api/auth/users/${userId}`, inputs);
          const user = response.data;
          setError(null);
          alert("Profile updated successfully!");
          navigate("/UserProfile");
        }
        catch (error) {
          console.error('Error updating profile:', error.response.data);
          setError(error.response.data.message || 'Update failed.');
        }
      }
    }
  };

  const cancelUpdate = () => {
    navigate("/UserProfile");
  };
  
  return (
    <div>
      <div>
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
            <input
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              onChange={handleConfirm}
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
            
            {error && <p className="error">{error}</p>}
            
            <div className="bottom-buttons">
            <button   className="nav-button1" onClick={handleClick}>Update</button>
            <button   className="nav-button1" onClick={cancelUpdate}>Cancel</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
