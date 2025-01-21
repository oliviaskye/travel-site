import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./LogIn";
import Nav from "../components/Nav/Nav";
import { useLocation } from "react-router-dom";

function RegisterLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/";

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get the user ID from localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId); // Set the user ID in state
    }
  }, []);

  const handleOptionClick = (option) => {
    setIsLogin(option === "login");
  };

  return (
    <div>
      <Nav />
      <div>
        <button onClick={() => handleOptionClick("login")}>Login</button>
        <button onClick={() => handleOptionClick("register")}>Register</button>
      </div>
      {userId ? (
        <div>User ID from localStorage: {userId}</div>
      ) : (
        <div>No user ID found in localStorage</div>
      )}
      {isLogin ? <Login redirectPath={redirectPath} /> : <Register />}
    </div>
  );
}

export default RegisterLogin;
