import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/users/673e22f8dd072f8ecf16044f`);
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