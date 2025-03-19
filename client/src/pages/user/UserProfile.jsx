import React, { useState, useEffect } from "react";
import Nav from "@Nav";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./profile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:5000/api/auth/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        setError("Error fetching user data");
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const deleteProfile = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const userId = localStorage.getItem("userId");
        await axios.delete(`http://localhost:5000/api/auth/users/${userId}`);
        alert("User deleted");
        navigate("/");
      } catch (error) {
        setError("Error removing user data");
        console.error(error);
      }
    } else {
      console.log("User not deleted");
    }
  };

  const updateProfile = () => {
    navigate("/UpdateProfile");
  };

  return (
    <div>
      {" "}
      <Nav />
      <div className="user-profile">
        <h2>User Profile</h2>

        <div className="user-info">
          <div>
            <strong>Name: {user.name}</strong>
          </div>
          <div>
            <strong>Email: {user.email}</strong>
          </div>
          <div>
            <strong>Phone: {user.phoneNumber}</strong>
          </div>
          <div>
            <strong>Country: {user.country}</strong>
          </div>
        </div>

        <div className="bottom-buttons">
          <button className="nav-button" onClick={updateProfile}>
            Edit{" "}
          </button>
          <button className="nav-button" onClick={deleteProfile}>
            Delete
          </button>
          <button className="nav-button">
            <Link to={`/UserReservation`}>Reservation</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
