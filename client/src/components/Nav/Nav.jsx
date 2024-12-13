import React, { useRef } from "react";
import navCSS from "./Nav.module.css";

import WebsiteLogo from "../../assets/WebsiteLogo.png";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const Menu = useRef();
  const Navbar = useRef();

  const navigate = useNavigate();

  const NavHandler = () => {
    Menu.current.classList.toggle(navCSS.activeNav);
  };

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      Navbar.current.classList.add(navCSS.navbarActive);
    } else {
      Navbar.current.classList.remove(navCSS.navbarActive);
    }
  });
  const handleNavigateToRegister = () => {
    navigate("/RegisterLogin");
  };

  return (
    <div className={navCSS.NavWrapper} ref={Navbar}>
      <div className={navCSS.ContainerNav}>
        <div className={navCSS.logo}>
          <a href="#">
            <img
              src={WebsiteLogo}
              alt="Traveler Logo"
              className={navCSS.logoImage}
            />
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
            <li>Profil</li>
          </Link>

        </ul>
      </div>

      
      <div className={navCSS.NavButtons}>
        <button className={navCSS.button} onClick={handleNavigateToRegister}>
          Signin
        </button>
        <i className="ri-menu-3-line" onClick={NavHandler}></i>
      </div>
    </div>
  );
}

export default Nav;
