import React, { useState, useEffect } from "react";
import axios from "axios"; 
import CountrySelect from "../../Auth/CountrySelect"; 
import { useValue } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
// import { getLocalUser, setLocalUser } from "../../../../api/controllers/Auth";

const UpdateProfile = async () => {
  const [user, setUser] = useState([]); 
  const [error, setError] = useState(null);
  const { dispatch } = useValue();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);

  // const handleUser = (user) => {
  //   const theLoggedUser = getLocalUser(user);
  //   const userId = theLoggedUser.userId;
  //   return userId;
  // }
  // //
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/users/674466bb3165367fa268eb8c`);
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

  // const obj = {
  //     name: user.name,
  //     email: user.email,
  //     password: user.password,
  //     age: user.age,
  //     phoneNumber: user.phoneNumber,
  //     country: user.country,
  //     gender: user.gender,
  //   }

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!inputs.name || !inputs.email || !inputs.password || !inputs.age ||  
        !inputs.phoneNumber || !inputs.country || !inputs.gender) {
      setError("All fields are required.");
    } 
    else {
      try {
        const response = await axios.put('http://localhost:5000/api/auth/users/674466bb3165367fa268eb8c', inputs);
        const user = response.data;
        setError(null);
        dispatch({ type: "UPDATE_USER", payload: response.data.user });
        alert("Profile updated successfully!");
        // navigate("/UserProfile");
      } 
      catch (error) {
        console.error('Error updating profile:', error.response.data);
        setError(error.response.data.message || 'Update failed.');
      }
    }
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
            
            {error && <p className="error">{error}</p>}
            <button onClick={handleClick}>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
