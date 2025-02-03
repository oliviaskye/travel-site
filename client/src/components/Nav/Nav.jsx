import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import XSound from "../../assets/XSound.wav";
import "../../index.css"; // Make sure this file includes your custom styles

function Nav() {
  const Menu = useRef();
  const Navbar = useRef();
  const audioRef = useRef(new Audio(XSound));
  const [menuOpen, setMenuOpen] = useState(false); // Handle mobile menu state
  const [isDarkMode, setIsDarkMode] = useState(false); // Handle dark mode state
  const [isSoundOn, setIsSoundOn] = useState(false); // Handle sound state
  const navigate = useNavigate();

  // Toggle the menu on click
  const NavHandler = () => {
    setMenuOpen(!menuOpen); // Toggle the menu visibility on small screens
  };

  // Scroll effect for Navbar
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

  // Handle dark mode and sound toggle
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    if (!isSoundOn) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isDarkMode, isSoundOn]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSound = () => {
    if (isSoundOn) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    setIsSoundOn(!isSoundOn);
  };

  const handleNavigateToRegister = () => {
    navigate("/RegisterLogin");
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div
      className="bg-white shadow-md fixed w-full top-0 left-0 z-50"
      ref={Navbar}
    >
      <div className="flex justify-between items-center px-6 py-4 max-w-screen-xl mx-auto">
        <div className="logo">
          <Link to="/" className="text-2xl font-bold text-brown-800">
            Traveler
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul
          className={`${menuOpen ? "block" : "hidden"} md:flex space-x-6 text-brown-700 font-medium`}
          ref={Menu}
        >
          <Link to={`/`}>
            <li className="hover:text-brown-500 transition">Home</li>
          </Link>
          <li className="hover:text-brown-500 transition">Destination</li>
          <li className="hover:text-brown-500 transition">Recommended</li>
          <li className="hover:text-brown-500 transition">Testimonials</li>
          <li className="hover:text-brown-500 transition">Inspiration</li>
          <Link to={`/map`}>
            <li className="hover:text-brown-500 transition">Map</li>
          </Link>
          <Link to={`/UserProfile`}>
            <li className="hover:text-brown-500 transition">Profile</li>
          </Link>
          <li>
            <button onClick={toggleDarkMode} className="hover:text-brown-500 transition">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
          <li>
            <button onClick={toggleSound} className="hover:text-brown-500 transition">
              {isSoundOn ? "🔊 Sound On" : "🔇 Sound Off"}
            </button>
          </li>
          <li>
            <button className="hover:text-brown-500 transition" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            className="bg-brown-500 text-white py-2 px-4 rounded-md hover:bg-brown-600 transition"
            onClick={handleNavigateToRegister}
          >
            Signin
          </button>
          <i
            className="ri-menu-3-line md:hidden text-2xl cursor-pointer"
            onClick={NavHandler}
          ></i>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${menuOpen ? "block" : "hidden"} absolute left-0 top-16 w-full bg-white shadow-md md:hidden`}
      >
        <ul className="space-y-4 p-6 text-brown-700">
          <Link to={`/`}>
            <li className="hover:text-brown-500">Home</li>
          </Link>
          <li className="hover:text-brown-500">Destination</li>
          <li className="hover:text-brown-500">Recommended</li>
          <li className="hover:text-brown-500">Testimonials</li>
          <li className="hover:text-brown-500">Inspiration</li>
          <Link to={`/map`}>
            <li className="hover:text-brown-500">Map</li>
          </Link>
          <Link to={`/UserProfile`}>
            <li className="hover:text-brown-500">Profile</li>
          </Link>
          <li>
            <button onClick={toggleDarkMode} className="hover:text-brown-500">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
          <li>
            <button onClick={toggleSound} className="hover:text-brown-500">
              {isSoundOn ? "🔊 Sound On" : "🔇 Sound Off"}
            </button>
          </li>
          <li>
            <button onClick={handleLogout} className="hover:text-brown-500">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
