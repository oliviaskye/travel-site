import React, { useState, useEffect } from "react";
import axios from "axios"; 
import CountrySelect from "../../Auth/CountrySelect"; 
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [user, setUser] = useState([]);
  const [inputs, setInputs] = useState([]); 
  const [error, setError] = useState(null);
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
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center text-xl text-brown-600">Loading...</div>;
  }

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
  
    if (!inputs.name || !inputs.email || !inputs.password || !inputs.age ||  
        !inputs.phoneNumber || !inputs.country || !inputs.gender) {
      setError("All fields are required.");
    } else {
      try {
        const userId = localStorage.getItem("userId");
        console.log("Inputs being sent:", inputs); // Log the data being sent
        const response = await axios.put(`http://localhost:5000/api/auth/users/${userId}`, inputs);
        const user = response.data;
        setError(null);
        alert("Profile updated successfully!");
        navigate("/UserProfile");
      } catch (error) {
        console.error('Error updating profile:', error.response.data);
        setError(error.response.data.message || 'Update failed.');
      }
    }
  };

  const cancelUpdate = () => {
    navigate("/UserProfile");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-brown-800 mb-6 text-center">Update Profile</h1>

      <form className="space-y-6">
        <div>
          <label className="block text-brown-700">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            className="w-full p-3 border border-brown-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brown-500"
            required
          />
        </div>

        <div>
          <label className="block text-brown-700">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            className="w-full p-3 border border-brown-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brown-500"
            required
          />
        </div>

        <div>
          <label className="block text-brown-700">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="w-full p-3 border border-brown-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brown-500"
            required
          />
        </div>

        <div>
          <label className="block text-brown-700">Age</label>
          <input
            type="number"
            placeholder="Age"
            name="age"
            onChange={handleChange}
            className="w-full p-3 border border-brown-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brown-500"
            required
          />
        </div>

        <div>
          <label className="block text-brown-700">Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            onChange={handleChange}
            className="w-full p-3 border border-brown-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brown-500"
            required
          />
        </div>

        <div>
          <label className="block text-brown-700">Country</label>
          <CountrySelect selectedCountry={inputs.country} onChange={handleChange} />
        </div>

        <div className="space-y-4">
          <label className="text-brown-700">Gender</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                required
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                required
                className="mr-2"
              />
              Female
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Other"
                onChange={handleChange}
                required
                className="mr-2"
              />
              Other
            </label>
          </div>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex space-x-4">
          <button
            onClick={handleClick}
            className="w-full py-2 bg-brown-500 text-white rounded-md hover:bg-brown-600 transition"
          >
            Update
          </button>
          <button
            onClick={cancelUpdate}
            className="w-full py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
