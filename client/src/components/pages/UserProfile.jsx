import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);




  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:5000/api/auth/users/${userId}`)

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

  const editProfile = () => {

  }

  return (
    <div className="user-profile">
       <Nav />

      <h2>User Profile</h2>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Age:</strong> {user.age}
      </div>
      <div>
        <strong>Phone:</strong> {user.phoneNumber}
      </div>
      <div>
        <strong>Country:</strong> {user.country}
      </div>
      <div>
        <strong>Gender:</strong> {user.gender}
      </div>
      <div>
        <button onClick={editProfile()}>edit profile</button>
      </div>

    </div>
    
  );
};

export default UserProfile;