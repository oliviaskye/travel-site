import React from "react";

import Footer from "./Footer";
import "./Contact.css"; // Import the CSS file from the same folder

const Contact = () => {
  return (
    <div>
      <div className="contact-page">
        <div className="contact-form-container">
          <h1 className="contact-title">Contact Us</h1>
          <small className="contact-subtitle">
            We're here to help you with any inquiries!
          </small>

          <div className="contact-description">
            <div className="description-box">
              <p>
                We are final-year students at Ammattiopisto Varia, and for our
                final project, we have developed a hotel booking website as a
                group. If you have any questions, feel free to reach out to us.
                We are happy to discuss our project and provide any additional
                information.
              </p>
            </div>

            <div className="linkedins">
              <div>
                <strong>Ricards's LinkedIn:</strong>
                <a
                  href="https://www.linkedin.com/in/ricards-aleksejuks"
                  className="linkedin-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ricards Aleksejuks
                </a>
              </div>

              <div>
                <strong>Minoo's LinkedIn:</strong>
                <a
                  href="https://www.linkedin.com/in/minoo-yaghoubi-692b42182/"
                  className="linkedin-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Minoo Yaghoubi
                </a>
              </div>

              <div>
                <strong>Olivia's LinkedIn:</strong>
                <a
                  href="https://www.linkedin.com/in/olivia-hinkle-4ba837261"
                  className="linkedin-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Olivia Sky
                </a>
              </div>

              <div>
                <strong>Abdullah's LinkedIn:</strong>
                <a
                  href="https://www.linkedin.com/in/abdullah-al-tameemi-b75605325/"
                  className="linkedin-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abdullah Altameemi
                </a>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;
