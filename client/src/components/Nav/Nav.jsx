import React, { useRef, useEffect } from "react";
import "../../index.css"
import WebsiteLogo from "../../assets/WebsiteLogo.png";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const Menu = useRef();
  const Navbar = useRef();

  const navigate = useNavigate();

  const NavHandler = () => {
    if (Menu.current) {
      Menu.current.classList.toggle("active-nav"); // Adjusted for global styles
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (Navbar.current) {
        if (window.scrollY > 100) {
          Navbar.current.classList.add("navbar-active"); // Adjusted for global styles
        } else {
          Navbar.current.classList.remove("navbar-active");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigateToRegister = () => {
    navigate("/RegisterLogin");
  };

  return (
    <div className="nav-wrapper" ref={Navbar}>
      <div className="container-nav">
        <div className="logo">
          <a href="#">
            <img src={WebsiteLogo} alt="Traveler Logo" className="logo-image" />
            Traveler
          </a>
        </div>
        <ul ref={Menu}>
          <Link to={`/`}>
            <li>Home</li>
          </Link>
          <li>Destination</li>
          <li>Recommended</li>
          <li>Testimonials</li>
          <li>Inspiration</li>
          <Link to={`/map`}>
            <li>Map</li>
          </Link>
          <Link to={`/UserProfile`}>
            <li>Profile</li>

          </Link>

          <div className="nav-buttons">
        <button className="button" onClick={handleNavigateToRegister}>
          Signin
        </button>
        <i className="ri-menu-3-line" onClick={NavHandler}></i>
      </div>
        </ul>
      </div>

      
    </div>
  );
}

export default Nav;
