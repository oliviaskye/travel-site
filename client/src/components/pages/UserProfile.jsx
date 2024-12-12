import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateProfile from './UpdateProfile';
import { useNavigate } from 'react-router-dom';
// import { getLocalUser, setLocalUser } from "../../../../api/controllers/Auth";

const UserProfile = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [me, deleteMe] = useState([]);
  const navigate = useNavigate();

  //getLocalUser
  const getLocalUser = (user) => {
    console.log("user has been GET out of local storage (just before)");
    return JSON.parse(window.localStorage.getItem("userId"));
  };

  //setLocalUser
  // const setLocalUser = (user) => {
  //   window.localStorage.setItem("user", JSON.stringify(user))
  //   console.log("user has been SET out of local storage")
  // };

  const handleUser = (user) => {
    const theLoggedUser = getLocalUser(user);
    window.localStorage.setItem("user", JSON.stringify(theLoggedUser));
    console.log(user.userId);
    setUserId(user.userId);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        handleUser(user);
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

  // const editProfile = () => {
  //   try{
  //     navigate("/UpdateProfile");
  //   }
  //   catch(error){
  //     console.error;
  //   }

  // }
  const deleteProfile = async (userId) => {
    if(confirm("Are you sure you want to delete your profile? This action cannot be undone."))
      try{
        const response = await axios.delete(`http://localhost:5000/api/auth/users/${handleUser()}`);
        deleteMe(response.data);
          // return <div>User Deleted</div>
        navigate("/");
      } catch (error) {
        setError('Error removing user data');
        console.error(error);
      }
    else{
      console.log("User not deleted");
    }
  };

  const updateProfile = async () => {
    if(confirm("navigate to update profile?"))
      try{
        navigate("/UpdateProfile");
      } catch (error) {
        setError('Error opening update profile page');
        console.error(error);
      }
    else{
      console.log("User not updated");
    }
  };

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
        <button onClick={() => updateProfile()}>edit profile</button> 
      </div>
      <div>
        <button onClick={() => deleteProfile()}>delete profile</button>
      </div>

    </div>
    
  );
};

export default UserProfile;