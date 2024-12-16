import React, { useState } from "react";
import Register from "./Register";
import Login from "./LogIn";
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
      <div>
        <button onClick={() => handleOptionClick("login")}>Login</button>
        <button onClick={() => handleOptionClick("register")}>Register</button>
      </div>
      {isLogin ? <Login redirectPath={redirectPath} /> : <Register />}
    </div>
  );
}

export default RegisterLogin;
