import React, { useState } from "react";
import Register from "./Register";
import Login from "./LogIn";
import Nav from "../components/Nav/Nav";
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
            <br/>
            <br/>
            <br/>
            <br/> <br/>
            <br/>
      <div>
        <button onClick={() => handleOptionClick("login")}>Login</button>
        <button onClick={() => handleOptionClick("register")}>Register</button>
      </div>
      {isLogin ? <Login redirectPath={redirectPath} /> : <Register />}
    </div>
  );
}

export default RegisterLogin;
