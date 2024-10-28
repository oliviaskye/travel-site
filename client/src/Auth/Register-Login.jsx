import { useState } from "react";
import Register from "./Register";
import Login from "./LogIn";

function RegisterLogin() {
 
  const [isLogin, setIsLogin] = useState(true);

 
  const handleOptionClick = (option) => {
    setIsLogin(option === "login");
  };

  return (
    <div>
    
      <div>
        <button onClick={() => handleOptionClick("login")}>Login</button>
        <button onClick={() => handleOptionClick("register")}>Register</button>
      </div>

  
      {isLogin ? <Login /> : <Register />}
    </div>
  );
}

export default RegisterLogin;
