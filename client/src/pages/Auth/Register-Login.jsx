import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./LogIn";
import Nav from "@Nav";
import { useLocation, useNavigate } from "react-router-dom";
import { useValue } from "../../Middleware/context/ContextProvider"; // Assuming you're using context for user data
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./RegisterLoginIn.css";

function RegisterLogin() {
  const [isLogin, setIsLogin] = useState(true); 
  const location = useLocation();
  const navigate = useNavigate();
  const { state, setUser } = useValue(); // Assuming you're using Context for global state management
  
  const redirectPath = location.state?.from?.pathname || "/";

  const handleSlideChange = (swiper) => {
    setIsLogin(swiper.activeIndex === 0);
  };

  // Function to handle successful login
  const handleLoginSuccess = (userData) => {
    // Assuming userData contains the logged-in user data
    localStorage.setItem("userId", userData.id); // Store the userId in localStorage
    setUser(userData); // Update the global state
    navigate(redirectPath); // Redirect to the page the user came from
  };

  // Handle redirect if the user is not logged in (this is optional based on your use case)
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/RegisterLogin"); // Redirect to the login page if not logged in
    }
  }, [navigate]);

  return (
    <div>
      <Nav />
      <div className="auth-container">
        <div className="divider"></div>

        <p>{isLogin ? "Slide it to Register" : "Slide it to Login"}</p>

        <div className="auth-forms">
          <Swiper
            onSlideChange={handleSlideChange}
            spaceBetween={50}
            slidesPerView={1}
            className="swiper-container"
          >
            <SwiperSlide>
              <Login redirectPath={redirectPath} onLoginSuccess={handleLoginSuccess} />
            </SwiperSlide>
            <SwiperSlide>
              <Register />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default RegisterLogin;
