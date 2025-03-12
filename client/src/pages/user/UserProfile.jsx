import React, { useState, useEffect } from 'react';
import Nav from '@Nav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./profile.css";

const UserProfile = () => {

  const [user, setUser] = useState([]);
  const [error, setError] = useState();
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

  const deleteProfile = async (userId) => {
    if(confirm("Are you sure you want to delete your account? This action cannot be undone."))
      try{
        const response = await axios.delete(`http://localhost:5000/api/auth/users/${userId}`);
        deleteMe(response.data);
        alert("User deleted");
        navigate("/");
      } catch (error) {
        setError('Error removing user data');
        console.error(error);
      }
    else{
      console.log("User not deleted");
    }
  };

  const updateProfile = () => {
        navigate("/UpdateProfile");
  };

  return (
    <div className="user-profile">
      <Nav />
      
      <Link to={`/UserReservation`}>
       UserReservation
       </Link>

      <h2>User Profile</h2>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Phone:</strong> {user.phoneNumber}
      </div>
      <div>
        <strong>Country:</strong> {user.country}
      </div>
      <div>
        <button onClick={() => updateProfile()}>edit profile</button> 
      </div>
      <div>
        <button onClick={() => deleteProfile()}>delete profile</button>
      </div>

    </div>
    
  );
};

export default UserProfile;