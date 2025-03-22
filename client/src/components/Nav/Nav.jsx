import React, { useState, useEffect, useRef } from "react";
import navCSS from "./Nav.module.css";
import XSound from "@assets/XSound.wav";

const navItemses = [
  { label: "Home", path: "/" },
  { label: "Map", path: "/map" },
  { label: "Contact", path: "/Contact" },
  { label: "Profile", path: "/UserProfile" },
  { label: "Dark Mode", action: "toggleDarkMode" },
  { label: "Sound", action: "toggleSound" },
  { label: "Sign In", path: "/RegisterLogin" },
];

function Nav() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [isSoundOn, setIsSoundOn] = useState(
    () => localStorage.getItem("soundOn") === "true"
  );

  const audioRef = useRef(new Audio(XSound));

  useEffect(() => {
    // Toggle dark mode class
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode.toString());

    if (!isSoundOn) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    localStorage.setItem("soundOn", isSoundOn.toString());
  }, [isDarkMode, isSoundOn]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSound = () => setIsSoundOn((prev) => !prev);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleAction = (action) => {
    if (action === "toggleDarkMode") {
      toggleDarkMode();
    } else if (action === "toggleSound") {
      toggleSound();
    }
  };

  return (
    <nav className={navCSS.nav_wrapper}>
      <div className={navCSS.logo}>
        <a href="/">
        <span>T</span>raveler
        </a>
      </div>

      
      {!isMobile && (
        <ul className={navCSS.navList}>
          {navItemses.map((item, index) => (
            <li key={index}>
              <a
                href={item.path || "#"} 
                onClick={(e) => {
                  if (item.action) {
                    e.preventDefault(); 
                    handleAction(item.action);
                  }
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}

   
      {isMobile && (
        <div className={navCSS.Nav_btns}>
          <button className="nav-button" onClick={() => setIsMenuVisible(!isMenuVisible)}>
            <i className="ri-menu-4-4line" id={navCSS.bras}>menu</i>
          </button>
        </div>
      )}

   
      {isMobile && isMenuVisible && (
        <ul className={navCSS.showNav}>
          {navItemses.map((item, index) => (
            <li key={index}>
              <a
                href={item.path || "#"} 
                onClick={(e) => {
                  if (item.action) {
                    e.preventDefault();
                    handleAction(item.action);
                  }
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Nav;
