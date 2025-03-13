import React, { useState } from "react";
import Register from "./Register";
import Login from "./LogIn";
import Nav from "@Nav";
import { useLocation } from "react-router-dom";

function RegisterLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/";

  const handleOptionClick = (option) => {
    setIsLogin(option === "login");
  };

  return (
    <div>
      <Nav />
      <div className="auth-container">
        <div className="option-buttons">
          <button
            className={`button ${isLogin ? "active" : ""}`}
            onClick={() => handleOptionClick("login")}
          >
            Login
          </button>
          <button
            className={`button ${!isLogin ? "active" : ""}`}
            onClick={() => handleOptionClick("register")}
          >
            Register
          </button>
        </div>
        <div className="divider"></div>

        <div className="auth-forms">
          {isLogin ? <Login redirectPath={redirectPath} /> : <Register />}
        </div>
      </div>
    </div>
  );
}

export default RegisterLogin;
