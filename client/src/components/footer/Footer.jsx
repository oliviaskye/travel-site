import React from "react";
import footerCSS from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${footerCSS.footer_wrapper} section`}>
      <div className={footerCSS.FooterLinks}>
        <div className={footerCSS.logo}>

     
        </div>
      </div>



      <div className={footerCSS.FooterLinks}>
        <h3>Quick Links</h3>
        <p>About</p>
        <p>Contact Us</p>
        <p>Rooms</p>
        <p>GYM</p>
        <p>Restaurant</p>
      </div>

      <div className={footerCSS.FooterLinks}>
        <h3>City Branches</h3>
        <p>Heslinki</p>
        <p>Vantaa</p>
        <p>Espooo</p>
        <p>Lapii</p>
        <p>Turku</p>
      </div>

      <div className={footerCSS.FooterLinks}>
        <h3>More Info</h3>
        <p>Terms of Service</p>
        <p>Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
