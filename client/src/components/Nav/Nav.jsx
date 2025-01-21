import React, { useRef, useEffect, useState } from "react";
import "../../index.css";
import WebsiteLogo from "../../assets/WebsiteLogo.png";
import { Link, useNavigate } from "react-router-dom";
import XSound from "../../assets/XSound.wav";
import LightDark from "../../Light-Dark";

function Nav() {
  const Menu = useRef();
  const Navbar = useRef();
  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(false); 
  const audioRef = useRef(null); 

  useEffect(() => {
    audioRef.current = new Audio(XSound);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); 
      } else {
        audioRef.current.play(); 
      }
      setIsPlaying(!isPlaying); 
    }
  };

  const NavHandler = () => {
    if (Menu.current) {
      Menu.current.classList.toggle("active-nav");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (Navbar.current) {
        if (window.scrollY > 100) {
          Navbar.current.classList.add("navbar-active");
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
          <Link to={`/map`}>
            <li>Map</li>
          </Link>
          <Link to={`/UserProfile`}>
            <li>Profile</li>
          </Link>
        </ul>
      </div>

      <div className="nav-buttons">
        <button className="button" onClick={toggleSound}>
          {isPlaying ? "Sound Off" : "Sound On"}
        </button>
        <LightDark /> 
        <button className="button" onClick={handleNavigateToRegister}>
          Signin
        </button>
        <i className="ri-menu-3-line" onClick={NavHandler}></i>
      </div>
    </div>
  );
}

export default Nav;
