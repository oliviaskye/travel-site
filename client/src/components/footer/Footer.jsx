import React from "react";
import "./footer.css";
import fb from '../footer assets/fbimg.png';
import twitter from '../footer assets/twitterimg.png';
import linkedin from '../footer assets/linkedinimg.png';
import insta from '../footer assets/instaimg.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb__footer section__padding">
        <div className="sb__footer-links">
          <div className="sb__footer-links_div">
            <h4>Quick Links</h4>
            <a href="/UserProfile">
              <p>Profile</p>
            </a>
            <a href="/RegisterLogin">
              <p>Sign in</p>
            </a>
            <a href="/map">
              <p>Map</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>Resources</h4>
            <a href="/resources">
              <p>Testimonials</p>
            </a>
            <a href="/discover">
              <p>Discover</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>Partners</h4>
            <a href="https://varia.vantaa.fi/fi" target="_blank" rel="noopener noreferrer">
              <p>Varia</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>Company</h4>
            <a href="/contact">
              <p>Contact</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>Coming soon on</h4>
            <div className="socialmedia">
  <a href="https://www.facebook.com/your-page" target="_blank" rel="noopener noreferrer">
    <img src={fb} alt="Facebook"/>
  </a>
  <a href="https://twitter.com/your-page" target="_blank" rel="noopener noreferrer">
    <img src={twitter} alt="Twitter"/>
  </a>
  <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
    <img src={linkedin} alt="LinkedIn"/>
  </a>
  <a href="https://www.instagram.com/your-page" target="_blank" rel="noopener noreferrer">
    <img src={insta} alt="Instagram"/>
  </a>
</div>

          </div>
        </div>

      <hr></hr>

      <div className="sb__footer-below">
        <div className="sb__footer-copyright">
          <p>
            @{new Date().getFullYear()} Traveler. All right reserved.
          </p>
        </div>
        <div className="sb__footer-below-links">
          <a href="/terms"><div><p>Terms & Conditions</p></div></a>
          <a href="/privacy"><div><p>Privacy</p></div></a>
          <a href="/security"><div><p>Security</p></div></a>
          <a href="/cookie"><div><p>Cookie Declaration</p></div></a>
        </div>
      </div>

      </div>
    </div>
  )
}
export default Footer;