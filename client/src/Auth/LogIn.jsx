import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useValue } from "../context/ContextProvider";



const Login = () => {
  const [inputs, setInputs] = useState({
    emailOrPhone: "",
    password: "",
  });

  
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useValue();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr(null);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", inputs);
        if (response.data.success) {
        dispatch({ type: "UPDATE_USER", payload: response.data.result });
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      console.log("Login error:", error);
      setErr(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="login">
      <div >
        <div >
          <h1>Login</h1>
          <form onSubmit={handleLogin}> 
            <input
              type="text"
              placeholder="Email or Phone Number"
              name="emailOrPhone"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
            {err && <p className="error">{err}</p>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
